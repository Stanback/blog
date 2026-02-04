# CLAUDE.md — Agent Instructions

> bristanback.com: A bespoke static blog at the intersection of technology, design, and making sense of things in an AI-disrupted world.

## Quick Context

- **Stack:** Bun + TypeScript + Tailwind v4 + Cloudflare Pages
- **Build:** `bun run build` → `dist/`
- **Dev:** `bun run serve` → localhost:8788
- **Deploy:** Push to main → GitHub Actions → Cloudflare

## Axioms (Source of Truth)

All principles are decomposed into `axioms/`. Read the relevant axiom before working in that area.

| Axiom | Governs |
|-------|---------|
| [accessibility.md](axioms/accessibility.md) | WCAG compliance, ARIA, keyboard nav |
| [content-policy.md](axioms/content-policy.md) | Sensitive terms, co-authorship, drafts |
| [voice.md](axioms/voice.md) | Tone, microcopy, writing style |
| [thesis.md](axioms/thesis.md) | Homepage thesis, signal physics |
| [design-system.md](axioms/design-system.md) | Colors, typography, glyphs, spacing |
| [architecture.md](axioms/architecture.md) | Tech stack, build pipeline, content types |

## Before You Build

1. **Check the axiom** — Don't reinvent; extend
2. **Accessibility first** — Every feature must pass `axioms/accessibility.md` checklist
3. **Content policy** — Review `axioms/content-policy.md` for sensitive terms
4. **Type safety** — TypeScript strict mode, no `any`

## Before You Publish

- [ ] `bun run typecheck` passes
- [ ] `bun run lint` passes
- [ ] `bun run build` succeeds
- [ ] Content reviewed against `axioms/content-policy.md`
- [ ] Images have alt text
- [ ] Links tested

## Common Tasks

### New Post
```bash
# Create content/posts/YYYY-MM-DD-slug.md with frontmatter
```

### Update Book Submodule
```bash
cd content/books/the-turning-point && git pull
cd ../../.. && git add -A && git commit -m "update book" && git push
```

### Add New Axiom
1. Create `axioms/[name].md`
2. Add to table above
3. Reference from relevant code comments

## File Purposes

| File | Purpose |
|------|---------|
| `CLAUDE.md` | This file — agent instructions hub |
| `README.md` | GitHub basics (setup, commands) |
| `axioms/` | Decomposed principles (source of truth) |
| `styles/tokens.css` | Design tokens (colors, spacing, fonts) |
| `src/strings.ts` | UI microcopy |
| `content/` | All markdown content |

## Symlinks

This file is symlinked for other AI tools:
- `.cursor/rules` → `CLAUDE.md`
- `AGENTS.md` → `CLAUDE.md`

Same instructions, multiple entry points.

---

*When in doubt, read the axiom. When the axiom is wrong, fix it.*
