/**
 * Main build script
 * Orchestrates: collect -> validate -> parse -> render -> write -> assets
 */

import { existsSync } from 'node:fs';
import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { generateAiDiscovery } from './ai-discovery.js';
import { collectBooks } from './collect-books.js';
import { collectContent } from './collect.js';
import { config } from './config.js';
import { generateFeeds } from './feeds.js';
import { extractWikilinks, parseMarkdown, setWikilinkResolver } from './parse.js';
import { renderSite } from './render.js';
import type {
	Book,
	BuildContext,
	Content,
	Note,
	Page,
	Photo,
	Post,
	Skills,
	Soul,
	ValidatedContentItem,
} from './types.js';
import { validateContent } from './validate.js';

// Constants
const CSS_HASH_LENGTH = 8;

interface TimingResult {
	step: string;
	duration: number;
}

/**
 * Creates a timing tracker for measuring build step durations.
 * Returns functions scoped to the tracking instance to avoid module-level state.
 */
function createTimingTracker() {
	const timings: TimingResult[] = [];

	async function timeAsync<T>(step: string, fn: () => Promise<T>): Promise<T> {
		const start = performance.now();
		const result = await fn();
		timings.push({ step, duration: performance.now() - start });
		return result;
	}

	function printTimings(totalMs: number): void {
		console.log('\n--- Build Timings ---');
		for (const { step, duration } of timings) {
			console.log(`  ${step}: ${duration.toFixed(1)}ms`);
		}
		console.log(`  Total: ${totalMs.toFixed(1)}ms`);
		console.log('');
	}

	return { timeAsync, printTimings };
}

async function copyStatic(srcDir: string, destDir: string): Promise<void> {
	if (!existsSync(srcDir)) return;
	await cp(srcDir, destDir, { recursive: true });
}

async function buildCSS(srcFile: string, destDir: string): Promise<string> {
	await mkdir(destDir, { recursive: true });

	// Build to temp file first
	const tempOutput = join(destDir, 'styles.temp.css');
	const proc = Bun.spawn(['bunx', 'tailwindcss', '-i', srcFile, '-o', tempOutput, '--minify'], {
		stderr: 'pipe',
	});

	const exitCode = await proc.exited;
	if (exitCode !== 0) {
		const stderr = await new Response(proc.stderr).text();
		throw new Error(`Tailwind build failed: ${stderr}`);
	}

	// Generate content hash
	const cssContent = await Bun.file(tempOutput).text();
	const hasher = new Bun.CryptoHasher('md5');
	hasher.update(cssContent);
	const hash = hasher.digest('hex').slice(0, CSS_HASH_LENGTH);

	// Rename to hashed filename
	const hashedFilename = `styles.${hash}.css`;
	const finalPath = join(destDir, hashedFilename);
	await Bun.write(finalPath, cssContent);

	// Clean up temp file
	await rm(tempOutput);

	return hashedFilename;
}

async function writeFile(filepath: string, content: string): Promise<void> {
	const dir = dirname(filepath);
	await mkdir(dir, { recursive: true });
	await Bun.write(filepath, content);
}

// Type guard helpers for frontmatter extraction
function getString(value: unknown): string | undefined {
	return typeof value === 'string' ? value : undefined;
}

function getBoolean(value: unknown): boolean | undefined {
	return typeof value === 'boolean' ? value : undefined;
}

function getStringArray(value: unknown): string[] | undefined {
	if (!Array.isArray(value)) return undefined;
	return value.every((v) => typeof v === 'string') ? value : undefined;
}

/**
 * Parse validated content and add HTML
 */
