// Content collection - reads all content from content/ directory

import { readFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import type { ContentType, RawContentItem } from './types.js';
import { readDirRecursive } from './utils/fs.js';
import { resolveSlug } from './utils/slugify.js';

/**
 * Parses YAML-style frontmatter from markdown content.
 * Expects format:
 * ---
 * key: value
 * ---
 * Content here
 */
function parseFrontmatter(content: string): {
	frontmatter: Record<string, unknown>;
	body: string;
} {
	const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

	if (!match) {
		return { frontmatter: {}, body: content };
	}

	const [, yamlBlock, body] = match;
	const frontmatter: Record<string, unknown> = {};

	// Simple YAML parser for frontmatter
	// Handles: strings, numbers, booleans, arrays, dates
	let currentKey = '';
	let inArray = false;
	const arrayValues: string[] = [];

	for (const line of yamlBlock.split('\n')) {
		const trimmed = line.trim();

		// Skip empty lines and comments
		if (!trimmed || trimmed.startsWith('#')) {
			continue;
		}

		// Array item
		if (trimmed.startsWith('- ') && inArray) {
			const value = trimmed.slice(2).trim();
			arrayValues.push(parseYamlValue(value) as string);
			continue;
		}

		// End of array (new key found)
		if (inArray && !trimmed.startsWith('- ')) {
			frontmatter[currentKey] = [...arrayValues];
			arrayValues.length = 0;
			inArray = false;
		}

		// Key-value pair
		const colonIndex = trimmed.indexOf(':');
		if (colonIndex > 0) {
			const key = trimmed.slice(0, colonIndex).trim();
			const rawValue = trimmed.slice(colonIndex + 1).trim();

			currentKey = key;

			// Empty value might start an array
			if (!rawValue) {
				inArray = true;
				continue;
			}

			// Inline array: [a, b, c]
			if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
				const items = rawValue
					.slice(1, -1)
					.split(',')
					.map((s) => parseYamlValue(s.trim()));
				frontmatter[key] = items;
				continue;
			}

			frontmatter[key] = parseYamlValue(rawValue);
		}
	}

	// Handle trailing array
	if (inArray && arrayValues.length > 0) {
		frontmatter[currentKey] = [...arrayValues];
	}

	return { frontmatter, body: body.trim() };
}

/**
 * Parses a single YAML value.
 */
function parseYamlValue(value: string): unknown {
	// Remove quotes if present
	if (
		(value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
	) {
		return value.slice(1, -1);
	}

	// Boolean
	if (value === 'true') return true;
	if (value === 'false') return false;

	// Null
	if (value === 'null' || value === '~') return null;

	// Number
	if (/^-?\d+$/.test(value)) return Number.parseInt(value, 10);
	if (/^-?\d+\.\d+$/.test(value)) return Number.parseFloat(value);

	// Date (YYYY-MM-DD)
	if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
		return value; // Keep as string, parseDate will handle it
	}

	// Plain string
	return value;
}

/**
 * Infers content type from directory path.
 */
function inferType(filepath: string): ContentType {
	const dir = dirname(filepath);

	if (dir.includes('/posts') || dir.endsWith('posts')) return 'post';
	if (dir.includes('/notes') || dir.endsWith('notes')) return 'note';
	if (dir.includes('/photos') || dir.endsWith('photos')) return 'photo';
	if (dir.includes('/pages') || dir.endsWith('pages')) return 'page';

	return 'page'; // Default
}

/**
 * Collects all markdown content from a directory.
 * Returns raw content items with parsed frontmatter.
 */
export async function collectContent(contentDir: string): Promise<RawContentItem[]> {
	const files = await readDirRecursive(contentDir, /\.md$/);
	const items: RawContentItem[] = [];

	for (const filepath of files) {
		const content = await readFile(filepath, 'utf-8');
		const { frontmatter, body } = parseFrontmatter(content);
		const filename = basename(filepath);

		// Type can be explicitly set in frontmatter or inferred from directory
		const type = (frontmatter.type as ContentType) || inferType(filepath);
		frontmatter.type = type;

		// Resolve slug using precedence rules
		const slug = resolveSlug(frontmatter.slug as string | undefined, filename);

		items.push({
			filepath,
			frontmatter: { ...frontmatter, slug },
			bodyMarkdown: body,
		});
	}

	return items;
}
