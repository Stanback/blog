// Content Types
// Schema version for future migrations
export const SCHEMA_VERSION = 1 as const;

// Table of contents entry
export interface TocEntry {
	id: string;
	text: string;
	depth: number; // 2 or 3
}

// Related content reference
export interface RelatedPost {
	slug: string;
	title: string;
	url: string;
	description?: string;
	score: number; // similarity score for sorting
}

// Canonical tag system
// Tags are normalized to keep taxonomy consistent across content.
export const CANONICAL_TAGS = [
	'aerial',
	'ai',
	'architecture',
	'building',
	'craft',
	'creativity',
	'culture',
	'design',
	'education',
	'epistemology',
	'identity',
	'judgment',
	'landscape',
	'leadership',
	'life',
	'mental-models',
	'night',
	'observation',
	'photography',
	'reflection',
	'systems',
	'tools',
	'travel',
	'tutorial',
	'urban',
] as const;
export type CanonicalTag = (typeof CANONICAL_TAGS)[number];

// Non-canonical tags that should collapse to canonical taxonomy.
const TAG_ALIASES: Record<string, CanonicalTag> = {
	constraints: 'architecture',
	engineering: 'building',
	interfaces: 'design',
	meta: 'reflection',
	parenting: 'life',
	philosophy: 'mental-models',
	talk: 'reflection',
};

export function normalizeTag(tag: string): CanonicalTag | null {
	const normalized = tag.trim().toLowerCase();
	if (!normalized) return null;
	if ((CANONICAL_TAGS as readonly string[]).includes(normalized)) {
		return normalized as CanonicalTag;
	}
	return TAG_ALIASES[normalized] ?? null;
}

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
	toc?: TocEntry[]; // Table of contents entries (h2/h3)
	relatedPosts?: RelatedPost[]; // Related posts by tag similarity

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
	preface?: string; // 1-2 sentence orientation, rendered in italics before first paragraph
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
		sameAs?: string[];
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
	backlinks: Map<string, Array<{ title: string; url: string; description?: string; date?: Date }>>; // URL -> items that link to it
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
