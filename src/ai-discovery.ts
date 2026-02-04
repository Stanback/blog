// AI discovery files: llms.txt and llms-full.txt

import type { BuildContext } from './types.js';
import { formatDateISO } from './utils/dates.js';

// Generate llms.txt (AI crawler guidance with priority paths)
export function generateLlmsTxt(): string {
	return `# llms.txt - AI crawler guidance for bristanback.com
# https://llmstxt.org/

# Identity
> bristanback.com is a personal blog by Bri Stanback about building software,
> design, parenting, and making sense of things in an AI-disrupted world.

# Priority content (read these first)
/about/soul/
/about/skills/
/about/
/posts/

# All content
/notes/
/photos/
/colophon/

# Feeds
/rss.xml
/llms-full.txt

# Do not crawl
/drafts/
`;
}

// Generate llms-full.txt (full Markdown content export)
export function generateLlmsFullTxt(ctx: BuildContext): string {
	const sections: string[] = [];

	// Header
	sections.push('# bristanback.com - Full Content Export');
	sections.push(`Generated: ${formatDateISO(ctx.buildDate)}`);
	sections.push('');

	// Soul (if exists)
	if (ctx.soul && !ctx.soul.draft) {
		sections.push('## Soul');
		sections.push(ctx.soul.bodyMarkdown);
		sections.push('');
	}

	// Skills (if exists)
	if (ctx.skills && !ctx.skills.draft) {
		sections.push('## Skills');
		sections.push(ctx.skills.bodyMarkdown);
		sections.push('');
	}

	// About page
	const aboutPage = ctx.pages.find((p) => p.slug === 'about' && !p.draft);
	if (aboutPage) {
		sections.push('## About');
		sections.push(aboutPage.bodyMarkdown);
		sections.push('');
	}

	// Colophon page
	const colophonPage = ctx.pages.find((p) => p.slug === 'colophon' && !p.draft);
	if (colophonPage) {
		sections.push('## Colophon');
		sections.push(colophonPage.bodyMarkdown);
		sections.push('');
	}

	// Posts (newest first, exclude drafts)
	const publishedPosts = ctx.posts
		.filter((p) => !p.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	if (publishedPosts.length > 0) {
		sections.push('## Posts');
		sections.push('');
		for (const post of publishedPosts) {
			sections.push(`### ${post.title} (${formatDateISO(post.date)})`);
			sections.push(post.bodyMarkdown);
			sections.push('');
		}
	}

	// Notes (newest first, exclude drafts)
	const publishedNotes = ctx.notes
		.filter((n) => !n.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	if (publishedNotes.length > 0) {
		sections.push('## Notes');
		sections.push('');
		for (const note of publishedNotes) {
			sections.push(`### ${note.title} (${formatDateISO(note.date)})`);
			sections.push(note.bodyMarkdown);
			sections.push('');
		}
	}

	return sections.join('\n');
}

// Output type for AI discovery files
export interface AiDiscoveryOutput {
	path: string;
	content: string;
}

// Generate all AI discovery files
export function generateAiDiscovery(ctx: BuildContext): AiDiscoveryOutput[] {
	return [
		{ path: 'llms.txt', content: generateLlmsTxt() },
		{ path: 'llms-full.txt', content: generateLlmsFullTxt(ctx) },
	];
}
