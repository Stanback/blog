// Date formatting utilities

/**
 * Parses a date from various formats:
 * - Date object (pass through)
 * - String in YYYY-MM-DD format
 * - String in ISO format
 */
export function parseDate(value: unknown): Date | null {
	if (value instanceof Date) {
		return Number.isNaN(value.getTime()) ? null : value;
	}

	if (typeof value === 'string') {
		const date = new Date(value);
		return Number.isNaN(date.getTime()) ? null : date;
	}

	return null;
}

/**
 * Formats a date as YYYY-MM-DD (for URLs, filenames, RSS)
 */
export function formatDateISO(date: Date): string {
	return date.toISOString().split('T')[0];
}

/**
 * Formats a date for display (e.g., "February 3, 2026")
 */
export function formatDateLong(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

/**
 * Formats a date for compact display (e.g., "Feb 3, 2026")
 */
export function formatDateShort(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

/**
 * Formats a date for machine-readable contexts (ISO 8601)
 */
export function formatDateMachine(date: Date): string {
	return date.toISOString();
}

/**
 * Formats a date without year (e.g., "February 3") - for use when year is shown elsewhere
 */
export function formatDateNoYear(date: Date): string {
	return date.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
	});
}

/**
 * Formats a date for RSS (RFC 822)
 */
export function formatDateRSS(date: Date): string {
	return date.toUTCString();
}
