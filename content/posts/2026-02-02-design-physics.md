---
title: "Design Physics: When Interfaces Meet Agents"
date: 2026-02-02T10:30
type: post
schemaVersion: 1
draft: false
featured: true
tags:
  - design
  - ai
  - ux
  - agents
description: "The 2×2 framework for understanding interface design in an age of AI agents. Why we need new physics."
heroImage: /images/posts/design-physics-hero.png
tension: "Traditional UX assumes humans on both sides. That's no longer true."
questions:
  - "What does 'good design' mean when the user might be an AI?"
  - "How do constraints replace prompts as the primary design lever?"
coAuthors:
  - name: "Lunen"
    emoji: "🌙"
    note: "AI collaborator"
---

# Design Physics: When Interfaces Meet Agents

I've been feeling disoriented lately.

I'll design something — a tool schema, a prompt, a UI — and realize halfway through that I don't know who's using it. A human? An agent? Both in sequence? The old instincts don't quite apply.

Traditional UX has a hidden assumption: humans on both sides. A human designs the interface; a human uses it. Every principle we've developed—Fitts's Law, cognitive load theory, the 80/20 rule—assumes biological constraints.

That assumption is breaking. And it's unsettling, because we don't have new principles yet. Just hunches.

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

What does "good UX" even mean when both parties are LLMs? I genuinely don't know. If you're thinking about this, I'd love to hear what you're finding.

## The Three-Layer Model

Across all quadrants, I keep coming back to the same architecture. I'm not sure it's complete, but it keeps being useful:

```
CONSTRAINTS (Design Physics)
    ↓ bounds the mutation space
PROMPTS (Intent Expression)
    ↓ fuzzy, interpreted, lossy
CODE (Source of Truth)
    ↓ deterministic, versioned, testable
```

**Constraints own the edges.** Prompts express intent. Code is the artifact.

The designer's job is increasingly Layer 1—defining the physics that bound what can happen. Layer 2 (prompting) is where AI has leverage. Layer 3 (code) is where truth lives.

Does this hold up? I think so — but I've only been designing this way for a few months. The model might need revision as the landscape shifts.

## What This Means

If you're designing for AI-touched systems:

1. **Invest in schemas, not just prompts.** Your tool definitions, structured outputs, and validation rules are load-bearing.

2. **Treat constraints as the primary design artifact.** What *can't* happen is as important as what should.

3. **Expect cognitive load to be redefined.** For agents, it's context window efficiency + schema predictability. For humans seeing AI-generated UI, it's trust + coherence.

4. **Build for the quadrant you're actually in.** Most teams think they're in Q1 when they're really in Q2 or Q3.

---

The physics are changing. I find that exciting and a little scary — exciting because there's real design work to do, scary because the old playbook was comfortable.

But comfort isn't the goal. Usefulness is. And right now, figuring out how to design for agents feels more useful than anything else I could be doing.
