---
title: "Design Physics: When Interfaces Meet Agents"
date: 2026-02-05T12:00
type: post
schemaVersion: 1
description: "Traditional UX has a hidden assumption: humans on both sides. That assumption is breaking."
heroImage: /images/posts/design-physics-hero.png
tags:
  - design
  - ai
  - architecture
---

I was designing a tool schema last month — the interface an AI agent uses to call a function — and caught myself adding a tooltip. A tooltip. For a machine. The instinct was so deep I didn't even notice it until I'd written the microcopy.

That's when the disorientation hit. I've been designing interfaces for over a decade, and suddenly I don't always know who's on the other side. A human? An agent? Both in sequence? The old instincts fire, but they land wrong.

Traditional UX has a hidden assumption: humans on both sides. A human designs the interface; a human uses it. Every principle we've developed — Fitts's Law, cognitive load theory, the 80/20 rule — assumes biological constraints. Attention is scarce. Working memory is limited. Motor control is imprecise. The entire discipline is built on the physics of being a person sitting in front of a screen.

That assumption is breaking. And we don't have new principles yet. Just hunches.

---

The disorientation came into focus when I realized the problem has a shape. There are two axes: who's building the interface (human or agent), and who's consuming it (human or agent). That gives you four quadrants — four different sets of physics:

|               | For Humans     | For Agents               |
|---------------|----------------|--------------------------|
| **By Humans** | Traditional UX | Context Engineering      |
| **By Agents** | Generative UI  | Agent-to-Agent Protocols |

I've spent years in the first quadrant. The others, months at most. What I know is uneven — and the unevenness is the point. Most design teams are in the same position: deep expertise in one quadrant, applied to problems that live in another.

---

The quadrant where I keep getting surprised is Q2 — humans designing for agents. This is where most AI product work happens today: prompts, tool schemas, system instructions that shape how AI behaves.

My tooltip instinct was a Q1 habit bleeding into Q2. Cognitive load theory tells you that humans can hold roughly seven items in working memory. An agent's "working memory" is its context window — orders of magnitude larger, with completely different failure modes. I was designing for a person who doesn't exist.

The insight I keep returning to: constraints matter more than instructions. You can't prompt your way to reliability. You need structured outputs, validation schemas, and bounded action spaces. The prompt is a suggestion. The schema is a law.

This is more concrete than it sounds. Tool descriptions alone account for roughly 40% of task completion improvement in agent benchmarks. A well-structured tool definition — clear parameter types, explicit descriptions of what each field means, constrained enums instead of open strings — does more for agent performance than paragraphs of natural language instruction.

If you're a designer working on AI products and you're not thinking about schema design, you're designing in Q1 while your product lives in Q2. This is the most common mistake I see.

---

Q3 — agents building for humans — is where the constraint question gets interesting. AI generates interfaces on the fly. Vercel's v0 is early here. Claude artifacts. Dynamic dashboards that reconfigure based on user intent.

The challenge is coherence over time. When every screen is generated, how do you maintain brand, accessibility, and user expectations? A static design system assumes humans are producing the components and can exercise judgment about context. A generative system has no such judgment — it'll produce something that matches the prompt but violates the brand, breaks accessibility, or confuses users who expected consistency.

The answer, I think, is design tokens as hard constraints rather than suggestions. Not "prefer this color palette" but "these are the only colors that exist." Not "try to maintain 16px body text" but "body text is 16px, period." The tighter the constraint system, the more reliable the generation.

This is the problem I explored more fully in [[Rapid Generative Prototyping: Design in the Post-Figma Era|Rapid Generative Prototyping]] — how constraint architecture replaces mockups as the designer's primary deliverable.

---

And then there's Q4 — agents building for agents — which is mostly unexplored. MCP is one attempt at a standard. But we don't yet have a design system for agent-to-agent interaction. What does "good UX" even mean when both parties are LLMs? The principles will probably look more like API design than interface design — versioning, backward compatibility, graceful degradation. But even that's a guess. This is the quadrant where I have questions and almost nothing else.

---

Across all four quadrants, the same pattern keeps recurring: the interfaces that worked best were the ones with the strongest constraints. Not the best prompts, not the most detailed instructions — the tightest boundaries on what could happen.

That observation turned into a separate essay — [[Code Owns Truth]] — which develops a three-layer model: constraints bound the mutation space, prompts express intent, code is the source of truth. The designer's job is increasingly the constraint layer.

The 2×2 is where it started. Each quadrant is a different expression of the same underlying question: who sets the constraints, and for whom?

If you're designing for AI-touched systems, the first question isn't "what should this look like?" It's "which quadrant am I in?" Most teams think they're in Q1 when they're actually in Q2 or Q3. The physics are different. The principles are different. The failure modes are different.

I find that exciting and unsettling in roughly equal measure. There's real design work to do in quadrants we barely understand. The old playbook was comfortable. These new quadrants don't have playbooks yet.
