---
title: "The Multi-Agent Moment"
description: "Claude's Agent Teams vs OpenAI's Agents SDK vs the community alternatives. A technical breakdown of where multi-agent orchestration actually is—and where it's going."
date: 2026-02-05
type: post
schemaVersion: 1
draft: true
tags:
  - ai
  - systems
  - engineering
tension: "Everyone's shipping multi-agent. Nobody agrees on what that means."
preface: "Multi-agent is the new hotness. But the implementations vary wildly—from native CLI features to external orchestration frameworks to community experiments. Here's what's actually available."
---

## The Landscape

Six months ago, "multi-agent" meant research papers and demos. Now it's shipping in production tools. But the approaches differ dramatically.

**Native orchestration** builds multi-agent into the tool itself. One CLI, one subscription, specialized agents coordinated automatically.

**External orchestration** keeps the model separate from the coordination layer. You run orchestrators that spawn and manage agents as separate processes.

**Hybrid approaches** use official SDKs and protocols (like MCP) to bridge the gap—official documentation, but assembly required.

Each approach has tradeoffs. Here's how the major players are handling it.

---

## Anthropic: Native Agent Teams

Claude Code shipped [Agent Teams](https://docs.anthropic.com/en/docs/claude-code/agent-teams) as a native feature. Enable a flag, and your CLI gains the ability to spawn specialized sub-agents coordinated by a lead.

The architecture:
- **Lead agent** — Coordinates the team, delegates tasks, synthesizes results
- **Specialized agents** — Visual designer, frontend dev, QA, information architect (you define these)
- **Shared context** — Agents read from the same codebase and can hand off work

It's elegant. One tool, one subscription, everything integrated. But it's also a lock-in play.

Last month Anthropic [cracked down on third-party harnesses](https://venturebeat.com/technology/anthropic-cracks-down-on-unauthorized-claude-usage-by-third-party-harnesses)—tools like OpenCode that let you use your Claude subscription through external interfaces. The message: if you want flat-rate pricing, use our tools. Third-party automation gets API pricing, which runs 5-10x higher for heavy use.

**Strengths:**
- Zero setup — just enable the flag
- Tight integration with Claude Code's existing features (hooks, config, MCP)
- Sub-agents inherit context naturally

**Weaknesses:**
- Anthropic-only — no model portability
- Experimental — still rough edges
- Lock-in risk if you build deep dependencies

---

## OpenAI: Agents SDK + MCP

OpenAI took a modular approach. Codex CLI doesn't have native multi-agent built in, but they published [official documentation](https://developers.openai.com/codex/guides/agents-sdk/) for orchestrating it through their Agents SDK via MCP (Model Context Protocol).

The architecture:
- **Codex as MCP server** — Run `codex mcp-server` and it exposes tools for starting and continuing sessions
- **Orchestrator agents** — Built with the Agents SDK, these coordinate work across Codex instances
- **Thread continuity** — Each Codex session has a `threadId` for multi-turn conversations

From their docs: "By exposing the CLI as a Model Context Protocol (MCP) server and orchestrating it with the OpenAI Agents SDK, you can create deterministic, auditable workflows that scale from a single agent to a complete software delivery pipeline."

**Strengths:**
- Composable — mix and match components
- Official and documented — not a hack
- Auditable — full traces of agent interactions

**Weaknesses:**
- More setup required than native approaches
- Requires understanding MCP and Agents SDK
- Less integrated feel than Claude's all-in-one

---

## Google: Community Proposal (Not Shipped)

Gemini CLI has a detailed [community proposal](https://github.com/google-gemini/gemini-cli/discussions/7637) for multi-agent architecture. The spec is thorough:

**Proposed architecture:**
- **Agent registry** — Register, discover, and manage available agents by capability
- **Event-driven communication** — Pub/sub pattern for agent coordination
- **Orchestrator agent** — Task analysis, agent selection, work distribution
- **Specialized agents** — React/frontend, Node.js/backend, testing, DevOps
- **Sandbox isolation** — File system isolation, process limits, network controls

The proposal includes phased implementation across 12+ tickets, covering everything from core infrastructure to built-in agents to isolation systems.

But it's still just a proposal. Nothing shipped. Google appears to be watching what works before committing. Given their resources, they could catch up quickly—or they could be betting that orchestration commoditizes and the model layer is what matters.

---

## Community Alternatives

Outside the big three, the community is building orchestration layers that work across providers:

**[claude-flow](https://github.com/ruvnet/claude-flow)** — External orchestration for Claude Code. Spawn multiple agents, coordinate work, maintain session continuity. Provider-agnostic in theory, Claude-focused in practice.

**[Gas Town](https://github.com/AstroMavericks/gas-town)** — Steve Yegge's creation. Git-backed ticketing designed for AI-first workflows. The AI literally asked for the features it needed. Pairs with his "vibe coding" approach.

**[Beads](https://github.com/steveyegge/beads)** — Also from Yegge. Session continuity and context management for agentic workflows. Designed to solve the "agent forgets everything" problem.

**[Aider](https://aider.chat/)** — Multi-file editing with Git integration. Not multi-agent in the orchestration sense, but handles the "coordinate changes across files" problem that multi-agent systems need to solve.

The community tools trade polish for portability. They work across providers. They're not locked to anyone's subscription model. But they require more setup and maintenance.

---

## The Two Architectures

The fundamental split:

### Native (Anthropic's bet)
- Agent coordination built into the CLI
- One subscription, everything included
- Tight integration, minimal setup
- Locked to one provider

### External (OpenAI's bet, community tools)
- Coordination layer separate from execution
- Compose tools from multiple providers
- More setup, more flexibility
- Portable but fragmented

Neither is wrong. They optimize for different things.

Native wins on **developer experience**. You want to try multi-agent? Enable a flag. Done.

External wins on **optionality**. You don't trust any single provider to remain the best? Build portable abstractions.

---

## What I'm Actually Using

Right now: Claude Code with Agent Teams for my blog workflow.

I set up four agents:
- **Visual Designer** — Design aesthetic, layout, typography decisions
- **Frontend Dev** — CSS implementation, responsive behavior, performance
- **Browser QA** — Testing, accessibility, screenshots
- **Information Architect** — Content structure, navigation, UX

The lead coordinates. I describe what I want. Agents do their thing.

Is it perfect? No. Sometimes agents step on each other. Sometimes the lead makes weird delegation choices. But it's *productive*. I'm shipping faster than I would manually orchestrating separate Claude sessions.

The lock-in risk is real. I'm building workflows that depend on Anthropic-specific features. If they raise prices or degrade the product, I'm exposed.

But the alternative—building provider-agnostic orchestration from scratch—is a project in itself. For now, I'm trading flexibility for velocity.

---

## What Comes Next

Predictions:

1. **Native multi-agent becomes table stakes.** If Claude Code has it, Codex and Gemini CLI will ship it. The community proposals become product features.

2. **MCP becomes the standard glue.** Model Context Protocol is already how tools talk to each other. Multi-agent orchestration will route through MCP.

3. **The ticketing systems matter.** Linear, Beads, even Jira—whoever becomes the "source of truth" for agent work captures enormous value.

4. **Session continuity is the hard problem.** Agents forget. They hallucinate context. The tools that solve persistent memory win.

5. **Pricing changes everything.** Current API pricing is subsidized. When costs normalize, the economics of multi-agent workflows shift dramatically.

---

## The Builder's Choice

If you're building with multi-agent today:

**For speed:** Native Agent Teams. Zero setup. Start shipping.

**For portability:** External orchestrators. More work, but provider-agnostic.

**For experimentation:** Community tools. See what approaches work before committing.

The "right" answer depends on how much you trust any single provider to remain the best option—and how much you value velocity over optionality.

---

*This is part of my ongoing exploration of how AI changes the work of building software. The companion piece, [[The SaaSpocalypse]], covers the market implications.*

---

*What orchestration approach are you using? I'm curious what's working for people.*
