// Render content to HTML and write to dist/

import { config } from './config.js';
import {
	glyphCornerBR,
	glyphCornerTL,
	glyphFlourish,
	glyphMarkFull,
	iconMoon,
	iconSun,
} from './glyphs.js';
import { strings } from './strings.js';
import type {
	Book,
	BuildContext,
	Chapter,
	Content,
	Note,
	Page,
	Photo,
	Post,
	RelatedPost,
	Skills,
	Soul,
	TocEntry,
} from './types.js';
import { formatDateLong, formatDateMachine, formatDateNoYear } from './utils/dates.js';

// Convert image URL to WebP version (assumes WebP exists alongside original)
function toWebP(url: string): string {
	return url.replace(/\.(png|jpe?g)$/i, '.webp');
}

// Generate CSS image-set for WebP with fallback
function imageSet(url: string): string {
	const webp = toWebP(url);
	// If already webp or no extension match, just return url
	if (webp === url) return `url('${url}')`;
	// Use image-set with WebP preferred, fallback to original
	return `image-set(url('${webp}') type('image/webp'), url('${url}') type('image/${url.endsWith('.png') ? 'png' : 'jpeg'}'))`;
}

// Generate <picture> element with WebP source
function pictureElement(url: string, alt: string, attrs = ''): string {
	const webp = toWebP(url);
	// If no WebP conversion possible, just return img
	if (webp === url) return `<img src="${url}" alt="${alt}"${attrs ? ` ${attrs}` : ''}>`;
	const mimeType = url.endsWith('.png') ? 'image/png' : 'image/jpeg';
	return `<picture>
          <source srcset="${webp}" type="image/webp">
          <source srcset="${url}" type="${mimeType}">
          <img src="${url}" alt="${alt}"${attrs ? ` ${attrs}` : ''}>
        </picture>`;
}

// Process inline markdown (backticks → code)
function processInlineMarkdown(text: string): string {
	return text.replace(/`([^`]+)`/g, '<code>$1</code>');
}

// Render related posts section
function renderRelatedPosts(relatedPosts: RelatedPost[] | undefined): string {
	if (!relatedPosts || relatedPosts.length === 0) return '';

	return `
		<aside class="related-posts" aria-label="Related posts">
			<h2 class="related-posts-title">Related</h2>
			<ul class="related-posts-list">
				${relatedPosts
					.map(
						(post) => `
					<li class="related-post-item">
						<a href="${post.url}" class="related-post-link">
							<span class="related-post-title">${processInlineMarkdown(post.title)}</span>
							${post.description ? `<span class="related-post-desc">${processInlineMarkdown(post.description)}</span>` : ''}
						</a>
					</li>`,
					)
					.join('')}
			</ul>
		</aside>`;
}

// Render table of contents sidebar (Notion-style: dashes that expand on hover)
function renderToc(toc: TocEntry[] | undefined): string {
	if (!toc || toc.length < 2) return ''; // Only show TOC if 2+ headings

	const items = toc
		.map(
			(entry) =>
				`<li class="toc-item toc-depth-${entry.depth}">
					<a href="#${entry.id}" class="toc-link">
						<span class="toc-dash"></span>
						<span class="toc-text">${entry.text}</span>
					</a>
				</li>`,
		)
		.join('');

	return `
		<nav class="toc-sidebar" aria-label="Table of contents">
			<ul class="toc-list">${items}</ul>
		</nav>`;
}

// URL patterns per content type
function getUrl(content: Content): string {
	switch (content.type) {
		case 'post':
			return content.draft ? `/drafts/${content.slug}/` : `/posts/${content.slug}/`;
		case 'note':
			return content.draft ? `/drafts/${content.slug}/` : `/notes/${content.slug}/`;
		case 'photo':
			return content.draft ? `/drafts/${content.slug}/` : `/photos/${content.slug}/`;
		case 'chapter':
			return `/books/${content.bookSlug}/${content.slug}/`;
		case 'soul':
			return '/about/soul/';
		case 'skills':
			return '/about/skills/';
		case 'page':
			return `/${content.slug}/`;
	}
}

// Book URL helper
function getBookUrl(book: Book): string {
	return `/books/${book.slug}/`;
}

// Re-export date utilities for backward compatibility
const formatDate = formatDateLong;
const formatDateArchive = formatDateNoYear;
const isoDate = formatDateMachine;

function getEffectiveUpdatedDate(item: { date: Date; updated?: Date }): Date {
	return item.updated && item.updated.getTime() !== item.date.getTime() ? item.updated : item.date;
}

// Render backlinks section if any exist
function renderBacklinks(
	url: string,
	backlinks: Map<string, Array<{ title: string; url: string; description?: string; date?: Date }>>,
): string {
	const links = backlinks.get(url);
	if (!links || links.length === 0) return '';

	return `
    <aside class="backlinks" aria-label="Pages that link here">
      <h2 class="backlinks-title">Linked from</h2>
      <ul class="backlinks-list">
        ${links
					.map((link) => {
						const datePart = link.date
							? `<time datetime="${formatDateMachine(link.date)}">${formatDateLong(link.date)}</time>`
							: '';
						const descPart = link.description
							? `<span class="backlink-desc">${link.description}</span>`
							: '';
						return `<li class="backlink-item">
              <a href="${link.url}" class="backlink-title">${link.title}</a>
              ${datePart || descPart ? `<div class="backlink-meta">${datePart}${datePart && descPart ? ' · ' : ''}${descPart}</div>` : ''}
            </li>`;
					})
					.join('')}
      </ul>
    </aside>`;
}

// Atelier Mark for header (G0 - Full Mark)
const atelierMark = glyphMarkFull.replace('class="glyph glyph-mark"', 'class="atelier-mark"');

// Base HTML template
// Breadcrumb item for structured data
type BreadcrumbItem = { name: string; url: string };

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
	// JSON-LD enhancements
	tags?: string[];
	wordCount?: number;
	articleSection?: string;
	breadcrumbs?: BreadcrumbItem[];
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
		tags,
		wordCount,
		articleSection,
		breadcrumbs,
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
  <meta property="article:author" content="${config.author.name}">
  
  <!-- JSON-LD Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${title.replace(/"/g, '\\"')}",
    "description": "${description.replace(/"/g, '\\"')}",
    "datePublished": "${isoDate(date)}",
    ${updated ? `"dateModified": "${isoDate(updated)}",` : ''}
    ${heroImage ? `"image": "${config.url}${heroImage}",` : ''}
    ${tags && tags.length > 0 ? `"keywords": ${JSON.stringify(tags)},` : ''}
    ${wordCount ? `"wordCount": ${wordCount},` : ''}
    ${articleSection ? `"articleSection": "${articleSection}",` : ''}
    "inLanguage": "${config.language}",
    "isAccessibleForFree": true,
    "copyrightYear": ${date.getFullYear()},
    "copyrightHolder": {
      "@type": "Person",
      "name": "${config.author.name}"
    },
    "author": {
      "@type": "Person",
      "name": "${config.author.name}",
      "url": "${config.author.url}"${
				config.author.sameAs
					? `,
      "sameAs": ${JSON.stringify(config.author.sameAs)}`
					: ''
			}
    },
    "publisher": {
      "@type": "Person",
      "name": "${config.author.name}",
      "url": "${config.url}"${
				config.author.sameAs
					? `,
      "sameAs": ${JSON.stringify(config.author.sameAs)}`
					: ''
			}
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${fullUrl}"
    }
  }
  </script>`
			: ''
	}
