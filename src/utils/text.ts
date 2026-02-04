// Text processing utilities

/**
 * Average reading speed in words per minute.
 * Studies suggest 200-250 wpm for technical content.
 */
export const WORDS_PER_MINUTE = 200;

/**
 * Counts words in markdown content.
 * Strips code blocks, inline code, links, images, and markdown formatting.
 */
export function countWords(markdown: string): number {
	let text = markdown;

	// Remove code blocks
	text = text.replace(/```[\s\S]*?```/g, '');
	// Remove inline code
	text = text.replace(/`[^`]*`/g, '');
	// Remove images (before links to avoid partial match)
	text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, '');
	// Remove links but keep text
	text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
	// Remove HTML tags
	text = text.replace(/<[^>]+>/g, '');
	// Remove markdown formatting symbols
	text = text.replace(/[#*_~`>\-|]/g, '');
	// Normalize whitespace
	text = text.replace(/\s+/g, ' ').trim();

	if (!text) return 0;

	// Count words (must contain at least one word character)
	const words = text.split(/\s+/).filter((word) => word.length > 0 && /\w/.test(word));
	return words.length;
}

/**
 * Calculates reading time in minutes based on word count.
 * Returns at least 1 minute.
 */
export function calculateReadingTime(wordCount: number): number {
	return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
