---
title: "The Multi-Agent Moment"
description: "Claude's Agent Teams vs Gas Town vs the community alternatives. A technical breakdown of where multi-agent orchestration actually is—and where it's going."
date: 2026-02-05
type: post
schemaVersion: 1
draft: true
tags:
  - ai
  - systems
  - engineering
heroImage: /images/posts/multi-agent-moment-hero.png
tension: "Everyone's shipping multi-agent. Nobody agrees on what that means."
preface: "Multi-agent is the new hotness. But the implementations vary wildly—from native CLI features to external orchestration frameworks to community experiments. Here's what's actually available."
---

*This is a companion to [[The SaaSpocalypse]], which covers the market implications. This piece is about the tools.*

---

## The Landscape

Six months ago, "multi-agent" meant research papers and demos. Now it's shipping in production tools. But the approaches differ dramatically.

**Native orchestration** builds multi-agent into the tool itself. One CLI, one subscription, specialized agents coordinated automatically.

**External orchestration** keeps the model separate from the coordination layer. You run orchestrators that spawn and manage agents as separate processes.

Each approach has tradeoffs. Here's what exists as of this week.

---

## Native: Anthropic Agent Teams

Claude Code shipped [Agent Teams](https://docs.anthropic.com/en/docs/claude-code/agent-teams) as a native feature. Enable with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, and your CLI gains the ability to spawn specialized sub-agents coordinated by a lead.

The architecture:
- **Lead agent** — Coordinates the team, delegates tasks, synthesizes results
- **Specialized agents** — You define these (visual designer, frontend dev, QA, etc.)
- **Shared task list** — Agents self-coordinate with direct messaging
- **Same context** — CLAUDE.md, MCP servers, skills load automatically

**Strengths:**
- Zero setup — just enable the flag
- Tight integration with Claude Code's existing features
- Officially supported (eventually)

**Weaknesses:**
- Experimental — no session resumption yet
- Can't inspect or modify coordination logic
- Anthropic's opinions baked in
- 5x token cost for 5 agents (obvious but real)

The lock-in risk is real. Last month Anthropic [cracked down on third-party harnesses](https://venturebeat.com/technology/anthropic-cracks-down-on-unauthorized-claude-usage-by-third-party-harnesses)—tools that let you use Claude subscriptions through external interfaces. The message: flat-rate pricing requires their tools.

---

## Native: OpenAI Agents SDK

OpenAI took a modular approach. Codex CLI doesn't have native multi-agent built in, but they published [official documentation](https://developers.openai.com/codex/guides/agents-sdk/) for orchestrating it through their Agents SDK via MCP.

The architecture:
- **Codex as MCP server** — Run `codex mcp-server` to expose tools for starting/continuing sessions
- **Orchestrator agents** — Built with the Agents SDK, coordinate work across Codex instances
- **Thread continuity** — Each session has a `threadId` for multi-turn conversations

From their docs: "By exposing the CLI as a Model Context Protocol (MCP) server and orchestrating it with the OpenAI Agents SDK, you can create deterministic, auditable workflows that scale from a single agent to a complete software delivery pipeline."

**Strengths:**
- Composable — mix and match components
- Official and documented — not a hack
- Auditable — full traces of agent interactions

**Weaknesses:**
- More setup required than native approaches
- Requires understanding MCP and Agents SDK
- Less integrated than Claude's all-in-one

---

## Waiting: Google Gemini CLI

Gemini CLI has a detailed [community proposal](https://github.com/google-gemini/gemini-cli/discussions/7637) for multi-agent architecture:

- **Agent registry** — Register, discover, and manage agents by capability
- **Event-driven communication** — Pub/sub for agent coordination
- **Orchestrator agent** — Task analysis, agent selection, work distribution
- **Specialized agents** — React/frontend, Node.js/backend, testing, DevOps
- **Sandbox isolation** — File system isolation, process limits, network controls

The spec is thorough. But it's still just a proposal. Nothing shipped. Google appears to be watching what works—or betting that orchestration commoditizes and only the model matters.

---

## External: Gas Town

Steve Yegge's [Gas Town](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04) is the maximalist approach. 20-30 parallel Claude Code instances with operational roles:

- **Mayor** — Orchestrates the swarm
- **Polecats** — Execute work in parallel
- **Witness and Deacon** — Monitor progress
- **Refinery** — Manages merges

Built on [Beads](https://github.com/steveyegge/beads) for memory persistence. Git worktrees for isolation.

**Strengths:**
- Battle-tested at scale (Yegge runs it daily)
- Transparent coordination logic you can modify
- Beads integration for persistent memory
- Git-native isolation

**Weaknesses:**
- Chaos is real ($100/hour burns reported)
- Requires "Stage 7" expertise—not for beginners
- Complex setup, steep learning curve
- You are the ops team

---

## External: The Others

**[claude-flow](https://github.com/ruvnet/claude-flow)** — Enterprise-positioned with 60+ specialized agents, self-learning architecture, consensus algorithms (Raft/BFT/Gossip). Works with multiple providers (Claude/GPT/Gemini/Ollama). Ambitious but unclear how much is implemented vs. architecture diagrams.

**[ccswarm](https://github.com/ruvnet/ccswarm)** — Rust-native orchestration with Git worktree isolation. Clean implementation but still partial (AI execution simulated in places).

**[oh-my-claudecode](https://github.com/ruvnet/oh-my-claudecode)** — 5 execution modes: Autopilot, Ultrapilot (3-5x parallel), Swarm, Pipeline, Ecomode. 32 specialized agents. Multiple modes for different needs, token-efficient options.

The community tools trade polish for portability. They work across providers. They're not locked to anyone's subscription model. But they require more setup and maintenance.

---

## The Two Architectures

This is the distinction that matters:

**SDLC Simulation** — Tools that recreate org charts. Analyst agent → PM agent → Architect agent → Developer agent. Phase gates, handoffs, specialized personas. These optimize for explainability ("look, we have a PM agent!") rather than effectiveness.

**Operational Roles** — Tools that coordinate work, not process. Mayor orchestrates. Workers execute in parallel. External state management. This is Gas Town's approach, and now Agent Teams'.

The SDLC simulators are solving the wrong problem. They recreate human coordination friction in software.

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

**Single agent:** you supervise one context, one thread of work.

**Multi-agent:** you supervise coordination. Are the agents working on the right things? Are they stepping on each other? Is the decomposition correct?

The workstream shifts from "write code" to "coordinate agents that write code." This is Yegge's thesis from *Revenge of the Junior Developer*: the CNC machine is coming, and your job is operating it.

The question is whether you want that CNC machine to be:
- **Opaque** (Agent Teams) — Anthropic handles coordination, you see results
- **Transparent** (Gas Town et al) — You see and modify the coordination logic

For most developers, opaque is fine. Ship faster, don't care how.

For organizations running agents at scale, transparency matters. When something breaks at $100/hour, you need to understand why.

---

## Where We Land

If you're not comfortable with 3-5 parallel agents and some chaos, don't use any of this. Single-agent Claude Code with Plan Mode handles most work. Add complexity when you hit real limits, not theoretical ones.

If you want to experiment with multi-agent:

**Agent Teams** — Lower barrier to entry, native integration, but limited persistence and control. Good for trying multi-agent without operational overhead.

**Gas Town + Beads** — Maximum power, maximum chaos. Requires expertise but gives you persistent memory and full control. This is the "vibe coding" stack.

**claude-flow / ccswarm / oh-my-claudecode** — Interesting architectures, less battle-tested. Worth watching.

The native approach will improve. Anthropic will add session resumption, better persistence, more coordination options. The community tools will adapt or die.

But the fundamental tension remains: **native is convenient, external is controllable.** Pick based on whether you need to understand what's happening or just need it to happen.

---

*I'm still exploring Agent Teams myself. As I run more experiments, I'll update this with what actually works vs. what sounds good on paper.*
