---
title: "Proof, Not Truth: Epistemic Humility in Knowledge Systems"
date: 2026-02-04T10:00
type: post
schemaVersion: 1
description: "We don't sell answers. We sell receipts. The receipts are what earn the right to call something true."
heroImage: /images/posts/proof-not-truth-hero.png
tags:
  - architecture
  - engineering
  - epistemology
---

We're building a knowledge system at work — a graph that aggregates signals about products, codes, and claims. The naming question came up: do we call it a "Truth Graph"?

I went back and forth on this. The reasoning matters more than the answer.

---

My first instinct was no. Truth is a dangerous word for a system that stores assertions with confidence levels.

Here's the context. Even frontier LLMs hallucinate at meaningful rates — the [Vectara Hallucination Leaderboard](https://github.com/vectara/hallucination-leaderboard) (February 2026) shows 8-15% on grounded summarization and north of 30% on complex reasoning and open-domain recall. If you're building a knowledge system that ingests AI-generated signals alongside human-sourced data, you need to take uncertainty seriously at the architectural level.

You can't just store assertions and call them facts.

So the question isn't philosophical. It's engineering: how do you build a system that's honest about what it knows and how well it knows it?

My instinct was to call it a "Proof Graph." Proof shows the work. Proof carries its evidence. Proof invites scrutiny instead of demanding trust.

But the more I sat with it, the more I realized the problem isn't the word *truth*. It's what we let truth mean.

---

Take a promo code. SAVE20 is "true" — it works at checkout — until it isn't. It expires, gets rate-limited, or the retailer kills it without notice. Yesterday's working code is today's expired one.

Most systems treat this as binary: valid or invalid. But the reality is messier. Verified 2 hours ago, 847 successful applies this week, confidence 0.91 — but decaying, because a failure signal came in 23 minutes ago. The system knows it's getting stale. The truth has a half-life, and the half-life is part of the data model.

Product recommendations are the same problem at a different timescale. We make claims like "best vacuum for pet hair." That's not a fact — it's a position backed by 47 reviews, 3 teardown videos, and 12k purchase signals, carrying 0.84 confidence. When a better product launches or new reviews come in, the confidence updates. The claim is traceable. Someone can check the receipts.

These are two problems I'm actually working on, and they taught me the same thing: most systems conflate two very different kinds of truth.

**Naive truth** is binary. Something is true or it isn't. The data goes in, the label says true, and nobody asks what happens when the evidence changes. **Scientific truth** is provisional — the best-verified model given available evidence, subject to revision when better data arrives. Not "we know this" but "this is currently holding."

The essay I almost wrote argued for replacing truth with proof. The essay I'm actually writing argues for making truth mean something rigorous — and building systems that enforce the rigor.

In both cases — promo codes and product claims — the proof framing is honest about uncertainty (confidence scores), traceable (evidence sources), updatable (new evidence revises the proof), and falsifiable (you can check the receipts).

When it's wrong, you can trace why. That's the difference between a system that fails gracefully and one that fails mysteriously.

---

The architecture that makes this work is richer than a standard triple store.

Every node in the graph carries six elements:

`(Subject, Predicate, Object, Context, Evidence, Confidence)`

- **Subject**: What entity is this about?
- **Predicate**: What kind of claim?
- **Object**: What's being claimed?
- **Context**: When, where, under what conditions?
- **Evidence**: What sources support this?
- **Confidence**: How sure are we? (0.0–1.0)

The confidence element is what separates this from a database of facts. Facts don't have confidence levels. Proofs do.

---

And proofs aren't static. They mutate.

This is a critical part of the architecture — without mutation, you just have assertions with metadata. With mutation, you have a living system.

**Mutation triggers:**

1. **Decay threshold crossed** — evidence gets stale. A promo code verified last week is less trustworthy than one verified an hour ago. Confidence should reflect that automatically.
2. **Contradictory signal received** — new data conflicts with the existing claim. A flood of "code expired" reports should drop confidence immediately, not wait for a human to notice.
3. **Source invalidated** — a cited source goes offline or is discredited. If a review site we relied on turns out to be astroturfed, every claim sourced from it needs to be re-evaluated.
4. **User dispute filed** — someone challenges the claim. Human signals are evidence too.

Kinetic proofs rather than static facts. The graph is alive. Claims earn the status "true," maintain it through continued verification, and lose it when the evidence no longer supports them.

---

So what did we call it?

We called it a Truth Graph. But we meant it the rigorous way.

The insight I came to — and the reason I'm writing through the internal debate instead of just landing on an answer — is that truth was never a single thing. In science, truth is a falsifiable theory that survives testing. In law, it's evidence beyond reasonable doubt. In journalism, it's multiple sources, verified. In medicine, it's peer-reviewed and replicated.

Truth was always *truth-according-to-some-methodology*. The methodology was just implicit — which is how "truth" got sloppy. People started claiming it without showing their work.

If your graph stores assertions and calls them true without evidence, confidence, or decay — that's naive truth. Don't do it.

If your graph stores evidence with confidence levels, decays stale claims, revises when contradicted, and responds to disputes — that's scientific truth. Provisional knowledge. True until proven otherwise.

The receipts aren't separate from the truth. They're what *makes* it true. Proof gets absorbed into the noun.

A Truth Graph isn't a database of facts. It's a machine for earning and revoking the status "true."

---

The naming matters more than it sounds like it should. It shapes how engineers think about the system, how users calibrate trust, and what happens when you're wrong.

I pushed for "Proof Graph" because I was worried about the naive reading — engineers treating "truth" as permission to skip uncertainty. I came around to "Truth Graph" because the rigorous reading is actually *more demanding*, not less.

Proof says "here's my evidence." Truth says "I've earned this status, and I'll lose it if the evidence changes."

Truth carries a higher burden. It just needs a system that enforces it.

We don't sell answers. We sell receipts. The receipts are what earn the right to call something true.

In a world of synthetic everything — AI-generated content, AI-sourced signals, confidence scores stacked on confidence scores — implicit methodology isn't good enough anymore. If your system claims truth, it needs to show how truth gets earned, maintained, and revoked.

That's the system. That's the graph.

---

*The production implementation of these principles is documented in [Anatomy of a Verdict: How SimplyCodes Adjudicates Truth in a Broken Economy](https://zenodo.org/records/18625118), a technical whitepaper on our verification architecture.*
