// Render content to HTML and write to dist/

import { config } from './config.js';
import { strings } from './strings.js';
import type { BuildContext, Content, Note, Page, Photo, Post, Skills, Soul } from './types.js';
import { formatDateLong, formatDateMachine } from './utils/dates.js';

// URL patterns per content type
function getUrl(content: Content): string {
	switch (content.type) {
		case 'post':
			return `/posts/${content.slug}/`;
		case 'note':
			return `/notes/${content.slug}/`;
		case 'photo':
			return `/photos/${content.slug}/`;
		case 'soul':
			return '/about/soul/';
		case 'skills':
			return '/about/skills/';
		case 'page':
			return `/${content.slug}/`;
	}
}

// Re-export date utilities for backward compatibility
const formatDate = formatDateLong;
const isoDate = formatDateMachine;

// Atelier Mark SVG inline for header
const atelierMark = `<svg class="atelier-mark" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M5 5 L5 15" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  <path d="M5 5 L15 5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M27 27 L27 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M27 27 L21 27" stroke="var(--color-accent-500)" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

// Base HTML template
function baseTemplate(options: {
	title: string;
	description: string;
	url: string;
	content: string;
	type?: 'article' | 'website';
	date?: Date;
	updated?: Date;
	heroImage?: string;
	noIndex?: boolean;
	cssFilename?: string;
}): string {
	const {
		title,
		description,
		url,
		content,
		type = 'website',
		date,
		updated,
		heroImage,
		noIndex,
		cssFilename = 'styles.css',
	} = options;

	const fullUrl = `${config.url}${url}`;
	const ogImage = heroImage ? `${config.url}${heroImage}` : `${config.url}/images/og-default.png`;
	const pageTitle = url === '/' ? config.title : `${title} | ${config.title}`;

	return `<!DOCTYPE html>
<html lang="${config.language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Basic -->
  <title>${pageTitle}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${fullUrl}">
  ${noIndex ? '<meta name="robots" content="noindex">' : ''}

  <!-- Open Graph -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${fullUrl}">
  <meta property="og:type" content="${type}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:site_name" content="${config.title}">

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
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">

  <!-- Feeds -->
  <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">

  <!-- Styles -->
  <link rel="stylesheet" href="/css/${cssFilename}">
</head>
<body>
  <a href="#main" class="skip-link">Skip to content</a>

  <header>
    <nav aria-label="Main navigation">
      <a href="/" class="site-logo">
        ${atelierMark}
        <span class="wordmark">${config.title}</span>
      </a>
      <ul>
        <li><a href="/posts/">Posts</a></li>
        <li><a href="/notes/">Notes</a></li>
        <li><a href="/photos/">Photos</a></li>
        <li><a href="/about/">About</a></li>
      </ul>
    </nav>
  </header>

  <main id="main" aria-label="Main content">
    ${content}
  </main>

  <footer aria-label="Footer">
    <p>© ${new Date().getFullYear()} ${config.author.name}</p>
    <nav>
      <a href="/rss.xml">RSS</a>
      <span class="separator" aria-hidden="true">·</span>
      <a href="/colophon/">Colophon</a>
    </nav>
  </footer>
