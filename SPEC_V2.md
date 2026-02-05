# SPEC_V2.md — 2026 Site Evolution

> Improvements to bristanback.com based on first-principles 2026 critique.
> For review with Bri on 2026-02-05.

---

## Executive Summary

The site is already strong on **taste**, **restraint**, and **intellectual honesty**. The work now is:

1. Making thinking legible sooner (orientation)
2. Letting more humanity leak through (cost, not polish)
3. Declaring structure without declaring dominance (pillars)
4. Being findable by agents without becoming optimized (AEO)

**Key principle:** Everything below should pass this test: *"Would this make my thinking clearer to a careful human?"*

---

## Tier 1 — Highest Leverage (Do First)

### 1.1 Reader Orientation Block

**Problem:** The site assumes readers know why you're worth listening to. First contact has no scaffolding.

**Solution:** Add a single orientation block to the homepage thesis area.

```markdown
This is a space for thinking about judgment, systems, and design 
in an era where execution is cheap and discernment isn't.

For builders who are curious and tired of performative certainty.
```

**Implementation:**
- Add to homepage below logo bounding box
- Subtle typography (not hero text)
- 2-3 sentences max

**Axiom update:** `thesis.md` — add "Orientation Block" to homepage components

---

### 1.2 Architectural Pillars

**Problem:** You have a worldview, but it's implicit. Implicit systems privilege insiders.

**Solution:** Define 3-4 explicit pillars that everything maps to.

**Proposed pillars:**

| Pillar | Domain |
|--------|--------|
| **Judgment & Epistemology** | How we know what we know, when to trust |
| **Systems & Constraints** | Code, architecture, design physics |
| **Interfaces** | Human ↔ machine, agent UX, tools |
| **Identity & Authorship** | Voice, authenticity, AI co-creation |

**Implementation:**
- New axiom file: `axioms/pillars.md`
- Surface on homepage (subtle)
- Use as mental filter for what gets published
- Can map to tags or section labels

**Axiom update:** Create `pillars.md`

---

### 1.3 Human Signal Density

**Problem:** Voice is authentic but slightly too clean. "AI adjacency" enters because cost isn't visible.

**First principle:** AI is good at clarity. Humans are legible through *cost*.

**Solution:** For every essay, include at least one of:
- A changed belief
- A misstep / thing that didn't work
- A moment of doubt
- A concrete scene (time/place/tension)

**Example moves:**
- "I used to think X. I was wrong in a quiet, expensive way."
- "This broke in production on a Tuesday. Here's what I learned."
- "I'm not sure this is right, but I'm publishing anyway because..."

**Implementation:**
- Add to voice.md as explicit requirement
- Review existing posts for opportunities
- Not every post needs all four — one is enough

**Axiom update:** `voice.md` — add "Human Cost Signals" section

---

### 1.4 Orientation Whispers (Micro-Prefaces)

**Problem:** Essays start inside the thought. Elegant but demanding.

**Solution:** Add 1-2 sentence preface (visually subtle) to essays.

```markdown
*This piece is about where judgment breaks down when systems scale 
faster than understanding.*
```

**Implementation:**
- Add `preface` field to frontmatter (optional)
- Render in italics, smaller type, before first paragraph
- NOT a summary — an orientation

**Axiom update:** `architecture.md` — add preface to frontmatter schema

---

### 1.5 Earned Authority Signals

**Problem:** Authority can feel absent or must be performed loudly.

**Distinction:** Authority ≠ intensity. Your boss uses assertive authority. You're suited to *earned* authority.

**Solution:** Quiet credibility signals:
- What you build
- What you've been responsible for
- What kinds of decisions you've owned

**Example (for About page):**
```markdown
These ideas come from building systems where mistakes were expensive 
and ambiguity was unavoidable.
```

**Implementation:**
- Update About page with situated voice
- Not a resume — a perspective rooted in experience
- Can also appear in specific essays when relevant

