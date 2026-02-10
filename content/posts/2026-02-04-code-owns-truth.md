---
title: "Code Owns Truth"
date: 2026-02-04T12:00
type: post
schemaVersion: 1
description: "We obsess over prompt engineering when we should obsess over constraint engineering. The prompt is a request. The constraints are the physics. The code is what ships."
heroImage: /images/posts/code-owns-truth-hero.png
tags:
  - ai
  - architecture
  - engineering
---

The prompt is not the product. The code that emerges is.

This is a frame I've been developing, and I want to lay it out clearly even though I don't have all the concrete examples yet. The framework feels right. The proof will come from using it.

---

Here's the claim: we obsess over prompt engineering when we should obsess over constraint engineering.

A prompt expresses intent. It's the why, the what, the how — but it's inherently fuzzy. The model interprets it. It mutates within whatever space you've given it. And then the session ends, the context window closes, and the prompt is gone. It was temporary, lossy, context-dependent.

Constraints are different. Constraints survive.

A test suite survives. A type system survives. A feature list, a linter config, a CI pipeline — these persist across sessions, across context windows, across models. They bound the mutation space. They define what "correct" looks like before anyone starts building.

The prompt is a request. The constraints are the physics. The code is what ships.

```
┌─────────────────────────────────────────────────────┐
│  CONSTRAINTS   →  bounds the mutation space         │
│  (tests, types, specs, taste, judgment)             │
├─────────────────────────────────────────────────────┤
│  PROMPTS       →  expresses intent, inherently fuzzy│
│  (requests, direction, context)                     │
├─────────────────────────────────────────────────────┤
│  CODE          →  source of truth                   │
│  (deterministic, versioned, what ships)             │
└─────────────────────────────────────────────────────┘
```

"Prompt engineering" as a discipline has always felt slightly wrong to me, and I think this is why. You're not engineering the prompt. You're engineering the *constraints that shape what prompts can produce*. The prompt is the thing you say to the contractor. The constraints are the building code. One is a conversation. The other is law.

---

Constraints come in two kinds, and the distinction matters.

**Mechanical constraints** are the ones machines can verify. Test suites — define what success looks like before implementation. Type systems — define what shapes are valid. Linters, CI/CD — define what patterns are allowed. Feature lists — define what "done" means.

These are automatically checkable. You run them, they pass or fail, no judgment required.

**Human constraints** are the ones that require a person. Taste — what's elegant versus ugly, what belongs versus what's noise. Axioms — the foundational assumptions you build on. Judgment — the wisdom from experience that tells you when to follow the rules and when to break them.

Both survive context windows. Both persist across sessions.

But here's the thing: the mechanical constraints are table stakes. Anyone can set up tests and linters. AI can write them. The human constraints — taste, judgment, the sense of what a thing should *be* — those are the differentiator. Those are what make one system thoughtful and another system merely functional.

This is why I keep coming back to judgment as the scarce resource. Not prompting skill. Not execution speed. The ability to set the right constraints — to know what the physics of your system should be before anything gets built.

---

The pattern underneath all of this is older than AI.

Test-driven development works the same way: you write a failing test (constraint), you write code to pass it (mutation), you verify (the test passes). The spec precedes the implementation. The spec survives context changes. The artifact gets checked against something objective.

[Anthropic's approach to long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) follows the same structure. Their harness engineering model uses an initializer agent to create a feature list — sometimes 200+ requirements, all marked as incomplete. A coding agent works through them one at a time. A progress file persists across context windows so nothing gets lost between sessions. End-to-end testing verifies the result.

The feature list and progress file are constraints. The coding prompt is intent. The code is truth.

[Phil Schmid frames it well](https://www.philschmid.de/agent-harness-2026): the harness is the operating system, the model is the CPU, context is RAM, the agent is the application. The harness implements what he calls "[context engineering](https://www.philschmid.de/context-engineering)" — strategies that survive the model's context limitations. And his key insight lands the point: "The ability to improve a system is proportional to how easily you can verify its output."

That's the whole argument in one sentence. If you can verify it, you can improve it. If your constraints are weak — if "done" means "looks done" — your outputs will drift and you won't know until it's too late.

---

The framework is new enough that I'm testing it more than demonstrating it. The clean war stories will come — I'll write them up when they do.

But I'll say what I believe so far: if you're building with AI and you're spending most of your energy on prompts, you're optimizing the wrong layer. The prompts are ephemeral. The constraints are what compound.

Invest in the thing that survives the session.

---

This blog is an attempt to practice the human constraint layer.

Taste in what gets published, judgment in how ideas connect, axioms about what matters. The mechanical side — the site builds, the deploys, the formatting — is table stakes. The human side is the work.

Whether it succeeds is a different question. But that's the intent.

To be the physics, not just the prompt.
