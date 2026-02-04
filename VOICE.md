# BRISTANBACK.COM — Voice & Personality Pack

> For the coding agent: this document defines how the site should *feel*. Use it alongside SPEC.md.

---

## Agent Prompt (paste at top of any ticket)

> Build the blog so it feels like a digital atelier: precise craft, warm minimalism, honest uncertainty. Default UI copy should be short, human, non-marketing, and never SEO-voice. No "In this post…" phrasing. Prefer concrete labels ("Posts", "Notes"). Bake personality into microcopy (404, empty states, footer) and into content scaffolding (new post templates include "what surprised me / what I still don't know / questions"). Keep everything calm, direct, lightly playful. No cynicism, no hype, no engagement tricks.

---

## 1. North Star

**Goal:** The site should feel like a digital atelier: precise craft, warm light, honest work-in-progress.

**Reader experience in one line:** "I'm in the workshop with a senior builder who can also see."

---

## 2. Audience Model

| Audience | Description |
|----------|-------------|
| **Primary** | Senior-ish builders/designers who are curious and tired of performative certainty |
| **Secondary** | Thoughtful humans (parents, creatives) who don't mind a little code if it comes with meaning |
| **Not for** | SEO skimmers, hustle culture tourists, "AI will replace everyone tomorrow" doomers |

---

## 3. Author Persona

**Surface vibe:** Calm confidence + playful curiosity

### Core Traits

| Trait | Meaning |
|-------|---------|
| **Honest** | Names uncertainty; doesn't posture |
| **Craft-forward** | Cares about details (design, performance, wording) |
| **Warm** | Never snarky, never grandiose |
| **Systems thinker** | Explains the why, not just the what |
| **Human** | Parenting + identity + art are allowed to sit beside code |

### Anti-Vibe

- Motivational influencer
- MBA-speak
- Faux-minimalist "thought leader"
- Cynical contrarian

---

## 4. Voice Axioms

Use these as "lint rules" for writing and scaffolding copy.

1. **No fake authority.** If unsure, say so plainly.
2. **Specific beats abstract.** Prefer concrete tools, versions, dates, numbers.
3. **Stories > sermons.** Observations and moments over proclamations.
4. **Warm minimalism.** Short sentences are fine. White space is part of the voice.
5. **Invite thinking.** End with a question or a tension, not a "wrap-up."
6. **No performative SEO voice.** Avoid "In this post we will…" and "Let's dive in."
7. **No AI ventriloquism.** If AI helped, be transparent without making it the point.

---

## 5. Tone Palette

Different content types call for different registers.

| Type | Tone |
|------|------|
| **Essays** | Reflective, structured, soft authority |
| **Notes** | Quick, a little mischievous, one sharp point |
| **Links** | Crisp, lightly opinionated, "here's why I saved this" |
| **Projects** | Pragmatic, detailed, occasional "here's what surprised me" |
| **Photos** | Poetic minimalism; restraint; sensory language |

---

## 6. Microcopy Style Guide

This is where personality shows up immediately.

### Navigation Labels

| Prefer | Avoid |
|--------|-------|
| Posts | Insights |
| Notes | Learn |
| Photos | Resources |
| Projects | Thoughts |
| About | |

### Buttons

| Prefer | Avoid |
|--------|-------|
| Read | Start reading |
| Continue | Discover more |
| Back | Unlock |
| Next | |

### Empty States

**Tags page with no posts:**
```
Nothing here yet. That's allowed.
```

**404 page:**
```
Title: Not found.
Body: Either I moved it, or it never existed. Try the homepage.
```

**Notes list (empty):**
```
No notes yet. Check back soon.
```

### Footer

```
Built slowly. Updated often.
```

or

```
No tracking. No popups. Just pages.
```

### Footer Links (secondary)

```
RSS · Sitemap · llms.txt
```

The `llms.txt` link is a subtle transparency gesture—shows we're thinking about AI discovery without making it a marketing point.

---

## 7. Signature Devices

Recurring motifs that make it "yours."

### A) The Atelier Aside

A short italic aside that admits context:

```markdown
*I'm writing this between daycare drop-off and a deploy.*
```

Rendered as light gray italic text, slightly indented.

### B) The Constraint Box

A callout in projects:

```markdown
> [!constraints]
> Time, sleep, and a stubborn bug in prod.
```

### C) The Lens Shift

Occasional pivot from tech → human:

```markdown
> [!lens]
> The weird part is this is also a parenting problem.
```

### D) Ending Questions

```markdown
*What would you optimize here: speed, clarity, or joy?*
```

---

## 8. Lunen Influence

The playful frontier-explorer vibe, kept subtle.

### Do

- Use curiosity and experiments language:
  - "I tried a thing."
  - "Here's what happened."
