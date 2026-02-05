================================================================================
IMAGE GENERATION PROMPT
================================================================================

# Image Generation Request

## Article Context
**Title**: "Hello World"
**Description**: "First post. Why I built this blog, what I hope it becomes, and what I still don't know."
**Core Tension**: "I'm not sure if anyone will read this."
**Key Themes**: what i built, what surprised me, what i still don't know
**Tone**: contemplative, questioning

## Article Excerpt (for context)

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


---

# Image Generation Prompt Template

> For generating hero images and inline visuals for bristanback.com posts.

## GOAL
Create ONE on-brand editorial image that visually captures the essence of the article. The design should feel like a thoughtful observation — warm, precise, unhurried. Think editorial atelier, not marketing collateral.

## CANVAS / EXPORT
- 1200x630 px (OG image / hero)
- Or 800x600 px (inline)
- Deliver ONE finished image

## INPUTS (provided by script)
1. **Article Title**: [TITLE]
2. **Article Description**: [DESCRIPTION]
3. **Core Tension**: [TENSION] 
4. **Key Themes**: [THEMES]
5. **Tone**: [TONE]
6. **Full Article Context**: [ARTICLE_EXCERPT]

## BRAND AESTHETIC

### Color Palette (bristanback.com)
- **Primary**: Warm paper (#f5f3ef), deep ink (#2d2a26)
- **Accent**: Dusty rose (#b8968a) — use sparingly, for emphasis
- **Dark mode**: Warm charcoal (#1f1d1a), soft cream text

### Visual Language
- Editorial, observational, like a well-made notebook
- Clean negative space, intentional composition
- Warm undertones (not cold/clinical)
- Subtle texture welcome (paper grain, soft shadows)
- Think: Parisian photo book meets personal journal

## NON-NEGOTIABLES
- Do NOT include the article title as text in the image
- Do NOT include any text/typography in the image
- No stock photo clichés (handshake, lightbulb, puzzle pieces)
- No literal illustrations of concepts — go metaphorical

## CONCEPT TRANSLATION
From the article, extract:
1. **The core insight** (one sentence)
2. **One visual metaphor** (not literal)
3. **The emotional register** (contemplative? urgent? playful?)

Convert into ONE clear focal concept.

## STYLE DIRECTION
- Photographic or painterly (not 3D renders, not flat illustration)
- Natural lighting, warm tones
- Could be: still life, landscape, abstract texture, hands at work
- Feels like something you'd pause on, not scroll past

## AVOID
- Corporate stock imagery
- Busy compositions with multiple competing elements
- Cold, clinical tech aesthetic
- Anything that looks like it belongs on a SaaS landing page

## OUTPUT
Generate the final image only. No explanations, no options.


---

Now generate a detailed, specific image prompt for this article. The prompt should:
1. Capture the essence of ""Hello World"" visually
2. Work as a hero image (1200x630)
3. Follow the brand aesthetic guidelines above
4. Be specific enough for an image model to execute

Output the image generation prompt only, ready to paste into an image model.

================================================================================

To generate image, run with --generate flag
Or copy the prompt above into Gemini/DALL-E/Midjourney
