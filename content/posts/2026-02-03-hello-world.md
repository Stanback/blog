---
title: "Hello World"
date: 2026-02-03
type: post
schemaVersion: 1
draft: false
featured: true
tags:
  - building
  - meta
description: "First post. Why I built this blog, what I hope it becomes, and what I still don't know."
tension: "I'm not sure if anyone will read this."
questions:
  - "What makes a personal blog worth reading in 2026?"
  - "How do you find the right balance between polish and authenticity?"
constraints:
  - "time"
  - "perfectionism"
  - "the feeling that everything's already been said"
tools:
  - "Bun"
  - "TypeScript"
  - "Tailwind v4"
  - "Claude"
---

# Hello World

This is the first post on bristanback.com.

## What I Built

A static blog. Markdown in, HTML out. No frameworks, no client-side JavaScript, no CMS. Just files, a build script, and Cloudflare Pages.

The whole thing is about 500 lines of TypeScript. I could have used Astro or Eleventy or any of the hundred other static site generators, but I wanted to understand every piece. YAGNI in action: start with the minimum, add complexity only when it hurts.

Here's a code example to test syntax highlighting:

```typescript
async function build(): Promise<void> {
  const content = await collectContent('content');
  const validated = validateContent(content);
  const parsed = await parseContent(validated);
  const html = renderSite(parsed);
  await writeOutput(html);
}
```

## What Surprised Me

How little code it actually takes. Modern tooling (Bun, Tailwind, Shiki) does the heavy lifting. The hard part isn't the technology—it's deciding what to say and finding the discipline to say it.

Also: OKLCH colors are genuinely better than HSL. Perceptually uniform color ramps without the math headaches.

## What I Still Don't Know

- Will I actually write consistently?
- Is anyone going to read this who isn't obligated to?
- Should I add comments, or is linking to social media enough?
- How do I balance technical depth with accessibility?

## Why a Blog in 2026?

Blogs are making a comeback. Not the Pinterest-era SEO blogs, and not the Tumblr-style text dumps. Something more personal, more honest, more grounded.

I think the reason is simple: people are tired of algorithmic feeds and engagement-optimized content. They want to hear from real humans thinking out loud.

That's what I'm trying to do here. Think out loud about building software, raising kids, making sense of a world that keeps changing faster than I can keep up.

*What makes a personal blog worth reading in 2026?*
