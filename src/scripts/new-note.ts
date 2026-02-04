/**
 * Scaffold a new note with minimal template
 * Usage: bun run new:note [title]
 */

import { existsSync } from 'node:fs';
import { join } from 'node:path';

const NOTES_DIR = 'content/notes';

function formatDate(date: Date): string {
	return date.toISOString().split('T')[0];
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '') // Remove diacritics
		.replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
		.replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
}

function generateTemplate(title: string, date: string): string {
	return `---
title: "${title}"
date: ${date}
type: note
schemaVersion: 1
draft: true
tags: []
---

*One sharp point.*

`;
}

async function prompt(message: string): Promise<string> {
	process.stdout.write(message);
	for await (const line of console) {
		return line.trim();
	}
	return '';
}

async function main(): Promise<void> {
	// Get title from argument or prompt
	let title = process.argv[2];

	if (!title) {
		title = await prompt('Note title: ');
	}

	if (!title) {
		console.error('Error: Title is required');
		process.exit(1);
	}

	const date = formatDate(new Date());
	const slug = slugify(title);
	const filename = `${slug}.md`;
	const filepath = join(NOTES_DIR, filename);

	// Check if file already exists
	if (existsSync(filepath)) {
		console.error(`Error: File already exists: ${filepath}`);
		process.exit(1);
	}

	// Ensure directory exists
	const { mkdir } = await import('node:fs/promises');
	await mkdir(NOTES_DIR, { recursive: true });

	// Generate and write the file
	const content = generateTemplate(title, date);
	await Bun.write(filepath, content);

	console.log(`Created: ${filepath}`);
}

main().catch((err) => {
	console.error('Error:', err);
	process.exit(1);
});
