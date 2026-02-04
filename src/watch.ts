/**
 * Dev watcher
 * Watches content/, styles/, static/, src/ and triggers full rebuild on change
 */

import { type FSWatcher, watch } from 'node:fs';
import { build } from './build.js';

const DEBOUNCE_MS = 100;
const WATCH_PATHS = ['content', 'styles', 'static', 'src'];

let timeout: ReturnType<typeof setTimeout> | null = null;
let isBuilding = false;

function rebuild(): void {
	if (timeout) clearTimeout(timeout);

	timeout = setTimeout(async () => {
		if (isBuilding) return;
		isBuilding = true;

		console.clear();
		console.log('File changed. Rebuilding...\n');

		try {
			await build();
			console.log('Watching for changes...');
		} catch (err) {
			console.error('Build error:', err);
		} finally {
			isBuilding = false;
		}
	}, DEBOUNCE_MS);
}

async function main(): Promise<void> {
	console.log('Starting dev watcher...\n');

	// Initial build
	try {
		await build();
	} catch (err) {
		console.error('Initial build failed:', err);
	}

	console.log('Watching for changes...');

	// Set up watchers
	const watchers: FSWatcher[] = [];

	for (const dir of WATCH_PATHS) {
		try {
			const watcher = watch(dir, { recursive: true }, (event, filename) => {
				// Ignore common noise
				if (filename?.endsWith('.swp')) return;
				if (filename?.startsWith('.')) return;

				rebuild();
			});
			watchers.push(watcher);
		} catch (err) {
			// Directory might not exist yet, that's ok
			console.warn(`Warning: Could not watch ${dir}:`, err);
		}
	}

	// Handle graceful shutdown
	process.on('SIGINT', () => {
		console.log('\nShutting down...');
		for (const watcher of watchers) {
			watcher.close();
		}
		process.exit(0);
	});
}

main();