</body>
</html>`;
}

// Render single post
function renderPost(post: Post, ctx: BuildContext): string {
	const content = `
    <article class="prose">
      <header>
        <time datetime="${isoDate(post.date)}">${formatDate(post.date)}</time>
        ${post.updated ? `<span class="updated">Updated ${formatDate(post.updated)}</span>` : ''}
        <h1>${post.title}</h1>
        ${post.readingTime ? `<span class="reading-time">${post.readingTime} min read</span>` : ''}
      </header>
      ${post.html}
      ${
				post.tags.length > 0
					? `
      <footer>
        <p class="tags-label">${strings.labels.tagged}:</p>
        <ul class="tags">
          ${post.tags.map((tag) => `<li><span class="tag">${tag}</span></li>`).join('')}
        </ul>
      </footer>`
					: ''
			}
    </article>`;

	return baseTemplate({
		title: post.title,
		description: post.description,
		url: getUrl(post),
		content,
		type: 'article',
		date: post.date,
		updated: post.updated,
		heroImage: post.heroImage,
		noIndex: post.noIndex,
		cssFilename: ctx.cssFilename,
	});
}

// Render single note
function renderNote(note: Note, ctx: BuildContext): string {
	const content = `
    <article class="prose">
      <header>
        <time datetime="${isoDate(note.date)}">${formatDate(note.date)}</time>
        <h1>${note.title}</h1>
      </header>
      ${note.html}
    </article>`;

	return baseTemplate({
		title: note.title,
		description: note.description || `A note from ${formatDate(note.date)}`,
		url: getUrl(note),
		content,
		type: 'article',
		date: note.date,
		cssFilename: ctx.cssFilename,
	});
}

// Render single photo
function renderPhoto(photo: Photo, ctx: BuildContext): string {
	const content = `
    <article class="photo-single">
      <figure>
        <img src="${photo.image}" alt="${photo.alt}" loading="lazy">
        ${photo.caption ? `<figcaption>${photo.caption}</figcaption>` : ''}
      </figure>
      <div class="photo-meta">
        <time datetime="${isoDate(photo.date)}">${formatDate(photo.date)}</time>
        <h1>${photo.title}</h1>
        ${photo.location ? `<p class="location">${photo.location}</p>` : ''}
        ${
					photo.camera || photo.settings
						? `
        <p class="camera-info">
          ${photo.camera || ''}${photo.camera && photo.settings ? ' &middot; ' : ''}${photo.settings || ''}
        </p>`
						: ''
				}
      </div>
      ${photo.html ? `<div class="prose">${photo.html}</div>` : ''}
    </article>`;

	return baseTemplate({
		title: photo.title,
		description: photo.caption || photo.alt,
		url: getUrl(photo),
		content,
		type: 'article',
		date: photo.date,
		heroImage: photo.image,
		cssFilename: ctx.cssFilename,
	});
}

// Render page
function renderPage(page: Page, ctx: BuildContext): string {
	const content = `
    <article class="prose">
      ${page.html}
    </article>`;

	return baseTemplate({
		title: page.title,
		description: page.description || config.description,
		url: getUrl(page),
		content,
		cssFilename: ctx.cssFilename,
	});
}

// Render soul page (special template)
function renderSoul(soul: Soul, ctx: BuildContext): string {
	const content = `
    <article class="prose soul-page">
      <header class="soul-header">
        <h1>${soul.title}</h1>
      </header>
      <div class="soul-content">
        ${soul.html}
      </div>
    </article>`;

	return baseTemplate({
		title: soul.title,
		description: soul.description || 'Identity manifesto',
		url: getUrl(soul),
		content,
		cssFilename: ctx.cssFilename,
	});
}

// Render skills page (special template)
function renderSkills(skills: Skills, ctx: BuildContext): string {
	const content = `
    <article class="prose skills-page">
      <header class="skills-header">
        <h1>${skills.title}</h1>
      </header>
      <div class="skills-content">
        ${skills.html}
      </div>
    </article>`;

	return baseTemplate({
		title: skills.title,
		description: skills.description || 'Capabilities manifest',
		url: getUrl(skills),
		content,
		cssFilename: ctx.cssFilename,
	});
}

// Render posts index
function renderPostsIndex(posts: Post[], ctx: BuildContext): string {
	const publishedPosts = posts
		.filter((p) => !p.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	const content = `
    <h1>${strings.lists.posts}</h1>
    ${
			publishedPosts.length > 0
				? `
    <ul class="post-list">
      ${publishedPosts
				.map(
					(post) => `
      <li>
        <article>
          <time datetime="${isoDate(post.date)}">${formatDate(post.date)}</time>
          <h2><a href="${getUrl(post)}">${post.title}</a></h2>
          <p>${post.description}</p>
        </article>
      </li>`,
				)
				.join('')}
    </ul>`
				: `<p class="empty-state">${strings.empty.posts}</p>`
		}`;

	return baseTemplate({
		title: strings.lists.posts,
		description: 'Long-form writing about building, design, and life.',
		url: '/posts/',
		content,
		cssFilename: ctx.cssFilename,
	});
}

// Render notes index
function renderNotesIndex(notes: Note[], ctx: BuildContext): string {
	const publishedNotes = notes
		.filter((n) => !n.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	const content = `
    <h1>${strings.lists.notes}</h1>
    ${
			publishedNotes.length > 0
				? `
    <ul class="note-list">
      ${publishedNotes
				.map(
					(note) => `
      <li>
        <article>
          <time datetime="${isoDate(note.date)}">${formatDate(note.date)}</time>
          <h2><a href="${getUrl(note)}">${note.title}</a></h2>
        </article>
      </li>`,
				)
				.join('')}
    </ul>`
				: `<p class="empty-state">${strings.empty.notes}</p>`
		}`;

	return baseTemplate({
		title: strings.lists.notes,
		description: 'Quick thoughts and observations.',
		url: '/notes/',
		content,
		cssFilename: ctx.cssFilename,
	});
}

// Render photos index
function renderPhotosIndex(photos: Photo[], ctx: BuildContext): string {
	const publishedPhotos = photos
		.filter((p) => !p.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	const content = `
    <h1>${strings.lists.photos}</h1>
    ${
			publishedPhotos.length > 0
				? `
    <div class="photo-grid">
      ${publishedPhotos
				.map(
					(photo) => `
      <a href="${getUrl(photo)}" class="photo-thumb">
        <img src="${photo.image}" alt="${photo.alt}" loading="lazy">
      </a>`,
				)
				.join('')}
    </div>`
				: `<p class="empty-state">${strings.empty.photos}</p>`
		}`;

	return baseTemplate({
		title: strings.lists.photos,
		description: 'Photography with minimal context.',
		url: '/photos/',
		content,
		cssFilename: ctx.cssFilename,
	});
}

// Larger atelier mark for hero
const heroMark = `<svg class="atelier-mark" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M6 6 L6 24" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
  <path d="M6 6 L24 6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <path d="M42 42 L42 32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M42 42 L32 42" stroke="var(--color-accent-500)" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// Render home page
