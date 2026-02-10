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

I've been feeling disoriented lately. I'll design something — a tool schema, a prompt, a UI — and realize halfway through that I don't know who's using it. A human? An agent? Both in sequence? The old instincts don't quite apply.

Traditional UX has a hidden assumption: humans on both sides. A human designs the interface; a human uses it. Every principle we've developed — Fitts's Law, cognitive load theory, the 80/20 rule — assumes biological constraints. Attention is scarce. Working memory is limited. Motor control is imprecise. The entire discipline is built on the physics of being a person sitting in front of a screen.

That assumption is breaking. And it's unsettling, because we don't have new principles yet. Just hunches.

---

When you account for AI agents as both creators and consumers of interfaces, you get four quadrants:

|               | For Humans     | For Agents               |
|---------------|----------------|--------------------------|
| **By Humans** | Traditional UX | Context Engineering      |
| **By Agents** | Generative UI  | Agent-to-Agent Protocols |

Each quadrant has different physics. I want to walk through what I think I know about each, which is uneven — I've spent years in the first quadrant and months in the others.

---

**Quadrant 1: Traditional UX.** By humans, for humans.

This is what we know. Affordances, feedback loops, progressive disclosure. The Nielsen heuristics. Design systems with 8px grids. We've had 40 years to develop these principles, and they're good.

They're also insufficient for the world we're building now — not because they're wrong, but because they only cover one quadrant of a four-quadrant problem.

The risk is treating Q1 principles as universal when they're actually local. Cognitive load theory tells you that humans can hold roughly seven items in working memory. An agent's "working memory" is its context window — orders of magnitude larger, with completely different failure modes. Designing for one as though you're designing for the other produces bad interfaces for both.

---

**Quadrant 2: Context Engineering.** By humans, for agents.

This is where most AI product work happens today. Humans design prompts, tool schemas, and system instructions that shape how AI behaves.

The key insight I keep returning to: constraints matter more than instructions. You can't prompt your way to reliability. You need structured outputs, validation schemas, and bounded action spaces. The prompt is a suggestion. The schema is a law.

This is more concrete than it sounds. Tool descriptions alone account for roughly 40% of task completion improvement in agent benchmarks. The schema *is* the design. A well-structured tool definition — clear parameter types, explicit descriptions of what each field means, constrained enums instead of open strings — does more for agent performance than paragraphs of natural language instruction.

If you're a designer working on AI products and you're not thinking about schema design, you're designing in Q1 while your product lives in Q2. This is the most common mistake I see: teams applying human-interface intuitions to agent-interface problems.

---

**Quadrant 3: Generative UI.** By agents, for humans.

AI generates interfaces on the fly. Vercel's v0 is early here. Claude artifacts. Dynamic dashboards that reconfigure based on user intent.

The challenge is coherence over time. When every screen is generated, how do you maintain brand, accessibility, and user expectations? A static design system assumes humans are producing the components and can exercise judgment about context. A generative system has no such judgment — it'll produce something that matches the prompt but violates the brand, breaks accessibility, or confuses users who expected consistency.

The answer, I think, is design tokens as hard constraints rather than suggestions. Not "prefer this color palette" but "these are the only colors that exist." Not "try to maintain 16px body text" but "body text is 16px, period." The tighter the constraint system, the more reliable the generation.

This is the problem I explored more fully in [[Rapid Generative Prototyping: Design in the Post-Figma Era|Rapid Generative Prototyping]] — how constraint architecture replaces mockups as the designer's primary deliverable.

---

**Quadrant 4: Agent-to-Agent Protocols.** By agents, for agents.

Mostly unexplored. MCP (Model Context Protocol) is one attempt — a standard way for agents to discover and invoke tools. But we don't yet have a design system for agent-to-agent interaction.

What does "good UX" even mean when both parties are LLMs? Is it schema clarity? Protocol efficiency? Error recovery patterns? I genuinely don't know. The principles will probably look more like API design than interface design — versioning, backward compatibility, graceful degradation. But even that's a guess.

If you're thinking about this quadrant, I'd love to hear what you're finding. This is the frontier, and I have more questions than hunches.

---

Across all four quadrants, I noticed the same pattern recurring: the interfaces that worked best were the ones with the strongest constraints. Not the best prompts, not the most detailed instructions — the tightest boundaries on what could happen.

That observation turned into a separate essay — [[Code Owns Truth]] — which develops a three-layer model: constraints bound the mutation space, prompts express intent, code is the source of truth. The designer's job is increasingly the constraint layer.

I won't restate the full argument here, but the 2×2 is where it started. Each quadrant is a different expression of the same underlying question: who sets the constraints, and for whom?

---

If you're designing for AI-touched systems, the first question isn't "what should this look like?" It's "which quadrant am I in?"

Most teams think they're in Q1 when they're actually in Q2 or Q3. The physics are different. The principles are different. The failure modes are different.

I find this exciting and a little scary — exciting because there's real design work to do in quadrants we barely understand, scary because the old playbook was comfortable and these new quadrants don't have playbooks yet.

But comfort isn't the goal. Usefulness is. And right now, mapping the new physics feels more useful than anything else I could be doing.
