# CLAUDE.md - Blog Agent Hub

> bristanback.com — An editorial atelier for essays on judgment, systems, and design.

## Quick Start

```bash
bun run build    # Build site
bun run dev      # Dev server (if available)
git push         # Auto-deploys via GitHub Actions (~30s)
```

## Project Overview

**Stack:** Bun + TypeScript + Tailwind v4 + Cloudflare Pages
**Aesthetic:** Parisian editorial — quiet, observational, warm, precise, unhurried
**Content:** Posts (essays), Notes (living documents), Photos, Pages, Books (submodules)

## Agent Team Structure

When working on complex tasks, create a team with these roles:

### Recommended Team Composition

| Role | Focus | When to Spawn |
|------|-------|---------------|
| **Lead (you)** | Coordination, decisions, synthesis | Always |
| **Visual Designer** | Color, typography, SVG, accessibility | Design changes |
| **Frontend Dev** | CSS, Tailwind, static site patterns | Implementation |
| **Browser QA** | Cross-browser, mobile, a11y testing | Before deploy |

### Team Spawn Prompts

**For design work:**
```
Create an agent team for blog design work:
- Visual Designer: Expert in color theory (OKLCH), typography, SVG/vector icons, WCAG accessibility, editorial aesthetics
- Frontend Dev: Expert in Tailwind v4, CSS custom properties, static sites, responsive design
```

**For content features:**
```
Create an agent team for content feature development:
- Information Architect: Content structure, navigation, frontmatter schemas
- Frontend Dev: Implementation, build pipeline, templating
```

## Axioms (Load These)

Constitutional-level guidance lives in `axioms/`. Load relevant ones:

| Axiom | When to Load |
|-------|-------------|
| `axioms/design-system.md` | Any visual work |
| `axioms/accessibility.md` | Any UI changes |
| `axioms/voice.md` | Any content work |
| `axioms/editorial-contribution.md` | Publishing/editing posts and notes |
| `axioms/architecture.md` | Any build/structure changes |
| `axioms/content-types.md` | Adding content |
| `axioms/thesis.md` | Understanding site purpose |

## Key Constraints

### Visual Design
- **Color:** OKLCH color space, tokens in `styles/tokens.css`
- **Typography:** Inter (body), Fraunces (headings), JetBrains Mono (code)
- **Spacing:** 4px base unit, generous padding
- **Content width:** `--content-width: 720px` (NOT `--measure-normal`)

### Accessibility (Non-Negotiable)
- WCAG 2.1 AA compliance
- 4.5:1 contrast minimum
- 44×44px touch targets
- Keyboard navigation
- Focus visible states
- Respect `prefers-reduced-motion`

### Architecture
- Zero client-side JS by default
- No frameworks (React, Vue, etc.)
- Build is deterministic
- TypeScript strict mode

### Voice
- First person, admit uncertainty
- Direct but warm
- Include "human cost signals" (changed beliefs, missteps, doubt)
- No ChatGPT-isms ("In this article, we will explore...")

## File Structure

```
blog/
├── axioms/           # Constitutional principles
├── content/          # All markdown
│   ├── posts/        # YYYY-MM-DD-slug.md
│   ├── notes/        # slug.md
│   ├── photos/
│   ├── pages/
│   └── books/        # Git submodules
├── src/              # Build scripts (Bun/TS)
├── styles/
│   ├── tokens.css    # Design tokens (source of truth)
│   └── main.css      # Tailwind + custom CSS
├── static/           # Copied to dist/
├── scripts/          # Utilities (image generation, etc.)
└── dist/             # Output (gitignored)
```

## Content Frontmatter

### Posts
```yaml
---
title: "Title"
description: "SEO description"
date: 2026-02-05
type: post
schemaVersion: 1
draft: false
tags: [ai, systems]
heroImage: /images/posts/slug-hero.png
tension: "What's unresolved"
preface: "1-2 sentence orientation whisper"
---
```

### Notes
```yaml
---
title: "Title"
date: 2026-02-05
type: note
schemaVersion: 1
draft: false
description: "Brief description"
tags: [topic]
updated: 2026-02-05  # Add when updating
---
```

## Drafts

**Drafts live in `content/notes/` with `draft: true`** — NOT in a separate drafts folder.

```yaml
---
title: "Draft Title"
date: 2026-02-07T10:00
type: note
schemaVersion: 1
draft: true  # This is the key
heroImage: /images/posts/slug-hero.png
tags:
  - topic
---
```

- Drafts are accessible at `/drafts/slug/` (not `/notes/slug/`)
- Drafts do NOT create backlinks (won't spoil existence of unpublished content)
- To publish: change `draft: true` to `draft: false`
- No separate `content/drafts/` folder exists — don't create one

## Image Generation

Hero images via Gemini:
```bash
# Preview prompt
bun scripts/generate-image-prompt.ts content/posts/FILE.md

# Generate image
GEMINI_API_KEY=$GEMINI_API_KEY bun scripts/generate-image-prompt.ts content/posts/FILE.md --generate
```

**Brand requirements:** No text in images, warm editorial aesthetic, metaphorical not literal.

## CSS Architecture

### Token Hierarchy
```css
/* tokens.css defines */
--color-*       /* Colors in OKLCH */
--font-*        /* Typography */
--space-*       /* Spacing (4px base) */
--radius-*      /* Border radius */
--content-width /* 720px - use this, not --measure-normal */
```

### Key Selectors
- `.prose` — Article body styling
- `.post-hero` — Full-bleed hero with gradient
- `.archive-header` — Section page headers

## Team Coordination Rules

1. **Avoid file conflicts:** Assign different files to different teammates
2. **Plan before implement:** Use `--require-plan-approval` for risky changes
3. **Load axioms first:** Each teammate should read relevant axioms
4. **Test before commit:** `bun run build` must pass

## Common Tasks

### Add a new post
1. Create `content/posts/YYYY-MM-DD-slug.md` with frontmatter
2. Write content
3. Generate hero: `bun scripts/generate-image-prompt.ts ... --generate`
4. Build and verify: `bun run build`
5. Commit and push

### Design change
1. Load `axioms/design-system.md` and `axioms/accessibility.md`
2. Update `styles/tokens.css` for new tokens
3. Update `styles/main.css` for component styles
4. Test in browser (mobile-first)
5. Verify contrast ratios

### Add new content type
1. Load `axioms/architecture.md` and `axioms/content-types.md`
2. Add type to `src/types.ts`
3. Add collection in `src/build.ts`
4. Add renderer in `src/render.ts`
5. Add styles as needed
