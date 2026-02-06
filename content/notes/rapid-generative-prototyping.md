---
title: "Rapid Generative Prototyping: Design in the Post-Figma Era"
date: 2026-02-06
draft: false
description: "Design is no longer artifact creation—it's constraint architecture. The three-layer model for the agentic economy."
tags:
  - design
  - ai
  - architecture
---

*Applying the [three-layer model](/posts/code-owns-truth/) to design: what happens when constraints replace mockups.*

## The Rupture

Design in 2025 is still running on print-era physics. The fundamental assumptions:

1. **The layout is the constant.** Designers produce static mockups that define pixel-perfect UIs.
2. **The human is the compiler.** Developers manually translate visual artifacts into code.
3. **The handoff is the bottleneck.** Design → Engineering is a one-way process with 5-10 day latency.
4. **Visual craft is the moat.** A designer's value is measured by their speed in Figma.

This model is existentially broken. Not failing—*broken*. Here's why:

**AI can now generate "good enough" visual design in seconds.** Tools like v0.dev, Cursor, and Figma Make have commoditized the artifact. The mockup is no longer scarce. The handoff is no longer necessary. The pixel-pushing throughput that defined a designer's value? Machines do it faster.

So what's left?

---

## The New Physics

Design in the agentic economy is not artifact creation. It's **constraint architecture**.

The designer's role inverts:
- **FROM:** Pixel-pushing author of static layouts
- **TO:** Architect of constraint systems that govern generative UI

The new deliverable isn't a Figma file. It's a set of rules that tell AI what's *allowed* — and more importantly, what isn't.

---

## The Three-Layer Model

```
┌─────────────────────────────────────┐
│  CONSTRAINTS (Design Physics)       │  ← Bounds the mutation space
├─────────────────────────────────────┤
│  PROMPTS (Mutation Layer)           │  ← Expresses intent, inherently fuzzy
├─────────────────────────────────────┤
│  CODE (Source of Truth)             │  ← Deterministic, versioned, testable
└─────────────────────────────────────┘
```

**Code owns truth.** The generated component is what ships. It's versioned, testable, deterministic. No ambiguity.

**Prompts express intent.** "Make a card with a header and call-to-action" is how humans talk to machines. But prompts alone produce unacceptable variance.

**Constraints bound the variance.** This is the designer's new job. Not drawing the card — defining what a card *can be*. Token hierarchies. Spacing rules. Typography scales. Allowable states. The physics that makes prompts reliable.

The pattern repeats everywhere:
- **SQL:** Schema (constraints) → Queries (prompts) → Tables (truth)
- **Git:** Branch policies (constraints) → Commits (prompts) → Main (truth)
- **GenDOS:** Design physics (constraints) → Generative prompts (mutations) → Component code (truth)

---

## What Constraints Look Like

### Token Architecture (3-Tier)

```
Primitives → Semantics → Components
```

1. **Primitives:** Raw physical values. `--gray-900: #111111`. Never use directly.
2. **Semantics:** Context-aware mappings. `--surface-base: var(--gray-900)` in dark mode, `var(--white)` in light mode.
3. **Components:** Scoped overrides. `--card-bg: var(--surface-layer)`.

The designer's job is engineering this hierarchy — not picking colors for individual mockups.

### Generative Grammars

Machine-readable schemas that define allowable UI structures:

```yaml
card:
  required:
    - header
    - body
  optional:
    - image
    - footer
    - cta
  constraints:
    header.maxLength: 60
    body.maxLength: 200
    cta.variant: [primary, secondary, ghost]
```

The LLM can generate infinite variations of a card. But it can only generate *valid* cards.

### Variance Budgets

Mathematical bounds on acceptable output:

- Headline length: 40-80 characters
- Tone: `['formal', 'terse', 'warm']`
- Color: semantic tokens only (no hardcoded hex)
- Spacing: scale values only (`--space-4`, `--space-6`)

If a generated component violates the budget, it fails validation. Automatically.

---

## The Designer as Context Engineer

The designer doesn't draw anymore. They serialize strategic intent into machine-parseable constraints.

**Old workflow:**
1. PM writes requirements
2. Designer interprets → mockup
3. Engineer interprets → code
4. 40% intent loss per handoff
5. 5-10 day latency per iteration

**New workflow:**
1. Strategy → Design Physics (constraints)
2. Prompt → Generated code (within constraints)
3. Validation → Ship or reject
4. Minutes, not weeks

The designer's moat isn't pixel-pushing speed. It's the *quality of constraints* — how well they compress strategic intent into rules that produce good outcomes at scale.

---

## Why "Design Physics"?

Physics isn't a metaphor. It's literal.

In the physical world, you don't draw every atom. You define the laws — gravity, electromagnetism, thermodynamics — and the universe instantiates consistent matter from those laws.

You don't draw every component. You define the constraints — token hierarchies, grammars, variance budgets — and the system generates consistent UI from those constraints.

The designer becomes a physicist. Not painting the universe. Writing its rules.

---

## The Deliverables

What does a designer ship in this world?

1. **Design Physics** — Axioms. Immutable rules. Token architecture.
2. **Generative Grammars** — Schemas that constrain structure.
3. **Variance Budgets** — Mathematical bounds on output.
4. **Containment Protocols** — What AI can do autonomously vs. what requires human approval.

Not Figma files. *Constraint systems.*

---

## The Hard Question

If AI generates the artifacts and constraints bound the generation — what's the human doing?

**Judgment.** 

Constraints don't write themselves. Someone has to decide:
- What matters
- What's non-negotiable
- What variance is acceptable
- Where the system should be tight vs. loose

That's taste. That's strategy. That's the thing AI can't do yet.

The designer's job is encoding their judgment into durable, machine-executable form. Constraints are crystallized taste.

---

## The New Workflow

Rapid Generative Prototyping flips the entire process:

1. **Start with constraints** — token architecture, grammars, variance budgets
2. **Prompt for variations** — generate 10-20 options in minutes, not days
3. **Score against physics** — automated validation, not subjective review
4. **Ship the code** — the generated component *is* the deliverable

No Figma handoff. No pixel-pushing. No 5-day latency.

Strategy → Constraints → Generation → Production. In hours.

---

## The Post-Figma Designer

Figma was the pinnacle of the old physics — the fastest way to push pixels. But speed in a deprecated paradigm isn't a moat.

The post-Figma designer doesn't open Figma first. They might not open it at all. Instead:

- They write design physics before anyone touches a screen
- They define grammars that make bad designs impossible
- They tune variance budgets until generation is reliable
- They review outputs, not mockups

Figma becomes optional. A polish tool, maybe. A legacy bridge for stakeholders who need to "see the design." But not the source of truth.

**The source of truth is the constraint system.** The artifacts flow from it.

---

## Who This Is For

This isn't for designers who want to keep pixel-pushing. Those jobs are shrinking.

This is for designers who want to become **context engineers** — people who understand that their value isn't in the artifact, but in the constraint system that produces artifacts at scale.

It's for the people who'd rather write the laws of physics than draw every atom.

---

*What is "design" when the artifact is no longer the deliverable?*

*It's the constraint architecture that makes good artifacts inevitable.*
