import { describe, expect, test } from 'bun:test';
import type { RawContentItem } from './types.js';
import { validateContent } from './validate.js';

function makeRawItem(
	overrides: Partial<RawContentItem['frontmatter']> & { slug?: string },
): RawContentItem {
	const { slug = 'test-slug', ...frontmatter } = overrides;
	return {
		filepath: '/test/content/posts/test.md',
		frontmatter: {
			title: 'Test Post',
			date: '2026-02-03',
			type: 'post',
			description: 'A test post',
			slug,
			...frontmatter,
		},
		bodyMarkdown: 'Test content here.',
	};
}

describe('validateContent', () => {
	test('validates valid post', () => {
		const items: RawContentItem[] = [makeRawItem({})];
		const result = validateContent(items);
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('Test Post');
		expect(result[0].type).toBe('post');
	});

	test('validates valid note (no description required)', () => {
		const items: RawContentItem[] = [
			makeRawItem({ type: 'note', description: undefined, slug: 'test-note' }),
		];
		const result = validateContent(items);
		expect(result).toHaveLength(1);
		expect(result[0].type).toBe('note');
	});

	test('validates valid page', () => {
		const items: RawContentItem[] = [
			makeRawItem({ type: 'page', description: undefined, slug: 'about' }),
		];
		const result = validateContent(items);
		expect(result).toHaveLength(1);
		expect(result[0].type).toBe('page');
	});

	test('fails on missing title', () => {
		const items: RawContentItem[] = [makeRawItem({ title: undefined })];
		expect(() => validateContent(items)).toThrow('1 validation error(s)');
	});

	test('fails on missing date', () => {
		const items: RawContentItem[] = [makeRawItem({ date: undefined })];
		expect(() => validateContent(items)).toThrow('1 validation error(s)');
	});

	test('fails on invalid date', () => {
		const items: RawContentItem[] = [makeRawItem({ date: 'not-a-date' })];
		expect(() => validateContent(items)).toThrow('1 validation error(s)');
	});

	test('fails on missing type', () => {
		const items: RawContentItem[] = [makeRawItem({ type: undefined })];
		expect(() => validateContent(items)).toThrow('1 validation error(s)');
	});

	test('fails on invalid type', () => {
		const items: RawContentItem[] = [makeRawItem({ type: 'invalid' as 'post' })];
		expect(() => validateContent(items)).toThrow('1 validation error(s)');
	});

	test('fails on post missing description', () => {
		const items: RawContentItem[] = [makeRawItem({ description: undefined })];
		expect(() => validateContent(items)).toThrow('1 validation error(s)');
	});

	test('fails on photo missing image', () => {
		const items: RawContentItem[] = [
			makeRawItem({
				type: 'photo',
				description: undefined,
				image: undefined,
				alt: 'Test alt',
				slug: 'test-photo',
			}),
		];
		expect(() => validateContent(items)).toThrow('1 validation error(s)');
	});

	test('fails on photo missing alt', () => {
		const items: RawContentItem[] = [
			makeRawItem({
				type: 'photo',
				description: undefined,
				image: '/images/test.jpg',
				alt: undefined,
				slug: 'test-photo',
			}),
		];
		expect(() => validateContent(items)).toThrow('1 validation error(s)');
	});

	test('fails on duplicate slugs within same type', () => {
		const items: RawContentItem[] = [
			makeRawItem({ slug: 'same-slug' }),
			makeRawItem({ slug: 'same-slug' }),
		];
		expect(() => validateContent(items)).toThrow('1 validation error(s)');
	});

	test('allows same slug across different types', () => {
		const items: RawContentItem[] = [
			makeRawItem({ type: 'post', slug: 'hello' }),
			makeRawItem({ type: 'note', description: undefined, slug: 'hello' }),
		];
		const result = validateContent(items);
		expect(result).toHaveLength(2);
	});

	test('calculates word count and reading time', () => {
		const items: RawContentItem[] = [
			{
				filepath: '/test/content/posts/test.md',
				frontmatter: {
					title: 'Test Post',
					date: '2026-02-03',
					type: 'post',
					description: 'A test post',
					slug: 'test-slug',
				},
				bodyMarkdown: 'This is a test. '.repeat(100), // 400 words
			},
		];
		const result = validateContent(items);
		expect(result[0].wordCount).toBe(400);
		expect(result[0].readingTime).toBe(2); // 400 / 200 = 2 minutes
	});

	test('validates tags as array of strings', () => {
		const items: RawContentItem[] = [makeRawItem({ tags: ['building', 'engineering'] })];
		const result = validateContent(items);
		expect(result[0].tags).toEqual(['building']);
	});

	test('fails on non-array tags', () => {
		const items: RawContentItem[] = [makeRawItem({ tags: 'not-an-array' as unknown as string[] })];
		expect(() => validateContent(items)).toThrow('1 validation error(s)');
	});

	test('validates soul type', () => {
		const items: RawContentItem[] = [
			makeRawItem({ type: 'soul', description: undefined, slug: 'soul' }),
		];
		const result = validateContent(items);
		expect(result[0].type).toBe('soul');
	});

	test('validates skills type', () => {
		const items: RawContentItem[] = [
			makeRawItem({ type: 'skills', description: undefined, slug: 'skills' }),
		];
		const result = validateContent(items);
		expect(result[0].type).toBe('skills');
	});
});
