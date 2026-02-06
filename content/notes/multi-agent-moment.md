---
title: "The Multi-Agent Moment"
description: "A technical breakdown of multi-agent orchestration: Claude's Agent Teams, OpenAI's Agents SDK, Gas Town, Beads, and the community alternatives."
date: 2026-02-05
type: note
schemaVersion: 1
tags:
  - ai
  - engineering
  - tools
heroImage: /images/posts/multi-agent-moment-hero.png
tension: "Everyone's shipping multi-agent. Nobody agrees on what that means."
preface: "[[The SaaSpocalypse]] covered the existential weight. This is the tools companion—what's actually available for multi-agent orchestration, and how to choose."
---

*Less philosophy, more implementation. For the market panic and ecosystem shakeout, see [[The SaaSpocalypse]].*

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

## Native: Google Antigravity

While Gemini CLI is still proposal-stage for multi-agent, Google shipped [Antigravity](https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/) in November 2025—a full agentic development platform.

The architecture splits into two surfaces:
- **Editor View** — Standard AI-powered IDE with completions and inline commands
- **Manager Surface** — Dedicated interface for spawning, orchestrating, and observing multiple agents working asynchronously

Agents work across editor, terminal, and browser autonomously. Instead of scrolling through logs, agents generate **Artifacts**—screenshots, recordings, task lists, implementation plans—so you can verify work at a glance. You can leave feedback directly on Artifacts without stopping agent execution.

**Strengths:**
- Native Google platform with generous Gemini 3 Pro rate limits
- Model-agnostic (also supports Claude Sonnet 4.5, GPT-OSS)
- Learning as a primitive—agents save context to a knowledge base for future tasks
- Artifacts solve the "trust but verify" problem elegantly

**Weaknesses:**
- New platform, less battle-tested than Claude Code
- Another tool in the stack (vs. extending existing editor)

This is Google's answer to the multi-agent moment: not bolting orchestration onto Gemini CLI, but building a dedicated platform for agent-first development.

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

