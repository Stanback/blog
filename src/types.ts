// Content Types
// Schema version for future migrations
export const SCHEMA_VERSION = 1 as const;

export type ContentType = 'post' | 'note' | 'photo' | 'page' | 'soul' | 'skills';

// Base content item - all content shares these fields
export interface ContentItem {
	// Identity
	slug: string;
	type: ContentType;
	schemaVersion: typeof SCHEMA_VERSION;

	// Metadata
	title: string;
	date: Date;
	updated?: Date;
	draft: boolean;
	tags: string[];
	description?: string;

	// Content
	bodyMarkdown: string;
	html: string;

	// Computed
	readingTime?: number;
	wordCount?: number;

	// Source file (for error messages)
	filepath: string;
}

// Post - long-form content
export interface Post extends ContentItem {
	type: 'post';
	description: string; // Required for posts
	heroImage?: string;
	canonicalUrl?: string;
	series?: string;
	noIndex?: boolean;

	// Voice fields (from VOICE.md)
	tension?: string;
	questions?: string[];
	constraints?: string[];
	tools?: string[];
}

// Note - short-form content
export interface Note extends ContentItem {
	type: 'note';
}

// Photo - image with metadata
export interface Photo extends ContentItem {
	type: 'photo';
	image: string; // Required
	alt: string; // Required
	caption?: string;
	location?: string;
	camera?: string;
	settings?: string;
}

// Page - static pages like about, colophon
export interface Page extends ContentItem {
	type: 'page';
}

// Soul - identity manifesto
export interface Soul extends ContentItem {
	type: 'soul';
}

// Skills - capabilities manifest
export interface Skills extends ContentItem {
	type: 'skills';
}

// Union type for all content
export type Content = Post | Note | Photo | Page | Soul | Skills;

// Site configuration
export interface SiteConfig {
	// Identity
	title: string;
	description: string;
	url: string;
	language: string;

	// Author
	author: {
		name: string;
		email?: string;
		url?: string;
	};

	// Build
	contentDir: string;
	outputDir: string;
	staticDir: string;
	stylesDir: string;
}

// Build context - passed to templates and renderers
export interface BuildContext {
	config: SiteConfig;
	posts: Post[];
	notes: Note[];
	photos: Photo[];
	pages: Page[];
	soul?: Soul;
	skills?: Skills;
	allContent: Content[];
	buildDate: Date;
}

// Raw content item before validation
export interface RawContentItem {
	filepath: string;
	frontmatter: Record<string, unknown>;
	bodyMarkdown: string;
}

// Validated content item (type-narrowed after validation)
export interface ValidatedContentItem extends Omit<ContentItem, 'html'> {
	frontmatter: Record<string, unknown>;
}
