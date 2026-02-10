---
title: "Hello World"
date: 2026-02-01T09:00
type: post
schemaVersion: 1
draft: false
featured: true
tags:
  - building
  - meta
description: "First post. Why I built this blog and what I hope it becomes."
heroImage: /images/posts/hello-world-hero.png
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

I almost didn't make this.

Not because it's hard — the technology is trivial. Markdown in, HTML out. About 500 lines of TypeScript. No frameworks, no client-side JavaScript, no CMS. Just files, a build script, and Cloudflare Pages. I could have used Astro or Eleventy, but I wanted to understand every piece. The whole thing took a weekend.

The hard part was the other thing. The part where you decide you have something worth saying, out loud, with your name on it, when the internet already has plenty of opinions.

I've been building software for twenty years and writing about it for zero. That gap isn't an accident. Writing code is safe — it compiles or it doesn't, it works or it breaks, the feedback is mechanical. Writing *ideas* is exposed. You can't hide behind functionality. The person is right there.

So this is the first post on bristanback.com. Here's a code example to make sure syntax highlighting works:

```typescript
async function build(): Promise<void> {
  const content = await collectContent('content');
  const validated = validateContent(content);
  const parsed = await parseContent(validated);
  const html = renderSite(parsed);
  await writeOutput(html);
}
```

What surprised me: how little code it actually takes. Modern tooling (Bun, Tailwind, Shiki) does the heavy lifting. The hard part isn't the technology — it's deciding what to say and finding the discipline to say it.

This is where I'll think out loud about building software, raising kids, making sense of a world that keeps changing faster than I can keep up. Not a portfolio. Not a brand play. Just thinking, with my name on it, because that's how I figure things out.

Will I actually write consistently? Will anyone read this who isn't obligated to? I don't know. But the site exists now, and that's more than it was yesterday.