function renderHome(ctx: BuildContext): string {
	// Featured posts for "Start Here" section
	const featuredPosts = ctx.posts
		.filter((p) => !p.draft && p.featured)
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, 5);

	// Recent posts (excluding featured to avoid duplication)
	const featuredSlugs = new Set(featuredPosts.map((p) => p.slug));
	const recentPosts = ctx.posts
		.filter((p) => !p.draft && !featuredSlugs.has(p.slug))
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, 5);

	const recentNotes = ctx.notes
		.filter((n) => !n.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, 3);

	const content = `
    <section class="thesis">
      <div class="thesis-logo">
        ${heroMark}
      </div>
      <h1 class="thesis-headline">${strings.thesis.headline}</h1>
      <p class="thesis-body">${strings.thesis.body}</p>
    </section>

    ${
			featuredPosts.length > 0
				? `
    <section class="start-here">
      <h2>${strings.home.startHere}</h2>
      <p class="section-description">${strings.home.startHereDescription}</p>
      <ul class="post-list">
        ${featuredPosts
					.map(
						(post) => `
        <li>
          <article>
            <time datetime="${isoDate(post.date)}">${formatDate(post.date)}</time>
            <h3><a href="${getUrl(post)}">${post.title}</a></h3>
            ${post.description ? `<p>${post.description}</p>` : ''}
          </article>
        </li>`,
					)
					.join('')}
      </ul>
    </section>`
				: ''
		}

    <section class="recent">
      <h2>${strings.home.recentPosts}</h2>
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
            <h3><a href="${getUrl(post)}">${post.title}</a></h3>
            ${post.description ? `<p>${post.description}</p>` : ''}
          </article>
        </li>`,
					)
					.join('')}
      </ul>
      <p><a href="/posts/">${strings.labels.allPosts} →</a></p>`
					: `<p class="empty-state">${strings.empty.posts}</p>`
			}
    </section>

    ${
			recentNotes.length > 0
				? `
    <section class="recent">
      <h2>${strings.home.recentNotes}</h2>
      <ul class="note-list">
        ${recentNotes
					.map(
						(note) => `
        <li>
          <article>
            <time datetime="${isoDate(note.date)}">${formatDate(note.date)}</time>
            <h3><a href="${getUrl(note)}">${note.title}</a></h3>
          </article>
        </li>`,
					)
					.join('')}
      </ul>
      <p><a href="/notes/">${strings.labels.allNotes} →</a></p>
    </section>`
				: ''
		}`;

	return baseTemplate({
		title: config.title,
		description: config.description,
		url: '/',
		content,
		cssFilename: ctx.cssFilename,
	});
}

// Render 404 page
function render404(ctx: BuildContext): string {
	const content = `
    <article class="error-page">
      <h1>${strings.notFound.title}</h1>
      <p>${strings.notFound.body}</p>
      <p><a href="/">${strings.notFound.action} &rarr;</a></p>
    </article>`;

	return baseTemplate({
		title: strings.notFound.title,
		description: strings.notFound.body,
		url: '/404.html',
		content,
		noIndex: true,
		cssFilename: ctx.cssFilename,
	});
}

// Output type for the build system
export interface RenderOutput {
	path: string;
	content: string;
}

// Render all content to HTML
export function renderSite(ctx: BuildContext): RenderOutput[] {
	const output: RenderOutput[] = [];

	// Home page
	output.push({ path: 'index.html', content: renderHome(ctx) });

	// Posts
	output.push({ path: 'posts/index.html', content: renderPostsIndex(ctx.posts, ctx) });
	for (const post of ctx.posts.filter((p) => !p.draft)) {
		output.push({ path: `posts/${post.slug}/index.html`, content: renderPost(post, ctx) });
	}

	// Notes
	output.push({ path: 'notes/index.html', content: renderNotesIndex(ctx.notes, ctx) });
	for (const note of ctx.notes.filter((n) => !n.draft)) {
		output.push({ path: `notes/${note.slug}/index.html`, content: renderNote(note, ctx) });
	}

	// Photos
	output.push({ path: 'photos/index.html', content: renderPhotosIndex(ctx.photos, ctx) });
	for (const photo of ctx.photos.filter((p) => !p.draft)) {
		output.push({ path: `photos/${photo.slug}/index.html`, content: renderPhoto(photo, ctx) });
	}

	// Pages
	for (const page of ctx.pages.filter((p) => !p.draft)) {
		output.push({ path: `${page.slug}/index.html`, content: renderPage(page, ctx) });
	}

	// Soul and Skills (special pages under /about/)
	if (ctx.soul && !ctx.soul.draft) {
		output.push({ path: 'about/soul/index.html', content: renderSoul(ctx.soul, ctx) });
	}
	if (ctx.skills && !ctx.skills.draft) {
		output.push({ path: 'about/skills/index.html', content: renderSkills(ctx.skills, ctx) });
	}

	// 404
	output.push({ path: '404.html', content: render404(ctx) });

	return output;
}

export { getUrl, formatDate, isoDate };
