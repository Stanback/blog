# Architecture Axiom

> The simplest thing that works. Add complexity only when pain emerges.

## Core Principles

| Principle | Meaning |
|-----------|---------|
| **YAGNI** | No feature until it's needed |
| **DRY** | Single source of truth for everything |
| **Simplicity** | Understandable in 10 minutes |
| **Type Safety** | TypeScript everywhere |

## Anti-Goals

- ❌ No JavaScript frameworks (React, Vue, Svelte)
- ❌ No build tool complexity (webpack, vite configs)
- ❌ No CMS or admin interface
- ❌ No comments system
- ❌ No analytics tracking
- ❌ No monetization or ads

## Build Pipeline

```
collect → validate → parse → render → write → assets
```

That's it. No transformer plugins. No "because SOLID" abstractions.

## Technology Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Runtime | Bun | Fast, TypeScript-native |
| Language | TypeScript (strict) | Type safety |
| Markdown | marked | Lightweight |
| Syntax | Shiki | Beautiful, zero-runtime |
| CSS | Tailwind v4 | JIT, tiny output |
| Lint | Biome | Fast, simple |
| Hosting | Cloudflare Pages | Free, fast, global |
| CI/CD | GitHub Actions | Simple |

## Output Constraints

- **Zero client-side JS by default**
  - Optional: <2KB, justified in comment, progressive enhancement
- **No runtime dependencies** in output
- **Build is deterministic** — same input → same output

## Content Types

| Type | URL Pattern | Purpose |
|------|-------------|---------|
| Post | `/posts/<slug>/` | Long-form (1500-3000 words) |
| Note | `/notes/<slug>/` | Short-form (200-500 words) |
| Photo | `/photos/<slug>/` | Image + caption |
| Page | `/<slug>/` | Static pages |
| Book | `/books/<slug>/` | Multi-chapter content |

## Frontmatter Schema

```yaml
---
title: "Post Title"          # Required
date: 2026-02-03             # Required
type: post                   # Required
schemaVersion: 1             # Required

# Optional
draft: false
tags: [building, ai]
description: "For SEO"       # Required for posts
tension: "What's unresolved"
questions: ["Ending questions"]
---
```

## Directory Structure

```
blog/
├── CLAUDE.md              # Agent instructions (this hub)
├── axioms/                # Decomposed principles
├── content/               # All markdown
│   ├── posts/
│   ├── notes/
│   ├── photos/
│   ├── pages/
│   └── books/             # Submodules
├── src/                   # Build scripts
├── styles/
│   ├── tokens.css         # Design tokens (source of truth)
│   └── main.css           # Tailwind + prose
├── static/                # Copied to dist/
└── dist/                  # Output (gitignored)
```

## AI Discovery

Generate alongside sitemap:
- `/llms.txt` — crawler guidance
- `/llms-full.txt` — full content export

## Deployment

```bash
bun run build              # Build to dist/
bun run deploy             # Deploy to Cloudflare
```

GitHub Actions deploys on push to main.