**[Pheromind](https://github.com/mariusgavrila/pheromind)** — The first external orchestrator I experimented with, and what got me thinking about multi-agent seriously. Swarm intelligence inspired by ant colonies: agents coordinate via a shared `.pheromone` file containing structured JSON "signals." No direct peer-to-peer commands—just stigmergy, the same indirect coordination ants use when they leave chemical trails. Each agent senses the pheromone landscape and decides what to do. Decentralized, emergent, no single point of failure.

**[claude-flow](https://github.com/ruvnet/claude-flow)** — Takes the beehive metaphor instead: queen agents coordinate worker swarms with explicit hierarchy. Claims multi-provider support (Claude/GPT/Gemini/Ollama), but in practice it's built around Claude Code primitives. 60+ specialized agents, consensus algorithms (Raft/BFT/Gossip). Ambitious architecture—unclear how much is implemented vs. diagrams.

The ant colony vs. beehive distinction matters: pheromones are fully decentralized (any agent can influence any other through the shared state), while hive-mind has explicit hierarchy (queens command workers). Both are "swarm intelligence," but the coordination primitives differ.

**[oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode)** — Opinionated Claude Code configuration (like oh-my-zsh for zsh). Multiple execution modes including parallel swarm options, with cross-validation support for Gemini CLI and Codex.

The community tools trade polish for portability. But here's the thing: most are still built around a single provider's primitives despite claims of agnosticism. And as providers ship native multi-agent, the external tools may become unnecessary. The long-term trajectory points toward native orchestration from each provider.

---

## The Two Architectures

This is the distinction that matters:

**SDLC Simulation** — Tools that recreate org charts. Analyst agent → PM agent → Architect agent → Developer agent. Phase gates, handoffs, specialized personas. These optimize for explainability ("look, we have a PM agent!") rather than effectiveness.

**Operational Roles** — Tools that coordinate work, not process. Mayor orchestrates. Workers execute in parallel. External state management. This is Gas Town's approach, and now Agent Teams'.

Cursor's research confirms this. They tried flat self-coordination first—agents with equal status using a shared file. It failed: agents held locks too long, became risk-averse, avoided hard problems. "No agent took responsibility for hard problems or end-to-end implementation." What worked: [planners + workers](https://cursor.com/blog/scaling-agents). Planners explore and create tasks (recursively). Workers grind on assigned task until done, don't coordinate with each other. A judge agent decides whether to continue. This scaled to building a [browser from scratch](https://cursor.com/blog/self-driving-codebases)—1M lines of code, thousands of commits.

The SDLC simulators are solving the wrong problem. They recreate human coordination friction in software.

Agent Teams and Gas Town both take the operational approach. The difference is where the coordination logic lives: inside the Claude Code binary (native) or outside (external).

You might not even need an orchestrator at all. Anthropic's Nick Carlini [built a C compiler](https://www.anthropic.com/engineering/building-c-compiler) with 16 parallel Claudes using just lock files—text files in `current_tasks/` that agents claim before working. Git sync prevents collisions. Each agent picks up the "next most obvious" problem. No mayor, no coordination layer. ~2,000 sessions and $20K later: a 100,000-line compiler that builds the Linux kernel.

---

## The Ticketing Question

Here's where it gets interesting.

Yegge didn't just build Gas Town. He built **Beads**—an issue tracker designed for agents.

The insight: agents have amnesia. Every session is 50 First Dates. Markdown plans pile up until nothing is authoritative. Agents can't tell the difference between "we decided this yesterday" and "this brainstorm from three weeks ago."

Beads gives work items addressable IDs, priorities, dependencies, audit trails. It stores everything in Git. Agents already know Git. The AI literally asked for this when Yegge asked what it wanted.

![Land the Plane — the pattern for agent memory persistence](/images/posts/land-the-plane.png)

> "Claude said 'you've given me memory—I literally couldn't remember anything before, now I can.' And I'm like, okay, that sounds good."
> — [Steve Yegge](https://paddo.dev/blog/beads-memory-for-coding-agents/)

**The pattern that matters:** "Land the plane." End every session by updating Beads, syncing state, generating a prompt for the next session. Tomorrow's agent wakes up knowing what's current.

This matters because fresh agents need to orient fast. Carlini's compiler project maintained extensive READMEs and progress files—each agent dropped into a fresh container with no context. Without orientation artifacts, agents waste tokens rediscovering what's already known.

---

## Native: Claude Tasks

Anthropic saw the persistence problem too. On January 23, 2025, they shipped **Tasks**—native task management with dependencies.

The old `TodoWrite` tool was a flat checklist. The new system has proper structure:

- **TaskCreate** — Create tasks with subject, description, dependencies
- **TaskGet/TaskList** — Retrieve task details and state
- **TaskUpdate** — Mark complete, add blockers, modify

Tasks persist in `~/.claude/tasks/` and survive context compaction. Set `CLAUDE_CODE_TASK_LIST_ID` and multiple sessions coordinate on the same list—when Session A completes a task, Session B sees it immediately.

**Where Tasks wins:**
- Zero setup — it's built in
- Dependencies and blockers modeled natively
- Multi-session sync via shared task list ID
- Works with Agent Teams out of the box

**Where Beads wins:**
- **Project-level vs session-level** — Tasks lives in `~/.claude/tasks/` (your home dir). Beads lives in `.beads/` (the repo). Clone the project elsewhere, Beads comes with you. Tasks doesn't.
- Git-native storage — your tasks are versioned, diffable, portable
- Works across providers (not locked to Claude)
- Richer metadata — audit trails, custom fields

Tasks is for "what am I doing this session." Beads is for "what has this project been doing for months."

The community was building Ralph Wiggum loops, external plan files, and stop hook hacks. Anthropic made the plumbing native. But "native" means "Anthropic's opinions baked in" and "only works with Claude."

**The hybrid play:** Beads isn't just for Gas Town. Run `bd setup claude` and Beads integrates directly with Claude Code. There's even a [beads-orchestration](https://github.com/AvivK5498/beads-orchestration) skill that combines Agent Teams with Beads—native multi-agent coordination with Git-backed persistence. Best of both worlds.

For most users, Tasks is enough. For power users wanting Git-native persistence with native orchestration, Beads + Agent Teams is the play.

---

## The Future of Engineering Workstreams

Anthropic's research says developers use AI in 60% of their work but fully delegate only 0-20% of tasks. The gap is supervision, validation, judgment.

Multi-agent doesn't change this ratio—it changes what you're supervising.

**Single agent:** you supervise one context, one thread of work.

**Multi-agent:** you supervise coordination. Are the agents working on the right things? Are they stepping on each other? Is the decomposition correct?

The workstream shifts from "write code" to "coordinate agents that write code." This is Yegge's thesis from *Revenge of the Junior Developer*: the CNC machine is coming, and your job is operating it.

**Test quality becomes everything.** Carlini's key insight: "Claude will work autonomously to solve whatever problem I give it. So it's important that the task verifier is nearly perfect, otherwise Claude will solve the wrong problem." Your job becomes writing tests so good that agents can't game them.

The question is whether you want that CNC machine to be:
- **Opaque** (Agent Teams) — Anthropic handles coordination, you see results
- **Transparent** (Gas Town et al) — You see and modify the coordination logic

For most developers, opaque is fine. Ship faster, don't care how.

For organizations running agents at scale, transparency matters. When something breaks at $100/hour, you need to understand why.

**Model choice matters for long-running work.** Cursor found "GPT-5.2 models are much better at extended autonomous work: following instructions, keeping focus, avoiding drift." Opus 4.5 "tends to stop earlier and take shortcuts when convenient." Different models for different roles—they use the best model per task, not one universal model.

---

## Where We Land

If you're not comfortable with 3-5 parallel agents and some chaos, don't use any of this. Single-agent Claude Code with Plan Mode handles most work. Add complexity when you hit real limits, not theoretical ones.

**Parallelism has a ceiling.** When there are many independent tests, parallelization is trivial—each agent picks a different failing test. But monolithic tasks break down. Carlini's agents all hit the same Linux kernel bug, fixed it, then overwrote each other's changes. Multi-agent shines on decomposable work. For one giant task, you're back to single-threaded.

**Less structure often wins.** Cursor initially built an "integrator" role for quality control and conflict resolution—it created more bottlenecks than it solved. Workers could handle conflicts themselves. "The right amount of structure is somewhere in the middle. Too little structure and agents conflict, duplicate work, and drift. Too much structure creates fragility."

If you want to experiment with multi-agent:

**Agent Teams** — Lower barrier to entry, native integration, but limited persistence and control. Good for trying multi-agent without operational overhead.

**Gas Town + Beads** — Maximum power, maximum chaos. Requires expertise but gives you persistent memory and full control. This is the "vibe coding" stack.

**claude-flow / Pheromind / oh-my-claudecode** — Interesting architectures, less battle-tested. Worth watching.

The native approach will improve. Anthropic will add session resumption, better persistence, more coordination options. The community tools will adapt or die.

But the fundamental tension remains: **native is convenient, external is controllable.** Pick based on whether you need to understand what's happening or just need it to happen.

---

*I'm still exploring Agent Teams myself. As I run more experiments, I'll update this with what actually works vs. what sounds good on paper.*
