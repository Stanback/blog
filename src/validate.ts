// Content validation - validates content against schema, fails fast with clear errors

import {
	CANONICAL_TAGS,
	normalizeTag,
	type ContentType,
	type RawContentItem,
	type SCHEMA_VERSION,
	type ValidatedContentItem,
} from './types.js';
import { parseDate } from './utils/dates.js';
import { calculateReadingTime, countWords } from './utils/text.js';

const VALID_TYPES: ContentType[] = ['post', 'note', 'photo', 'page', 'soul', 'skills'];

interface ValidationError {
	filepath: string;
	message: string;
}

/**
 * Validates all content items against schema.
 * Fails fast with clear error messages.
 * @throws Error if validation fails
 */
export function validateContent(items: RawContentItem[]): ValidatedContentItem[] {
	const errors: ValidationError[] = [];
	const slugsByType = new Map<ContentType, Set<string>>();

	const validated: ValidatedContentItem[] = [];

	for (const item of items) {
		const itemErrors = validateItem(item, slugsByType);
		errors.push(...itemErrors);

		if (itemErrors.length === 0) {
			validated.push(toValidatedItem(item));
		}
	}

	if (errors.length > 0) {
		console.error('\nValidation errors:');
		for (const error of errors) {
			console.error(`  ${error.filepath}: ${error.message}`);
		}
		console.error('');
		throw new Error(`${errors.length} validation error(s)`);
	}

	return validated;
}

/**
 * Validates a single content item.
 */
function validateItem(
	item: RawContentItem,
	slugsByType: Map<ContentType, Set<string>>,
): ValidationError[] {
	const errors: ValidationError[] = [];
	const { filepath, frontmatter } = item;

	// Required: title
	if (!frontmatter.title || typeof frontmatter.title !== 'string') {
		errors.push({ filepath, message: 'missing or invalid title' });
	}

	// Required: date
	const date = parseDate(frontmatter.date);
	if (!date) {
		errors.push({ filepath, message: 'missing or invalid date' });
	}

	// Required: type (must be valid)
	const type = frontmatter.type as ContentType | undefined;
	if (!type || !VALID_TYPES.includes(type)) {
		errors.push({
			filepath,
			message: `invalid type "${type}" (must be one of: ${VALID_TYPES.join(', ')})`,
		});
	}

	// Type-specific validation
	if (type === 'post') {
		if (!frontmatter.description || typeof frontmatter.description !== 'string') {
			errors.push({ filepath, message: 'posts require description' });
		}
	}

	if (type === 'photo') {
		if (!frontmatter.image || typeof frontmatter.image !== 'string') {
			errors.push({ filepath, message: 'photos require image' });
		}
		if (!frontmatter.alt || typeof frontmatter.alt !== 'string') {
			errors.push({ filepath, message: 'photos require alt text' });
		}
	}

	// Slug validation and uniqueness (only check if we have a valid type)
	if (type && VALID_TYPES.includes(type)) {
		const slug = frontmatter.slug;
		if (typeof slug !== 'string' || !slug) {
			errors.push({ filepath, message: 'missing or invalid slug' });
		} else {
			const typeSet = slugsByType.get(type) ?? new Set<string>();

			if (typeSet.has(slug)) {
				errors.push({
					filepath,
					message: `duplicate slug "${slug}" for type "${type}"`,
				});
			}

			typeSet.add(slug);
			slugsByType.set(type, typeSet);
		}
	}

	// Optional: updated date validation
	if (frontmatter.updated !== undefined) {
		const updated = parseDate(frontmatter.updated);
		if (!updated) {
			errors.push({ filepath, message: 'invalid updated date' });
		}
	}

	// Optional: schemaVersion validation
	if (frontmatter.schemaVersion !== undefined && frontmatter.schemaVersion !== 1) {
		errors.push({
			filepath,
			message: `unsupported schemaVersion "${frontmatter.schemaVersion}" (expected 1)`,
		});
	}

	// Optional: tags validation (must be array of strings)
	if (frontmatter.tags !== undefined) {
		if (!Array.isArray(frontmatter.tags)) {
			errors.push({ filepath, message: 'tags must be an array' });
		} else {
			for (const tag of frontmatter.tags) {
				if (typeof tag !== 'string') {
					errors.push({ filepath, message: 'tags must be strings' });
					break;
				}
				if (!normalizeTag(tag)) {
					errors.push({
						filepath,
						message: `invalid tag "${tag}" (must be canonical or known alias: ${CANONICAL_TAGS.join(', ')})`,
					});
				}
			}
		}
	}

	return errors;
}

/**
 * Converts a raw content item to a validated content item.
 * Called only after validateItem passes, so we can trust the types.
 */
function toValidatedItem(item: RawContentItem): ValidatedContentItem {
	const { filepath, frontmatter, bodyMarkdown } = item;

	// These casts are safe because validateItem already verified the types
	const date = parseDate(frontmatter.date) as Date;
	const updated = frontmatter.updated ? (parseDate(frontmatter.updated) as Date) : undefined;

	// Calculate word count and reading time using shared utilities
	const wordCount = countWords(bodyMarkdown);
	const readingTime = calculateReadingTime(wordCount);
	const normalizedTags = [...new Set(((frontmatter.tags as string[] | undefined) ?? []).map((tag) => normalizeTag(tag)).filter((tag): tag is NonNullable<typeof tag> => tag !== null))];

	return {
		filepath,
		slug: frontmatter.slug as string,
		type: frontmatter.type as ContentType,
		schemaVersion: 1 as typeof SCHEMA_VERSION,
		title: frontmatter.title as string,
		date,
		updated,
		draft: (frontmatter.draft as boolean) ?? false,
		tags: normalizedTags,
		description: frontmatter.description as string | undefined,
		bodyMarkdown,
		wordCount,
		readingTime,
		frontmatter,
	};
}