async function parseContent(items: ValidatedContentItem[]): Promise<Content[]> {
	const results: Content[] = [];

	for (const item of items) {
		const { html, wordCount, readingTime } = await parseMarkdown(item.bodyMarkdown);
		const fm = item.frontmatter;

		// Build content with type-safe field extraction
		const baseContent = {
			...item,
			html,
			wordCount,
			readingTime,
		};

		let content: Content;

		switch (item.type) {
			case 'post':
				content = {
					...baseContent,
					type: 'post',
					description: item.description ?? '',
					heroImage: getString(fm.heroImage),
					canonicalUrl: getString(fm.canonicalUrl),
					series: getString(fm.series),
					noIndex: getBoolean(fm.noIndex),
					featured: getBoolean(fm.featured),
					tension: getString(fm.tension),
					questions: getStringArray(fm.questions),
					constraints: getStringArray(fm.constraints),
					tools: getStringArray(fm.tools),
					preface: getString(fm.preface),
				};
				break;
			case 'photo':
				content = {
					...baseContent,
					type: 'photo',
					image: getString(fm.image) ?? '',
					alt: getString(fm.alt) ?? '',
					observation: getString(fm.observation),
					location: getString(fm.location),
					camera: getString(fm.camera),
					settings: getString(fm.settings),
				};
				break;
			case 'note':
				content = {
					...baseContent,
					type: 'note',
					heroImage: getString(fm.heroImage),
				};
				break;
			case 'page':
				content = { ...baseContent, type: 'page' };
				break;
			case 'soul':
				content = { ...baseContent, type: 'soul' };
				break;
			case 'skills':
				content = { ...baseContent, type: 'skills' };
				break;
			default:
				// book and chapter types are handled separately by collectBooks
				throw new Error(`Unexpected content type: ${item.type}`);
		}

		results.push(content);
	}

	return results;
}

/**
 * Build the context from parsed content
 */
function buildContext(
	content: Content[],
	books: Book[],
	cssFilename: string,
	wikilinkMap: Map<string, string>,
): BuildContext {
	const posts: Post[] = [];
	const notes: Note[] = [];
	const photos: Photo[] = [];
	const pages: Page[] = [];
	let soul: Soul | undefined;
	let skills: Skills | undefined;

	// Build URL to content map for backlinks (with description and date)
	const urlToContent = new Map<
		string,
		{ title: string; url: string; description?: string; date?: Date }
	>();
	for (const item of content) {
		const url = getContentUrl(item);
		if (url) {
			urlToContent.set(url, {
				title: item.title,
				url,
				description:
					'description' in item ? (item as { description?: string }).description : undefined,
				date: 'date' in item ? (item as { date?: Date }).date : undefined,
			});
		}
	}

	// Extract wikilinks and build backlinks map
	const backlinks = new Map<
		string,
		Array<{ title: string; url: string; description?: string; date?: Date }>
	>();
	const graphLinks: Array<{ source: string; target: string }> = [];

	for (const item of content) {
		const sourceUrl = getContentUrl(item);
		if (!sourceUrl) continue;

		const links = extractWikilinks(item.bodyMarkdown);
		for (const linkTitle of links) {
			const targetUrl = wikilinkMap.get(linkTitle.toLowerCase());
			if (targetUrl) {
				// Add to backlinks
				if (!backlinks.has(targetUrl)) {
					backlinks.set(targetUrl, []);
				}
				const sourceInfo = urlToContent.get(sourceUrl);
				backlinks.get(targetUrl)?.push({
					title: item.title,
					url: sourceUrl,
					description: sourceInfo?.description,
					date: sourceInfo?.date,
				});

				// Add to graph
				graphLinks.push({ source: sourceUrl, target: targetUrl });
			}
		}
	}

	// Build graph nodes (exclude drafts)
	const graphNodes = content
		.filter((item) => ['post', 'note', 'page'].includes(item.type))
		.filter((item) => !('draft' in item && (item as { draft?: boolean }).draft))
		.map((item) => ({
			id: getContentUrl(item) || item.slug,
			title: item.title,
			url: getContentUrl(item) || `/${item.slug}/`,
			type: item.type,
		}));

	for (const item of content) {
		switch (item.type) {
			case 'post':
				posts.push(item);
				break;
			case 'note':
				notes.push(item);
				break;
			case 'photo':
				photos.push(item);
				break;
			case 'page':
				pages.push(item);
				break;
			case 'soul':
				soul = item;
				break;
			case 'skills':
				skills = item;
				break;
			case 'chapter':
				// Chapters are handled via books
				break;
		}
	}

	// Sort by date descending
	posts.sort((a, b) => b.date.getTime() - a.date.getTime());
	notes.sort((a, b) => b.date.getTime() - a.date.getTime());
	photos.sort((a, b) => b.date.getTime() - a.date.getTime());

	return {
		config,
		posts,
		notes,
		photos,
		pages,
		books,
		soul,
		skills,
		allContent: content,
		buildDate: new Date(),
		cssFilename,
		backlinks,
		graph: { nodes: graphNodes, links: graphLinks },
	};
}