${
	url === '/'
		? `
  <!-- JSON-LD Schema: WebSite + Person -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "${config.url}/#website",
        "name": "${config.title}",
        "url": "${config.url}",
        "description": "${config.description.replace(/"/g, '\\"')}",
        "inLanguage": "${config.language}",
        "publisher": {
          "@id": "${config.url}/#person"
        }
      },
      {
        "@type": "Person",
        "@id": "${config.url}/#person",
        "name": "${config.author.name}",
        "url": "${config.author.url}",
        "sameAs": ${JSON.stringify(config.author.sameAs)}
      }
    ]
  }
  </script>`
		: ''
}
${
	breadcrumbs && breadcrumbs.length > 0
		? `
  <!-- JSON-LD Schema: BreadcrumbList -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      ${breadcrumbs
				.map(
					(item, i) => `{
        "@type": "ListItem",
        "position": ${i + 1},
        "name": "${item.name.replace(/"/g, '\\"')}",
        "item": "${config.url}${item.url}"
      }`,
				)
				.join(',\n      ')}
    ]
  }
  </script>`
		: ''
}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@Stanback">
  <meta name="twitter:creator" content="@Stanback">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">

  <!-- Feeds -->
  <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">

  <!-- Preload critical resources -->
  <link rel="preload" as="font" href="/fonts/Inter-Variable.woff2" type="font/woff2" crossorigin>
  ${heroImage ? `<link rel="preload" as="image" href="${toWebP(heroImage)}" type="image/webp">` : ''}

  <!-- Styles -->
  <link rel="stylesheet" href="/css/${cssFilename}">
</head>
<body>
  <a href="#main" class="skip-link">Skip to content</a>

  <header class="site-header">
    <nav class="site-nav" aria-label="Main navigation">
      <a href="/" class="site-logo">
        ${atelierMark}
        <span class="wordmark">${config.title}</span>
      </a>
      <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-hidden="true">
      <label for="nav-toggle" class="nav-toggle-label" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nav-menu">
        <span class="hamburger"></span>
      </label>
      <div class="nav-menu" id="nav-menu">
        <ul class="nav-links">
          <li><a href="/posts/"${url.startsWith('/posts') ? ' aria-current="page"' : ''}>Writing</a></li>
          <li><a href="/notes/"${url.startsWith('/notes') ? ' aria-current="page"' : ''}>Notes</a></li>
          <li><a href="/photos/"${url.startsWith('/photos') ? ' aria-current="page"' : ''}>Photos</a></li>
          <li><a href="/about/"${url.startsWith('/about') ? ' aria-current="page"' : ''}>About</a></li>
        </ul>
        <button class="theme-toggle" type="button" aria-label="Toggle dark mode" aria-pressed="false">
          ${iconSun}
          ${iconMoon}
        </button>
      </div>
    </nav>
  </header>

  <main id="main" aria-label="Main content">
    ${content}
  </main>

  <footer class="site-footer" aria-label="Footer">
    <div class="footer-inner">
      ${glyphFlourish}
      <p class="footer-tagline">${strings.footer.tagline}</p>
      <nav class="footer-nav" aria-label="Footer navigation">
        <a href="/posts/">Writing</a>
        <a href="/notes/">Notes</a>
        <a href="/about/">About</a>
        <a href="/rss.xml">RSS</a>
      </nav>
      <p class="footer-copyright">${config.author.name}</p>
    </div>
  </footer>

  <script src="/js/site.js"></script>
