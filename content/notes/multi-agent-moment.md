---
title: "The Multi-Agent Moment"
description: "Claude's Agent Teams vs Gas Town vs claude-flow—the landscape of multi-agent orchestration and how to navigate it."
date: 2026-02-05
type: note
schemaVersion: 1
draft: false
tags:
  - ai
  - systems
  - architecture
---

*This is Part 2 of my response to the Opus 4.6 announcement. For the bigger picture—the market panic, the existential weight, and the ecosystem shakeout—see [[The SaaSpocalypse]].*

---

On February 5th, Anthropic dropped Opus 4.6 with a feature that changes the economics of AI-assisted development: **Agent Teams.**

Multiple Claude instances. Parallel execution. Direct agent-to-agent communication. A shared task list with self-coordination.

This isn't new. The community built it first. Steve Yegge shipped Gas Town on January 1st. Claude-flow, ccswarm, oh-my-claudecode—the ecosystem has been running multi-agent orchestration for months.

What's new is that it's native now. And native changes the calculus.

---

## The Landscape

Here's what exists as of this week:

### Native (Anthropic)

**Agent Teams** — Research preview, ships with Opus 4.6. Enable with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. One lead coordinates, teammates work independently, shared task list, direct messaging between agents. Split-pane mode via tmux/iTerm2.

Pros:
- No external dependencies
- Integrated with Claude Code's context and tooling
- Officially supported (eventually)
- Same CLAUDE.md, MCP servers, skills load automatically

Cons:
- Experimental, no session resumption
- Can't inspect/modify coordination logic
- Anthropic's opinions baked in
- 5x token cost for 5 agents (obvious but real)

### External Orchestrators

**Gas Town** (Yegge) — The maximalist approach. 20-30 parallel Claude Code instances. Operational roles: Mayor orchestrates, Polecats execute, Witness and Deacon monitor, Refinery manages merges. Built on Beads for memory persistence. Git worktrees for isolation.

Pros:
- Battle-tested at scale (Yegge runs it daily)
- Transparent coordination logic you can modify
- Beads integration for persistent memory
- Git-native isolation

Cons:
- Chaos is real ($100/hour burns reported)
- Requires "Stage 7" expertise—not for beginners
- Complex setup, steep learning curve
- You are the ops team

**claude-flow** — Enterprise-positioned. 60+ specialized agents, self-learning architecture, consensus algorithms (Raft/BFT/Gossip). Spec-first with ADRs and DDD bounded contexts.

Pros:
- Ambitious architecture
- Works with multiple providers (Claude/GPT/Gemini/Ollama)
- Built-in skill library

Cons:
- Complexity for complexity's sake?
- Unclear how much is implemented vs. architecture diagrams
- Overkill for most use cases

**ccswarm** — Rust-native orchestration with Git worktree isolation. Specialized AI agents, task queue, TUI monitoring.

Pros:
- Clean Rust implementation
- Git worktree isolation done well
- Cross-platform PTY sessions

Cons:
- Partial implementation (AI execution still simulated)
- Less mature than alternatives

**oh-my-claudecode** — 5 execution modes: Autopilot, Ultrapilot (3-5x parallel), Swarm, Pipeline, Ecomode. 32 specialized agents.

Pros:
- Multiple modes for different needs
- Token-efficient options
- Multi-provider support

Cons:
- Another layer of abstraction
- Yet another config to learn

---

## The Two Architectures

This is the distinction that matters.

**SDLC Simulation** — Tools that recreate org charts. Analyst agent → PM agent → Architect agent → Developer agent. Phase gates, handoffs, specialized personas. BMAD, SpecKit, and similar frameworks.

**Operational Roles** — Tools that coordinate work, not process. Mayor orchestrates. Workers execute in parallel. External state management. This is Gas Town's approach, and now Agent Teams'.

The SDLC simulators are solving the wrong problem. They optimize for explainability ("look, we have a PM agent!") rather than effectiveness. They recreate human coordination friction in software.

Agent Teams and Gas Town both take the operational approach. The difference is where the coordination logic lives: inside the Claude Code binary (native) or outside (external).

---

## The Ticketing Question

Here's where it gets interesting.

Yegge didn't just build Gas Town. He built **Beads**—an issue tracker designed for agents.

The insight: agents have amnesia. Every session is 50 First Dates. Markdown plans pile up until nothing is authoritative. Agents can't tell the difference between "we decided this yesterday" and "this brainstorm from three weeks ago."

Beads gives work items addressable IDs, priorities, dependencies, audit trails. It stores everything in Git. Agents already know Git. The AI literally asked for this when Yegge asked what it wanted.

> "Claude said 'you've given me memory—I literally couldn't remember anything before, now I can.' And I'm like, okay, that sounds good."
> — [Steve Yegge](https://paddo.dev/blog/beads-memory-for-coding-agents/)

**The pattern that matters:** "Land the plane." End every session by updating Beads, syncing state, generating a prompt for the next session. Tomorrow's agent wakes up knowing what's current.

Agent Teams doesn't have this. It has a "shared task list" but no persistence across sessions. If you resume, the lead may message teammates that no longer exist.

This is where external tooling still wins. Beads survives session boundaries. Agent Teams doesn't.

---

## The Future of Engineering Workstreams

Anthropic's research says developers use AI in 60% of their work but fully delegate only 0-20% of tasks. The gap is supervision, validation, judgment.

Multi-agent doesn't change this ratio—it changes what you're supervising.

Single agent: you supervise one context, one thread of work.
Multi-agent: you supervise coordination. Are the agents working on the right things? Are they stepping on each other? Is the decomposition correct?

The workstream shifts from "write code" to "coordinate agents that write code." This is Yegge's thesis from *Revenge of the Junior Developer*: the CNC machine is coming, and your job is operating it.

The question is whether you want that CNC machine to be:
- **Opaque** (Agent Teams) — Anthropic handles coordination, you see results
- **Transparent** (Gas Town et al) — You see and modify the coordination logic

For most developers, opaque is fine. Ship faster, don't care how.

For organizations running agents at scale, transparency matters. When something breaks at $100/hour, you need to understand why.

---

## Where We Land

If you're not at "Stage 6" (3-5 parallel agents, comfortable with chaos), don't use any of this. Single-agent Claude Code with Plan Mode handles most work. Add complexity when you hit real limits, not theoretical ones.

If you want to experiment with multi-agent:
- **Agent Teams** — Lower barrier to entry, native integration, but limited persistence and control
- **Gas Town + Beads** — Maximum power, maximum chaos, requires expertise
- **claude-flow / ccswarm** — Interesting architectures, less battle-tested

The native approach will improve. Anthropic will add session resumption, better persistence, more coordination options. The community tools will adapt or die.

But the fundamental tension remains: native is convenient, external is controllable. Pick based on whether you need to understand what's happening or just need it to happen.

---

*I'm still exploring Agent Teams myself. As I run more experiments, I'll update this with what actually works vs. what sounds good on paper.*
