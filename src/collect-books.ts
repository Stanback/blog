/**
 * Book collection - reads book.yaml + chapters from content/books/
 */

import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import YAML from 'yaml';
import { parseMarkdown } from './parse.js';
import type { Book, Chapter } from './types.js';

interface BookManifest {
	title: string;
	author: string;
	description: string;
	genre?: string;
	status?: 'in-progress' | 'complete' | 'draft';
	date: string;
	coverImage?: string;
}

/**
 * Extract chapter number from folder name like "Chapter 001"
 */
function parseChapterNumber(folderName: string): number {
	const match = folderName.match(/Chapter\s*(\d+)/i);
	return match ? Number.parseInt(match[1], 10) : 0;
}

/**
 * Extract chapter title from the first H1 in markdown
 */
function extractChapterTitle(markdown: string): string {
	const match = markdown.match(/^#\s*\**([^*\n]+)\**/m);
	return match ? match[1].trim() : 'Untitled';
}

/**
 * Parse optional frontmatter from chapter markdown
 * Returns { draft: boolean, content: string (markdown without frontmatter) }
 */
function parseChapterFrontmatter(markdown: string): { draft: boolean; content: string } {
	const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!frontmatterMatch) {
		return { draft: false, content: markdown };
	}

	const frontmatter = YAML.parse(frontmatterMatch[1]) as { draft?: boolean };
	return {
		draft: frontmatter.draft === true,
		content: frontmatterMatch[2],
	};
}

/**
 * Create a slug from chapter number
 */
function chapterSlug(chapterNum: number): string {
	return `chapter-${chapterNum}`;
}

/**
 * Collect all books from content/books/
 */
export async function collectBooks(booksDir: string): Promise<Book[]> {
	if (!existsSync(booksDir)) {
		return [];
	}

	const books: Book[] = [];
	const bookFolders = await readdir(booksDir, { withFileTypes: true });

	for (const folder of bookFolders) {
		if (!folder.isDirectory()) continue;

		const bookPath = join(booksDir, folder.name);
		const manifestPath = join(bookPath, 'book.yaml');

		// Skip if no book.yaml
		if (!existsSync(manifestPath)) {
			console.warn(`  Skipping ${folder.name}: no book.yaml found`);
			continue;
		}

		// Read manifest
		const manifestContent = await readFile(manifestPath, 'utf-8');
		const manifest = YAML.parse(manifestContent) as BookManifest;

		// Collect chapters
		const chaptersDir = join(bookPath, 'chapters');
		const chapters: Chapter[] = [];

		if (existsSync(chaptersDir)) {
			const chapterFolders = await readdir(chaptersDir, { withFileTypes: true });

			for (const chapterFolder of chapterFolders) {
				if (!chapterFolder.isDirectory()) continue;

				const chapterPath = join(chaptersDir, chapterFolder.name);
				const chapterFiles = await readdir(chapterPath);
				const mdFile = chapterFiles.find((f) => f.endsWith('.md'));

				if (!mdFile) continue;

				const mdPath = join(chapterPath, mdFile);
				const rawMdContent = await readFile(mdPath, 'utf-8');
				const { draft: chapterDraft, content: mdContent } = parseChapterFrontmatter(rawMdContent);
				const chapterNum = parseChapterNumber(chapterFolder.name);
				const chapterTitle = extractChapterTitle(mdContent);

				// Parse markdown to HTML
				const { html, wordCount, readingTime } = await parseMarkdown(mdContent);

				// Fix image paths - make them relative to /books/[book-slug]/
				const fixedHtml = html.replace(
					/src="\.\/([^"]+)"/g,
					`src="/books/${folder.name}/chapters/${chapterFolder.name}/$1"`,
				);

				chapters.push({
					slug: chapterSlug(chapterNum),
					type: 'chapter',
					schemaVersion: 1,
					title: chapterTitle,
					date: new Date(manifest.date),
					draft: chapterDraft,
					tags: [],
					bodyMarkdown: mdContent,
					html: fixedHtml,
					readingTime,
					wordCount,
					filepath: mdPath,
					bookSlug: folder.name,
					chapterNumber: chapterNum,
					chapterTitle,
				});
			}
		}

		// Sort chapters by number
		chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);

		books.push({
			slug: folder.name,
			title: manifest.title,
			author: manifest.author,
			description: manifest.description,
			genre: manifest.genre,
			status: manifest.status,
			date: new Date(manifest.date),
			coverImage: manifest.coverImage,
			chapters,
			filepath: manifestPath,
		});
	}

	return books;
}
