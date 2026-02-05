================================================================================
IMAGE GENERATION PROMPT
================================================================================

# Image Generation Request

## Article Context
**Title**: "Proof, Not Truth: Epistemic Humility in Knowledge Systems"
**Description**: "Why knowledge systems should claim to show their work, not to know the truth. The case for Proof Graphs over Truth Graphs."
**Core Tension**: "Truth implies certainty. But the best we can do is justified belief with receipts."
**Key Themes**: the difference, why this matters for ai systems, the 6-tuple structure
**Tone**: contemplative, questioning

## Article Excerpt (for context)

# Proof, Not Truth: Epistemic Humility in Knowledge Systems

I've been thinking about what we call the knowledge layers we're building.

"Truth Graph" sounds confident. Authoritative. It implies we've figured out what's real and stored it. But that's not quite right.

What we're actually building is a **Proof Graph**: a structure where every claim carries its justification.

## The Difference

**Truth** is binary. Something is true or it isn't. Claiming truth means claiming certainty.

**Proof** is a chain. It says: here's the claim, here's the evidence, here's the reasoning, here's my confidence level. It shows the work.

Consider a product recommendation system:

| Claim | Truth Framing | Proof Framing |
|-------|---------------|---------------|
| "Best vacuum for pet hair" | This IS the best | Based on 47 reviews, 3 teardown videos, and 12k purchase signals, this has 0.84 confidence for the "best for pet hair" claim |

The proof framing is:
- **Honest about uncertainty** (confidence scores)
- **Traceable** (evidence sources)
- **Updatable** (new evidence can revise the proof)
- **Falsifiable** (you can check the receipts)

## Why This Matters for AI Systems

AI hallucination rates run 17-33% even with RAG. The models are confidently wrong about a third of the time.

If your system claims *truth*, you're amplifying that confidence. Every output sounds authoritative even when it shouldn't.

If your system shows *proof*, users can calibrate trust:

- "High confidence, multiple independent sources" → probably reliable
- "Low confidence, single source, no verification" → treat with skepticism

The UI can reflect this too. Maybe high-confidence claims get presented cleanly, while low-confidence ones show their evidence traces upfront.

## The 6-Tuple Structure

Every node in a proof graph should carry:

```
(Subject, Predicate, Object, Context, Evidence, Confidence)
```

- **Subject**: What entity is this about?
- **Predicate**: What kind of claim?
- **Object**: What'

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
1. Capture the essence of ""Proof, Not Truth: Epistemic Humility in Knowledge Systems"" visually
2. Work as a hero image (1200x630)
3. Follow the brand aesthetic guidelines above
4. Be specific enough for an image model to execute

Output the image generation prompt only, ready to paste into an image model.

================================================================================

To generate image, run with --generate flag
Or copy the prompt above into Gemini/DALL-E/Midjourney
