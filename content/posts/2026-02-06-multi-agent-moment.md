---
title: "The Multi-Agent Moment"
description: "A technical breakdown of multi-agent orchestration: Claude's Agent Teams, OpenAI's Agents SDK, Google Antigravity, Gas Town, Beads, and the community alternatives."
date: 2026-02-06T09:00
type: post
schemaVersion: 1
tags:
  - ai
  - engineering
  - tools
heroImage: /images/posts/multi-agent-moment-hero.png
tension: "Everyone's shipping multi-agent. Nobody agrees on what that means."
preface: "The SaaSpocalypse covered the existential weight. This is the tools companion—what's actually available for multi-agent orchestration, and how to choose."
---

*For the market panic and ecosystem shakeout, see [[The SaaSpocalypse]].*

---

I wanted to parallelize work on this blog — frontend styling and build pipeline running simultaneously. One agent tweaking Tailwind tokens while another refactored the TypeScript build. Simple enough in theory.

I tried Agent Teams first. Enabled the flag, defined a visual designer and a frontend dev, let them go. It worked — genuinely worked — for about forty minutes. Then both agents edited `main.css` in the same section, one overwrote the other, and I spent twenty minutes untangling the merge. The coordination was invisible, which was the problem: I couldn't see why they'd collided or prevent it from happening again.

So I looked at the alternatives. And I discovered that six months ago, "multi-agent" meant research papers and demos. Now it's shipping in production tools. But the approaches differ dramatically, and the choice between them isn't about features — it's about whether you need to understand what's happening or just need it to happen.

---

## What I Tried

### Agent Teams (Native)

