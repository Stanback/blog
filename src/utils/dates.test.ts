import { describe, expect, test } from 'bun:test';
import { formatDateISO, formatDateLong, formatDateMachine, parseDate } from './dates.js';

describe('parseDate', () => {
	test('parses Date objects', () => {
		const date = new Date('2026-02-03');
		const result = parseDate(date);
		expect(result).toBeInstanceOf(Date);
		expect(result?.toISOString()).toContain('2026-02-03');
	});

	test('parses YYYY-MM-DD strings', () => {
		const result = parseDate('2026-02-03');
		expect(result).toBeInstanceOf(Date);
		expect(result?.toISOString()).toContain('2026-02-03');
	});

	test('parses ISO strings', () => {
		const result = parseDate('2026-02-03T12:00:00Z');
		expect(result).toBeInstanceOf(Date);
		expect(result?.toISOString()).toBe('2026-02-03T12:00:00.000Z');
	});

	test('returns null for invalid dates', () => {
		expect(parseDate('not-a-date')).toBeNull();
		expect(parseDate('')).toBeNull();
		expect(parseDate(null)).toBeNull();
		expect(parseDate(undefined)).toBeNull();
		expect(parseDate(123)).toBeNull();
	});

	test('returns null for invalid Date objects', () => {
		expect(parseDate(new Date('invalid'))).toBeNull();
	});
});

describe('formatDateISO', () => {
	test('formats date as YYYY-MM-DD', () => {
		const date = new Date('2026-02-03T12:00:00Z');
		expect(formatDateISO(date)).toBe('2026-02-03');
	});
});

describe('formatDateLong', () => {
	test('formats date as "Month Day, Year"', () => {
		const date = new Date('2026-02-03T12:00:00Z');
		expect(formatDateLong(date)).toBe('February 3, 2026');
	});
});

describe('formatDateMachine', () => {
	test('formats date as ISO 8601', () => {
		const date = new Date('2026-02-03T12:00:00Z');
		expect(formatDateMachine(date)).toBe('2026-02-03T12:00:00.000Z');
	});
});
