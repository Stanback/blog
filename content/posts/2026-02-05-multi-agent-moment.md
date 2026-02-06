---
title: "The Multi-Agent Moment: Native vs. External Orchestration"
description: "Claude's Agent Teams shipped alongside Opus 4.6. How does it compare to Gas Town, claude-flow, and the community tools that got here first? And what does it mean that software stocks just lost $285 billion?"
date: 2026-02-05
type: post
schemaVersion: 1
draft: false
tags:
  - ai
  - systems
  - architecture
  - judgment
heroImage: /images/posts/multi-agent-moment-hero.png
tension: "Anthropic productized what the community built. The market panicked. But the existential question isn't about tools—it's about what we're becoming."
preface: "The Nasdaq just had its worst two-day tumble since April. Software stocks cratered. And somewhere in the noise, Anthropic shipped multi-agent orchestration. This is about more than tools."
---

## The $285 Billion Question

On Tuesday, Anthropic's Cowork plugins wiped $285 billion off global software stocks. Thomson Reuters dropped 15.8%. LegalZoom fell nearly 20%. The Nifty IT index crashed 6%. They're calling it the "SaaSpocalypse."

On Thursday, Anthropic followed up with Opus 4.6 and Agent Teams—multi-agent coordination baked directly into Claude Code.

The market is spooked. But the market is reacting to the wrong thing.

> "AI doesn't make the tough calls on architecture, compliance, or security. It can't fully understand a company's business logic or the ethical implications of a system. That oversight and judgment still rest with experienced engineers."
> — [CIO Magazine](https://www.cio.com/article/4062024/demand-for-junior-developers-softens-as-ai-takes-over.html), September 2025

This is the cope. And it's partially true. But "judgment still rests with humans" glosses over the uncomfortable reality: **judgment is the last moat, and the water is rising.**

## The Existential Weight

I've felt this for a year now. A low-grade anxiety that doesn't quite resolve.

It's not fear of being replaced—not exactly. It's something weirder. The sense that the skills I spent a decade building are becoming... not worthless, but *different*. Cheaper. More abundant. The thing that made me valuable is now something I coordinate rather than do.

> "In 2026, writing code is no longer the hard part. AI can generate features, refactor services, and accelerate delivery at scale. Speed is now expected, not a differentiator. What AI removed is friction, not responsibility."
> — [Security Boulevard](https://securityboulevard.com/2026/01/why-senior-software-engineers-will-matter-more-in-2026-in-an-ai-first-world/)

This lands differently when you're living it.

Employment for recent CS graduates has declined 8% since 2022 ([Oxford Economics](https://www.oxfordeconomics.com/wp-content/uploads/2025/05/US-Educated-but-unemployed-a-rising-reality-for-college-grads.pdf)). 90% of tech workers now use AI in their jobs ([Google](https://www.oxfordeconomics.com/wp-content/uploads/2025/05/US-Educated-but-unemployed-a-rising-reality-for-college-grads.pdf)). The funnel that used to produce senior engineers is narrowing at the entry point.

> "38% of engineering leaders fear juniors will get less hands-on experience in AI-heavy workflows."
> — [CodeConductor](https://codeconductor.ai/blog/future-of-junior-developers-ai/)

We're not just changing how software gets built. We're changing who gets to learn how to build it.

## How We Adapt

The uncomfortable truth: **the skills that survive are the ones AI can't fake.**

Not code. AI writes code.

Not velocity. AI is faster.

Not consistency. AI doesn't get tired.

What survives:
- **Judgment** — Knowing what to build, not just how
- **Accountability** — Owning outcomes when systems fail
- **Taste** — Recognizing when something is wrong before users do
- **Context** — Understanding the business, the users, the second-order effects

> "Senior engineers don't just execute tasks. They recognize second- and third-order effects. They anticipate failure modes before users discover them. They trade off speed, cost, security, and maintainability deliberately."
> — [Security Boulevard](https://securityboulevard.com/2026/01/why-senior-software-engineers-will-matter-more-in-2026-in-an-ai-first-world/)

This is why multi-agent matters. Not because it makes AI faster—it does—but because it shifts what humans do. You stop writing code. You start coordinating systems that write code.

The question becomes: **are you supervising, or are you being supervised?**

## From Vibe Coding to Vibe Managing

Steve Yegge calls his workflow "vibe coding." Work becomes fluid—"an uncountable substance that you sling around freely, like slopping shiny fish into wooden barrels at the docks."

> "Some bugs get fixed 2 or 3 times, and someone has to pick the winner. Other fixes get lost. Designs go missing and need to be redone. It doesn't matter, because you are churning forward relentlessly on huge, huge piles of work."
> — [Steve Yegge, "Welcome to Gas Town"](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04)

This sounds chaotic. It is chaotic. But it's also the emerging reality for anyone running AI at scale.

The shift isn't from "engineer" to "prompt engineer." That's too small. The shift is from **maker** to **orchestrator**. From building to coordinating. From depth to breadth.

Some people will thrive here. They like systems thinking, coordination, judgment calls. Others will struggle. They liked the craft of code, the satisfaction of a clean implementation, the feeling of having *made* something.

Both reactions are valid. Neither is wrong.

---

## The Tools (Finally)

Which brings us to the actual announcement.

On February 5th, Anthropic dropped Opus 4.6 with a feature buried in the changelog that changes the economics of AI-assisted development: **Agent Teams.**

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

## The Bigger Picture

The $285 billion selloff isn't about Cowork or Agent Teams or any specific tool. It's about the market finally internalizing what builders have known for a year: **AI changes the economics of knowledge work.**

Software that used to require specialized teams can now be approximated by general-purpose agents. Legal research, financial analysis, code generation—the boundaries are blurring.

The response isn't to panic. It's to ask: **what do I do that AI can't fake?**

For me, it's judgment. Taste. The ability to recognize when something is wrong before I can articulate why. The willingness to own outcomes when systems fail.

These aren't skills you learn from a tutorial. They come from years of building things, shipping things, watching things break. They come from caring about craft even when nobody's watching.

AI makes execution cheap. That makes judgment expensive.

The existential crisis isn't about being replaced. It's about becoming someone new.

---

*I'm still figuring this out. If you're feeling the same weight, I'd like to hear how you're navigating it.*
