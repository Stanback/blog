// Content Types
// Schema version for future migrations
export const SCHEMA_VERSION = 1 as const;

// ═══════════════════════════════════════════════════════════════════════════
// BOUNDED TAG SYSTEM
// Tags are constrained to known values for consistency and discoverability
// ═══════════════════════════════════════════════════════════════════════════

// Domain tags - what the content is about
export const DOMAIN_TAGS = [
	'building', // software, systems, making things
	'design', // UX, interfaces, aesthetics
	'ai', // agents, LLMs, the new world
	'architecture', // patterns, structure, systems thinking
	'mental-models', // frameworks, ways of seeing
	'leadership', // teams, management, growth
	'life', // parenting, personal, the human stuff
] as const;
export type DomainTag = (typeof DOMAIN_TAGS)[number];

// Format tags - what kind of content (optional)
export const FORMAT_TAGS = [
	'essay', // argued position
	'observation', // quick insight (notes default to this)
	'tutorial', // how-to
	'reflection', // looking back
] as const;
export type FormatTag = (typeof FORMAT_TAGS)[number];

// All valid tags
export const ALL_TAGS = [...DOMAIN_TAGS, ...FORMAT_TAGS] as const;
export type ValidTag = DomainTag | FormatTag;

// Helper to check if a tag is valid
export function isValidTag(tag: string): tag is ValidTag {
	return ALL_TAGS.includes(tag as ValidTag);
}

// ═══════════════════════════════════════════════════════════════════════════

export type ContentType =
	| 'post'
	| 'note'
	| 'photo'
	| 'page'
	| 'soul'
	| 'skills'
	| 'book'
	| 'chapter';

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

// Co-author info
export interface CoAuthor {
	name: string;
	emoji?: string;
	note?: string;
}

// Post - long-form content
export interface Post extends ContentItem {
	type: 'post';
	description: string; // Required for posts
	heroImage?: string;
	canonicalUrl?: string;
	series?: string;
	noIndex?: boolean;
	featured?: boolean; // For "Start Here" section on homepage
	coAuthors?: CoAuthor[]; // For collaborative posts

	// Voice fields (from VOICE.md)
	tension?: string;
	questions?: string[];
	constraints?: string[];
	tools?: string[];
}

// Note - short-form content
export interface Note extends ContentItem {
	type: 'note';
	heroImage?: string; // Optional hero image (mirrors Post)
}

// Photo - visual observation (not a photo dump, each one is intentional)
export interface Photo extends ContentItem {
	type: 'photo';
	image: string; // Required - the image path
	alt: string; // Required - accessibility description
	observation?: string; // The thought/insight this photo captures (shows below image)
	location?: string; // Where it was taken
	camera?: string; // What captured it
	settings?: string; // Technical details if relevant
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

// Chapter - part of a book
export interface Chapter extends ContentItem {
	type: 'chapter';
	bookSlug: string; // Parent book reference
	chapterNumber: number;
	chapterTitle: string;
}

// Book - collection of chapters
export interface Book {
	slug: string;
	title: string;
	author: string;
	description: string;
	genre?: string;
	status?: 'in-progress' | 'complete' | 'draft';
	date: Date;
	coverImage?: string;
	chapters: Chapter[];
	filepath: string;
}

// Union type for all content
export type Content = Post | Note | Photo | Page | Soul | Skills | Chapter;

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

// Graph node for knowledge graph visualization
export interface GraphNode {
	id: string;
	title: string;
	url: string;
	type: ContentType;
}

// Graph link for knowledge graph visualization
export interface GraphLink {
	source: string;
	target: string;
}

// Full graph data structure
export interface GraphData {
	nodes: GraphNode[];
	links: GraphLink[];
}

// Build context - passed to templates and renderers
export interface BuildContext {
	config: SiteConfig;
	posts: Post[];
	notes: Note[];
	photos: Photo[];
	pages: Page[];
	books: Book[];
	soul?: Soul;
	skills?: Skills;
	allContent: Content[];
	buildDate: Date;
	cssFilename?: string; // Hashed CSS filename (e.g., "styles.abc12345.css")
	backlinks: Map<string, Array<{ title: string; url: string }>>; // URL -> items that link to it
	graph: GraphData;
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
