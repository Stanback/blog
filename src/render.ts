// Render content to HTML and write to dist/

import { config } from './config.js';
import type { BuildContext, Content, Note, Page, Photo, Post, Skills, Soul } from './types.js';

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

// Format date for display
function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

// Format date as ISO string
function isoDate(date: Date): string {
	return date.toISOString();
}

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
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <a href="#main" class="skip-link">Skip to content</a>

  <header>
    <nav>
      <a href="/" class="site-title">${config.title}</a>
      <ul>
        <li><a href="/posts/">Posts</a></li>
        <li><a href="/notes/">Notes</a></li>
        <li><a href="/photos/">Photos</a></li>
        <li><a href="/about/">About</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    ${content}
  </main>

  <footer>
    <p>&copy; ${new Date().getFullYear()} ${config.author.name}</p>
    <p><a href="/rss.xml">RSS</a> &middot; <a href="/colophon/">Colophon</a></p>
  </footer>
</body>
</html>`;
}

// Render single post
function renderPost(post: Post): string {
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
        <ul class="tags">
          ${post.tags.map((tag) => `<li><a href="/tags/${tag}/">${tag}</a></li>`).join('')}
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
	});
}

// Render single note
function renderNote(note: Note): string {
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
	});
}

// Render single photo
function renderPhoto(photo: Photo): string {
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
	});
}

// Render page
function renderPage(page: Page): string {
	const content = `
    <article class="prose">
      ${page.html}
    </article>`;

	return baseTemplate({
		title: page.title,
		description: page.description || config.description,
		url: getUrl(page),
		content,
	});
}

// Render soul page (special template)
function renderSoul(soul: Soul): string {
	const content = `
    <article class="prose soul">
      ${soul.html}
    </article>`;

	return baseTemplate({
		title: soul.title,
		description: soul.description || 'Identity manifesto',
		url: getUrl(soul),
		content,
	});
}

// Render skills page (special template)
function renderSkills(skills: Skills): string {
	const content = `
    <article class="prose skills">
      ${skills.html}
    </article>`;

	return baseTemplate({
		title: skills.title,
		description: skills.description || 'Capabilities manifest',
		url: getUrl(skills),
		content,
	});
}

// Render posts index
function renderPostsIndex(posts: Post[]): string {
	const publishedPosts = posts
		.filter((p) => !p.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	const content = `
    <h1>Posts</h1>
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
    </ul>`;

	return baseTemplate({
		title: 'Posts',
		description: 'Long-form writing about building, design, and life.',
		url: '/posts/',
		content,
	});
}

// Render notes index
function renderNotesIndex(notes: Note[]): string {
	const publishedNotes = notes
		.filter((n) => !n.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	const content = `
    <h1>Notes</h1>
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
    </ul>`;

	return baseTemplate({
		title: 'Notes',
		description: 'Quick thoughts and observations.',
		url: '/notes/',
		content,
	});
}

// Render photos index
function renderPhotosIndex(photos: Photo[]): string {
	const publishedPhotos = photos
		.filter((p) => !p.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	const content = `
    <h1>Photos</h1>
    <div class="photo-grid">
      ${publishedPhotos
				.map(
					(photo) => `
      <a href="${getUrl(photo)}" class="photo-thumb">
        <img src="${photo.image}" alt="${photo.alt}" loading="lazy">
      </a>`,
				)
				.join('')}
    </div>`;

	return baseTemplate({
		title: 'Photos',
		description: 'Photography with minimal context.',
		url: '/photos/',
		content,
	});
}

// Render home page
function renderHome(ctx: BuildContext): string {
	const recentPosts = ctx.posts
		.filter((p) => !p.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, 5);
	const recentNotes = ctx.notes
		.filter((n) => !n.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, 3);

	const content = `
    <section class="hero">
      <h1>${config.title}</h1>
      <p>${config.description}</p>
    </section>

    <section class="recent">
      <h2>Recent Posts</h2>
      <ul class="post-list">
        ${recentPosts
					.map(
						(post) => `
        <li>
          <article>
            <time datetime="${isoDate(post.date)}">${formatDate(post.date)}</time>
            <h3><a href="${getUrl(post)}">${post.title}</a></h3>
          </article>
        </li>`,
					)
					.join('')}
      </ul>
      <p><a href="/posts/">All posts &rarr;</a></p>
    </section>

    ${
			recentNotes.length > 0
				? `
    <section class="recent">
      <h2>Recent Notes</h2>
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
      <p><a href="/notes/">All notes &rarr;</a></p>
    </section>`
				: ''
		}`;

	return baseTemplate({
		title: config.title,
		description: config.description,
		url: '/',
		content,
	});
}

// Render 404 page
function render404(): string {
	const content = `
    <article class="error-page">
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <p><a href="/">Go home &rarr;</a></p>
    </article>`;

	return baseTemplate({
		title: 'Page not found',
		description: "The page you're looking for doesn't exist.",
		url: '/404.html',
		content,
		noIndex: true,
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
	output.push({ path: 'posts/index.html', content: renderPostsIndex(ctx.posts) });
	for (const post of ctx.posts.filter((p) => !p.draft)) {
		output.push({ path: `posts/${post.slug}/index.html`, content: renderPost(post) });
	}

	// Notes
	output.push({ path: 'notes/index.html', content: renderNotesIndex(ctx.notes) });
	for (const note of ctx.notes.filter((n) => !n.draft)) {
		output.push({ path: `notes/${note.slug}/index.html`, content: renderNote(note) });
	}

	// Photos
	output.push({ path: 'photos/index.html', content: renderPhotosIndex(ctx.photos) });
	for (const photo of ctx.photos.filter((p) => !p.draft)) {
		output.push({ path: `photos/${photo.slug}/index.html`, content: renderPhoto(photo) });
	}

	// Pages
	for (const page of ctx.pages.filter((p) => !p.draft)) {
		output.push({ path: `${page.slug}/index.html`, content: renderPage(page) });
	}

	// Soul and Skills (special pages under /about/)
	if (ctx.soul && !ctx.soul.draft) {
		output.push({ path: 'about/soul/index.html', content: renderSoul(ctx.soul) });
	}
	if (ctx.skills && !ctx.skills.draft) {
		output.push({ path: 'about/skills/index.html', content: renderSkills(ctx.skills) });
	}

	// 404
	output.push({ path: '404.html', content: render404() });

	return output;
}

export { getUrl, formatDate, isoDate };
