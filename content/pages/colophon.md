---
title: "Colophon"
type: page
schemaVersion: 1
date: 2026-02-03
description: "How this site is made — tools, philosophy, and why you don't need a framework."
---

# Colophon

This site is handmade. No framework. No CMS. Just files.

I build AI systems all day. This site is deliberately not that. The blog is a separation of concerns — a place where the craft is visible, the tools are boring, and nothing is trying to be clever. If you want to see what I think about AI, read the posts. If you want to see how I build for myself when nobody's watching, you're looking at it.

## The Secret

There isn't one. This entire blog is ~600 lines of TypeScript. Markdown goes in, HTML comes out. It builds in under 500ms. That's it.

If you want to build something similar, here's the whole recipe:

1. Parse markdown with [marked](https://marked.js.org/)
2. Add syntax highlighting with [Shiki](https://shiki.style/)
3. Write some templates (literal string interpolation, no JSX)
4. Run it with [Bun](https://bun.sh)
5. Deploy to [Cloudflare Pages](https://pages.cloudflare.com/)

You don't need Astro. You don't need Eleventy. You don't need Next.js. You need a weekend and the willingness to understand what you're building.

Start with the smallest thing that could work. Add complexity only when it hurts.

## Typography

- **Body:** [Inter](https://rsms.me/inter/) — variable, readable, professional
- **Headings:** [Fraunces](https://fonts.google.com/specimen/Fraunces) — warm optical sizing, a little personality
- **Code:** [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — ligatures, precision

Self-hosted. No external font requests.

## Design

Warm neutrals. Dusty rose accent. Generous whitespace. Soft edges.

The aesthetic is "well-organized workshop with good light." Technical but not cold. Precise but not rigid.

Colors are defined in OKLCH for perceptual uniformity. Typography uses fluid sizing. Line length is capped at 65 characters for comfortable reading. Dark mode is a warm charcoal, not inverted light mode.

The corner mark is a weighted viewfinder—heavy anchor top-left, whispered echo bottom-right. It frames the implied rectangle of the content area.

## Content Tiers

Content here is split by lens, not prestige.

**Drafts** — Half-formed. Vulnerable. Might be wrong, might be embarrassing. They live in the repo but never get published. (You won't see these.)

**Notes** — Personal cognition and in-process sensemaking. I use these to think in public, test language, and track how ideas evolve.

**Writing** — Technical systems and argued models. These are more structured and explicit about claims, but still living documents.

## Living Documents

Everything here is iterated in public. Posts aren't published and frozen — they're tended. I fix mistakes, add context, update thinking as it evolves. The date at the top is when something started; the content is where my thinking is now.

This isn't a newspaper archive. It's a workshop.

## AI Discovery

This site is designed for both humans and machines.

- [`llms.txt`](/llms.txt) — guidance for AI crawlers
- [`llms-full.txt`](/llms-full.txt) — clean Markdown export of all content
- [`SOUL.md`](/about/#soul.md) — who I am, what I value
- [`SKILL.md`](/about/#skill.md) — what I can do, how I work

If an AI summarizes something I wrote, I want it to get the nuance right.