- Be transparent about AI as a tool:
  - "I asked an agent to draft the first pass; I kept the bones and rewrote the voice."

### Don't

- Anthropomorphize AI into a co-author constantly
- "My AI bestie said…"
- Make AI the point of every post

---

## 9. Content Ethics

Values that inform writing and design choices.

- No dark patterns
- No surveillance
- No outrage bait
- No engagement farming
- Respect the reader's time
- Prefer clarity over cleverness
- Show your work (code + reasoning), not your status

These are stated explicitly on the `/about/soul/` page.

---

## 9.5 Identity Manifest: SOUL.md

The blog has a canonical identity manifesto at `/about/soul/`. This pattern comes from AI agent ecosystems where a `SOUL.md` file defines personality, values, and behavioral boundaries explicitly.

For a personal blog, it serves as:
- **Internal compass** — what guides publishing and curation decisions
- **External invitation** — how readers understand what they're entering

The Soul page is not a bio or resume. It's a character statement: who you choose to be here.

**Companion: SKILLS.md** at `/about/skills/` — a capabilities manifest that's less "what I've done" and more "how I approach building."

See SPEC.md Appendix A for required structure.

---

## 10. Implementation Hooks

Concrete features that encode personality.

### Extended Frontmatter Fields

```yaml
---
# Standard fields...

# Voice fields (all optional)
tension: "I still don't know if this is the right abstraction."
questions:
  - "What would you optimize here: speed, clarity, or joy?"
  - "Is this even a real problem?"
constraints:
  - "time"
  - "sleep"
  - "a stubborn bug in prod"
tools:
  - "Bun 1.x"
  - "Shiki"
  - "Tailwind v4"
---
```

### Callout Components

Support these blockquote variants (via CSS classes or light markdown preprocessing):

```markdown
> [!aside]
> I'm writing this between daycare drop-off and a deploy.

> [!constraints]
> Time, sleep, and a stubborn bug in prod.

> [!lens]
> The weird part is this is also a parenting problem.
```

### Microcopy Constants

Create `src/strings.ts` with all UI copy in one place:

```typescript
// src/strings.ts

export const strings = {
  // Navigation
  nav: {
    posts: 'Posts',
    notes: 'Notes',
    photos: 'Photos',
    projects: 'Projects',
    about: 'About',
  },

  // Buttons
  buttons: {
    read: 'Read',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
  },

  // Empty states
  empty: {
    posts: 'No posts yet. Check back soon.',
    notes: 'No notes yet. Check back soon.',
    photos: 'No photos yet. Check back soon.',
    tags: 'Nothing here yet. That's allowed.',
  },

  // 404
  notFound: {
    title: 'Not found.',
    body: 'Either I moved it, or it never existed.',
    action: 'Try the homepage',
  },

  // Footer
  footer: {
    tagline: 'Built slowly. Updated often.',
    privacy: 'No tracking. No popups. Just pages.',
  },

  // Meta
  meta: {
    siteName: 'bristanback.com',
    defaultDescription: 'A digital atelier at the intersection of technology, design, and the human experience of building.',
  },
} as const;
```

### New Post Template

When `bun run new:post` generates a file, include these stubs:

```markdown
---
title: ""
date: ${TODAY}
type: post
schemaVersion: 1
draft: true
tags: []
description: ""
tension: ""
questions: []
constraints: []
tools: []
---

## What I built / saw

## What surprised me

## What I still don't know

## Questions

```

### New Note Template

```markdown
---
title: ""
date: ${TODAY}
type: note
schemaVersion: 1
draft: true
tags: []
---

*One sharp point.*

```

---

## 11. AI-Friendly Structure

Content should be structured for both humans and AI systems (Answer Engine Optimization).

### For Essays/Posts

- **Lead with the point.** First paragraph should contain the core insight or question.
- **Use semantic headings.** H2 for major sections, H3 for subsections. Headings should be descriptive, not clever.
- **Include a "key points" moment.** Near the top, after the intro, a brief summary of what's coming.
- **End with questions, not summaries.** AI can extract the summary; give humans something to think about.

### For All Content

- **Avoid filler.** Every paragraph should earn its place.
- **Define terms when introduced.** Don't assume shared vocabulary.
- **Use lists for sequences and options.** Easier to parse, human or machine.

This isn't SEO manipulation—it's clarity. If AI can extract your meaning accurately, humans probably can too.

---

## 12. Voice Tuning

Current setting: **60% crisp/technical, 40% soft/lyrical**

This means:
- Default to clear, direct language
- Allow poetic moments in photos, asides, and endings
- Code examples are matter-of-fact
- Reflections can breathe

To adjust later, revise the tone palette and microcopy examples.

---

*Companion to SPEC.md*
*Last updated: 2026-02-03*
