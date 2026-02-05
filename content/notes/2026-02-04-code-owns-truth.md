---
title: Code Owns Truth
description: "A frame for thinking about AI systems: constraints, prompts, and code"
date: 2026-02-04
updated: 2026-02-04
tags: [architecture, ai, mental-models]
---

A frame that keeps clarifying my thinking about AI systems:

**Constraints** bound the mutation space.  
**Prompts** express intent (inherently fuzzy).  
**Code** is the source of truth.

The prompt is not the product. The code that emerges is.

## What counts as a constraint?

Constraints are the mechanical, persistent bounds that don't change based on prompts:

- **Test suites (TDD)** — define success criteria before implementation
- **Agent harnesses** — the "operating system" that governs how agents operate
- **Type systems** — what shapes are valid
- **Linters, CI/CD** — what patterns are allowed
- **Feature lists** — what "done" looks like

These survive context windows. They persist across sessions. They're verifiable.

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

## References

- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Anthropic's approach to multi-session agents
- [The importance of Agent Harness in 2026](https://www.philschmid.de/agent-harness-2026) — Phil Schmid on harness as OS
- [Context Engineering](https://www.philschmid.de/context-engineering) — strategies for managing limited context
