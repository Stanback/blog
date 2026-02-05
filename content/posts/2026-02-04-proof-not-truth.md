---
title: "Proof, Not Truth: Epistemic Humility in Knowledge Systems"
date: 2026-02-04
type: post
schemaVersion: 1
draft: false
featured: true
tags:
  - epistemology
  - ai
  - systems
  - knowledge
description: "Why knowledge systems should claim to show their work, not to know the truth. The case for Proof Graphs over Truth Graphs."
heroImage: /images/posts/proof-not-truth-hero.png
tension: "Truth implies certainty. But the best we can do is justified belief with receipts."
questions:
  - "What's the difference between claiming truth and claiming proof?"
  - "How do you design systems that are honest about uncertainty?"
coAuthors:
  - name: "Lunen"
    emoji: "🌙"
    note: "AI collaborator"
---

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
- **Object**: What's being claimed?
- **Context**: When/where/under what conditions?
- **Evidence**: What sources support this?
- **Confidence**: How sure are we? (0.0 - 1.0)

This is richer than a simple triple store. It's designed for systems that need to reason about uncertainty.

## Mutation Triggers

Proofs aren't static. They should update when:

1. **Decay threshold crossed** — evidence gets stale
2. **Contradictory signal received** — new data conflicts
3. **Source invalidated** — a cited source goes offline or is discredited
4. **User dispute filed** — someone challenges the claim

"Kinetic proofs" rather than static facts. The graph is alive.

## The Naming Matters

It might seem like semantics, but naming shapes thinking.

"Truth Graph" encourages engineers to think in binaries. The system either knows or it doesn't.

"Proof Graph" encourages thinking in gradients. The system has evidence of varying quality, and that quality is part of the data model.

We don't sell answers. We sell receipts.

---

*Proofs can be wrong. But at least they show you why they might be.*
