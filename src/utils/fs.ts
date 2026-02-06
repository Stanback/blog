// File system utilities

import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Recursively reads all files in a directory matching a pattern.
 * Returns absolute paths.
 */
export async function readDirRecursive(dir: string, pattern?: RegExp): Promise<string[]> {
	const files: string[] = [];

	async function walk(currentDir: string): Promise<void> {
		const entries = await readdir(currentDir, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = join(currentDir, entry.name);

			if (entry.isDirectory()) {
				await walk(fullPath);
			} else if (entry.isFile()) {
				if (!pattern || pattern.test(entry.name)) {
					files.push(fullPath);
				}
			}
		}
	}

	await walk(dir);
	return files;
}