**Axiom update:** `voice.md` — add "Situated Authority" section

---

## Tier 2 — Structural Improvements (Medium Leverage)

### 2.1 Navigation Descriptors

**Problem:** "Writing / Notes / Library / Photos" describes containers, not intent.

**Solution:** Add second-line descriptors (don't rename sections).

```
Writing       → Essays on judgment & systems
Notes         → In-progress thinking
Library       → Influences & references
Photos        → Observations
```

**Implementation:**
- Mobile: descriptors hidden (just section names)
- Desktop: subtle descriptors below nav items
- Or: shown on section landing pages only

**Axiom update:** `architecture.md` — add section descriptors

---

### 2.2 Typographic Breathing Room

**Problem:** Density is good but pages don't help readers breathe.

**Solution (minimal):**
- Slightly more whitespace between conceptual moves (h2 spacing)
- Occasional pull-quote for thesis sentences (sparingly)
- Already improved: italic serif headings create hierarchy

**Implementation:**
- Review h2/h3 margins in `design-system.md`
- Add `.pull-quote` class (use 1x per long essay max)
- Don't overdo — density is a feature

**Axiom update:** `design-system.md` — add pull-quote pattern

---

### 2.3 Start Here Path

**Problem:** New readers don't know where to begin.

**Solution:** Curate 3-5 anchor pieces:
- Most accessible
- Most representative  
- Most human

**Proposed selection:**
1. "Code Owns Truth" — core mental model
2. "Design Physics" — 2×2 framework, accessible
3. One personal/vulnerable piece (when ready)

**Implementation:**
- Homepage "Start Here" module (already scaffolded in thesis.md)
- Label: "If you're new, these are good entry points"
- Not a "best of" — an *orientation*

**Axiom update:** `thesis.md` — formalize Start Here criteria

---

## Tier 3 — Refinement (Lower Urgency, High Polish)

### 3.1 AI Relationship Statement

**Problem:** Using AI is obvious to some readers, suspicious to others.

**Solution:** One essay or note explaining:
- How you think with AI
- Where you don't trust it
- What "co-author" means

**Positioning:** Ahead of the discourse, not defensive.

**Implementation:**
- New note: "How I Work With AI"
- Link from About page
- Not apologetic — matter-of-fact

---

### 3.2 Allow Incompleteness

**Problem:** Over-curation signals AI, not humanity.

**Solution:** Deliberately leave:
- A short note
- A fragment
- An unfinished idea

**First principle:** AI closes loops. Humans don't always.

**Implementation:**
- Notes section naturally supports this
- Resist urge to "complete" everything
- Some drafts can graduate as fragments

---

## New Axiom: AEO & Legibility

**Create:** `axioms/aeo-legibility.md`

```markdown
# AEO & Legibility Axiom

> Be legible to reasoning systems without flattening your thinking.

## Core Principle

AEO (Agent Experience Optimization) in 2026 is NOT about:
- FAQ blocks everywhere
- "What is X?" headings
- Synthetic summaries
- Schema spam

It IS about:
- Clear claims
- Stable definitions
- Traceable reasoning
- Authorial consistency

## High-Integrity Practices

### 1. Explicit Claims
Use clear declarative sentences for core ideas.
Let them stand alone visually.

> Code owns truth. Everything else is negotiation.

### 2. Canonical Vocabulary
Define key terms once, cleanly, somewhere canonical.
Reuse consistently.

Terms to define:
- Judgment
- Constraints  
- Interfaces
- Epistemic humility
- Design physics

### 3. Structural Cues (Invisible to Humans)
- Section headers that reflect reasoning steps
- "Therefore" / "This implies" transitions
- Paragraphs that end in claims, not fades

### 4. Identity Continuity
- Name consistently attached to essays
- Stable tone and conceptual scope
- One clear bio statement

### 5. Anchor Pages
3-5 essays that become citation magnets:
- Your view on judgment
- How you think about AI + humans
- Systems and constraints

## The Litmus Test

Before adding anything for AEO, ask:
"Would this make my thinking clearer to a careful human?"

If yes → do it
If no → skip it
```

---

## New Axiom: Pillars

**Create:** `axioms/pillars.md`

```markdown
# Pillars Axiom

> The architectural spine of this site. Everything maps to these.

## The Four Pillars

### 1. Judgment & Epistemology
How we know what we know. When to trust. Calibration.
- Proof vs Truth
- Confidence and uncertainty
- The limits of verification

### 2. Systems & Constraints
Code, architecture, design physics.
- Code owns truth
- Constraints as the design layer
- What survives context windows

### 3. Interfaces
Human ↔ machine. Agent UX. Tools.
- Design physics
- Agentic UX
- The three-layer model

### 4. Identity & Authorship
Voice, authenticity, AI co-creation.
- Working with AI
- What it means to publish
- The vulnerability gradient

## Usage

- Use pillars as mental filter for what to publish
- Map new content to at least one pillar
- If it doesn't fit → maybe it's not for this site
- Pillars can evolve (slowly)

## Not a Manifesto

These are internal scaffolding, not marketing copy.
Surface subtly or not at all.
```

---

## Axiom Updates Summary

| File | Change |
|------|--------|
| `thesis.md` | Add Orientation Block component, formalize Start Here criteria |
| `voice.md` | Add "Human Cost Signals" section, add "Situated Authority" section |
| `architecture.md` | Add `preface` to frontmatter schema, add section descriptors |
| `design-system.md` | Add pull-quote pattern |
| **NEW** `aeo-legibility.md` | Agent-era discoverability principles |
| **NEW** `pillars.md` | Architectural spine |

---

## Implementation Priority

### This Week
1. [ ] Reader orientation block on homepage
2. [ ] Create `pillars.md` axiom
3. [ ] Create `aeo-legibility.md` axiom
4. [ ] Add preface to 1-2 existing essays (test the pattern)

### Next Week
5. [ ] Update voice.md with human cost signals
6. [ ] Review existing posts for human signal opportunities
7. [ ] Add navigation descriptors to section pages
8. [ ] Define canonical vocabulary (start with 3-5 terms)

### Ongoing
- Write "How I Work With AI" note
- Curate Start Here selection (need 3-5 pieces)
- Allow fragments and incompleteness to exist

---

## What I'm NOT Recommending

These were in the critique but I'm **pushing back**:

1. **Renaming navigation sections** — Current format-based names are clear. Descriptors are enough.

2. **Heavy pull-quotes** — One per long essay max. Your density is a feature.

3. **Warming the visual language** — You already have dusty rose, warm neutrals, italic serif. It's warm.

4. **FAQ-style AEO** — Would make the site feel like slop. Pass the litmus test instead.

5. **"What this site is not"** — Implied by what it is. Don't over-explain.

---

## The Adjudication

**What's already strong:**
- Thesis axiom's "Taste Is the Trust Primitive" — perfect
- Voice axiom's "admit uncertainty" — aligned with human signal
- Content-types vulnerability gradient — this is exactly right
- Design system's "quiet, observational, warm" — no changes needed

**What was missing:**
- Explicit orientation for first-contact readers
- Architectural pillars (worldview was implicit)
- "Show the cost" guidance (not just "admit uncertainty")
- AEO principles that don't compromise voice

**What the critique got right:**
- Orientation is inclusiveness
- Structure is hospitality
- Humanity shows in cost, not polish
- Quiet systems outlast loud manifestos

**What I'd refine:**
- "Earned authority" is better framed as "situated voice" — not about credentials, about perspective
- Navigation reframe is better as "add descriptors" not "rename"
- Incompleteness is already built into your Notes system — just lean into it more

---

*Ready for review. This is a tool, not a law. Take what fits, leave what doesn't.*
