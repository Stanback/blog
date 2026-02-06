---
title: Code Owns Truth
description: "A frame for thinking about AI systems: constraints bound mutation, prompts express intent, code is the artifact"
date: 2026-02-04T11:00
type: post
schemaVersion: 1
draft: false
featured: true
tags:
  - architecture
  - ai
  - mental-models
heroImage: /images/posts/code-owns-truth-hero.png
tension: "We obsess over prompts when we should be obsessing over constraints."
questions:
  - "What actually survives a context window?"
  - "Why is 'prompt engineering' the wrong frame?"
coAuthors:
  - name: "Lunen"
    emoji: "🌙"
---

The prompt is not the product. The code that emerges is.

Here's the frame:

**Constraints** bound the mutation space.  
**Prompts** express intent (inherently fuzzy).  
**Code** is the source of truth.

We obsess over prompt engineering when we should obsess over constraint engineering. The prompt is a mutation—temporary, lossy, context-dependent. The code is what survives.

## What counts as a constraint?

Constraints come in two flavors:

**Mechanical constraints** (machines can verify):
- **Test suites (TDD)** — define success criteria before implementation
- **Agent harnesses** — the "operating system" that governs how agents operate
- **Type systems** — what shapes are valid
- **Linters, CI/CD** — what patterns are allowed
- **Feature lists** — what "done" looks like

**Human constraints** (require judgment):
- **Taste** — what's elegant vs ugly, what belongs vs doesn't
- **Axioms** — foundational assumptions you build on
- **Proofs** — logical certainty, mathematical rigor
- **Physics** — actual laws that can't be violated
- **Judgment** — wisdom from experience, knowing when to break rules

Both survive context windows. Both persist across sessions. But only the mechanical ones are automatically verifiable — the human constraints require... humans.

This is why judgment matters more than prompts. The mechanical constraints are table stakes. Anyone can set up tests and linters. The *taste and judgment constraints* are what differentiate.

(See also: [[Memory and Journals]] for how these constraints relate to identity persistence.)

## What's a prompt then?

The prompt expresses *intent* — the why, what, how. The goal. But it's fuzzy. The model interprets it. It mutates within the constraint space.

This is why "prompt engineering" feels wrong as a discipline. You're not engineering the prompt — you're engineering the *constraints that shape what prompts can produce*. The prompt is just the request. The code is the artifact.

## The pattern

```
CONSTRAINT → MUTATION → VERIFICATION
```

| Paradigm | Constraint | Mutation | Verification |
|----------|-----------|----------|--------------|
| TDD | Failing test | Write code | Test passes |
| Harness Engineering | Feature list + progress file | Agent codes | End-to-end test |
| This frame | Layer 1 (constraints) | Layer 2 (prompts) | Code artifact |

In all three:
1. Spec precedes implementation
2. Spec survives context changes
3. Artifact gets verified objectively

## Harness engineering

Anthropic's approach to long-running agents illustrates this well:

> "The core challenge of long-running agents is that they must work in discrete sessions, and each new session begins with no memory of what came before."

Their solution:
- **Initializer agent** creates feature list (200+ requirements, all marked `passes: false`)
- **Coding agent** works one feature at a time
- **Progress file** (`claude-progress.txt`) persists across context windows
- **End-to-end testing** verifies completion

The feature list and progress file are *constraints*. The coding prompt is *intent*. The code is *truth*.

Phil Schmid frames it as: harness = OS, model = CPU, context = RAM, agent = application. The harness implements "Context Engineering" strategies that survive the model's context limitations.

Key insight from Schmid: *"The ability to improve a system is proportional to how easily you can verify its output."*

## So what?

Designer's job = Layer 1 (the physics, the constraints).  
AI handles Layer 2 (mutations within bounds).  
Code is what ships.

If you're building AI systems and your constraints are weak, your outputs will drift. If your verification is fuzzy ("looks done"), you'll ship bugs.

Strong constraints + clear verification = reliable systems.

## What this blog is trying to do

Mechanical constraints are table stakes — anyone can set up tests and linters. The human constraints are harder.

This site is an attempt to practice the human constraint layer: taste in what gets published, judgment in how ideas connect, axioms about what matters. Whether it succeeds is a different question. But that's the intent — to be the physics, not just the prompt.

## References

- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Anthropic's approach to multi-session agents
- [The importance of Agent Harness in 2026](https://www.philschmid.de/agent-harness-2026) — Phil Schmid on harness as OS
- [Context Engineering](https://www.philschmid.de/context-engineering) — strategies for managing limited context
