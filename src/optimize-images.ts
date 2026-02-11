/**
 * Image optimization script
 * Converts PNG/JPG images to WebP format for better compression
 * Run as part of build or manually: bun run src/optimize-images.ts
 */

import { mkdir, readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const STATIC_DIR = 'static';
const IMAGE_DIRS = ['images/posts', 'images/photos', 'images'];
const QUALITY = 85;
const SKIP_IF_EXISTS = true; // Don't regenerate if WebP already exists

interface OptimizeResult {
	file: string;
	originalSize: number;
	webpSize: number;
	savings: number;
	skipped?: boolean;
}

async function findImages(dir: string): Promise<string[]> {
	const images: string[] = [];

	try {
		const entries = await readdir(dir, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = join(dir, entry.name);

			if (entry.isDirectory()) {
				images.push(...(await findImages(fullPath)));
			} else if (entry.isFile()) {
				const ext = entry.name.toLowerCase();
				if (ext.endsWith('.png') || ext.endsWith('.jpg') || ext.endsWith('.jpeg')) {
					images.push(fullPath);
				}
			}
		}
	} catch {
		// Directory doesn't exist, skip
	}

	return images;
}

async function optimizeImage(imagePath: string): Promise<OptimizeResult | null> {
	const { dir, name } = parse(imagePath);
	const webpPath = join(dir, `${name}.webp`);

	// Check if WebP already exists and is newer than source
	if (SKIP_IF_EXISTS) {
		try {
			const [srcStat, webpStat] = await Promise.all([stat(imagePath), stat(webpPath)]);

			if (webpStat.mtime >= srcStat.mtime) {
				return {
					file: imagePath,
					originalSize: srcStat.size,
					webpSize: webpStat.size,
					savings: Math.round((1 - webpStat.size / srcStat.size) * 100),
					skipped: true,
				};
			}
		} catch {
			// WebP doesn't exist, continue with conversion
		}
	}

	try {
		const srcStat = await stat(imagePath);
		const originalSize = srcStat.size;

		// Convert to WebP
		await sharp(imagePath).webp({ quality: QUALITY }).toFile(webpPath);

		const webpStat = await stat(webpPath);
		const webpSize = webpStat.size;
		const savings = Math.round((1 - webpSize / originalSize) * 100);

		return {
			file: imagePath,
			originalSize,
			webpSize,
			savings,
		};
	} catch (err) {
		console.error(`  ✗ Failed to optimize ${imagePath}:`, err);
		return null;
	}
}

function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export async function optimizeImages(): Promise<void> {
	console.log('Optimizing images...\n');

	const allImages: string[] = [];

	for (const imageDir of IMAGE_DIRS) {
		const dir = join(STATIC_DIR, imageDir);
		const images = await findImages(dir);
		allImages.push(...images);
	}

	if (allImages.length === 0) {
		console.log('  No images found to optimize.\n');
		return;
	}

	const results: OptimizeResult[] = [];
	let totalOriginal = 0;
	let totalWebp = 0;
	let converted = 0;
	let skipped = 0;

	for (const image of allImages) {
		const result = await optimizeImage(image);
		if (result) {
			results.push(result);
			totalOriginal += result.originalSize;
			totalWebp += result.webpSize;

			if (result.skipped) {
				skipped++;
			} else {
				converted++;
				console.log(
					`  ✓ ${image.replace(`${STATIC_DIR}/`, '')} → WebP (${result.savings}% smaller)`,
				);
			}
		}
	}

	console.log(`\n  Converted: ${converted} images`);
	if (skipped > 0) console.log(`  Skipped: ${skipped} (already optimized)`);
	console.log(`  Total: ${formatBytes(totalOriginal)} → ${formatBytes(totalWebp)}`);
	console.log(
		`  Savings: ${formatBytes(totalOriginal - totalWebp)} (${Math.round((1 - totalWebp / totalOriginal) * 100)}%)\n`,
	);
}

// Run if called directly
if (import.meta.main) {
	await optimizeImages();
}