Claude Code shipped [Agent Teams](https://docs.anthropic.com/en/docs/claude-code/agent-teams) as a native feature. Enable with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, and your CLI gains the ability to spawn specialized sub-agents coordinated by a lead.

The architecture: a lead agent coordinates the team, delegates tasks, synthesizes results. You define specialized agents (visual designer, frontend dev, QA). They share a task list and self-coordinate with direct messaging. Your `CLAUDE.md`, MCP servers, and skills load automatically.

**When it shines:** Parallelizing genuinely independent work — multiple features, different test suites, frontend + backend simultaneously. Also when you need true specialization: a visual designer agent reviewing UI while a backend agent handles the API.

**When it's overkill:** Contained tasks where a single agent has enough context. Adding agents adds tokens (5x agents = 5x cost) and coordination overhead. For focused work, Plan Mode is often enough.

The lock-in risk is real. Last month Anthropic [cracked down on third-party harnesses](https://venturebeat.com/technology/anthropic-cracks-down-on-unauthorized-claude-usage-by-third-party-harnesses) — tools that let you use Claude subscriptions through external interfaces. The message: flat-rate pricing requires their tools.

### Gas Town (External)

After my Agent Teams collision, I read Steve Yegge's [Gas Town](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04) — the maximalist approach. 20-30 parallel Claude Code instances with operational roles: a Mayor orchestrates the swarm, Polecats execute work in parallel, Witness and Deacon monitor progress, a Refinery manages merges. Built on [Beads](https://github.com/steveyegge/beads) for memory persistence. Git worktrees for isolation.

The chaos is real ($100/hour burns reported). It requires what Yegge calls "Stage 7" expertise. But the coordination logic is *yours* — transparent, modifiable, debuggable. When my Agent Teams collision happened, I couldn't see inside. With Gas Town, I could have.

### The Others

**[Pheromind](https://github.com/mariusgavrila/pheromind)** — The first external orchestrator I experimented with, and what got me thinking about multi-agent seriously. Swarm intelligence inspired by ant colonies: agents coordinate via a shared `.pheromone` file containing structured JSON "signals." No direct peer-to-peer commands — just stigmergy, the same indirect coordination ants use when they leave chemical trails. Decentralized, emergent, no single point of failure.

**[claude-flow](https://github.com/ruvnet/claude-flow)** — Takes the beehive metaphor instead: queen agents coordinate worker swarms with explicit hierarchy. Claims multi-provider support (Claude/GPT/Gemini/Ollama), but in practice it's built around Claude Code primitives. 60+ specialized agents, consensus algorithms (Raft/BFT/Gossip). Ambitious architecture — unclear how much is implemented vs. diagrams.

The ant colony vs. beehive distinction matters: pheromones are fully decentralized (any agent can influence any other through the shared state), while hive-mind has explicit hierarchy. Both are "swarm intelligence," but the coordination primitives differ.

**[oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode)** — Opinionated Claude Code configuration (like oh-my-zsh for zsh). Multiple execution modes including parallel swarm options, with cross-validation support for Gemini CLI and Codex.

---

## The Other Platforms

### OpenAI Agents SDK

OpenAI took a modular approach. Codex CLI doesn't have native multi-agent built in, but they published [official documentation](https://developers.openai.com/codex/guides/agents-sdk/) for orchestrating it through their Agents SDK via MCP.

Run `codex mcp-server` to expose tools for starting and continuing sessions. Build orchestrator agents with the Agents SDK. Each session has a `threadId` for multi-turn conversations. More composable than Agent Teams, more setup required.

### Google Antigravity

Gemini CLI went open-source under Apache 2.0 — multi-agent isn't waiting on Google's roadmap, the community can build it. A detailed [multi-agent proposal](https://github.com/google-gemini/gemini-cli/discussions/7637) exists but it's community-driven.

Where Google gets interesting is [Antigravity](https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/), shipped November 2025 — a full agentic development platform with an Editor View and a Manager Surface for spawning, orchestrating, and observing multiple agents asynchronously.

Instead of scrolling through logs, agents generate **Artifacts** — screenshots, recordings, task lists, implementation plans — so you can verify work at a glance. Model-agnostic (supports Claude Sonnet 4.5, GPT-OSS alongside Gemini). Learning as a primitive — agents save context to a knowledge base for future tasks. This is Google's answer: not bolting orchestration onto a CLI, but building a dedicated platform for agent-first development.

---

## The Two Architectures

Here's the distinction that actually matters — not native vs. external, but what kind of coordination the system does.

**SDLC Simulation** — Tools that recreate org charts. Analyst agent → PM agent → Architect agent → Developer agent. Phase gates, handoffs, specialized personas. These optimize for explainability ("look, we have a PM agent!") rather than effectiveness.

**Operational Roles** — Tools that coordinate work, not process. Mayor orchestrates. Workers execute in parallel. External state management. This is Gas Town's approach, and now Agent Teams'.

Cursor's research confirms this. They tried flat self-coordination first — agents with equal status using a shared file. It failed: agents held locks too long, became risk-averse, avoided hard problems. "No agent took responsibility for hard problems or end-to-end implementation." What worked: [planners + workers](https://cursor.com/blog/scaling-agents). Planners explore and create tasks (recursively). Workers grind on assigned tasks until done, don't coordinate with each other. A judge agent decides whether to continue. This scaled to building a [browser from scratch](https://cursor.com/blog/self-driving-codebases) — 1M lines of code, thousands of commits.

The SDLC simulators are solving the wrong problem. They recreate human coordination friction in software.

You might not even need an orchestrator at all. Anthropic's Nick Carlini [built a C compiler](https://www.anthropic.com/engineering/building-c-compiler) with 16 parallel Claudes using just lock files — text files in `current_tasks/` that agents claim before working. Git sync prevents collisions. Each agent picks up the "next most obvious" problem. No mayor, no coordination layer. ~2,000 sessions and $20K later: a 100,000-line compiler that builds the Linux kernel.

---

## The Memory Problem

Here's where it gets interesting — and where my Agent Teams collision led me to something deeper.

Yegge didn't just build Gas Town. He built **Beads** — an issue tracker designed for agents.

The insight: agents have amnesia. Every session is 50 First Dates. Markdown plans pile up until nothing is authoritative. Agents can't tell the difference between "we decided this yesterday" and "this brainstorm from three weeks ago."

Beads gives work items addressable IDs, priorities, dependencies, audit trails. It stores everything in Git. Agents already know Git. The AI literally asked for this when Yegge asked what it wanted.

![Land the Plane — the pattern for agent memory persistence](/images/posts/land-the-plane.png)

> "Claude said 'you've given me memory—I literally couldn't remember anything before, now I can.' And I'm like, okay, that sounds good."
> — [Steve Yegge](https://paddo.dev/blog/beads-memory-for-coding-agents/)

**The pattern that matters:** "Land the plane." End every session by updating Beads, syncing state, generating a prompt for the next session. Tomorrow's agent wakes up knowing what's current.

Carlini's compiler project maintained extensive READMEs and progress files — each agent dropped into a fresh container with no context. Without orientation artifacts, agents waste tokens rediscovering what's already known.

### Native Tasks

Anthropic saw the persistence problem too. On January 23, 2025, they shipped **Tasks** — native task management with dependencies.

Tasks persist in `~/.claude/tasks/` and survive context compaction. Set `CLAUDE_CODE_TASK_LIST_ID` and multiple sessions coordinate on the same list — when Session A completes a task, Session B sees it immediately.

**Where Tasks wins:** Zero setup, native dependency modeling, multi-session sync, works with Agent Teams out of the box.

**Where Beads wins:** Project-level vs session-level — Tasks lives in your home dir, Beads lives in the repo. Clone the project elsewhere, Beads comes with you. Tasks doesn't. Plus Git-native storage, cross-provider compatibility, richer metadata.

Tasks is for "what am I doing this session." Beads is for "what has this project been doing for months."

**The hybrid play:** Beads isn't just for Gas Town. Run `bd setup claude` and Beads integrates directly with Claude Code. There's even a [beads-orchestration](https://github.com/AvivK5498/beads-orchestration) skill that combines Agent Teams with Beads — native multi-agent coordination with Git-backed persistence.

---

## Where I've Landed (For Now)

I've been running Agent Teams on real work. It works, but the pattern I keep coming back to is simpler than I expected.

**Parallelism has a ceiling.** When there are many independent tests, parallelization is trivial — each agent picks a different failing test. But monolithic tasks break down. Carlini's agents all hit the same Linux kernel bug, fixed it, then overwrote each other's changes. Multi-agent shines on decomposable work. For one giant task, you're back to single-threaded.

**Less structure often wins.** Cursor initially built an "integrator" role for quality control and conflict resolution — it created more bottlenecks than it solved. Workers could handle conflicts themselves. "The right amount of structure is somewhere in the middle."

**The multi-codebase question:** I initially thought Agent Teams would shine for tasks spanning multiple codebases with different constraints. But polyrepo architectures may be becoming *antipatterns* in the AI era. [Monorepos work better for agents](https://nx.dev/blog/nx-and-ai-why-they-work-together) — consolidated context means one agent can understand how subsystems interact. Splitting repos fragments the context that makes agents useful. The winning pattern might not be "multi-agent across repos" but "consolidate repos so single-agent has full context."

**Test quality becomes everything.** Carlini's key insight: "Claude will work autonomously to solve whatever problem I give it. So it's important that the task verifier is nearly perfect, otherwise Claude will solve the wrong problem." Your job becomes writing tests so good that agents can't game them.

**Model choice matters for long-running work.** Cursor found "GPT-5.2 models are much better at extended autonomous work: following instructions, keeping focus, avoiding drift." Opus 4.5 "tends to stop earlier and take shortcuts when convenient." Different models for different roles — they use the best model per task, not one universal model.

If you're not comfortable with 3-5 parallel agents and some chaos, don't use any of this. Single-agent Claude Code with Plan Mode handles most work. Add complexity when you hit real limits, not theoretical ones.

The native approach will improve. Anthropic will add session resumption, better persistence, more coordination options. The community tools will adapt or die. But the fundamental tension remains: **native is convenient, external is controllable.** Pick based on whether you need to understand what's happening or just need it to happen.