</body>
</html>`;
}

// Render single post
function renderPost(post: Post, ctx: BuildContext): string {
	// Build author line
	const authorLine =
		post.coAuthors && post.coAuthors.length > 0
			? `<span class="byline">By ${config.author.name} ${post.coAuthors.map((ca) => `& ${ca.emoji || ''} ${ca.name}`.trim()).join(' ')}</span>`
			: `<span class="byline">By ${config.author.name}</span>`;

	// Updated date (if different from publish date)
	const updatedLine =
		post.updated && post.updated.getTime() !== post.date.getTime()
			? `<span class="updated-date">Updated ${formatDate(post.updated)}</span>`
			: '';

	// Hero banner with image background and text overlay
	const heroSection = post.heroImage
		? `
		<header class="post-hero" style="--hero-image: ${imageSet(post.heroImage)}">
			<div class="post-hero-content">
				<time datetime="${isoDate(post.date)}">${formatDate(post.date)}</time>
				<h1>${post.title}</h1>
				<div class="post-meta">
					${authorLine}
					${post.readingTime ? `<span class="reading-time">${post.readingTime} min read</span>` : ''}
					${updatedLine}
				</div>
			</div>
		</header>`
		: `
		<header class="post-header-simple">
			<time datetime="${isoDate(post.date)}">${formatDate(post.date)}</time>
			<h1>${post.title}</h1>
			<div class="post-meta">
				${authorLine}
				${post.readingTime ? `<span class="reading-time">${post.readingTime} min read</span>` : ''}
				${updatedLine}
			</div>
		</header>`;

	const postUrl = getUrl(post);
	const prefaceSection = post.preface ? `<p class="post-preface">${post.preface}</p>` : '';

	const content = `
    ${heroSection}
    ${prefaceSection}
    ${renderToc(post.toc)}
    <article class="prose post-body">
      ${post.html}
      ${
				post.tags.length > 0
					? `
      <footer>
        <p class="tags-label">${strings.labels.tagged}</p>
        <ul class="tags">
          ${post.tags.map((tag) => `<li><span class="tag">${tag}</span></li>`).join('')}
        </ul>
      </footer>`
					: ''
			}
    </article>
    ${renderRelatedPosts(post.relatedPosts)}
    ${renderBacklinks(postUrl, ctx.backlinks)}`;

	return baseTemplate({
		title: post.title,
		description: post.description,
		url: postUrl,
		content,
		type: 'article',
		date: post.date,
		updated: post.updated,
		heroImage: post.heroImage,
		noIndex: post.noIndex,
		cssFilename: ctx.cssFilename,
		// JSON-LD enhancements
		tags: post.tags,
		wordCount: post.wordCount,
		articleSection: 'posts',
		breadcrumbs: [
			{ name: 'Home', url: '/' },
			{ name: 'Posts', url: '/posts/' },
			{ name: post.title, url: postUrl },
		],
	});
}

// Render single note
function renderNote(note: Note, ctx: BuildContext): string {
	// Updated date (if different from publish date)
	const updatedLine =
		note.updated && note.updated.getTime() !== note.date.getTime()
			? `<div class="updated-date">Updated ${formatDate(note.updated)}</div>`
			: '';

	// Hero section - same treatment as posts
	const heroSection = note.heroImage
		? `
		<header class="post-hero" style="--hero-image: ${imageSet(note.heroImage)}">
			<div class="post-hero-content">
				<time datetime="${isoDate(note.date)}">${formatDate(note.date)}</time>
				<h1>${note.title}</h1>
				${updatedLine}
			</div>
		</header>`
		: `
		<header class="post-header-simple">
			<time datetime="${isoDate(note.date)}">${formatDate(note.date)}</time>
			<h1>${note.title}</h1>
			${updatedLine}
		</header>`;

	const noteUrl = getUrl(note);
	const content = `
    ${heroSection}
    ${renderToc(note.toc)}
    <article class="prose post-body">
      ${note.html}
      ${
				note.tags && note.tags.length > 0
					? `
      <footer>
        <p class="tags-label">${strings.labels.tagged}</p>
        <ul class="tags">
          ${note.tags.map((tag) => `<li><span class="tag">${tag}</span></li>`).join('')}
        </ul>
      </footer>`
					: ''
			}
    </article>
    ${renderRelatedPosts(note.relatedPosts)}
    ${renderBacklinks(noteUrl, ctx.backlinks)}`;

	return baseTemplate({
		title: note.title,
		description: note.description || `A note from ${formatDate(note.date)}`,
		url: noteUrl,
		content,
		type: 'article',
		date: note.date,
		updated: note.updated,
		heroImage: note.heroImage,
		cssFilename: ctx.cssFilename,
		// JSON-LD enhancements
		tags: note.tags,
		wordCount: note.wordCount,
		articleSection: 'notes',
		breadcrumbs: [
			{ name: 'Home', url: '/' },
			{ name: 'Notes', url: '/notes/' },
			{ name: note.title, url: noteUrl },
		],
	});
}

// Render single photo
function renderPhoto(photo: Photo, ctx: BuildContext): string {
	const photoId = `lightbox-${photo.slug}`;

	// Get all published photos for filmstrip navigation
	const allPhotos = ctx.photos
		.filter((p) => !p.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	// Build filmstrip + arrow key navigation
	const currentIndex = allPhotos.findIndex((p) => p.slug === photo.slug);
	// Filmstrip is left-to-right newest-first, so left arrow = lower index (newer), right = higher (older)
	const leftPhoto = currentIndex > 0 ? allPhotos[currentIndex - 1] : null;
	const rightPhoto = currentIndex < allPhotos.length - 1 ? allPhotos[currentIndex + 1] : null;

	const filmstrip =
		allPhotos.length > 1
			? `
      <nav class="photo-filmstrip" aria-label="Photo navigation">
        ${allPhotos
					.map(
						(p, i) => `
          <a href="${getUrl(p)}" class="filmstrip-thumb${p.slug === photo.slug ? ' is-current' : ''}" style="--i: ${i}">
            <img src="${p.image}" alt="${p.title}" loading="lazy">
          </a>`,
					)
					.join('')}
      </nav>
      <script>
        document.addEventListener('keydown', function(e) {
          var lb = document.getElementById('${photoId}');
          if (lb && lb.checked) { if (e.key === 'Escape') { lb.checked = false; } return; }
          if (e.target !== lb && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
          ${leftPhoto ? `if (e.key === 'ArrowLeft') window.location.href = '${getUrl(leftPhoto)}';` : ''}
          ${rightPhoto ? `if (e.key === 'ArrowRight') window.location.href = '${getUrl(rightPhoto)}';` : ''}
        });
      </script>`
			: '';

	const content = `
    <article class="photo-single">
      <input type="checkbox" id="${photoId}" class="lightbox-toggle" tabindex="-1" aria-controls="lightbox-panel-${photo.slug}">
      <figure class="polaroid">
        <label for="${photoId}" class="photo-expand" title="Click to expand">
          ${pictureElement(photo.image, photo.alt, 'loading="lazy"')}
        </label>
        <figcaption class="polaroid-caption">
          ${photo.observation ? `<p class="observation">${photo.observation}</p>` : ''}
          <div class="photo-meta">
            <time datetime="${isoDate(photo.date)}">${formatDate(photo.date)}</time>
            ${photo.location ? `<span class="location">· ${photo.location}</span>` : ''}
          </div>
        </figcaption>
      </figure>
      <label for="${photoId}" id="lightbox-panel-${photo.slug}" class="lightbox-overlay" aria-hidden="true" tabindex="-1">
        ${pictureElement(photo.image, photo.alt)}
        <span class="sr-only">Press Escape to close</span>
      </label>
      <script>
        (function() {
          var cb = document.getElementById('${photoId}');
          var overlay = document.getElementById('lightbox-panel-${photo.slug}');
          var trigger = document.querySelector('[for="${photoId}"].photo-expand');
          cb.addEventListener('change', function() {
            if (cb.checked) {
              overlay.focus();
            } else {
              trigger.focus();
            }
          });
        })();
      </script>
      ${filmstrip}
      ${photo.html ? `<div class="prose photo-body">${photo.html}</div>` : ''}
    </article>`;

	const photoUrl = getUrl(photo);
	return baseTemplate({
		title: photo.title,
		description: photo.observation || photo.alt,
		url: photoUrl,
		content,
		type: 'article',
		date: photo.date,
		heroImage: photo.image,
		cssFilename: ctx.cssFilename,
		breadcrumbs: [
			{ name: 'Home', url: '/' },
			{ name: 'Photos', url: '/photos/' },
			{ name: photo.title, url: photoUrl },
		],
	});
}

// Render page
function renderPage(page: Page, ctx: BuildContext): string {
	const content = `
    <header class="archive-header">
      <h1>${page.title}</h1>
      ${page.description ? `<p class="archive-intro">${page.description}</p>` : ''}
    </header>
    <article class="prose page-body">
      ${page.html}
    </article>`;

	const pageUrl = getUrl(page);
	return baseTemplate({
		title: page.title,
		description: page.description || config.description,
		url: pageUrl,
		content,
		cssFilename: ctx.cssFilename,
		breadcrumbs: [
			{ name: 'Home', url: '/' },
			{ name: page.title, url: pageUrl },
		],
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
		breadcrumbs: [
			{ name: 'Home', url: '/' },
			{ name: 'About', url: '/about/' },
			{ name: soul.title, url: getUrl(soul) },
		],
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
		breadcrumbs: [
			{ name: 'Home', url: '/' },
			{ name: 'About', url: '/about/' },
			{ name: skills.title, url: getUrl(skills) },
		],
	});
}

// Render posts index — editorial archive layout
function renderPostsIndex(posts: Post[], ctx: BuildContext): string {
	const publishedPosts = posts
		.filter((p) => !p.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	// Group posts by year
	const postsByYear = publishedPosts.reduce(
		(acc, post) => {
			const year = post.date.getFullYear();
			if (!acc[year]) acc[year] = [];
			acc[year].push(post);
			return acc;
		},
		{} as Record<number, Post[]>,
	);

	const years = Object.keys(postsByYear)
		.map(Number)
		.sort((a, b) => b - a);

	const content = `
    <header class="archive-header">
      <h1>Writing</h1>
      <p class="archive-intro">Essays on judgment & systems</p>
    </header>
    ${
			publishedPosts.length > 0
				? `
    <div class="archive-grid">
      ${years
				.map(
					(year) => `
        <section class="archive-year">
          <h2 class="year-heading">${year}</h2>
          <ul class="archive-list">
            ${postsByYear[year]
							.map(
								(post) => `
            <li class="archive-item">
              <time datetime="${isoDate(post.date)}">${formatDateArchive(post.date)}</time>
              <a href="${getUrl(post)}" class="archive-link">
                <span class="archive-title">${processInlineMarkdown(post.title)}</span>
                <span class="archive-desc">${processInlineMarkdown(post.description)}</span>
              </a>
            </li>`,
							)
							.join('')}
          </ul>
        </section>`,
				)
				.join('')}
    </div>`
				: `<p class="empty-state">${strings.empty.posts}</p>`
		}`;

	return baseTemplate({
		title: 'Writing',
		description: 'Long-form writing about building, design, and life.',
		url: '/posts/',
		content,
		cssFilename: ctx.cssFilename,
		breadcrumbs: [
			{ name: 'Home', url: '/' },
			{ name: 'Posts', url: '/posts/' },
		],
	});
}

// Render notes index — mirrors posts archive layout
function renderNotesIndex(notes: Note[], ctx: BuildContext): string {
	const publishedNotes = notes
		.filter((n) => !n.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	// Group notes by year (same as posts)
	const notesByYear = publishedNotes.reduce(
		(acc, note) => {
			const year = note.date.getFullYear();
			if (!acc[year]) acc[year] = [];
			acc[year].push(note);
			return acc;
		},
		{} as Record<number, Note[]>,
	);

	const years = Object.keys(notesByYear)
		.map(Number)
		.sort((a, b) => b - a);

	const content = `
    <header class="archive-header">
      <h1>Notes</h1>
      <p class="archive-intro">In-progress thinking</p>
    </header>
    ${
			publishedNotes.length > 0
				? `
    <div class="archive-grid">
      ${years
				.map(
					(year) => `
        <section class="archive-year">
          <h2 class="year-heading">${year}</h2>
          <ul class="archive-list">
            ${notesByYear[year]
								.map(
									(note) => `
	              <li class="archive-item">
	                <time datetime="${isoDate(getEffectiveUpdatedDate(note))}">Updated ${formatDateArchive(getEffectiveUpdatedDate(note))}</time>
	                <a href="${getUrl(note)}" class="archive-link">
	                  <span class="archive-title">${processInlineMarkdown(note.title)}</span>
	                  ${note.description ? `<span class="archive-desc">${processInlineMarkdown(note.description)}</span>` : ''}
	                </a>
	              </li>`,
							)
							.join('')}
          </ul>
        </section>`,
				)
				.join('')}
    </div>`
				: `<p class="empty-state">${strings.empty.notes}</p>`
		}`;

	return baseTemplate({
		title: 'Notes',
		description: 'Quick thoughts and observations.',
		url: '/notes/',
		content,
		cssFilename: ctx.cssFilename,
		breadcrumbs: [
			{ name: 'Home', url: '/' },
			{ name: 'Notes', url: '/notes/' },
		],
	});
}

// Render drafts scratchpad — hidden index of drafts and books (not in sitemap/robots)
function renderDraftsScratchpad(ctx: BuildContext): string {
	const draftPosts = ctx.posts
		.filter((p) => p.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());
	const draftNotes = ctx.notes
		.filter((n) => n.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	const content = `
    <header class="archive-header">
      <h1>Scratchpad</h1>
      <p class="archive-intro">Drafts and works in progress</p>
    </header>

    <div class="archive-grid">
    ${
			draftPosts.length > 0
				? `
      <section class="archive-year">
        <h2 class="year-heading">Posts</h2>
        <ul class="archive-list">
          ${draftPosts
						.map(
							(post) => `
            <li class="archive-item">
              <time datetime="${isoDate(post.date)}">${formatDateArchive(post.date)}</time>
              <a href="/drafts/${post.slug}/" class="archive-link">
                <span class="archive-title">${processInlineMarkdown(post.title)}</span>
                ${post.description ? `<span class="archive-desc">${processInlineMarkdown(post.description)}</span>` : ''}
              </a>
            </li>`,
						)
						.join('')}
        </ul>
      </section>`
				: ''
		}

    ${
			draftNotes.length > 0
				? `
      <section class="archive-year">
        <h2 class="year-heading">Notes</h2>
        <ul class="archive-list">
          ${draftNotes
						.map(
							(note) => `
            <li class="archive-item">
              <time datetime="${isoDate(note.date)}">${formatDateArchive(note.date)}</time>
              <a href="/drafts/${note.slug}/" class="archive-link">
                <span class="archive-title">${processInlineMarkdown(note.title)}</span>
                ${note.description ? `<span class="archive-desc">${processInlineMarkdown(note.description)}</span>` : ''}
              </a>
            </li>`,
						)
						.join('')}
        </ul>
      </section>`
				: ''
		}

    ${
			ctx.books.length > 0
				? `
      <section class="archive-year">
        <h2 class="year-heading">Books</h2>
        <ul class="archive-list">
          ${ctx.books
						.map(
							(book) => `
            <li class="archive-item">
              <span class="archive-item-spacer"></span>
              <a href="/books/${book.slug}/" class="archive-link">
                <span class="archive-title">${processInlineMarkdown(book.title)}</span>
                ${book.description ? `<span class="archive-desc">${processInlineMarkdown(book.description)}</span>` : ''}
              </a>
            </li>`,
						)
						.join('')}
        </ul>
      </section>`
				: ''
		}
    </div>

    ${draftPosts.length === 0 && draftNotes.length === 0 && ctx.books.length === 0 ? '<p class="empty-state">Nothing here yet.</p>' : ''}
  `;

	return baseTemplate({
		title: 'Scratchpad',
		description: 'Work in progress',
		url: '/drafts-scratchpad/',
		content,
		cssFilename: ctx.cssFilename,
		noIndex: true,
	});
}

// Render photos index — visual observations, Polaroid aesthetic
function renderPhotosIndex(photos: Photo[], ctx: BuildContext): string {
	const publishedPhotos = photos
		.filter((p) => !p.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	const content = `
    <header class="archive-header">
      <h1>Photos</h1>
      <p class="archive-intro">Sometimes words aren't the right container — sometimes <a href="/posts/photography-as-interface/">the frame is</a>. A small archive.</p>
    </header>
    ${
			publishedPhotos.length > 0
				? `
    <div class="photos-grid">
      ${publishedPhotos
				.map(
					(photo, i) => `
      <a href="${getUrl(photo)}" class="photo-card" style="--i: ${i}">
        <figure class="polaroid-thumb">
          ${pictureElement(photo.image, photo.alt, 'loading="lazy"')}
          <figcaption>
            ${photo.observation ? `<span class="observation-preview">${photo.observation}</span>` : `<span class="photo-title">${photo.title}</span>`}
          </figcaption>
        </figure>
      </a>`,
				)
				.join('')}
    </div>`
				: `<p class="empty-state">${strings.empty.photos}</p>`
		}`;

	return baseTemplate({
		title: 'Photos',
		description: 'Visual observations and moments.',
		url: '/photos/',
		content,
		cssFilename: ctx.cssFilename,
		breadcrumbs: [
			{ name: 'Home', url: '/' },
			{ name: 'Photos', url: '/photos/' },
		],
	});
}

// Corner marks for thesis bounding box
const thesisCornerTL = glyphCornerTL.replace(
	'class="glyph glyph-corner glyph-corner--tl"',
	'class="thesis-corner thesis-corner-tl"',
);

const thesisCornerBR = glyphCornerBR.replace(
	'class="glyph glyph-corner glyph-corner--br"',
	'class="thesis-corner thesis-corner-br"',
);

// Render home page
function renderHome(ctx: BuildContext): string {
	// Get all published posts sorted by date
	const allPosts = ctx.posts
		.filter((p) => !p.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	// Latest post for featured treatment
	const latestPost = allPosts[0];

	// Remaining posts for chronology (limit to 4)
	const morePosts = allPosts.slice(1, 5);

	// Recent notes
	const recentNotes = ctx.notes
		.filter((n) => !n.draft)
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, 3);

	// Featured latest post — hero background treatment
	const latestWritingSection = latestPost
		? `
    <section class="home-section home-featured" aria-label="Latest writing">
      <article class="featured-card"${latestPost.heroImage ? ` style="--featured-hero: ${imageSet(latestPost.heroImage)}"` : ''}>
        <a href="${getUrl(latestPost)}" class="featured-card-link">
          <span class="featured-label">Latest</span>
          <time datetime="${isoDate(latestPost.date)}">${formatDate(latestPost.date)}</time>
          <h2 class="featured-card-title">${processInlineMarkdown(latestPost.title)}</h2>
          ${latestPost.description ? `<p class="featured-card-desc">${latestPost.description}</p>` : ''}
        </a>
      </article>
    </section>`
		: '';

	// More Writing section - chronological list with descriptions
	const moreWritingSection =
		morePosts.length > 0
			? `
    <section class="home-section home-writing" aria-label="More writing">
      <div class="section-header">
        <span class="section-label">More Writing</span>
        <a href="/posts/" class="section-link">View all →</a>
      </div>
      <ul class="post-list-compact">
        ${morePosts
					.map(
						(post) => `
        <li>
          <a href="${getUrl(post)}">
            <time datetime="${isoDate(post.date)}">${formatDateArchive(post.date)}</time>
            <span class="post-title">${processInlineMarkdown(post.title)}</span>
            ${post.description ? `<span class="post-desc">${processInlineMarkdown(post.description)}</span>` : ''}
          </a>
        </li>`,
					)
					.join('')}
      </ul>
    </section>`
			: '';

	// Notes section - living documents with visible update recency
	const notesSection =
		recentNotes.length > 0
			? `
    <section class="home-section home-notes" aria-label="Notes">
      <div class="section-header">
        <span class="section-label">Notes</span>
        <a href="/notes/" class="section-link">View all →</a>
      </div>
      <ul class="notes-list-compact">
        ${recentNotes
					.map(
						(note) => `
        <li class="note-item">
          <a href="${getUrl(note)}" class="note-link">
            <span class="note-title">${processInlineMarkdown(note.title)}</span>
            <time class="note-updated" datetime="${isoDate(getEffectiveUpdatedDate(note))}">Updated ${formatDateArchive(getEffectiveUpdatedDate(note))}</time>
            ${note.description ? `<span class="note-desc">${processInlineMarkdown(note.description)}</span>` : ''}
          </a>
        </li>`,
					)
					.join('')}
      </ul>
    </section>`
			: '';

	const content = `
    <section class="thesis" aria-label="Site thesis">
      <div class="thesis-bound" aria-hidden="true">
        ${thesisCornerTL}
        ${thesisCornerBR}
      </div>
      <div class="thesis-content">
        <h1 class="thesis-headline">${strings.thesis.headline}</h1>
        <p class="thesis-body">${strings.thesis.body}</p>
        <p class="thesis-orientation">${strings.thesis.orientation}</p>
      </div>
    </section>

    <div class="home-content">
      ${latestWritingSection}
      ${moreWritingSection}
      ${notesSection}
    </div>`;

	return baseTemplate({
		title: config.title,
		description: config.description,
		url: '/',
		content,
		cssFilename: ctx.cssFilename,
	});
}

// Extract cover image from Chapter 0 if available
function getBookCoverImage(book: Book): string | null {
	const chapter0 = book.chapters.find((ch) => ch.chapterNumber === 0);
	if (!chapter0) return null;
	const imgMatch = chapter0.html.match(/<img[^>]+src="([^"]+)"/);
	return imgMatch ? imgMatch[1] : null;
}

// Render book index page (table of contents)
function renderBook(book: Book, ctx: BuildContext): string {
	const mainChapters = book.chapters.filter((ch) => ch.chapterNumber > 0 && !ch.draft);
	const chapter0 = book.chapters.find((ch) => ch.chapterNumber === 0);
	const coverImage = book.coverImage || getBookCoverImage(book);
	const totalWords = mainChapters.reduce((sum, ch) => sum + (ch.wordCount || 0), 0);
	const totalReadingTime = mainChapters.reduce((sum, ch) => sum + (ch.readingTime || 0), 0);

	// JSON-LD Schema for the book
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Book',
		name: book.title,
		author: { '@type': 'Person', name: book.author },
		description: book.description,
		genre: book.genre,
		url: `${config.url}${getBookUrl(book)}`,
		...(coverImage && { image: `${config.url}${coverImage}` }),
		numberOfPages: mainChapters.length,
		bookFormat: 'EBook',
	};

	const content = `
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <article class="book-page">
      <header class="book-header">
        ${coverImage ? `<img src="${coverImage}" alt="Cover of ${book.title}" class="book-cover"/>` : ''}
        <div class="book-header-text">
          <h1>${book.title}</h1>
          <p class="book-author">by ${book.author}</p>
          ${book.genre ? `<p class="book-genre">${book.genre}</p>` : ''}
          ${book.status === 'in-progress' ? '<p class="book-status">📝 In Progress</p>' : ''}
          <p class="book-meta">${mainChapters.length} chapters · ${totalWords.toLocaleString()} words · ${totalReadingTime} min read</p>
        </div>
      </header>
      
      ${
				chapter0
					? `
      <section class="book-synopsis">
        <a href="${getUrl(chapter0)}" class="synopsis-link">
          <span class="synopsis-label">Synopsis</span>
          <span class="synopsis-arrow">→</span>
        </a>
      </section>
      `
					: ''
			}

      <section class="book-description prose">
        <p>${book.description}</p>
      </section>

      <section class="book-toc">
        <h2>Chapters</h2>
        <ol class="chapter-list">
          ${mainChapters
						.map(
							(ch) => `
            <li>
              <a href="${getUrl(ch)}">
                <span class="chapter-number">${ch.chapterNumber}</span>
                <span class="chapter-title">${ch.chapterTitle}</span>
                ${ch.readingTime ? `<span class="chapter-time">${ch.readingTime} min</span>` : ''}
              </a>
            </li>`,
						)
						.join('')}
        </ol>
      </section>
    </article>`;

	return baseTemplate({
		title: book.title,
		description: book.description,
		url: getBookUrl(book),
		content,
		cssFilename: ctx.cssFilename,
		breadcrumbs: [
			{ name: 'Home', url: '/' },
			{ name: 'Books', url: '/books/' },
			{ name: book.title, url: getBookUrl(book) },
		],
	});
}

// Render individual chapter - 2026 book reading experience
function renderChapter(chapter: Chapter, book: Book, ctx: BuildContext): string {
	const mainChapters = book.chapters.filter((ch) => ch.chapterNumber > 0 && !ch.draft);
	const chapterIndex = book.chapters.findIndex((ch) => ch.slug === chapter.slug);
	const mainIndex = mainChapters.findIndex((ch) => ch.slug === chapter.slug);
	const prevChapter = chapterIndex > 0 ? book.chapters[chapterIndex - 1] : null;
	const nextChapter =
		chapterIndex < book.chapters.length - 1 ? book.chapters[chapterIndex + 1] : null;

	const isChapter0 = chapter.chapterNumber === 0;
	const coverImage = getBookCoverImage(book);

	// Extract first image as hero, remove H1 (we have our own header)
	let heroImage = '';
	let heroImageSrc = '';
	let chapterBody = chapter.html;

	// Find and extract first image for hero
	const imgMatch = chapterBody.match(/<img[^>]+src="([^"]+)"[^>]*>/);
	if (imgMatch) {
		heroImageSrc = imgMatch[1];
		// Chapter 0 gets special cover treatment (no crop), others get landscape crop
		const heroClass = isChapter0 ? 'chapter-hero-img chapter-cover-img' : 'chapter-hero-img';
		heroImage = imgMatch[0].replace('<img', `<img class="${heroClass}"`);
		chapterBody = chapterBody.replace(imgMatch[0], ''); // Remove from body
	}

	// Remove the first H1 (redundant with our header)
	chapterBody = chapterBody.replace(/<h1[^>]*>.*?<\/h1>/i, '');

	// Progress through book (based on main chapters only)
	const progress = mainIndex >= 0 ? Math.round(((mainIndex + 1) / mainChapters.length) * 100) : 0;

	// JSON-LD for chapter
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Chapter',
		name: chapter.chapterTitle,
		position: chapter.chapterNumber,
		isPartOf: {
			'@type': 'Book',
			name: book.title,
			author: { '@type': 'Person', name: book.author },
		},
		url: `${config.url}${getUrl(chapter)}`,
		...(heroImageSrc && { image: `${config.url}${heroImageSrc}` }),
	};

	const content = `
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <div class="book-reader ${isChapter0 ? 'is-chapter-0' : ''}">
      <!-- Sidebar: Chapter Navigation -->
      <aside class="book-sidebar">
        <a href="${getBookUrl(book)}" class="sidebar-header-link">
          ${coverImage ? `<img src="${coverImage}" alt="${book.title}" class="sidebar-cover"/>` : ''}
          <div class="sidebar-header-text">
            <span class="book-title-text">${book.title}</span>
            ${!isChapter0 ? `<span class="book-progress">${progress}% complete</span>` : '<span class="book-progress">Synopsis</span>'}
          </div>
        </a>
        <nav class="chapter-toc">
          <ol>
            ${book.chapters
							.map(
								(ch, i) => `
              <li class="${ch.slug === chapter.slug ? 'current' : ''} ${i < chapterIndex ? 'read' : ''} ${ch.chapterNumber === 0 ? 'is-synopsis' : ''}">
                <a href="${getUrl(ch)}">
                  <span class="toc-num">${ch.chapterNumber === 0 ? '◆' : ch.chapterNumber}</span>
                  <span class="toc-title">${ch.chapterNumber === 0 ? 'Synopsis' : ch.chapterTitle}</span>
                </a>
              </li>`,
							)
							.join('')}
          </ol>
        </nav>
      </aside>

      <!-- Main Reading Area -->
      <article class="chapter-page ${isChapter0 ? 'chapter-synopsis' : ''}">
        ${heroImage ? `<figure class="chapter-hero ${isChapter0 ? 'chapter-hero-cover' : ''}">${heroImage}</figure>` : ''}
        
        <header class="chapter-header">
          ${isChapter0 ? '<span class="chapter-label">Synopsis</span>' : `<span class="chapter-label">Chapter ${chapter.chapterNumber}</span>`}
          <h1>${isChapter0 ? book.title : chapter.chapterTitle}</h1>
          ${chapter.readingTime ? `<span class="reading-time">${chapter.readingTime} min read</span>` : ''}
        </header>
        
        <div class="chapter-content prose">
          ${chapterBody}
        </div>

        <nav class="chapter-nav">
          ${prevChapter ? `<a href="${getUrl(prevChapter)}" class="nav-prev"><span class="nav-label">Previous</span><span class="nav-title">${prevChapter.chapterTitle}</span></a>` : '<span class="nav-placeholder"></span>'}
          ${nextChapter ? `<a href="${getUrl(nextChapter)}" class="nav-next"><span class="nav-label">Next</span><span class="nav-title">${nextChapter.chapterTitle}</span></a>` : '<span class="nav-placeholder"></span>'}
        </nav>
      </article>
    </div>`;

	return baseTemplate({
		title: `${chapter.chapterTitle} — ${book.title}`,
		description: `Chapter ${chapter.chapterNumber} of ${book.title}`,
		url: getUrl(chapter),
		content,
		cssFilename: ctx.cssFilename,
		breadcrumbs: [
			{ name: 'Home', url: '/' },
			{ name: 'Books', url: '/books/' },
			{ name: book.title, url: getBookUrl(book) },
			{ name: chapter.chapterTitle, url: getUrl(chapter) },
		],
	});
}

// Render books index page — editorial library layout
function renderBooksIndex(books: Book[], ctx: BuildContext): string {
	// Filter out draft books from the index
	const publishedBooks = books.filter((b) => b.status !== 'draft');

	const content = `
    <header class="archive-header">
      <h1>Library</h1>
      <p class="archive-intro">Longer-form work. Novels, collections, and things that needed more space.</p>
    </header>
    ${
			publishedBooks.length > 0
				? `
    <div class="books-grid">
      ${publishedBooks
				.map((book) => {
					const coverImage = book.coverImage || getBookCoverImage(book);
					const mainChapters = book.chapters.filter((ch) => ch.chapterNumber > 0 && !ch.draft);
					const totalWords = mainChapters.reduce((sum, ch) => sum + (ch.wordCount || 0), 0);
					return `
        <article class="book-card">
          <a href="${getBookUrl(book)}" class="book-card-link">
            ${coverImage ? `<figure class="book-card-cover"><img src="${coverImage}" alt="Cover of ${book.title}" loading="lazy"/></figure>` : ''}
            <div class="book-card-info">
              <h2 class="book-card-title">${book.title}</h2>
              <p class="book-card-author">by ${book.author}</p>
              ${book.genre ? `<p class="book-card-genre">${book.genre}</p>` : ''}
              <p class="book-card-desc">${book.description}</p>
              <p class="book-card-meta">
                ${mainChapters.length} chapters · ${totalWords.toLocaleString()} words
                ${book.status === 'in-progress' ? ' · <span class="book-status-badge">In Progress</span>' : ''}
              </p>
            </div>
          </a>
        </article>`;
				})
				.join('')}
    </div>`
				: `<p class="empty-state">No books yet. Check back soon.</p>`
		}`;

	return baseTemplate({
		title: 'Library',
		description: 'Novels, collections, and longer-form writing.',
		url: '/books/',
		content,
		// Don't index if no published books
		noIndex: publishedBooks.length === 0,
		cssFilename: ctx.cssFilename,
		breadcrumbs: [
			{ name: 'Home', url: '/' },
			{ name: 'Books', url: '/books/' },
		],
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

// Render knowledge graph page
function renderGraph(ctx: BuildContext): string {
	const graphJson = JSON.stringify(ctx.graph);

	const content = `
    <div class="graph-page">
      <header class="graph-header">
        <h1>Knowledge Graph</h1>
        <p class="graph-intro">Connections between ideas. Click a node to visit, drag to explore.</p>
      </header>
      <div id="graph-container" class="graph-container" role="img" aria-label="Interactive knowledge graph visualization">
        <p class="sr-only">Interactive knowledge graph showing connections between posts and notes. Use the posts and notes indexes for an accessible list of all content.</p>
      </div>
    </div>
    <script type="module">
      const graphData = ${graphJson};
      
      // Simple force-directed graph using Canvas
      const container = document.getElementById('graph-container');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      container.appendChild(canvas);
      
      let nodes = [];
      let links = [];
      let nodeMap = new Map();
      
      function resize() {
        const width = container.clientWidth || 300;
        canvas.width = width;
        canvas.height = Math.min(600, window.innerHeight - 200);
      }
      
      function initNodes() {
        nodes = graphData.nodes.map((n, i) => ({
          ...n,
          x: canvas.width / 2 + (Math.random() - 0.5) * 200,
          y: canvas.height / 2 + (Math.random() - 0.5) * 200,
          vx: 0,
          vy: 0,
        }));
        nodeMap = new Map(nodes.map(n => [n.id, n]));
        links = graphData.links.map(l => ({
          source: nodeMap.get(l.source),
          target: nodeMap.get(l.target),
        })).filter(l => l.source && l.target);
      }
      
      // Colors
      const colors = {
        post: '#c9a88c',
        note: '#a8c9a8',
        page: '#a8a8c9',
        link: 'rgba(150, 150, 150, 0.4)',
        text: getComputedStyle(document.documentElement).getPropertyValue('--color-text-primary').trim() || '#333',
      };
      
      // Physics simulation
      function simulate() {
        // Repulsion between nodes
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 1000 / (dist * dist);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            nodes[i].vx -= fx;
            nodes[i].vy -= fy;
            nodes[j].vx += fx;
            nodes[j].vy += fy;
          }
        }
        
        // Attraction along links
        for (const link of links) {
          const dx = link.target.x - link.source.x;
          const dy = link.target.y - link.source.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (dist - 100) * 0.01;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          link.source.vx += fx;
          link.source.vy += fy;
          link.target.vx -= fx;
          link.target.vy -= fy;
        }
        
        // Center gravity
        for (const node of nodes) {
          node.vx += (canvas.width / 2 - node.x) * 0.001;
          node.vy += (canvas.height / 2 - node.y) * 0.001;
        }
        
        // Apply velocity with damping
        for (const node of nodes) {
          node.vx *= 0.9;
          node.vy *= 0.9;
          node.x += node.vx;
          node.y += node.vy;
          // Bounds
          node.x = Math.max(50, Math.min(canvas.width - 50, node.x));
          node.y = Math.max(50, Math.min(canvas.height - 50, node.y));
        }
      }
      
      // Draw
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw links
        ctx.strokeStyle = colors.link;
        ctx.lineWidth = 1;
        for (const link of links) {
          ctx.beginPath();
          ctx.moveTo(link.source.x, link.source.y);
          ctx.lineTo(link.target.x, link.target.y);
          ctx.stroke();
        }
        
        // Draw nodes
        for (const node of nodes) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = colors[node.type] || colors.page;
          ctx.fill();
          ctx.strokeStyle = 'rgba(0,0,0,0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        
        // Draw labels
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = colors.text;
        for (const node of nodes) {
          ctx.fillText(node.title.slice(0, 25), node.x, node.y + 20);
        }
      }
      
      // Interaction
      let dragNode = null;
      canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        for (const node of nodes) {
          const dx = node.x - x;
          const dy = node.y - y;
          if (dx * dx + dy * dy < 200) {
            dragNode = node;
            break;
          }
        }
      });
      
      canvas.addEventListener('mousemove', (e) => {
        if (dragNode) {
          const rect = canvas.getBoundingClientRect();
          dragNode.x = e.clientX - rect.left;
          dragNode.y = e.clientY - rect.top;
          dragNode.vx = 0;
          dragNode.vy = 0;
        }
      });
      
      canvas.addEventListener('mouseup', () => { dragNode = null; });
      canvas.addEventListener('mouseleave', () => { dragNode = null; });
      
      // Click to navigate
      canvas.addEventListener('click', (e) => {
        if (dragNode) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        for (const node of nodes) {
          const dx = node.x - x;
          const dy = node.y - y;
          if (dx * dx + dy * dy < 200) {
            window.location.href = node.url;
            break;
          }
        }
      });
      
      // Animation loop
      function loop() {
        simulate();
        draw();
        requestAnimationFrame(loop);
      }
      
      // Initialize after layout
      requestAnimationFrame(() => {
        resize();
        initNodes();
        window.addEventListener('resize', resize);
        loop();
      });
    </script>`;

	return baseTemplate({
		title: 'Knowledge Graph',
		description: 'Visual map of connections between ideas on this site.',
		url: '/graph/',
		content,
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

	// Drafts scratchpad (hidden, not in sitemap)
	output.push({ path: 'drafts-scratchpad/index.html', content: renderDraftsScratchpad(ctx) });

	// Posts (published)
	output.push({ path: 'posts/index.html', content: renderPostsIndex(ctx.posts, ctx) });
	for (const post of ctx.posts.filter((p) => !p.draft)) {
		output.push({ path: `posts/${post.slug}/index.html`, content: renderPost(post, ctx) });
	}

	// Drafts (hidden but accessible via direct URL)
	for (const post of ctx.posts.filter((p) => p.draft)) {
		output.push({ path: `drafts/${post.slug}/index.html`, content: renderPost(post, ctx) });
	}

	// Notes (published)
	output.push({ path: 'notes/index.html', content: renderNotesIndex(ctx.notes, ctx) });
	for (const note of ctx.notes.filter((n) => !n.draft)) {
		output.push({ path: `notes/${note.slug}/index.html`, content: renderNote(note, ctx) });
	}
	// Draft notes
	for (const note of ctx.notes.filter((n) => n.draft)) {
		output.push({ path: `drafts/${note.slug}/index.html`, content: renderNote(note, ctx) });
	}

	// Photos (published)
	output.push({ path: 'photos/index.html', content: renderPhotosIndex(ctx.photos, ctx) });
	for (const photo of ctx.photos.filter((p) => !p.draft)) {
		output.push({ path: `photos/${photo.slug}/index.html`, content: renderPhoto(photo, ctx) });
	}
	// Draft photos
	for (const photo of ctx.photos.filter((p) => p.draft)) {
		output.push({ path: `drafts/${photo.slug}/index.html`, content: renderPhoto(photo, ctx) });
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

	// Books index and individual book pages
	if (ctx.books.length > 0) {
		output.push({ path: 'books/index.html', content: renderBooksIndex(ctx.books, ctx) });
	}
	for (const book of ctx.books) {
		output.push({ path: `books/${book.slug}/index.html`, content: renderBook(book, ctx) });
		// Only render non-draft chapters
		for (const chapter of book.chapters.filter((ch) => !ch.draft)) {
			output.push({
				path: `books/${book.slug}/${chapter.slug}/index.html`,
				content: renderChapter(chapter, book, ctx),
			});
		}
	}

	// Knowledge graph
	output.push({ path: 'graph/index.html', content: renderGraph(ctx) });
	output.push({ path: 'graph.json', content: JSON.stringify(ctx.graph, null, 2) });

	// 404
	output.push({ path: '404.html', content: render404(ctx) });

	return output;
}

export { getUrl, formatDate, isoDate };
