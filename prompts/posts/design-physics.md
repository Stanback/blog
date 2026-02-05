================================================================================
IMAGE GENERATION PROMPT
================================================================================

# Image Generation Request

## Article Context
**Title**: "Design Physics: When Interfaces Meet Agents"
**Description**: "The 2×2 framework for understanding interface design in an age of AI agents. Why we need new physics."
**Core Tension**: "Traditional UX assumes humans on both sides. That's no longer true."
**Key Themes**: the 2×2 framework, the three-layer model, what this means
**Tone**: contemplative, questioning

## Article Excerpt (for context)

# Design Physics: When Interfaces Meet Agents

Traditional UX has a hidden assumption: humans on both sides. A human designs the interface; a human uses it. Every principle we've developed—Fitts's Law, cognitive load theory, the 80/20 rule—assumes biological constraints.

That assumption is breaking.

## The 2×2 Framework

When you account for AI agents as both creators and consumers of interfaces, you get four quadrants:

|  | **For Humans** | **For Agents** |
|--|----------------|----------------|
| **By Humans** | Traditional UX | Context Engineering |
| **By Agents** | Generative UI (A2UI) | Agent-to-Agent Protocols |

Each quadrant has different physics.

### Quadrant 1: Traditional UX (By Humans, For Humans)

This is what we know. Affordances, feedback loops, progressive disclosure. The Nielsen heuristics. Design systems with 8px grids. We've had 40 years to figure this out.

### Quadrant 2: Context Engineering (By Humans, For Agents)

This is where most AI product work happens today. Humans design prompts, tool schemas, and system instructions that shape how AI behaves.

The key insight: **constraints matter more than instructions**. You can't prompt your way to reliability. You need structured outputs, validation schemas, and bounded action spaces.

Tool descriptions alone account for ~40% of task completion improvement in agent benchmarks. The schema *is* the design.

### Quadrant 3: Generative UI (By Agents, For Humans)

AI generates interfaces on the fly. Vercel's v0 is early here. Claude artifacts. Dynamic dashboards that reconfigure based on user intent.

The challenge: **coherence over time**. When every screen is generated, how do you maintain brand, accessibility, and user expectations? The answer is probably design tokens as hard constraints, not suggestions.

### Quadrant 4: Agent-to-Agent Protocols (By Agents, For Agents)

Mostly unexplored. MCP (Model Context Protocol) is one attempt. But we don't yet have a design system for A2A.

What does "go

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
1. Capture the essence of ""Design Physics: When Interfaces Meet Agents"" visually
2. Work as a hero image (1200x630)
3. Follow the brand aesthetic guidelines above
4. Be specific enough for an image model to execute

Output the image generation prompt only, ready to paste into an image model.

================================================================================

To generate image, run with --generate flag
Or copy the prompt above into Gemini/DALL-E/Midjourney
