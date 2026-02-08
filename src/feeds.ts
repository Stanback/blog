// Feed generation: RSS, sitemap, robots.txt

import { config } from './config.js';
import { getUrl, isoDate } from './render.js';
import type { BuildContext, Note, Post } from './types.js';

// Escape XML special characters
function escapeXml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

// Generate RSS feed (posts and notes, exclude drafts)
export function generateRss(ctx: BuildContext): string {
	const items: (Post | Note)[] = [
		...ctx.posts.filter((p) => !p.draft),
		...ctx.notes.filter((n) => !n.draft),
	].sort((a, b) => b.date.getTime() - a.date.getTime());

	const lastBuildDate = items.length > 0 ? items[0].date : ctx.buildDate;

	const rssItems = items
		.map((item) => {
			const url = `${config.url}${getUrl(item)}`;
			const description =
				item.description || (item.type === 'note' ? item.bodyMarkdown.slice(0, 200) : '');

			return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
		})
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(config.title)}</title>
    <link>${config.url}</link>
    <description>${escapeXml(config.description)}</description>
    <language>${config.language}</language>
    <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
    <atom:link href="${config.url}/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;
}

// Generate sitemap.xml (all non-draft, non-noIndex content)
export function generateSitemap(ctx: BuildContext): string {
	const urls: { loc: string; lastmod?: Date; priority?: number }[] = [];

	// Home page
	urls.push({ loc: '/', priority: 1.0 });

	// Index pages
	urls.push({ loc: '/posts/', priority: 0.8 });
	urls.push({ loc: '/notes/', priority: 0.7 });
	urls.push({ loc: '/photos/', priority: 0.7 });
	urls.push({ loc: '/about/', priority: 0.8 });

	// Posts (exclude drafts and noIndex)
	for (const post of ctx.posts) {
		if (post.draft || post.noIndex) continue;
		urls.push({
			loc: getUrl(post),
			lastmod: post.updated || post.date,
			priority: 0.8,
		});
	}

	// Notes (exclude drafts)
	for (const note of ctx.notes) {
		if (note.draft) continue;
		urls.push({
			loc: getUrl(note),
			lastmod: note.updated || note.date,
			priority: 0.6,
		});
	}

	// Photos (exclude drafts)
	for (const photo of ctx.photos) {
		if (photo.draft) continue;
		urls.push({
			loc: getUrl(photo),
			lastmod: photo.updated || photo.date,
			priority: 0.5,
		});
	}

	// Pages (exclude drafts)
	for (const page of ctx.pages) {
		if (page.draft) continue;
		urls.push({
			loc: getUrl(page),
			lastmod: page.updated || page.date,
			priority: 0.7,
		});
	}

	// Soul and Skills
	if (ctx.soul && !ctx.soul.draft) {
		urls.push({
			loc: getUrl(ctx.soul),
			lastmod: ctx.soul.updated || ctx.soul.date,
			priority: 0.9,
		});
	}
	if (ctx.skills && !ctx.skills.draft) {
		urls.push({
			loc: getUrl(ctx.skills),
			lastmod: ctx.skills.updated || ctx.skills.date,
			priority: 0.8,
		});
	}

	const urlEntries = urls
		.map((url) => {
			const lastmod = url.lastmod
				? `\n    <lastmod>${isoDate(url.lastmod).split('T')[0]}</lastmod>`
				: '';
			const priority =
				url.priority !== undefined ? `\n    <priority>${url.priority.toFixed(1)}</priority>` : '';
			return `  <url>
    <loc>${config.url}${url.loc}</loc>${lastmod}${priority}
  </url>`;
		})
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// Generate robots.txt
export function generateRobots(): string {
	return `User-agent: *
Allow: /

Sitemap: ${config.url}/sitemap.xml
`;
}

// Output type for feeds
export interface FeedOutput {
	path: string;
	content: string;
}

// Generate all feeds
export function generateFeeds(ctx: BuildContext): FeedOutput[] {
	return [
		{ path: 'rss.xml', content: generateRss(ctx) },
		{ path: 'sitemap.xml', content: generateSitemap(ctx) },
		{ path: 'robots.txt', content: generateRobots() },
	];
}
