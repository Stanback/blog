/**
 * Markdown parsing with marked + Shiki syntax highlighting.
 * Includes callout component support and reading time calculation.
 */

import { Marked, type MarkedExtension, type Tokens } from 'marked';
import { type Highlighter, createHighlighter } from 'shiki';
import { calculateReadingTime, countWords } from './utils/text.js';

// ============================================================================
// Types
// ============================================================================

export interface ParseResult {
	html: string;
	wordCount: number;
	readingTime: number; // minutes
}

type CalloutType = 'aside' | 'constraints' | 'lens';

// Wikilink resolver - maps titles to URLs
// This gets populated from the build context
let wikilinkResolver: Map<string, string> = new Map();

export function setWikilinkResolver(resolver: Map<string, string>): void {
	wikilinkResolver = resolver;
}

// Extract wikilinks from content (for building the graph)
export function extractWikilinks(content: string): string[] {
	const matches = content.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g);
	return [...matches].map((m) => m[1].trim());
}

// ============================================================================
// Shiki Highlighter (cached singleton)
// ============================================================================

let highlighter: Highlighter | null = null;

const SUPPORTED_LANGUAGES = [
	'typescript',
	'javascript',
	'html',
	'css',
	'yaml',
	'json',
	'bash',
	'markdown',
] as const;

async function getShikiHighlighter(): Promise<Highlighter> {
	if (!highlighter) {
		highlighter = await createHighlighter({
			themes: ['rose-pine-dawn', 'rose-pine'],
			langs: [...SUPPORTED_LANGUAGES],
		});
	}
	return highlighter;
}

// ============================================================================
// Callout Extension
// ============================================================================

const CALLOUT_PATTERN = /^\[!(\w+)\]\s*/;

function parseCalloutType(text: string): { type: CalloutType; content: string } | null {
	const match = text.match(CALLOUT_PATTERN);
	if (!match) return null;

	const type = match[1].toLowerCase();
	if (type !== 'aside' && type !== 'constraints' && type !== 'lens') {
		return null;
	}

	const content = text.slice(match[0].length);
	return { type, content };
}

function createCalloutExtension(): MarkedExtension {
	return {
		renderer: {
			blockquote(token: Tokens.Blockquote): string | false {
				// Get the raw text content to check for callout syntax
				const firstToken = token.tokens[0];
				if (!firstToken || firstToken.type !== 'paragraph') {
					return false; // Let default renderer handle it
				}

				const paragraphToken = firstToken as Tokens.Paragraph;
				const firstText = paragraphToken.tokens[0];
				if (!firstText || firstText.type !== 'text') {
					return false;
				}

				const parsed = parseCalloutType(firstText.raw);
				if (!parsed) {
					return false; // Not a callout, use default blockquote
				}

				// Reconstruct the content without the callout marker
				// Replace the first text token's content
				const modifiedTokens = [...paragraphToken.tokens];
				modifiedTokens[0] = {
					...firstText,
					raw: parsed.content,
					text: parsed.content,
				};

				// Parse the remaining content
				const innerMarked = new Marked();
				const innerContent = modifiedTokens
					.map((t) => {
						if ('text' in t) return t.text;
						if ('raw' in t) return t.raw;
						return '';
					})
					.join('');

				// Handle remaining tokens in the blockquote (if any)
				const remainingTokens = token.tokens.slice(1);
				const remainingContent = remainingTokens
					.map((t) => {
						if ('text' in t) return t.text;
						if ('raw' in t) return t.raw;
						return '';
					})
					.join('\n\n');

				const fullContent = innerContent + (remainingContent ? `\n\n${remainingContent}` : '');
				const renderedContent = innerMarked.parseInline(fullContent);

				return `<aside class="callout callout-${parsed.type}" role="note">\n<p>${renderedContent}</p>\n</aside>\n`;
			},
		},
	};
}

// Word count and reading time use shared utilities from utils/text.ts

// ============================================================================
// Wikilink Extension — [[Title]] or [[Title|display text]]
// ============================================================================

function createWikilinkExtension(): MarkedExtension {
	return {
		extensions: [
			{
				name: 'wikilink',
				level: 'inline',
				start(src: string) {
					return src.indexOf('[[');
				},
				tokenizer(src: string) {
					const match = src.match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
					if (match) {
						return {
							type: 'wikilink',
							raw: match[0],
							title: match[1].trim(),
							display: match[2]?.trim() || match[1].trim(),
						};
					}
					return undefined;
				},
				renderer(token) {
					const t = token as unknown as { title: string; display: string };
					const url = wikilinkResolver.get(t.title.toLowerCase());
					if (url) {
						return `<a href="${url}" class="wikilink">${t.display}</a>`;
					}
					// Unresolved link - show as broken
					return `<span class="wikilink wikilink-broken" title="Link not found">${t.display}</span>`;
				},
			},
		],
	};
}

// ============================================================================
// Main Parse Function
// ============================================================================

export async function parseMarkdown(content: string): Promise<ParseResult> {
	const shiki = await getShikiHighlighter();

	const marked = new Marked();

	// Configure marked with Shiki highlighting
	marked.use({
		async: true,
		renderer: {
			// Wrap tables in scrollable container for mobile
			table(token: Tokens.Table): string {
				const header = token.header
					.map((cell) => `<th>${cell.tokens.map((t) => ('text' in t ? t.text : '')).join('')}</th>`)
					.join('');
				const rows = token.rows
					.map(
						(row) =>
							`<tr>${row.map((cell) => `<td>${cell.tokens.map((t) => ('text' in t ? t.text : '')).join('')}</td>`).join('')}</tr>`,
					)
					.join('');
				return `<div class="table-scroll"><table><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table></div>`;
			},
			code(token: Tokens.Code): string {
				const lang = token.lang || '';
				const code = token.text;

				try {
					// Check if language is supported
					const loadedLangs = shiki.getLoadedLanguages();
					if (lang && loadedLangs.includes(lang)) {
						// Use dual themes with CSS variables for light/dark mode
						return shiki.codeToHtml(code, {
							lang,
							themes: {
								light: 'rose-pine-dawn',
								dark: 'rose-pine',
							},
							defaultColor: false, // Use CSS variables
						});
					}
				} catch {
					// Fall through to plain code block
				}

				// Fallback for unknown or missing language
				const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
				return `<pre><code>${escaped}</code></pre>`;
			},
		},
	});

	// Add callout extension
	marked.use(createCalloutExtension());

	// Add wikilink extension
	marked.use(createWikilinkExtension());

	// Calculate word count before parsing (from raw markdown)
	const wordCount = countWords(content);
	const readingTime = calculateReadingTime(wordCount);

	// Parse markdown to HTML
	const html = await marked.parse(content);

	return {
		html,
		wordCount,
		readingTime,
	};
}

// ============================================================================
// Batch Parsing (for efficiency)
// ============================================================================

export async function parseAllMarkdown(
	contents: Array<{ slug: string; content: string }>,
): Promise<Map<string, ParseResult>> {
	// Initialize highlighter once before processing all files
	await getShikiHighlighter();

	const results = new Map<string, ParseResult>();

	for (const { slug, content } of contents) {
		const result = await parseMarkdown(content);
		results.set(slug, result);
	}

	return results;
}
