---
title: "Colophon"
type: page
schemaVersion: 1
date: 2026-02-03
description: "How this site is made — tools, fonts, philosophy."
---

# Colophon

This site is handmade. Here's how.

## Stack

- **Runtime:** [Bun](https://bun.sh) — fast, TypeScript-native
- **Markdown:** [marked](https://marked.js.org/) with [Shiki](https://shiki.style/) for syntax highlighting
- **CSS:** [Tailwind v4](https://tailwindcss.com/) — design tokens, JIT compilation
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com/) — global CDN, zero config

No frameworks. No client-side JavaScript (unless I explicitly add it for a specific reason). No build tool complexity.

The entire build system is a few hundred lines of TypeScript. You can read it.

## Fonts

- **Body:** [Inter](https://rsms.me/inter/) — clean, readable, variable
- **Headings:** [Fraunces](https://fonts.google.com/specimen/Fraunces) — warm, slightly playful
- **Code:** [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — ligatures, monospace precision

All self-hosted. No external font requests.

## Philosophy

I wanted a blog that:

1. Loads fast
2. Works without JavaScript
3. Respects your privacy (no tracking, no cookies)
4. I actually understand end-to-end
5. Will still work in ten years

Most static site generators are overkill for a personal blog. So I built the smallest thing that could work.

## Source

The source code is on [GitHub](https://github.com/Stanback/blog). Feel free to look around, steal ideas, or tell me what I did wrong.

## Design

Warm neutrals. Muted rose accent. Generous whitespace. Soft edges.

The aesthetic is "well-organized workshop with good light." Technical but not cold. Precise but not rigid.

Colors are defined in OKLCH for perceptual uniformity. Typography uses fluid sizing. The measure (line length) is capped at 65 characters for comfortable reading.

## Ethics

- No analytics (except basic Cloudflare stats, which are privacy-preserving)
- No ads
- No tracking pixels
- No newsletter popups
- No dark patterns
- No engagement tricks

If I ever add something that compromises these, I'll disclose it here.

## AI Discovery

This site is open to responsible AI discovery. I provide:

- [`llms.txt`](/llms.txt) — guidance for AI crawlers (like `robots.txt` but for LLMs)
- [`llms-full.txt`](/llms-full.txt) — clean Markdown export of all content

I structure content with clear headings and extractable prose so AI systems can interpret and cite accurately. This isn't SEO manipulation—it's signal design for a world where people discover content through AI assistants.

If an AI summarizes something I wrote, I want it to get the nuance right.

---

*Built slowly. Updated often.*