function getContentUrl(item: Content): string | null {
	switch (item.type) {
		case 'post':
			return `/posts/${item.slug}/`;
		case 'note':
			return `/notes/${item.slug}/`;
		case 'page':
			return `/${item.slug}/`;
		default:
			return null;
	}
}

export async function build(): Promise<void> {
	const buildStart = performance.now();
	const { timeAsync, printTimings } = createTimingTracker();

	console.log('Building bristanback.com...\n');

	// Clean output directory
	await timeAsync('clean', async () => {
		if (existsSync(config.outputDir)) {
			await rm(config.outputDir, { recursive: true });
		}
		await mkdir(config.outputDir, { recursive: true });
	});

	// 1. Collect content from markdown files
	const rawContent = await timeAsync('collect', () => collectContent(config.contentDir));
	console.log(`  Collected ${rawContent.length} content items`);

	// 2. Validate frontmatter and required fields
	const validatedContent = await timeAsync('validate', async () => validateContent(rawContent));
	console.log(`  Validated ${validatedContent.length} content items`);

	// 2b. Build wikilink resolver (title -> URL) before parsing
	const wikilinkMap = new Map<string, string>();
	for (const item of validatedContent) {
		const url =
			item.type === 'post'
				? `/posts/${item.slug}/`
				: item.type === 'note'
					? `/notes/${item.slug}/`
					: item.type === 'page'
						? `/${item.slug}/`
						: null;
		if (url) {
			wikilinkMap.set(item.title.toLowerCase(), url);
		}
	}
	setWikilinkResolver(wikilinkMap);

	// 3. Parse markdown to HTML
	const parsedContent = await timeAsync('parse', () => parseContent(validatedContent));
	console.log(`  Parsed ${parsedContent.length} content items`);

	// 3b. Collect books (separate from regular content)
	const books = await timeAsync('books', () => collectBooks(join(config.contentDir, 'books')));
	if (books.length > 0) {
		const totalChapters = books.reduce((sum, b) => sum + b.chapters.length, 0);
		console.log(`  Collected ${books.length} books with ${totalChapters} chapters`);
	}

	// 4. Build CSS (do this before render so we have the hashed filename)
	const cssFilename = await timeAsync('css', () =>
		buildCSS(join(config.stylesDir, 'main.css'), join(config.outputDir, 'css')),
	);
	console.log(`  Built CSS: ${cssFilename}`);

	// 5. Build context (includes CSS filename for templates)
	const ctx = buildContext(parsedContent, books, cssFilename, wikilinkMap);

	// 6. Render HTML pages from templates
	const pages = await timeAsync('render', async () => renderSite(ctx));
	console.log(`  Rendered ${pages.length} pages`);

	// 7. Generate feeds
	const feeds = await timeAsync('feeds', async () => generateFeeds(ctx));
	console.log(`  Generated ${feeds.length} feed files`);

	// 8. Generate AI discovery files
	const aiFiles = await timeAsync('ai-discovery', async () => generateAiDiscovery(ctx));
	console.log(`  Generated ${aiFiles.length} AI discovery files`);

	// 9. Write all output files
	await timeAsync('write', async () => {
		const allOutputs = [...pages, ...feeds, ...aiFiles];
		await Promise.all(
			allOutputs.map(({ path, content }) => writeFile(join(config.outputDir, path), content)),
		);
	});

	// 10. Assets: copy static files (CSS already built in step 4)
	await timeAsync('assets', async () => {
		await Promise.all([
			copyStatic(config.staticDir, config.outputDir),
			copyStatic('public', config.outputDir),
		]);

		// Copy book chapter assets (images, etc.)
		for (const book of books) {
			const bookChaptersDir = join(config.contentDir, 'books', book.slug, 'chapters');
			const destChaptersDir = join(config.outputDir, 'books', book.slug, 'chapters');
			if (existsSync(bookChaptersDir)) {
				await copyStatic(bookChaptersDir, destChaptersDir);
			}
		}
	});

	const totalMs = performance.now() - buildStart;
	printTimings(totalMs);

	console.log('Build complete.');
}

// Run if executed directly
if (import.meta.main) {
	build().catch((err) => {
		console.error('Build failed:', err);
		process.exit(1);
	});
}
