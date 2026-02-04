import { describe, expect, test } from 'bun:test';
import { resolveSlug, slugFromFilename, slugify } from './slugify.js';

describe('slugify', () => {
	test('handles basic strings', () => {
		expect(slugify('Hello World')).toBe('hello-world');
	});

	test('strips diacritics', () => {
		expect(slugify('Cafe au lait')).toBe('cafe-au-lait');
	});

	test('handles accented characters', () => {
		expect(slugify('Resume')).toBe('resume');
		expect(slugify('naive')).toBe('naive');
	});

	test('converts to lowercase', () => {
		expect(slugify('HELLO WORLD')).toBe('hello-world');
		expect(slugify('HeLLo WoRLd')).toBe('hello-world');
	});

	test('replaces spaces with hyphens', () => {
		expect(slugify('hello world')).toBe('hello-world');
		expect(slugify('hello   world')).toBe('hello-world');
	});

	test('replaces underscores with hyphens', () => {
		expect(slugify('hello_world')).toBe('hello-world');
	});

	test('removes special characters', () => {
		expect(slugify('hello! world?')).toBe('hello-world');
		expect(slugify('hello@world#test')).toBe('helloworldtest');
	});

	test('collapses multiple hyphens', () => {
		expect(slugify('hello---world')).toBe('hello-world');
		expect(slugify('hello - - world')).toBe('hello-world');
	});

	test('trims leading and trailing hyphens', () => {
		expect(slugify('-hello-world-')).toBe('hello-world');
		expect(slugify('  hello world  ')).toBe('hello-world');
	});

	test('handles empty strings', () => {
		expect(slugify('')).toBe('');
	});

	test('handles numbers', () => {
		expect(slugify('Hello World 2026')).toBe('hello-world-2026');
		expect(slugify('123 Test')).toBe('123-test');
	});
});

describe('slugFromFilename', () => {
	test('removes .md extension', () => {
		expect(slugFromFilename('hello-world.md')).toBe('hello-world');
	});

	test('handles dates in filenames', () => {
		expect(slugFromFilename('2026-02-03-hello-world.md')).toBe('hello-world');
	});

	test('slugifies the result', () => {
		expect(slugFromFilename('Quick Thought.md')).toBe('quick-thought');
		expect(slugFromFilename('2026-02-03-My Post Title.md')).toBe('my-post-title');
	});

	test('handles filenames without date prefix', () => {
		expect(slugFromFilename('about.md')).toBe('about');
		expect(slugFromFilename('my-page.md')).toBe('my-page');
	});
});

describe('resolveSlug', () => {
	test('uses frontmatter slug when provided', () => {
		expect(resolveSlug('custom-slug', '2026-02-03-other.md')).toBe('custom-slug');
	});

	test('falls back to filename when frontmatter slug is empty', () => {
		expect(resolveSlug('', '2026-02-03-hello-world.md')).toBe('hello-world');
		expect(resolveSlug(undefined, '2026-02-03-hello-world.md')).toBe('hello-world');
	});

	test('normalizes frontmatter slug', () => {
		expect(resolveSlug('My Custom Slug', 'other.md')).toBe('my-custom-slug');
	});

	test('handles whitespace-only frontmatter slug', () => {
		expect(resolveSlug('   ', 'hello-world.md')).toBe('hello-world');
	});
});
