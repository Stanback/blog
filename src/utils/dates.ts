// Date formatting utilities

/**
 * Parses a date from various formats:
 * - Date object (pass through)
 * - String in YYYY-MM-DD format (defaults to noon PT)
 * - String in YYYY-MM-DDTHH:MM format (assumes PT, 24-hour)
 * - String in full ISO format (with timezone)
 */
export function parseDate(value: unknown): Date | null {
	if (value instanceof Date) {
		return Number.isNaN(value.getTime()) ? null : value;
	}

	if (typeof value === 'string') {
		// Just a date (YYYY-MM-DD) — default to noon PT
		if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
			const date = new Date(`${value}T12:00:00-08:00`);
			return Number.isNaN(date.getTime()) ? null : date;
		}
		// Date with time but no timezone (YYYY-MM-DDTHH:MM) — assume PT
		if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) {
			const date = new Date(`${value}:00-08:00`);
			return Number.isNaN(date.getTime()) ? null : date;
		}
		// Full ISO or other format — parse as-is
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
