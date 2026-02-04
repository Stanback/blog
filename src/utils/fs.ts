// File system utilities

import { copyFile, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

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

/**
 * Ensures a directory exists, creating it recursively if needed.
 */
export async function ensureDir(dir: string): Promise<void> {
	await mkdir(dir, { recursive: true });
}

/**
 * Removes a directory and all its contents.
 */
export async function cleanDir(dir: string): Promise<void> {
	try {
		await rm(dir, { recursive: true, force: true });
	} catch {
		// Directory doesn't exist, that's fine
	}
}

/**
 * Writes content to a file, creating parent directories as needed.
 */
export async function writeFileWithDir(filepath: string, content: string): Promise<void> {
	await ensureDir(dirname(filepath));
	await writeFile(filepath, content, 'utf-8');
}

/**
 * Copies a file, creating parent directories as needed.
 */
export async function copyFileWithDir(src: string, dest: string): Promise<void> {
	await ensureDir(dirname(dest));
	await copyFile(src, dest);
}

/**
 * Copies all files from a source directory to a destination directory,
 * preserving directory structure.
 */
export async function copyStatic(srcDir: string, destDir: string): Promise<void> {
	try {
		const srcStat = await stat(srcDir);
		if (!srcStat.isDirectory()) {
			return;
		}
	} catch {
		// Source directory doesn't exist, skip
		return;
	}

	const files = await readDirRecursive(srcDir);

	await Promise.all(
		files.map(async (srcPath) => {
			const relativePath = relative(srcDir, srcPath);
			const destPath = join(destDir, relativePath);
			await copyFileWithDir(srcPath, destPath);
		}),
	);
}

/**
 * Output item for the build system.
 */
export interface OutputItem {
	path: string; // Relative path within dist (e.g., "posts/hello-world/index.html")
	content: string;
}

/**
 * Writes all output items to the destination directory.
 */
export async function writeOutput(items: OutputItem[], destDir: string): Promise<void> {
	await Promise.all(
		items.map(async (item) => {
			const fullPath = join(destDir, item.path);
			await writeFileWithDir(fullPath, item.content);
		}),
	);
}
