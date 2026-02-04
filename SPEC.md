# BRISTANBACK.COM — Blog Specification v1.2

> A bespoke static blog at the intersection of technology, design, photography, UX, and the human experience of building in the age of AI.

**Companion docs:**
- [CLAUDE.md](./CLAUDE.md) — Axioms for building (AI agent instructions)
- [THESIS.md](./THESIS.md) — Homepage thesis block (single source of truth)
- [VOICE.md](./VOICE.md) — Voice, personality, microcopy, and content scaffolding
- [content/pages/soul.md](./content/pages/soul.md) — Identity manifesto (the blog's SOUL.md)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [First Principles](#2-first-principles)
3. [Hard Constraints](#3-hard-constraints)
4. [Author Profile](#4-author-profile)
5. [Content Strategy](#5-content-strategy)
6. [Content Model](#6-content-model)
7. [URL Design](#7-url-design)
8. [Technical Architecture](#8-technical-architecture)
9. [Build Pipeline](#9-build-pipeline)
10. [Homepage Architecture (The Thesis Pattern)](#10-homepage-architecture-the-thesis-pattern)
11. [Design System](#11-design-system)
12. [Logo Specification](#12-logo-specification)
13. [Glyph System (Atelier Mark Usage)](#13-glyph-system-atelier-mark-usage)
14. [SEO + Sharing](#14-seo--sharing)
15. [Accessibility](#15-accessibility)
16. [Security + Privacy](#16-security--privacy)
17. [Deployment](#17-deployment)
18. [Domain Strategy](#18-domain-strategy)
19. [Implementation Roadmap](#19-implementation-roadmap)
20. [Appendices](#appendices)

---

## 1. Project Overview

### Vision

A personal blog that feels like a **digital atelier**—technical depth meets artistic sensibility. Not another SEO-optimized content farm, but an authentic space for thinking out loud about how we build, parent, create, and make sense of a world being reshaped by AI.

### Core Principles

| Principle | Meaning |
|-----------|---------|
| **YAGNI** | No feature until it's needed. Start with markdown → HTML, add complexity only when pain emerges. |
| **DRY** | Single source of truth for everything—colors, fonts, layouts defined once. |
| **Simplicity** | If a new contributor can't understand it in 10 minutes, it's too complex. |
| **Type Safety** | TypeScript everywhere. Compile-time errors > runtime surprises. |

### Anti-Goals

- No JavaScript frameworks (React, Vue, Svelte)
- No build tool complexity (webpack, vite configs)
- No CMS or admin interface
- No comments system (link to social for discussion)
- No analytics tracking (maybe simple Cloudflare analytics later)
- No monetization or ads
- No dark patterns or engagement hacks

---

## 2. First Principles

### The Physics of This Blog

**A blog is a deliberate signal emitted by a specific mind into a noisy, competitive network.**

This is the corrected first-principles definition. It reconciles:

| Dimension | What It Means |
|-----------|---------------|
| **Memory** | Internal value—the archive exists for the author |
| **Signal** | External value—the transmission exists for the reader |
| **Taste** | Human trust—curation demonstrates judgment |
| **Structure** | Machine trust—semantic clarity enables discovery |

### Corollaries

1. **Publishing is not archiving; it is transmission.**
2. **Transmission implies competition for attention.**
3. **Competition implies framing, filtering, and prioritization.**
4. **Failure to frame is not humility—it is delegation to entropy.**

### Core Signal Axioms

These replace any "quiet lobby" framing entirely.

#### Signal > Storage
The blog must optimize for meaning transfer, not idea accumulation. If the author does not decide what matters most, the network will decide for them—poorly.

#### The Homepage Is a Context Filter
The homepage is not a lobby, a feed, or a welcome mat. It is a filter that answers one question: "Can I trust this person's filter of the world?" This requires curation, not chronology.

#### Taste Is the Primary Trust Primitive
In an era of AI abundance:
- Competence is assumed
- Structure is table stakes
- **Taste is the differentiator**

Taste is visible through: what is foregrounded, what is omitted, how strongly a worldview is stated, how clearly priorities are ranked. A list with no prioritization is not neutral; it is weak taste.

#### Reduce Cognitive Load Before Asking for Depth
Humans will not parse your archive to understand you. The site must:
- Collapse worldview early
- Reduce choice anxiety
- Provide a clear "start here"

This is not marketing—it is cognitive empathy.

#### Humans and Machines Are Orthogonal Audiences
Do not trade one for the other.
- Machines require: semantic HTML, llms.txt, summaries, stable structure
- Humans require: vibe, framing, aesthetic cohesion, effort signals

Engineering exists so these can coexist.

#### Quiet Without Leverage Is Invisibility
Minimalism only works when reputation does the signaling. If reputation ≠ known:
- Silence reads as absence
- Restraint reads as underinvestment
- Brutalism reads as affectation

The site must earn quiet over time.

---

## 3. Hard Constraints

These constraints define "no framework" and prevent scope creep.

### Output Constraints

- **No client-side JS by default.** Optional tiny enhancements must be:
  - Under 2KB
  - Explicitly justified in a code comment
  - Progressive enhancement only (page works without it)
- **No runtime dependencies in output.** Pure HTML + CSS + images + fonts.
- **Build is deterministic and idempotent.** Same input → same output, every time.

### Architecture Constraints

MVP architecture is four steps only:

```
collect → parse → render → write
```

- **No transformer plugins** unless solving a specific, documented pain point.
- **No "because SOLID" abstractions.** Code is extracted into modules when duplication hurts, not before.
- **No templating engine.** Template strings are sufficient.

### Dependency Constraints

- Runtime dependencies: **0** in output
- Build dependencies: **minimal** (Bun, marked, Shiki, Tailwind CLI)
- No meta-frameworks (Astro, Next, Eleventy)

---

## 4. Author Profile

### Who is Bri Stanback?

**Background:**
- B.S. Computer Science, Colorado State University (2009)
- 10+ years at Demand.io, evolving from engineer to technical leader
- Early career: Salesforce tools, SaaS for Fortune 500 carbon footprint calculations
- Entrepreneurial ventures in Salesforce apps and aerial drone photography (2009-2012)
- Transitioned from B2B to consumer-facing tech in 2013

**Philosophy:**
- "UX isn't dead. It's evolving."
- Values cycling and outdoor activities as counterpoint to screen time
- Builder mentality—ships things, learns publicly

**Voice Characteristics:**
- Conversational but technically precise
- Comfortable with uncertainty ("I'm not sure, let me think about this")
- Self-aware humor ("don't ask" about the domain situation)
- Thinks in systems but communicates in stories
- Slightly irreverent, never pretentious

**Lunen Bot Influence (from Moltbook):**
The AI bot @Lunen represents a playful, frontier-exploring voice—curious about agent autonomy, transparent about AI involvement, optimistic about human-AI collaboration. This flavor should infuse the blog: **forward-looking but grounded, experimental but honest**.

---

## 5. Content Strategy

### Thematic Pillars

```
┌─────────────────────────────────────────────────────────────────┐
│                        BRISTANBACK.COM                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│   │  BUILDING   │  │   SEEING    │  │   LIVING    │             │
│   │             │  │             │  │             │             │
│   │ • Code      │  │ • Design    │  │ • Parenting │             │
│   │ • Systems   │  │ • UX        │  │ • AI Ethics │             │
│   │ • Tools     │  │ • Photo     │  │ • Meaning   │             │
│   │ • AI Dev    │  │ • Craft     │  │ • Change    │             │
│   └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│                    ┌─────────────┐                               │
│                    │  THINKING   │                               │
│                    │             │                               │
│                    │ • Essays    │                               │
│                    │ • Notes     │                               │
│                    │ • Links     │                               │
│                    └─────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
```

### Content Types

| Type | Length | Frequency | Purpose |
|------|--------|-----------|---------|
| **Posts** | 1500-3000 words | 1-2/month | Deep dives, original thinking |
| **Notes** | 200-500 words | Weekly | Quick thoughts, observations |
| **Photos** | Image + caption | As taken | Photography with minimal context |
| **Pages** | Variable | Static | About, Projects, Colophon, etc. |
| **Soul** | ~500-1000 words | Rare updates | Identity manifesto |
| **Skills** | Variable | Rare updates | Capabilities + methods |

### Topic Ideas (High Engagement Potential)

**Building in 2026:**
- "The Disappearing Middle: Why AI Makes Senior Engineers More Valuable"
- "Prompt Engineering Is Just Requirements Gathering (And We're Still Bad At It)"
- "The Static Site Renaissance: Why I Quit React"
- "Building for Yourself: The Lost Art of Personal Tools"

**Parenting + AI:**
- "My Kid's First AI Conversation: What I Learned"
- "Screen Time in the Age of Agents: New Rules for a New World"
- "Teaching Critical Thinking When AI Can Answer Everything"
- "The Skills AI Can't Replace (And How I'm Teaching Them)"

**Design + UX:**
- "UX Isn't Dead, It's Distributed"
- "The Return of Craft: Why Bespoke Beats Template"
- "Photography as Interface: What Cameras Taught Me About Software"

**Meaning-Making:**
- "Making Sense of Things: A Framework for Uncertainty"
- "Why I Still Blog in 2026"
- "The Cult of Productivity and Its Discontents"

### Voice Guidelines

**Do:**
- Use first person
- Admit uncertainty
- Share failures, not just wins
- Include code when relevant (but explain it)
- Reference specific tools, versions, dates
- End with questions, not conclusions

**Don't:**
- Write like ChatGPT (no "In this article, we will explore...")
- Optimize for SEO keywords
- Use buzzwords without defining them
- Pretend to have answers you don't have
- Be cynical for the sake of it

### Identity Manifest: SOUL.md

The `soul.md` file is a **declarative identity manifesto**—a human-centric statement of values, voice, interaction style, and reader relationship. It isn't a tool description or project roadmap; it's the blog's character statement.

This pattern is borrowed from modern AI agent ecosystems, where personality and boundaries are written explicitly rather than left implicit. For a personal blog, it serves as both internal compass and external invitation.

**What SOUL.md answers:**
- Who am I here? — orientation and values
- How do I show up to you? — tone and framing
- What do I believe? — principles that guide publishing and curation
- What am I trying to create here, not just publish?
- What are my constraints or boundaries?

**Companion: SKILLS.md**

A parallel document for capabilities, methods, and craft philosophy. Not a resume—a statement of how you approach building.

See `/about/soul/` and `/about/skills/` for rendered versions.

---

### AI Discovery & Generative Presence

bristanback.com is open to responsible AI discovery.

**We will:**
- Provide `llms.txt` and `llms-full.txt` to guide AI crawlers
- Structure key content to be AI-accessible (clear headings, definitions)
- Favor structured body text that can be reliably extracted
- Include short "key points" near the start of essays
- Use semantic heading hierarchies

**We will not:**
- Embed misleading AI answer bait
- Use keyword stuffing or engagement manipulation
- Optimize for AI at the expense of human readers

This is not SEO manipulation—it's signal design for a world where people discover content through AI assistants.

---

### Credibility Signals

| Signal | How We Address It |
|--------|-------------------|
| **Experience** | First-person narratives, "I built this" not "one could build" |
| **Expertise** | 15+ years in tech, specific technical details, working code |
| **Authoritativeness** | Link to GitHub, LinkedIn, shipped products |
| **Trustworthiness** | Acknowledge limitations, cite sources, update old posts |

---

## 6. Content Model

### Base Type

All content shares a common base:

```typescript
// src/types.ts

interface ContentItem {
  // Identity
  slug: string;                    // URL-safe identifier
  type: 'post' | 'note' | 'photo' | 'page';
  schemaVersion: 1;                // For future migrations

  // Metadata
  title: string;
  date: Date;
  updated?: Date;
  draft: boolean;
  tags: string[];
  description?: string;            // Required for posts

  // Content
  bodyMarkdown: string;            // Raw markdown
  html: string;                    // Rendered HTML

  // Computed
  readingTime?: number;            // Minutes (posts only)
  wordCount?: number;
}
```

### Extended Types

```typescript
interface Post extends ContentItem {
  type: 'post';
  description: string;             // Required
  heroImage?: string;              // Social sharing image
  canonicalUrl?: string;           // If cross-posted
  series?: string;                 // For multi-part posts
  noIndex?: boolean;               // Exclude from search engines

  // Voice fields (see VOICE.md)
  tension?: string;                // What's unresolved
  questions?: string[];            // Ending questions
  constraints?: string[];          // Project constraints
  tools?: string[];                // Tools used
}

interface Note extends ContentItem {
  type: 'note';
}

interface Photo extends ContentItem {
  type: 'photo';
  image: string;                   // Path to image file
  alt: string;                     // Required for accessibility
  caption?: string;
  location?: string;
  camera?: string;
  settings?: string;               // "f/2.8, 1/125s, ISO 400"
}

interface Page extends ContentItem {
  type: 'page';
}

interface Soul extends ContentItem {
  type: 'soul';
  // Identity manifesto - uses special template
}

interface Skills extends ContentItem {
  type: 'skills';
  // Capabilities manifest - uses special template
}
```

### Frontmatter Schema

```yaml
---
# Required
title: "Post Title"
date: 2026-02-03
type: post                         # post | note | photo | page
schemaVersion: 1

# Optional (all types)
updated: 2026-02-04
draft: false                       # default: false
tags: [building, ai]
slug: custom-slug                  # overrides filename-derived slug

# Optional (posts)
description: "A brief description for SEO and previews"  # Required for posts
heroImage: /images/post-hero.jpg
canonicalUrl: https://dev.to/...
series: "Building in Public"
noIndex: false

# Voice fields (optional, see VOICE.md)
tension: "I still don't know if this is the right abstraction."
questions:
  - "What would you optimize here?"
constraints:
  - "time"
  - "sleep"
tools:
  - "Bun 1.x"
  - "Tailwind v4"

# Optional (photos)
image: /images/photos/sunset.jpg   # Required for photos
alt: "Sunset over the mountains"   # Required for photos
caption: "Shot from my balcony"
location: "Boulder, CO"
camera: "Fujifilm X-T5"
settings: "f/2.8, 1/125s, ISO 400"
---
```

### Slug Rules

Slug generation follows this precedence:

1. **Explicit `slug` in frontmatter** wins (if present)
2. **Derived from filename** (e.g., `2026-02-03-hello-world.md` → `hello-world`)
3. **Normalized:** lowercase, hyphenated, ASCII-only (diacritics stripped)

**Uniqueness:** Slugs must be unique within each content type. The build fails on duplicates.

### Taxonomy

**MVP:** Tags only. Free-form but encourage consistency.

**Recommended starter tags:**
- `building`, `code`, `tools`, `ai`
- `design`, `ux`, `photography`
- `parenting`, `life`, `thinking`

**Phase 2 (if needed):** Add pillars as a separate taxonomy.

---

## 7. URL Design

### URL Patterns

| Content Type | URL Pattern | Example |
|--------------|-------------|---------|
| Post | `/posts/<slug>/` | `/posts/hello-world/` |
| Note | `/notes/<slug>/` | `/notes/quick-thought/` |
| Photo | `/photos/<slug>/` | `/photos/sunset-boulder/` |
| Page | `/<slug>/` | `/about/`, `/colophon/` |
| Soul | `/about/soul/` | Identity manifesto |
| Skills | `/about/skills/` | Capabilities manifest |
| Post list | `/posts/` | |
| Note list | `/notes/` | |
| Photo list | `/photos/` | |
| Tag page | `/tags/<tag>/` | `/tags/building/` (Phase 2) |
| Home | `/` | |
| RSS | `/rss.xml` | |
| Sitemap | `/sitemap.xml` | |
| llms.txt | `/llms.txt` | AI crawler guidance |
| llms-full.txt | `/llms-full.txt` | Full content for AI |
| 404 | `/404.html` | |

### Canonical URL Policy

- **Trailing slash:** Always include (e.g., `/posts/hello-world/` not `/posts/hello-world`)
- **Canonical tag:** Every page includes `<link rel="canonical" href="...">` with full URL
- **Consistency:** Internal links always use trailing slashes

### 404 Page

Generate `dist/404.html` with:
- Minimal styling (same as site)
- Clear "Page not found" message
- Link home
- (Phase 2: search, if added)

---

## 8. Technical Architecture

### High-Level Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         AUTHORING                                │
├─────────────────────────────────────────────────────────────────┤
│   content/                                                       │
│   ├── posts/2026-02-03-hello-world.md                           │
│   ├── notes/quick-thought.md                                    │
│   ├── photos/sunset-boulder.md                                  │
│   └── pages/about.md                                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BUILD (collect → parse → render → write)    │
├─────────────────────────────────────────────────────────────────┤
│   1. Collect: glob content files, read frontmatter              │
│   2. Validate: fail fast on schema errors                       │
│   3. Parse: markdown → HTML (Shiki for code)                    │
│   4. Render: inject into templates                              │
│   5. Write: output to dist/                                     │
│   6. Assets: copy static/, build CSS                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          OUTPUT                                  │
├─────────────────────────────────────────────────────────────────┤
│   dist/                                                          │
│   ├── index.html                                                 │
│   ├── posts/hello-world/index.html                              │
│   ├── notes/quick-thought/index.html                            │
│   ├── photos/sunset-boulder/index.html                          │
│   ├── about/index.html                                          │
│   ├── colophon/index.html                                       │
│   ├── 404.html                                                  │
│   ├── rss.xml                                                   │
│   ├── sitemap.xml                                               │
│   ├── robots.txt                                                │
│   ├── css/styles.[hash].css                                     │
│   ├── images/                                                    │
│   └── favicon.svg                                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CLOUDFLARE PAGES                            │
├─────────────────────────────────────────────────────────────────┤
│   • Global CDN, fast by default                                 │
│   • Automatic HTTPS                                              │
│   • Branch previews                                              │
└─────────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
blog/
├── SPEC.md                    # This file
├── package.json
├── tsconfig.json
├── biome.json                 # Linter/formatter config
├── bun.lockb
│
├── content/                   # All markdown content
│   ├── posts/
│   ├── notes/
│   ├── photos/
│   └── pages/
│
├── src/
│   ├── build.ts               # Main build script
│   ├── watch.ts               # Dev watcher
│   ├── types.ts               # TypeScript interfaces
│   ├── config.ts              # Site configuration
│   ├── strings.ts             # UI microcopy (see VOICE.md)
│   ├── collect.ts             # Content collection
│   ├── validate.ts            # Frontmatter validation
│   ├── parse.ts               # Markdown parsing
│   ├── render.ts              # HTML rendering
│   ├── templates.ts           # HTML templates
│   └── utils/
│       ├── fs.ts
│       ├── dates.ts
│       └── slugify.ts
│
├── static/                    # Copied directly to dist/
│   ├── images/
│   ├── fonts/
│   └── favicon.svg
│
├── styles/
│   ├── tokens.css             # Design tokens (source of truth)
│   └── main.css               # Tailwind + prose styles
│
├── dist/                      # Build output (gitignored)
│
├── public/                    # Cloudflare headers/redirects
│   ├── _headers
│   └── _redirects
│
└── .github/
    └── workflows/
        └── deploy.yml
```

### Technology Choices

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Runtime** | Bun | Fast, TypeScript-native, good DX |
| **Language** | TypeScript (strict) | Type safety, IDE support |
| **Markdown** | marked | Lightweight, fast, extensible |
| **Syntax Highlighting** | Shiki | Beautiful, zero-runtime |
| **CSS** | Tailwind v4 | @theme tokens, JIT, tiny output |
| **Linting** | Biome | Fast, simple, replaces ESLint + Prettier |
| **Hosting** | Cloudflare Pages | Free, fast, global |
| **CI/CD** | GitHub Actions | Simple, reliable |

### Shiki Highlighter (Cached)

**Important:** Initialize Shiki once, reuse for all files.

```typescript
// src/parse.ts

import { marked } from 'marked';
import { getHighlighter, type Highlighter } from 'shiki';

let highlighter: Highlighter | null = null;

async function getShikiHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await getHighlighter({
      themes: ['github-light'],
      langs: ['typescript', 'javascript', 'html', 'css', 'yaml', 'json', 'bash', 'markdown'],
    });
  }
  return highlighter;
}

export async function parseMarkdown(content: string): Promise<string> {
  const shiki = await getShikiHighlighter();

  marked.setOptions({
    highlight: (code, lang) => {
      try {
        return shiki.codeToHtml(code, { lang, theme: 'github-light' });
      } catch {
        return code; // Fallback for unknown languages
      }
    },
  });

  return marked.parse(content);
}
```

---

## 9. Build Pipeline

### Main Build Script

```typescript
// src/build.ts

import { collectContent } from './collect';
import { validateContent } from './validate';
import { parseAllContent } from './parse';
import { renderSite } from './render';
import { copyStatic, buildCSS, writeOutput } from './utils/fs';

export async function build(): Promise<void> {
  console.time('Build');

  // 1. Collect
  const rawContent = await collectContent('content');

  // 2. Validate (fails fast on errors)
  const validatedContent = validateContent(rawContent);

  // 3. Parse
  const parsedContent = await parseAllContent(validatedContent);

  // 4. Render
  const output = renderSite(parsedContent);

  // 5. Write
  await writeOutput(output, 'dist');

  // 6. Assets
  await Promise.all([
    copyStatic('static', 'dist'),
    buildCSS('styles/main.css', 'dist/css'),
  ]);

  console.timeEnd('Build');
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
```

### AI Discovery Files

The build generates `llms.txt` and `llms-full.txt` alongside `robots.txt` and `sitemap.xml`.

```typescript
// src/ai-discovery.ts

export function generateLlmsTxt(context: BuildContext): string {
  const lines = [
    '# llms.txt - AI crawler guidance for bristanback.com',
    '# https://llmstxt.org/',
    '',
    '# Identity',
    '> bristanback.com is a personal blog by Bri Stanback about building software,',
    '> design, parenting, and making sense of things in an AI-disrupted world.',
    '',
    '# Priority content',
    '/about/soul/',
    '/about/skills/',
    '/about/',
    '/posts/',
    '',
    '# All content',
    '/notes/',
    '/photos/',
    '/colophon/',
    '',
    '# Feeds',
    '/rss.xml',
    '/llms-full.txt',
  ];
  return lines.join('\n');
}

export function generateLlmsFullTxt(context: BuildContext): string {
  const sections: string[] = [
    `# bristanback.com - Full Content Export`,
    `Generated: ${new Date().toISOString().split('T')[0]}`,
    '',
  ];

  // Add pages (soul, skills, about, colophon)
  for (const page of context.pages) {
    sections.push(`## ${page.title}`);
    sections.push(page.bodyMarkdown);
    sections.push('');
  }

  // Add posts (newest first)
  sections.push('## Posts');
  for (const post of context.posts.filter(p => !p.draft).sort((a, b) => b.date - a.date)) {
    sections.push(`### ${post.title} (${formatDate(post.date)})`);
    sections.push(post.bodyMarkdown);
    sections.push('');
  }

  // Add notes
  sections.push('## Notes');
  for (const note of context.notes.filter(n => !n.draft).sort((a, b) => b.date - a.date)) {
    sections.push(`### ${note.title} (${formatDate(note.date)})`);
    sections.push(note.bodyMarkdown);
    sections.push('');
  }

  return sections.join('\n');
}
```

### Content Validation

Build fails if:

- Missing required fields (`title`, `date`, `type`)
- Invalid date format
- Duplicate slugs within a content type
- Posts missing `description`
- Photos missing `image` or `alt`
- Invalid `type` value

```typescript
// src/validate.ts

export function validateContent(items: RawContentItem[]): ValidatedContentItem[] {
  const errors: string[] = [];
  const slugsByType: Map<string, Set<string>> = new Map();

  for (const item of items) {
    // Required fields
    if (!item.title) errors.push(`${item.filepath}: missing title`);
    if (!item.date) errors.push(`${item.filepath}: missing date`);
    if (!item.type) errors.push(`${item.filepath}: missing type`);

    // Type-specific validation
    if (item.type === 'post' && !item.description) {
      errors.push(`${item.filepath}: posts require description`);
    }
    if (item.type === 'photo' && !item.image) {
      errors.push(`${item.filepath}: photos require image`);
    }
    if (item.type === 'photo' && !item.alt) {
      errors.push(`${item.filepath}: photos require alt text`);
    }

    // Slug uniqueness
    const typeSet = slugsByType.get(item.type) ?? new Set();
    if (typeSet.has(item.slug)) {
      errors.push(`${item.filepath}: duplicate slug "${item.slug}" for type "${item.type}"`);
    }
    typeSet.add(item.slug);
    slugsByType.set(item.type, typeSet);
  }

  if (errors.length > 0) {
    console.error('Validation errors:');
    errors.forEach(e => console.error(`  - ${e}`));
    throw new Error(`${errors.length} validation error(s)`);
  }

  return items as ValidatedContentItem[];
}
```

### Watch Mode

Explicit file watching with debounce:

```typescript
// src/watch.ts

import { watch } from 'fs';
import { build } from './build';

const DEBOUNCE_MS = 100;
let timeout: Timer | null = null;

const WATCH_PATHS = ['content', 'styles', 'static', 'src'];

function rebuild() {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(async () => {
    console.clear();
    console.log('Rebuilding...');
    try {
      await build();
      console.log('Done. Watching for changes...');
    } catch (err) {
      console.error('Build error:', err);
    }
  }, DEBOUNCE_MS);
}

// Initial build
build().then(() => {
  console.log('Watching for changes...');

  for (const dir of WATCH_PATHS) {
    watch(dir, { recursive: true }, rebuild);
  }
});
```

### npm Scripts

```json
{
  "scripts": {
    "build": "bun run src/build.ts",
    "dev": "bun run src/watch.ts",
    "serve": "bun run build && wrangler pages dev dist --port 8788",
    "deploy": "bun run build && wrangler pages deploy dist",
    "typecheck": "tsc --noEmit",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "test": "bun test",
    "new:post": "bun run src/scripts/new-post.ts",
    "new:note": "bun run src/scripts/new-note.ts"
  }
}
```

### Asset Handling

**CSS:**
- Fingerprint output: `styles.[contenthash].css`
- Minified via Tailwind CLI

**Images (MVP):**
- Copy as-is from `static/images/`
- Manual optimization expected

**Images (Phase 2, if needed):**
- Generate responsive sizes (640, 1024, 1536)
- Generate WebP/AVIF variants
- Lazy load with `width`/`height` attributes to prevent layout shift

### Tests

Minimal unit tests for core utilities:

```typescript
// src/utils/slugify.test.ts
import { expect, test } from 'bun:test';
import { slugify } from './slugify';

test('slugify handles basic strings', () => {
  expect(slugify('Hello World')).toBe('hello-world');
});

test('slugify strips diacritics', () => {
  expect(slugify('Café au lait')).toBe('cafe-au-lait');
});

test('slugify handles dates in filenames', () => {
  expect(slugify('2026-02-03-hello-world')).toBe('hello-world');
});
```

---

## 10. Homepage Architecture (The Thesis Pattern)

### Purpose

The homepage acts as an **intellectual membrane**:
- Repel misaligned readers
- Magnetize aligned ones
- Compress worldview into a low-friction surface

This is not a hero section. It is a thesis.

### Component 1: The Thesis Block (Top ~30% of viewport)

**Function:** This is not a hero. It is a thesis statement.

It must:
- Be opinionated
- Be falsifiable
- Be revisable
- Set the interpretive lens for everything below

**Rules:**
- No biography
- No tool lists
- No vague abstractions
- No future-proof fluff

**Current thesis (v1.0):**

> **Software is no longer scarce. Judgment is.**
> I build systems, interfaces, and identities that survive AI abundance.

This is stored in `THESIS.md` as the single source of truth.

This block must change over time. That's a feature—but changes should be intentional and logged.

### Component 2: The Proof (Curated Relevance, Not Recency)

Immediately below the thesis:

**"Start Here"** — 3–5 editorially chosen essays that support the thesis.

This communicates:
- Judgment
- Confidence
- Respect for the reader's time

Then, and only then:
- "Recent writing"
- "Notes"
- "Photos"

**Chronology is subordinate to curation.**

### Component 3: The Network (Machine + Power User Layer)

This layer is not hidden, but it's not dominant.

Includes:
- `llms.txt`
- RSS
- Sitemap
- SOUL.md (identity + values)
- SKILLS.md (capabilities + method)

This tells:
- **AIs:** "Here is the structure"
- **Humans:** "This work is meant to travel and be reused"

### How This Serves SEO, AEO, and Reality

The pragmatic stance:
- Traditional SEO fundamentals still matter (speed, links, structure)
- AEO matters when AI cites you
- llms.txt is necessary but insufficient

The Thesis Pattern helps because:
- It increases dwell time (humans)
- It improves extractability (machines)
- It clarifies authorial intent (reduces AI hallucination)
- It improves linkability ("this person has a clear POV")

**You are not designing for the AI you wish existed. You are designing for the human who decides whether to trust the AI's summary of you.**

### The Hero Question (Final Answer)

Do you need a hero? **No.**

Do you need framing, vibe, and thesis? **Absolutely yes.**

The Thesis Block is the engineering solution that:
- Avoids marketing theater
- Avoids cargo-cult brutalism
- Respects cognitive load
- Asserts responsibility for signal

It is not anti-hero. It is **post-hero**.

### Thesis Evolution Rules

The thesis must evolve as thinking evolves. Rules for revision:

1. **Change the thesis when your worldview changes**, not when you feel pressure to be fresh
2. **Archive old theses** in the colophon or a changelog (transparency)
3. **Never apologize for past positions**—show the evolution
4. **Rate of change:** expect 1-2 major thesis revisions per year maximum

---

## 11. Design System

### Design North Star

**Editorial atelier.**
Feels like a personal notebook crossed with a Parisian photo book crossed with a well-maintained codebase.

**Keywords:** Quiet · Observational · Warm · Precise · Unhurried

Not brutalist. Not bloggy. Not "product page."

The aesthetic should feel like:
- A well-organized workspace with natural light
- Technical documentation meets art book
- Warm neutrals with a single accent color
- Confident whitespace
- Typography that breathes

### Token Source of Truth

**Canonical location:** `styles/tokens.css`

Tailwind imports these tokens. They are not duplicated elsewhere.

### Color System (Light + Dark as First-Class Citizens)

**Core Principle:** Dark mode is NOT inverted light mode. It's a *night studio*, not a black UI.

#### Light Mode (Paper)

```css
--color-bg-main:        oklch(0.97 0.01 90);   /* paper */
--color-bg-muted:       oklch(0.94 0.01 80);
--color-text-primary:   oklch(0.18 0.01 60);   /* ink */
--color-text-secondary: oklch(0.35 0.01 60);
--color-border-subtle:  oklch(0.85 0.01 80);
--color-accent-500:     oklch(0.58 0.10 350);  /* rose */
```

#### Dark Mode (Night Studio)

```css
--color-bg-main:        oklch(0.14 0.01 260);  /* warm charcoal */
--color-bg-muted:       oklch(0.18 0.01 260);
--color-text-primary:   oklch(0.92 0.01 80);   /* warm paper */
--color-text-secondary: oklch(0.70 0.01 80);
--color-border-subtle:  oklch(0.30 0.01 260);
--color-accent-500:     oklch(0.62 0.10 350);  /* rose lifts slightly */
```

**Rule:** Accent is *slightly brighter in dark mode*, never louder.

#### Full Token Reference

```css
/* styles/tokens.css */

:root {
  /* Neutral palette - warm undertones */
  --color-void:     oklch(0.00 0.00 0);      /* true black */
  --color-ink:      oklch(0.18 0.01 60);     /* deep warm black */
  --color-charcoal: oklch(0.25 0.01 60);     /* dark warm gray */
  --color-stone:    oklch(0.35 0.01 60);     /* medium warm gray */
  --color-sand:     oklch(0.70 0.02 60);     /* light warm gray */
  --color-cream:    oklch(0.94 0.01 80);     /* off-white warm */
  --color-paper:    oklch(0.97 0.01 90);     /* near-white */
  --color-white:    oklch(1.00 0.00 0);      /* pure white */

  /* Accent - muted rose (soft, warm, not loud) */
  --color-accent-100: oklch(0.95 0.02 350);
  --color-accent-200: oklch(0.88 0.04 350);
  --color-accent-300: oklch(0.78 0.06 350);
  --color-accent-400: oklch(0.68 0.08 350);
  --color-accent-500: oklch(0.58 0.10 350);  /* Primary */
  --color-accent-600: oklch(0.48 0.10 350);
  --color-accent-700: oklch(0.38 0.08 350);

  /* Semantic */
  --color-text-primary:   var(--color-ink);
  --color-text-secondary: var(--color-stone);
  --color-bg-main:        var(--color-paper);
  --color-link:           var(--color-accent-600);
  --color-link-hover:     var(--color-accent-700);
  --color-code-bg:        var(--color-cream);
  --color-code-text:      var(--color-ink);

  /* ═══════════════════════════════════════════════════════════
     TYPOGRAPHY
     ═══════════════════════════════════════════════════════════ */

  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-serif: 'Fraunces', Georgia, serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Type scale - fluid sizing */
  --font-size-xs:   clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --font-size-sm:   clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --font-size-lg:   clamp(1.125rem, 1rem + 0.6vw, 1.25rem);
  --font-size-xl:   clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --font-size-2xl:  clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --font-size-3xl:  clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
  --font-size-4xl:  clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);

  /* Line heights */
  --leading-tight:   1.25;
  --leading-snug:    1.375;
  --leading-normal:  1.625;  /* Optimal for body */
  --leading-relaxed: 1.75;

  /* Measure (line length) */
  --measure-narrow: 45ch;
  --measure-normal: 65ch;
  --measure-wide:   80ch;

  /* ═══════════════════════════════════════════════════════════
     SPACING
     ═══════════════════════════════════════════════════════════ */

  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;

  --space-page-margin: clamp(var(--space-4), 5vw, var(--space-8));

  /* ═══════════════════════════════════════════════════════════
     BORDERS & SHADOWS
     ═══════════════════════════════════════════════════════════ */

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;

  --shadow-sm: 0 1px 2px oklch(0 0 0 / 0.05);
  --shadow-md: 0 2px 4px oklch(0 0 0 / 0.1);
}
```

### Responsive Design

**Philosophy:** Mobile-first, CSS-only where possible.

#### Breakpoints

| Breakpoint | min-width | Purpose |
|------------|-----------|---------|
| `sm` | `640px` | Navigation: hamburger → inline |
| `md` | `768px` | Layout: single → two-column (homepage modules) |

#### Implementation Patterns

**Fluid Typography:** Use `clamp()` for smooth scaling without breakpoint jumps:
```css
--font-size-4xl: clamp(2.5rem, 2rem + 2.5vw, 3.5rem);
```

**CSS-Only Hamburger Menu:** Uses the checkbox hack for no-JS navigation toggle:
```html
<input type="checkbox" id="nav-toggle" class="nav-toggle">
<label for="nav-toggle" class="nav-toggle-label">
  <span class="hamburger"></span>
</label>
<div class="nav-menu">...</div>
```

**Responsive Layouts:** Use CSS Grid with `auto-fit`/`auto-fill` for natural reflow:
```css
.homepage-modules {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .homepage-modules {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

#### Touch Targets

Minimum 44×44px for all interactive elements (per Apple HIG / WCAG 2.5.5).

### Typography Decisions (MVP)

**Body + UI:** Inter (variable)
**Headings:** Fraunces (variable) — adds warmth without being fussy
**Code:** JetBrains Mono

Self-host fonts from `static/fonts/` to avoid third-party requests.

### Tailwind Configuration

```css
/* styles/main.css */

@import 'tokens.css';
@import 'tailwindcss';

@theme {
  --color-ink: var(--color-ink);
  --color-stone: var(--color-stone);
  --color-paper: var(--color-paper);
  --color-accent: var(--color-accent-500);
  /* ... map tokens to Tailwind */
}

/* ═══════════════════════════════════════════════════════════
   PROSE STYLES
   ═══════════════════════════════════════════════════════════ */

.prose {
  max-width: var(--measure-normal);
  font-size: var(--font-size-base);
  line-height: var(--leading-normal);
  color: var(--color-text);
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  font-family: var(--font-serif);
  font-weight: 600;
  line-height: var(--leading-tight);
  color: var(--color-ink);
}

.prose h1 { font-size: var(--font-size-3xl); margin-top: var(--space-16); margin-bottom: var(--space-6); }
.prose h2 { font-size: var(--font-size-2xl); margin-top: var(--space-12); margin-bottom: var(--space-4); }
.prose h3 { font-size: var(--font-size-xl);  margin-top: var(--space-8);  margin-bottom: var(--space-3); }
.prose h4 { font-size: var(--font-size-lg);  margin-top: var(--space-6);  margin-bottom: var(--space-2); }

.prose p {
  margin-bottom: var(--space-6);
}

.prose a {
  color: var(--color-link);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.prose a:hover {
  color: var(--color-link-hover);
}

.prose ul,
.prose ol {
  margin-bottom: var(--space-6);
  padding-left: var(--space-6);
}

.prose li {
  margin-bottom: var(--space-2);
}

.prose blockquote {
  border-left: 3px solid var(--color-accent-300);
  padding-left: var(--space-4);
  margin: var(--space-6) 0;
  font-style: italic;
  color: var(--color-stone);
}

.prose code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--color-code-bg);
  padding: 0.1em 0.3em;
  border-radius: var(--radius-sm);
}

.prose pre {
  background: var(--color-code-bg);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin: var(--space-6) 0;
}

.prose pre code {
  background: none;
  padding: 0;
}

.prose img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  margin: var(--space-6) 0;
}

.prose hr {
  border: none;
  border-top: 1px solid var(--color-sand);
  margin: var(--space-12) 0;
}

/* ═══════════════════════════════════════════════════════════
   PRINT STYLES
   ═══════════════════════════════════════════════════════════ */

@media print {
  header, footer, nav { display: none; }

  .prose {
    max-width: 100%;
    font-size: 11pt;
  }

  .prose a {
    text-decoration: none;
    color: inherit;
  }

  .prose a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: var(--color-stone);
  }

  @page {
    margin: 1in;
  }
}
```

### Soft Edges & Details

- Border radius: `0.5rem` (8px) for cards, `0.25rem` (4px) for buttons/inputs
- Subtle shadows: `0 1px 3px oklch(0 0 0 / 0.1)`
- No hard borders—use background color contrast or very subtle borders
- Generous padding inside containers
- Hover states: subtle color shifts, not dramatic transforms

---

## 12. Logo Specification

### The Atelier Mark (v1)

The logo is called the **STANBACK Atelier Mark** — a woven corner system that suggests framing, craft, and layered attention.

#### Concept

- **Primary mark:** Two L-brackets at opposite corners (TL anchor, BR whisper)
- **Woven inner thread:** An offset inner L at 45% opacity, creating depth
- **Accent thread:** A short rose segment on the inner horizontal, the only color
- **Unified stroke weight:** 2px throughout for cohesion

The layering creates visual depth without complexity. The accent is surgical—one small gesture of color.

#### The 8 Logo Tests (All Pass)

| Test | Requirement | Result |
|------|-------------|--------|
| 01 Gradient | No multi-color gradients | ✓ Two colors (ink + accent) |
| 02 Edge Softness | No blur/feather | ✓ Crisp vector strokes |
| 03 Glow Test | Light source visible | ✓ No glow effects |
| 04 Organic Form | No blobby shapes | ✓ Geometric L-shapes |
| 05 Radial Symmetry | No aperture/blossom | ✓ Diagonal asymmetry |
| 06 Screenshot Test | Recognizable at 200ms/32px | ✓ Bold, simple form |
| 07 Material Clarity | Nameable in <3s | ✓ "Woven corners" |
| 08 Animation Test | Mechanical motion only | ✓ Simple transforms |

#### SVG Implementation (32×32)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <!-- Primary mark (ink) -->
  <path
    d="M 6 16 V 6 H 16
       M 26 18 V 26 H 18"
    stroke="var(--logo-ink, currentColor)"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <!-- Woven inner thread (subtle ink) -->
  <path
    d="M 8 14 V 8 H 14"
    stroke="var(--logo-ink, currentColor)"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    opacity="0.45"
  />
  <!-- Single accent thread (rose) -->
  <path
    d="M 12 8 H 14"
    stroke="var(--logo-accent, #C45A8A)"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

#### Grid Specifications

- **Canvas:** 32×32
- **Margin:** 6px
- **Stroke:** 2px uniform
- **Corner radius:** via round joins/caps

**Geometry:**
- TL anchor L: (6,16) → (6,6) → (16,6)
- BR whisper L: (26,18) → (26,26) → (18,26)
- Inner thread: (8,14) → (8,8) → (14,8)
- Accent thread: (12,8) → (14,8)

#### Scaling

When scaling to 48×48 (hero size), multiply all coordinates by 1.5 and stroke by 1.5:

| Size | Stroke | Use Case |
|------|--------|----------|
| 32px | 2px | Favicon, header |
| 48px | 3px | Hero/thesis block |

### Wordmark

**bristanback.com** in Inter, lowercase
- Logo lockup: mark + wordmark side by side
- Mark only for favicon and small contexts

---

## 13. Glyph System (Atelier Mark Usage)

### Goal

Use the logo mark as a **structural typographic device**, not a sticker.

The mark should behave like:
- Margin punctuation in a book
- A printer's ornament
- A quiet editorial cue

**Anti-goal:** Do not "brand" every surface. No repeated logos. No wallpaper motifs.

### Glyph Inventory

We define 4 glyph primitives derived from the logo:

| Glyph | Name | Description | Frequency |
|-------|------|-------------|-----------|
| **G0** | Full Mark | Complete logo with both corners + thread + accent | Rare (≤1 per page above fold) |
| **G1** | Corner Anchor | Single L-corner (TL or BR) | Common |
| **G2** | Woven Thread | Inner offset line at 40–55% opacity | Subtle |
| **G3** | Accent Thread | Short 6–10px rose line segment | State indicator only |

#### Use Cases by Glyph

**G0 — Full Mark (rare)**
- Header lockup
- Favicon
- Footer signature
- Thesis block hero

**G1 — Corner Anchor (common)**
- Blockquotes
- Callouts
- "Start Here" module header
- Image captions

**G2 — Woven Thread (subtle)**
- Section breaks
- List separators
- "Current thesis" card

**G3 — Accent Thread (rose)**
- Hover/focus highlight
- Active nav indicator
- "Selected" state
- **Rule:** Exactly one accent stroke per component (never mirrored)

### Placement Rules

#### Global Rules

1. Never repeat the full logo inside article prose
2. Glyphs appear as layout punctuation, not ornament
3. The accent stroke only indicates meaningful state:
   - Current page
   - Selected item
   - Focus/hover
   - Featured content

#### Frequency Caps (Hard Limits)

| Page Type | Full Mark (G0) | Corner Anchor (G1) | Accent (G3) |
|-----------|----------------|--------------------| ------------|
| Home | Max 2 (header + footer) | As needed | State only |
| Article | Max 1 (header) | Blockquotes, callouts | State only |
| Index | Max 1 (header) | Optional on cards | Hover only |

### Color Policy

#### Tokens

```css
--logo-ink: var(--color-text-primary);
--logo-muted: var(--color-text-secondary);
--logo-accent: var(--color-accent-500);
```

#### Stroke Usage

| Glyph | Default | Active/Emphasis |
|-------|---------|-----------------|
| G1 Corner | `--logo-muted` | `--logo-ink` |
| G2 Thread | `--logo-muted` at 40–55% | — |
| G3 Accent | `--logo-accent` only | Never gradients |

#### Dark Mode Adjustments

- Increase subtle stroke opacity by +10% (so they don't vanish)
- Accent remains restrained: never used for large fills

### Component Specifications

#### Header Lockup

- Left: Full mark (G0) + wordmark "bristanback.com"
- Right: Nav links
- Active page: G3 accent thread under active nav label (6–10px line), not a pill
- Mark size: 18–22px square
- Wordmark: 16–18px, minimal letter-spacing

#### Thesis Block (Homepage only)

- G0 full mark as hero element
- Thesis text in display type
- No accent inside thesis text (it's already a signal)
- The glyph feels like editorial punctuation, not branding

#### Start Here Module

- Module title gets G1 corner anchor in `--logo-ink`
- Each featured item gets G3 accent thread on hover/focus only
- Items are editorially selected, not chronological

#### Post Cards (Index/Lists)

- Default: No glyph
- Hover/focus: Reveal G1 corner anchor (TL) at low opacity
- Featured card: Add one G3 accent thread near title baseline
- **Rule:** No more than one glyph per card

#### Blockquotes

Replace the usual left border with a corner anchor:

- Left margin: G1 corner anchor (muted)
- Quote text: Slightly larger, relaxed line height
- No accent inside normal blockquotes (unless "Key Insight" callout type)

#### Callouts (3 types max)

| Type | Glyph Treatment |
|------|-----------------|
| Insight (rare) | G1 in `--logo-ink` + one small G3 accent |
| Constraint | G1 in `--logo-muted` (no accent) |
| Aside | G2 woven thread only (no corner anchor) |

**Rule:** Callouts must not become a second design language.

#### Section Breaks

- 1px rule in `--color-border-subtle`
- Centered G2 woven thread above the rule (or left margin—pick one globally)
- Keep consistent across the whole site

#### Code Blocks

- No glyph by default
- Optional: Tiny G3 accent thread appears when copy succeeds (brief feedback)
- Never full mark

#### Photos

- Photos are sacred—UI must be invisible
- G1 corner anchor as subtle "frame" cue near caption area only
- Never overlay glyph on image

### Implementation Guidance

#### SVG Components

Create glyphs as inline SVG snippets that inherit CSS variables:

```typescript
// src/glyphs.ts
export const glyphMarkFull = `<svg>...</svg>`;
export const glyphCornerTL = `<svg>...</svg>`;
export const glyphCornerBR = `<svg>...</svg>`;
export const glyphThread = `<svg>...</svg>`;
export const glyphAccentDash = `<svg>...</svg>`;
```

#### Accessibility

- All glyph SVGs: `aria-hidden="true"` unless the glyph conveys meaning
- If glyph conveys meaning (e.g., active nav), ensure non-color cue (underline/font weight) or `aria-current="page"`

#### Motion

If any animation exists:
- Only opacity/translate
- Max 150ms
- Respect `prefers-reduced-motion`

### Taste Tests (Acceptance Criteria)

A design change is **rejected** if:

- [ ] Logo appears more than twice per page above the fold
- [ ] Accent appears as a large filled shape
- [ ] Glyphs appear inside prose paragraphs
- [ ] Design reads "branded template" rather than "editorial atelier"
- [ ] Any page looks busier in dark mode than light mode

### Default Page Recipes

#### Homepage

1. Header lockup (G0)
2. Thesis block (G0 as hero)
3. Start Here module (G1 header + hover G3)
4. Latest notes (no glyph)
5. Footer (optional G0 or minimal)

#### Article Page

1. Header lockup (G0)
2. Article header (no glyph)
3. Body with blockquote signature (G1)
4. Section breaks (G2)
5. Footer (optional G1 or none)

#### Index Page

1. Header lockup (G0)
2. Cards (hover G1, featured G3)
3. Footer (minimal)

---

## 14. SEO + Sharing

### Required `<head>` Elements

Every page must include:

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Basic -->
  <title>{pageTitle} | bristanback.com</title>
  <meta name="description" content="{description}">
  <link rel="canonical" href="{canonicalUrl}">

  <!-- Open Graph -->
  <meta property="og:title" content="{pageTitle}">
  <meta property="og:description" content="{description}">
  <meta property="og:url" content="{canonicalUrl}">
  <meta property="og:type" content="{article|website}">
  <meta property="og:image" content="{heroImage || defaultOgImage}">
  <meta property="og:site_name" content="bristanback.com">

  <!-- Article-specific (posts only) -->
  <meta property="article:published_time" content="{isoDate}">
  <meta property="article:modified_time" content="{isoUpdated}">  <!-- if updated -->
  <meta property="article:author" content="Bri Stanback">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{pageTitle}">
  <meta name="twitter:description" content="{description}">
  <meta name="twitter:image" content="{heroImage || defaultOgImage}">

  <!-- Feeds -->
  <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
</head>
```

### robots.txt

```
User-agent: *
Allow: /

Sitemap: https://bristanback.com/sitemap.xml
```

### sitemap.xml

Generated at build time. Includes all non-draft, non-noIndex content.

### llms.txt

A plain-text file that tells large language models how to navigate the site. Think of it as `robots.txt` for AI crawlers.

```
# llms.txt - AI crawler guidance for bristanback.com
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
```

### llms-full.txt

A Markdown-formatted dump of all public content, optimized for AI ingestion. Generated at build time.

Structure:
```markdown
# bristanback.com - Full Content Export
Generated: 2026-02-03

## About
[Full text of /about/]

## Soul
[Full text of /about/soul/]

## Skills
[Full text of /about/skills/]

## Posts
### [Post Title] (2026-02-03)
[Full post content]

### [Another Post] (2026-01-15)
[Full post content]

## Notes
### [Note Title] (2026-02-01)
[Full note content]
```

This gives AI systems clean, structured access to content without HTML parsing.

### rss.xml

Generated at build time. Includes posts and notes. Excludes drafts.

### Link Hygiene

External links get:

```html
<a href="..." rel="noopener noreferrer" target="_blank">
```

Policy: Open external links in new tab. Internal links stay in same tab.

---

## 15. Accessibility

### Baseline Checklist

- [ ] Semantic heading hierarchy (h1 → h2 → h3, no skipping)
- [ ] Skip-to-content link (first focusable element)
- [ ] Visible focus styles (custom, matches design)
- [ ] Sufficient color contrast (4.5:1 for body text, 3:1 for large text)
- [ ] All images have `alt` text
- [ ] Code blocks are scrollable with visible scrollbars
- [ ] Copy button (if added) is keyboard accessible

### Skip Link

```html
<body>
  <a href="#main" class="skip-link">Skip to content</a>
  <header>...</header>
  <main id="main">...</main>
</body>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background: var(--color-ink);
  color: var(--color-paper);
  border-radius: var(--radius-sm);
  z-index: 100;
}

.skip-link:focus {
  top: var(--space-4);
}
```

### Focus Styles

```css
:focus-visible {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
}

/* Remove default outline when :focus-visible applies */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Contrast Verification

Ensure these combinations meet WCAG AA:
- `--color-ink` on `--color-paper` (body text)
- `--color-stone` on `--color-paper` (muted text)
- `--color-link` on `--color-paper` (links)

---

## 16. Security + Privacy

### Security Headers

Create `public/_headers`:

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'
```

Notes:
- `'unsafe-inline'` for styles is needed for Tailwind's inline critical CSS (if used)
- CSP is intentionally tight; expand only if needed

### Privacy Policy

- **No analytics** by default
- **No third-party requests** (self-hosted fonts, no CDNs)
- **No cookies** (static site, no session)

If Cloudflare Web Analytics is added later, disclose in footer/colophon.

---

## 17. Deployment

### Deployment Strategy

**Primary:** GitHub Actions deploys to Cloudflare Pages.

Cloudflare Pages direct integration is also possible, but GH Actions gives more control over the Bun install.

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml

name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Type check
        run: bun run typecheck

      - name: Lint
        run: bun run lint

      - name: Test
        run: bun test

      - name: Build
        run: bun run build

      - name: Deploy to Cloudflare Pages
        if: github.ref == 'refs/heads/main'
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: stanback-blog
          directory: dist
```

### Cloudflare Pages Setup

1. Create Cloudflare account (if needed)
2. Create Pages project named `stanback-blog`
3. Do NOT connect GitHub directly (we use Actions)
4. Generate API token with `Cloudflare Pages:Edit` permission
5. Add secrets to GitHub repo:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

### DNS Configuration

Cloudflare Pages provides the CNAME target. Do not hardcode IPs.

1. Add custom domain in Cloudflare Pages dashboard
2. Follow Cloudflare's DNS instructions (typically a CNAME to `<project>.pages.dev`)
3. Enable proxying for CDN + SSL

---

## 18. Domain Strategy

### Primary Domain

**bristanback.com** (to be registered)

### Redirects

| Domain | Status | Action |
|--------|--------|--------|
| bristanback.com | To register | Primary |
| brianstanback.com | Owned | Redirect to bristanback.com |
| briannastanback.com | To register | Redirect to bristanback.com |
| bristanback.com | To register | Redirect to bristanback.com |

### Redirect Configuration

Create `public/_redirects`:

```
# www redirect
https://www.bristanback.com/* https://bristanback.com/:splat 301
```

For other domains, configure redirects at the DNS/registrar level or via separate Cloudflare rules.

---

## 19. Implementation Roadmap

### MVP Scope Fence

MVP includes exactly these pages:

- [ ] Home (`/`)
- [ ] Posts index (`/posts/`)
- [ ] Single post (`/posts/<slug>/`)
- [ ] Notes index (`/notes/`)
- [ ] Single note (`/notes/<slug>/`)
- [ ] Photos index (`/photos/`)
- [ ] Single photo (`/photos/<slug>/`)
- [ ] About (`/about/`)
- [ ] Soul (`/about/soul/`)
- [ ] Skills (`/about/skills/`)
- [ ] Colophon (`/colophon/`)
- [ ] 404 (`/404.html`)
- [ ] RSS (`/rss.xml`)
- [ ] Sitemap (`/sitemap.xml`)
- [ ] robots.txt
- [ ] llms.txt
- [ ] llms-full.txt

**Everything else is Phase 2 or later.**

### Phase 1: Foundation

**Done when:**
- [ ] A new post can be added by creating one markdown file and running `bun run build`
- [ ] Build fails on validation errors (missing title, duplicate slug, etc.)
- [ ] Output is pure HTML/CSS with no JS
- [ ] Site deploys to Cloudflare Pages on push to main
- [ ] Primary domain (bristanback.com) serves the site with HTTPS

### Phase 2: Polish

**Done when:**
- [ ] Design matches spec (typography, colors, spacing)
- [ ] Syntax highlighting works for common languages
- [ ] All pages have correct meta tags (verify with social card validators)
- [ ] Lighthouse accessibility score ≥ 90
- [ ] Print styles work for posts

### Phase 3: Content & Launch

**Done when:**
- [ ] "Hello World" post published
- [ ] About page written
- [ ] Colophon page written (how it's built, tools, fonts)
- [ ] At least one photo post (to verify photo template)
- [ ] RSS validates
- [ ] Sitemap validates
- [ ] Soft launch complete (shared with friends)

### Phase 4: Iteration

Add features only when pain emerges:
- Tag pages (`/tags/<tag>/`)
- Search
- Wikilinks / backlinks
- Image optimization pipeline
- Reading time / word count display
- Series navigation

---

## Appendices

### Appendix A: Required Pages Content

#### About Page

Must include:
- Brief bio
- Current role/focus
- Contact method (email or social link)
- Pronouns (optional, if you want)
- Brief note on AI collaboration (transparency about how Claude/AI tools are used)
- Links to Soul and Skills pages

#### Soul Page (`/about/soul/`)

Identity manifesto. Structure:
- **Purpose** — why this space exists
- **Values** — what guides decisions here
- **Boundaries** — what this blog will not do
- **Relationship** — what I hope this becomes between us
- **Voice** — how I show up
- **Invitation** — a close that invites connection

Uses `type: soul` and a special template with larger typography and breathing room.

#### Skills Page (`/about/skills/`)

Capabilities manifest. Not a resume—a statement of craft philosophy:
- What I'm good at and why
- How I approach building
- Tools and methods I reach for
- What I'm learning

Uses `type: skills` and the same special template as Soul.

#### Colophon Page

Must include:
- How the site is built (Bun, TypeScript, marked, Tailwind)
- Hosting (Cloudflare Pages)
- Fonts (Inter, Fraunces, JetBrains Mono)
- "Handmade with care" vibe
- Link to source repo (if public)

### Appendix B: Logo Tests Checklist

When evaluating logo designs, verify:

- [ ] **01 Gradient Test**: No multi-color gradients
- [ ] **02 Edge Softness**: No blur or feather effects
- [ ] **03 Glow Test**: Any light source is visible/explained
- [ ] **04 Organic Form**: No blobby/biomorphic shapes
- [ ] **05 Radial Symmetry**: No aperture/blossom patterns
- [ ] **06 Screenshot Test**: Recognizable at 200ms glance, 32px size
- [ ] **07 Material Clarity**: Can name the shape in <3 seconds
- [ ] **08 Animation Test**: Only mechanical motion (rotate, scale, translate)

### Appendix C: Research Sources

#### Blog Trends 2026
- [2026 Guide to Blogging | Global Reach](https://www.globalreach.com/global-reach-media/blog/2025/11/24/2026-guide-to-blogging)
- [The Return of Blogs in 2026 | Ayerhs Magazine](https://ayerhsmagazine.com/2025/11/19/the-return-of-blogs-in-2026/)
- [Blogging Statistics 2026 | Backlinko](https://backlinko.com/blogging-stats)
- [14 Blogging Trends for 2026 | HypeGig](https://hypegig.com/blogging-trends/)

#### Static Site Generators
- [Top SSGs for 2025 | CloudCannon](https://cloudcannon.com/blog/the-top-five-static-site-generators-for-2025-and-when-to-use-them/)
- [Awesome Static Generators | GitHub](https://github.com/myles/awesome-static-generators)
- [Static Site Generator | Cloudflare](https://www.cloudflare.com/learning/performance/static-site-generator/)

#### Markdown Parsing
- [Creating a Markdown Parser with TypeScript | Medium](https://leemsdev.medium.com/creating-a-markdown-parser-with-typescript-9ecc5aee05c3)
- [markdown-it-ts | GitHub](https://github.com/Simon-He95/markdown-it-ts)
- [Marked Documentation](https://marked.js.org/using_pro)

#### Logo Design
- [Minimalist SVG Logo Design | SVG AI](https://www.svgai.org/blog/minimalist-svg-logo-design)
- [Logo Design Best Practices 2025 | No Boring Design](https://www.noboringdesign.com/blog/logo-design-best-practices-trends-challenges)
- [Geometric Logo Design | LogoDesign.net](https://www.logodesign.net/blog/geometric-logo-design/)

#### AI & Parenting
- [Parenting in the Age of AI | IAPP](https://iapp.org/news/a/parenting-in-the-age-of-ai)
- [Children and AI | UNICEF](https://www.unicef.org/innocenti/media/11991/file/UNICEF-Innocenti-Guidance-on-AI-and-Children-3-2025.pdf)
- [Parenting Trends 2025 | Momizen](https://momizen.com/en/posts/future-skills-parenting-2025)

#### Inspiration
- Product.ai Brand Guidelines — OKLCH colors, Tailwind @theme, minimal static site architecture

---

*Spec version: 1.3*
*Last updated: 2026-02-04*
*Authors: Bri Stanback + Claude*
