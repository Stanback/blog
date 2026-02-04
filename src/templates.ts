// HTML Templates
// All templates as template literal functions. Uses strings from strings.ts for microcopy.

import { config } from './config.js';
import { strings } from './strings.js';
import type { BuildContext, Note, Page, Photo, Post, Skills, Soul } from './types.js';

// ─────────────────────────────────────────────────────────────────────────────
// Utility functions
// ─────────────────────────────────────────────────────────────────────────────

function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

function isoDate(date: Date): string {
	return date.toISOString();
}

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function getUrl(type: string, slug: string): string {
	switch (type) {
		case 'post':
			return `/posts/${slug}/`;
		case 'note':
			return `/notes/${slug}/`;
		case 'photo':
			return `/photos/${slug}/`;
		case 'soul':
			return '/about/soul/';
		case 'skills':
			return '/about/skills/';
		case 'page':
			return `/${slug}/`;
		default:
			return '/';
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// Meta types
// ─────────────────────────────────────────────────────────────────────────────

export interface PageMeta {
	title: string;
	description: string;
	url: string;
	type?: 'article' | 'website';
	date?: Date;
	updated?: Date;
	heroImage?: string;
	noIndex?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Base Template
// ─────────────────────────────────────────────────────────────────────────────

export function baseTemplate(content: string, meta: PageMeta): string {
	const { title, description, url, type = 'website', date, updated, heroImage, noIndex } = meta;

	const fullUrl = `${config.url}${url}`;
	const ogImage = heroImage ? `${config.url}${heroImage}` : `${config.url}/images/og-default.png`;
	const pageTitle =
		url === '/'
			? config.title
			: `${escapeHtml(title)}${strings.meta.titleSeparator}${config.title}`;

	return `<!DOCTYPE html>
<html lang="${config.language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Basic -->
  <title>${pageTitle}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${fullUrl}">
  ${noIndex ? '<meta name="robots" content="noindex">' : ''}

  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${fullUrl}">
  <meta property="og:type" content="${type}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:site_name" content="${strings.meta.siteName}">

  ${
		type === 'article' && date
			? `<!-- Article-specific -->
  <meta property="article:published_time" content="${isoDate(date)}">
  ${updated ? `<meta property="article:modified_time" content="${isoDate(updated)}">` : ''}
  <meta property="article:author" content="${config.author.name}">`
			: ''
	}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${ogImage}">

  <!-- Feeds -->
  <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">

  <!-- Styles -->
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <a href="#main" class="skip-link">${strings.a11y.skipToContent}</a>

  <header>
    <nav aria-label="${strings.a11y.navigation}">
      <a href="/" class="site-title">${strings.meta.siteName}</a>
      <ul>
        <li><a href="/posts/">${strings.nav.posts}</a></li>
        <li><a href="/notes/">${strings.nav.notes}</a></li>
        <li><a href="/photos/">${strings.nav.photos}</a></li>
        <li><a href="/about/">${strings.nav.about}</a></li>
      </ul>
    </nav>
  </header>

  <main id="main" aria-label="${strings.a11y.mainContent}">
    ${content}
  </main>

  <footer aria-label="${strings.a11y.footer}">
    <p>${strings.footer.tagline}</p>
    <nav>
      <a href="/rss.xml">${strings.footer.links.rss}</a>
      <span aria-hidden="true">&middot;</span>
      <a href="/sitemap.xml">${strings.footer.links.sitemap}</a>
      <span aria-hidden="true">&middot;</span>
      <a href="/llms.txt">${strings.footer.links.llms}</a>
    </nav>
  </footer>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Post Template
// ─────────────────────────────────────────────────────────────────────────────

export function postTemplate(post: Post, _context: BuildContext): string {
	const content = `
    <article class="prose">
      <header>
        <time datetime="${isoDate(post.date)}">${formatDate(post.date)}</time>
        ${post.updated ? `<span class="updated">${strings.labels.updated} ${formatDate(post.updated)}</span>` : ''}
        <h1>${escapeHtml(post.title)}</h1>
        ${post.readingTime ? `<span class="reading-time">${post.readingTime} ${strings.labels.readingTime}</span>` : ''}
      </header>
      ${post.html}
      ${
				post.tags.length > 0
					? `
      <footer>
        <p class="tags-label">${strings.labels.tagged}:</p>
        <ul class="tags">
          ${post.tags.map((tag) => `<li><a href="/tags/${tag}/">${tag}</a></li>`).join('')}
        </ul>
      </footer>`
					: ''
			}
    </article>`;

	return baseTemplate(content, {
		title: post.title,
		description: post.description,
		url: getUrl('post', post.slug),
		type: 'article',
		date: post.date,
		updated: post.updated,
		heroImage: post.heroImage,
		noIndex: post.noIndex,
	});
}

// ─────────────────────────────────────────────────────────────────────────────
// Note Template
// ─────────────────────────────────────────────────────────────────────────────

export function noteTemplate(note: Note, _context: BuildContext): string {
	const content = `
    <article class="prose">
      <header>
        <time datetime="${isoDate(note.date)}">${formatDate(note.date)}</time>
        <h1>${escapeHtml(note.title)}</h1>
      </header>
      ${note.html}
    </article>`;

	return baseTemplate(content, {
		title: note.title,
		description: note.description || `A note from ${formatDate(note.date)}`,
		url: getUrl('note', note.slug),
		type: 'article',
		date: note.date,
	});
}

// ─────────────────────────────────────────────────────────────────────────────
// Photo Template
// ─────────────────────────────────────────────────────────────────────────────

export function photoTemplate(photo: Photo, _context: BuildContext): string {
	const content = `
    <article class="photo-single">
      <figure>
        <img src="${photo.image}" alt="${escapeHtml(photo.alt)}" loading="lazy">
        ${photo.caption ? `<figcaption>${escapeHtml(photo.caption)}</figcaption>` : ''}
      </figure>
      <div class="photo-meta">
        <time datetime="${isoDate(photo.date)}">${formatDate(photo.date)}</time>
        <h1>${escapeHtml(photo.title)}</h1>
        ${photo.location ? `<p class="location">${escapeHtml(photo.location)}</p>` : ''}
        ${
					photo.camera || photo.settings
						? `
        <p class="camera-info">
          ${photo.camera ? escapeHtml(photo.camera) : ''}${photo.camera && photo.settings ? ' &middot; ' : ''}${photo.settings ? escapeHtml(photo.settings) : ''}
        </p>`
						: ''
				}
      </div>
      ${photo.html ? `<div class="prose">${photo.html}</div>` : ''}
    </article>`;

	return baseTemplate(content, {
		title: photo.title,
		description: photo.caption || photo.alt,
		url: getUrl('photo', photo.slug),
		type: 'article',
		date: photo.date,
		heroImage: photo.image,
	});
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Template
// ─────────────────────────────────────────────────────────────────────────────

export function pageTemplate(page: Page, _context: BuildContext): string {
	const content = `
    <article class="prose">
      <h1>${escapeHtml(page.title)}</h1>
      ${page.html}
    </article>`;

	return baseTemplate(content, {
		title: page.title,
		description: page.description || config.description,
		url: getUrl('page', page.slug),
	});
}

// ─────────────────────────────────────────────────────────────────────────────
// Soul Template - special layout with larger typography
// ─────────────────────────────────────────────────────────────────────────────

export function soulTemplate(soul: Soul, _context: BuildContext): string {
	const content = `
    <article class="prose soul-page">
      <header class="soul-header">
        <h1>${escapeHtml(soul.title)}</h1>
      </header>
      <div class="soul-content">
        ${soul.html}
      </div>
    </article>`;

	return baseTemplate(content, {
		title: soul.title,
		description: soul.description || 'Identity manifesto',
		url: getUrl('soul', soul.slug),
	});
}

// ─────────────────────────────────────────────────────────────────────────────
// Skills Template - same special layout as Soul
// ─────────────────────────────────────────────────────────────────────────────

export function skillsTemplate(skills: Skills, _context: BuildContext): string {
	const content = `
    <article class="prose skills-page">
      <header class="skills-header">
        <h1>${escapeHtml(skills.title)}</h1>
      </header>
      <div class="skills-content">
        ${skills.html}
      </div>
    </article>`;

	return baseTemplate(content, {
		title: skills.title,
		description: skills.description || 'Capabilities manifest',
		url: getUrl('skills', skills.slug),
	});
}

// ─────────────────────────────────────────────────────────────────────────────
// List Template - for post/note/photo lists
// ─────────────────────────────────────────────────────────────────────────────

export function listTemplate(
	items: (Post | Note | Photo)[],
	type: 'post' | 'note' | 'photo',
	context: BuildContext,
): string {
	const published = items
		.filter((item) => !item.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	const typeLabels = {
		post: {
			title: strings.lists.posts,
			empty: strings.empty.posts,
			description: 'Long-form writing about building, design, and life.',
		},
		note: {
			title: strings.lists.notes,
			empty: strings.empty.notes,
			description: 'Quick thoughts and observations.',
		},
		photo: {
			title: strings.lists.photos,
			empty: strings.empty.photos,
			description: 'Photography with minimal context.',
		},
	};

	const { title, empty, description } = typeLabels[type];

	let listContent: string;

	if (published.length === 0) {
		listContent = `<p class="empty-state">${empty}</p>`;
	} else if (type === 'photo') {
		listContent = `
    <div class="photo-grid">
      ${(published as Photo[])
				.map(
					(photo) => `
      <a href="${getUrl('photo', photo.slug)}" class="photo-thumb">
        <img src="${photo.image}" alt="${escapeHtml(photo.alt)}" loading="lazy">
      </a>`,
				)
				.join('')}
    </div>`;
	} else {
		const listClass = type === 'post' ? 'post-list' : 'note-list';
		listContent = `
    <ul class="${listClass}">
      ${published
				.map((item) => {
					const isPost = item.type === 'post';
					return `
      <li>
        <article>
          <time datetime="${isoDate(item.date)}">${formatDate(item.date)}</time>
          <h2><a href="${getUrl(type, item.slug)}">${escapeHtml(item.title)}</a></h2>
          ${isPost && (item as Post).description ? `<p>${escapeHtml((item as Post).description)}</p>` : ''}
        </article>
      </li>`;
				})
				.join('')}
    </ul>`;
	}

	const content = `
    <h1>${title}</h1>
    ${listContent}`;

	return baseTemplate(content, {
		title,
		description,
		url: `/${type}s/`,
	});
}

// ─────────────────────────────────────────────────────────────────────────────
// Index Template - homepage
// ─────────────────────────────────────────────────────────────────────────────

export function indexTemplate(context: BuildContext): string {
	const recentPosts = context.posts
		.filter((p) => !p.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, 5);

	const recentNotes = context.notes
		.filter((n) => !n.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, 3);

	const content = `
    <section class="hero">
      <h1>${strings.meta.siteName}</h1>
      <p class="hero-tagline">${strings.meta.defaultDescription}</p>
    </section>

    <section class="recent">
      <h2>Recent ${strings.lists.posts}</h2>
      ${
				recentPosts.length > 0
					? `
      <ul class="post-list">
        ${recentPosts
					.map(
						(post) => `
        <li>
          <article>
            <time datetime="${isoDate(post.date)}">${formatDate(post.date)}</time>
            <h3><a href="${getUrl('post', post.slug)}">${escapeHtml(post.title)}</a></h3>
          </article>
        </li>`,
					)
					.join('')}
      </ul>
      <p><a href="/posts/">${strings.labels.allPosts} &rarr;</a></p>`
					: `<p class="empty-state">${strings.empty.posts}</p>`
			}
    </section>

    ${
			recentNotes.length > 0
				? `
    <section class="recent">
      <h2>Recent ${strings.lists.notes}</h2>
      <ul class="note-list">
        ${recentNotes
					.map(
						(note) => `
        <li>
          <article>
            <time datetime="${isoDate(note.date)}">${formatDate(note.date)}</time>
            <h3><a href="${getUrl('note', note.slug)}">${escapeHtml(note.title)}</a></h3>
          </article>
        </li>`,
					)
					.join('')}
      </ul>
      <p><a href="/notes/">${strings.labels.allNotes} &rarr;</a></p>
    </section>`
				: ''
		}`;

	return baseTemplate(content, {
		title: config.title,
		description: config.description,
		url: '/',
	});
}

// ─────────────────────────────────────────────────────────────────────────────
// 404 Template
// ─────────────────────────────────────────────────────────────────────────────

export function notFoundTemplate(): string {
	const content = `
    <article class="error-page">
      <h1>${strings.notFound.title}</h1>
      <p>${strings.notFound.body}</p>
      <p><a href="/">${strings.notFound.action} &rarr;</a></p>
    </article>`;

	return baseTemplate(content, {
		title: strings.notFound.title,
		description: strings.notFound.body,
		url: '/404.html',
		noIndex: true,
	});
}

// ─────────────────────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────────────────────

export { formatDate, isoDate, escapeHtml, getUrl };
