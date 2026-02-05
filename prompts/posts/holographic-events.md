================================================================================
IMAGE GENERATION PROMPT
================================================================================

# Image Generation Request

## Article Context
**Title**: "Self-Healing Systems: The Holographic Event Pattern"
**Description**: "Why self-contained event payloads enable systems that repair themselves. A pattern from building browser automation for AI research."
**Core Tension**: "Breadcrumbs are too thin. Logs require context reconstruction. What if events carried everything?"
**Key Themes**: the problem with breadcrumbs, holographic events, the architecture
**Tone**: contemplative, questioning

## Article Excerpt (for context)

# Self-Healing Systems: The Holographic Event Pattern

I've been building browser automation for AI research. It breaks constantly. Selectors change, sites add Cloudflare challenges, responses take longer than expected.

The first instinct is breadcrumbs: log what happened, debug when it fails, fix it, redeploy. But that's slow. The feedback loop is measured in hours.

What if the system could fix itself?

## The Problem with Breadcrumbs

Traditional logging assumes a human in the loop. You scatter traces through your code, ship to Datadog, wait for an alert, reconstruct the context, diagnose, patch, deploy.

This works when failures are rare and humans are cheap. Neither is true for AI-orchestrated systems running 24/7.

The deeper problem: **breadcrumbs are incomplete**. A log line says "selector failed" but doesn't include the DOM snapshot, the screenshot, the selectors already tried, or the recipe version. To diagnose, you need to reconstruct state from multiple sources—and by then, the state may have changed.

## Holographic Events

The fix is to make every failure event **self-contained**: a hologram rather than a breadcrumb.

> **The core principle**: Every event payload should encapsulate the full context required to replay the situation at t₀ without querying external databases.

A holographic event for a selector failure looks like:

```typescript
{
  type: 'browser:selector:failed',
  // The 6-tuple
  subject: 'chatgpt',           // who
  predicate: 'selector:failed', // what happened
  object: 'submit',             // what action
  context: {                    // when/where
    url: 'https://chatgpt.com/c/abc123',
    recipeVersion: 'v1.2.0',
    attempt: 3
  },
  evidence: {                   // proof
    screenshot: 'base64...',
    domSnapshot: '<html>...',
    selectorsAttempted: [
      '[data-testid="send-button"]',
      'button[aria-label="Send"]'
    ],
    timing: { waitedMs: 5000 }
  },
  confidence: 0.0               // repair bot will set

[...truncated]

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
1. Capture the essence of ""Self-Healing Systems: The Holographic Event Pattern"" visually
2. Work as a hero image (1200x630)
3. Follow the brand aesthetic guidelines above
4. Be specific enough for an image model to execute

Output the image generation prompt only, ready to paste into an image model.

================================================================================

To generate image, run with --generate flag
Or copy the prompt above into Gemini/DALL-E/Midjourney
