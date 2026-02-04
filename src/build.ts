/**
 * Main build script
 * Orchestrates: collect -> validate -> parse -> render -> write -> assets
 */

import { existsSync } from 'node:fs';
import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { generateAiDiscovery } from './ai-discovery.js';
import { collectContent } from './collect.js';
import { config } from './config.js';
import { generateFeeds } from './feeds.js';
import { parseMarkdown } from './parse.js';
import { renderSite } from './render.js';
import type {
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

interface TimingResult {
	step: string;
	duration: number;
}

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

async function copyStatic(srcDir: string, destDir: string): Promise<void> {
	if (!existsSync(srcDir)) return;
	await cp(srcDir, destDir, { recursive: true });
}

async function buildCSS(srcFile: string, destDir: string): Promise<void> {
	await mkdir(destDir, { recursive: true });

	const proc = Bun.spawn(
		['bunx', 'tailwindcss', '-i', srcFile, '-o', join(destDir, 'styles.css'), '--minify'],
		{ stderr: 'pipe' },
	);

	const exitCode = await proc.exited;
	if (exitCode !== 0) {
		const stderr = await new Response(proc.stderr).text();
		throw new Error(`Tailwind build failed: ${stderr}`);
	}
}

async function writeFile(filepath: string, content: string): Promise<void> {
	const dir = dirname(filepath);
	await mkdir(dir, { recursive: true });
	await Bun.write(filepath, content);
}

/**
 * Parse validated content and add HTML
 */
async function parseContent(items: ValidatedContentItem[]): Promise<Content[]> {
	const results: Content[] = [];

	for (const item of items) {
		const { html, wordCount, readingTime } = await parseMarkdown(item.bodyMarkdown);

		const content: Content = {
			...item,
			html,
			wordCount,
			readingTime,
			// Add type-specific fields from frontmatter
			...(item.type === 'post' && {
				heroImage: item.frontmatter.heroImage as string | undefined,
				canonicalUrl: item.frontmatter.canonicalUrl as string | undefined,
				series: item.frontmatter.series as string | undefined,
				noIndex: item.frontmatter.noIndex as boolean | undefined,
				tension: item.frontmatter.tension as string | undefined,
				questions: item.frontmatter.questions as string[] | undefined,
				constraints: item.frontmatter.constraints as string[] | undefined,
				tools: item.frontmatter.tools as string[] | undefined,
			}),
			...(item.type === 'photo' && {
				image: item.frontmatter.image as string,
				alt: item.frontmatter.alt as string,
				caption: item.frontmatter.caption as string | undefined,
				location: item.frontmatter.location as string | undefined,
				camera: item.frontmatter.camera as string | undefined,
				settings: item.frontmatter.settings as string | undefined,
			}),
		} as Content;

		results.push(content);
	}

	return results;
}

/**
 * Build the context from parsed content
 */
function buildContext(content: Content[]): BuildContext {
	const posts: Post[] = [];
	const notes: Note[] = [];
	const photos: Photo[] = [];
	const pages: Page[] = [];
	let soul: Soul | undefined;
	let skills: Skills | undefined;

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
		soul,
		skills,
		allContent: content,
		buildDate: new Date(),
	};
}

export async function build(): Promise<void> {
	const buildStart = performance.now();
	timings.length = 0;

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

	// 3. Parse markdown to HTML
	const parsedContent = await timeAsync('parse', () => parseContent(validatedContent));
	console.log(`  Parsed ${parsedContent.length} content items`);

	// 4. Build context
	const ctx = buildContext(parsedContent);

	// 5. Render HTML pages from templates
	const pages = await timeAsync('render', async () => renderSite(ctx));
	console.log(`  Rendered ${pages.length} pages`);

	// 6. Generate feeds
	const feeds = await timeAsync('feeds', async () => generateFeeds(ctx));
	console.log(`  Generated ${feeds.length} feed files`);

	// 7. Generate AI discovery files
	const aiFiles = await timeAsync('ai-discovery', async () => generateAiDiscovery(ctx));
	console.log(`  Generated ${aiFiles.length} AI discovery files`);

	// 8. Write all output files
	await timeAsync('write', async () => {
		const allOutputs = [...pages, ...feeds, ...aiFiles];
		await Promise.all(
			allOutputs.map(({ path, content }) => writeFile(join(config.outputDir, path), content)),
		);
	});

	// 9. Assets: copy static files and build CSS
	await timeAsync('assets', async () => {
		await Promise.all([
			copyStatic(config.staticDir, config.outputDir),
			copyStatic('public', config.outputDir),
			buildCSS(join(config.stylesDir, 'main.css'), join(config.outputDir, 'css')),
		]);
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
