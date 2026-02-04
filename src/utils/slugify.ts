// Slug generation with precedence: frontmatter > filename
// Normalized: lowercase, hyphenated, ASCII-only

/**
 * Converts a string to a URL-safe slug.
 * - Strips diacritics (e.g., "Cafe" from "Cafe")
 * - Converts to lowercase
 * - Replaces spaces and underscores with hyphens
 * - Removes non-alphanumeric characters (except hyphens)
 * - Collapses multiple hyphens
 * - Trims leading/trailing hyphens
 */
export function slugify(input: string): string {
	return (
		input
			// Normalize unicode and strip diacritics
			.normalize('NFD')
			.replace(/\p{Diacritic}/gu, '')
			// Convert to lowercase
			.toLowerCase()
			// Replace spaces and underscores with hyphens
			.replace(/[\s_]+/g, '-')
			// Remove non-alphanumeric characters (keep hyphens)
			.replace(/[^a-z0-9-]/g, '')
			// Collapse multiple hyphens
			.replace(/-+/g, '-')
			// Trim leading/trailing hyphens
			.replace(/^-|-$/g, '')
	);
}

/**
 * Extracts slug from filename, stripping date prefix if present.
 * Examples:
 * - "2026-02-03-hello-world.md" -> "hello-world"
 * - "hello-world.md" -> "hello-world"
 * - "Quick Thought.md" -> "quick-thought"
 */
export function slugFromFilename(filename: string): string {
	// Remove extension
	const withoutExt = filename.replace(/\.md$/, '');

	// Strip date prefix (YYYY-MM-DD-)
	const withoutDate = withoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, '');

	return slugify(withoutDate);
}

/**
 * Resolves slug using precedence rules:
 * 1. Explicit slug in frontmatter (if present and non-empty)
 * 2. Derived from filename
 */
export function resolveSlug(frontmatterSlug: string | undefined, filename: string): string {
	if (frontmatterSlug?.trim()) {
		return slugify(frontmatterSlug);
	}
	return slugFromFilename(filename);
}
