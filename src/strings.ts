// UI microcopy - all user-facing strings in one place
// See VOICE.md for guidelines

export const strings = {
	// Navigation
	nav: {
		posts: 'Posts',
		notes: 'Notes',
		photos: 'Photos',
		projects: 'Projects',
		about: 'About',
		soul: 'Soul',
		skills: 'Skills',
		colophon: 'Colophon',
	},

	// Buttons
	buttons: {
		read: 'Read',
		continue: 'Continue',
		back: 'Back',
		next: 'Next',
		home: 'Home',
	},

	// Empty states
	empty: {
		posts: 'No posts yet. Check back soon.',
		notes: 'No notes yet. Check back soon.',
		photos: 'No photos yet. Check back soon.',
		tags: "Nothing here yet. That's allowed.",
	},

	// 404
	notFound: {
		title: 'Not found.',
		body: 'Either I moved it, or it never existed.',
		action: 'Try the homepage',
	},

	// Footer
	footer: {
		tagline: 'The workshop is open.',
		privacy: 'No tracking. No popups. Just pages.',
		links: {
			rss: 'RSS',
			sitemap: 'Sitemap',
			llms: 'llms.txt',
		},
	},

	// Meta
	meta: {
		siteName: 'bristanback.com',
		defaultDescription:
			'A digital atelier at the intersection of technology, design, and the human experience of building.',
		titleSeparator: ' | ',
	},

	// Homepage thesis (see THESIS.md for rationale and changelog)
	thesis: {
		headline: 'Software is no longer scarce. Judgment is.',
		body: 'I build systems, interfaces, and identities that survive AI abundance.',
	},

	// Homepage sections
	home: {
		startHere: 'Start Here',
		startHereDescription:
			"If you're new, these are the posts that best represent what I'm trying to do.",
		recentPosts: 'Recent Writing',
		recentNotes: 'Recent Notes',
	},

	// Accessibility
	a11y: {
		skipToContent: 'Skip to content',
		mainContent: 'Main content',
		navigation: 'Navigation',
		footer: 'Footer',
	},

	// Content labels
	labels: {
		readingTime: 'min read',
		published: 'Published',
		updated: 'Updated',
		tagged: 'Tagged',
		allPosts: 'All posts',
		allNotes: 'All notes',
		allPhotos: 'All photos',
	},

	// List page titles
	lists: {
		posts: 'Posts',
		notes: 'Notes',
		photos: 'Photos',
	},

	// llms.txt
	llmsTxt: {
		identity: `bristanback.com is a personal blog by Bri Stanback about building software,
design, parenting, and making sense of things in an AI-disrupted world.`,
	},
} as const;

// Type helper for accessing nested strings
export type Strings = typeof strings;
