---
title: "The SaaSpocalypse"
description: "Anthropic wiped $285 billion off software stocks this week. The market is panicking about AI replacing tools. But the real disruption is what it means for the people who build them."
date: 2026-02-05
type: post
schemaVersion: 1
draft: false
tags:
  - ai
  - systems
  - judgment
heroImage: /images/posts/saaspocalypse-hero.png
tension: "The market is reacting to the wrong thing. This isn't about tools replacing tools. It's about what happens to us."
preface: "Software stocks just had their worst week since April. The market is probably overreacting. But the anxiety driving the selloff? That's been building for a year. AI is just forcing the conversation into the open."
---

## The $285 Billion Question

On Tuesday, Anthropic's Cowork plugins triggered a [$285 billion selloff](https://www.bloomberg.com/news/articles/2026-02-03/legal-software-stocks-plunge-as-anthropic-releases-new-ai-tool) across software, financial services, and legal tech. Thomson Reuters dropped 15.8%. LegalZoom fell nearly 20%. They're calling it the "SaaSpocalypse."

Is it an overreaction? Probably.

> "Perhaps this is an overreaction, but the threat is real and valuations must account for that."
> — [Reuters](https://www.reuters.com/business/media-telecom/global-software-stocks-hit-by-anthropic-wake-up-call-ai-disruption-2026-02-04/)

When DeepSeek triggered a similar panic last year, Nvidia lost $600 billion in a day. A year later, the feared disruption never materialized. Markets overcorrect. Fear spreads faster than fundamentals.

But here's what's different this time: **the conversation is finally public.**

The anxiety that builders have felt privately for a year—"wait, can AI actually do my job?"—is now being priced into the market. Wall Street is catching up to what anyone using Claude Code already knew: execution is getting cheaper. Fast.

> "AI doesn't make the tough calls on architecture, compliance, or security. It can't fully understand a company's business logic or the ethical implications of a system. That oversight and judgment still rest with experienced engineers."
> — [CIO Magazine](https://www.cio.com/article/4062024/demand-for-junior-developers-softens-as-ai-takes-over.html), September 2025

This is the cope. And it's partially true. But "judgment still rests with humans" glosses over the uncomfortable reality: **judgment is the last moat, and the water is rising.**

---

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

---

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

---

## From Vibe Coding to Vibe Managing

Steve Yegge calls his workflow "vibe coding." Work becomes fluid—"an uncountable substance that you sling around freely, like slopping shiny fish into wooden barrels at the docks."

> "Some bugs get fixed 2 or 3 times, and someone has to pick the winner. Other fixes get lost. Designs go missing and need to be redone. It doesn't matter, because you are churning forward relentlessly on huge, huge piles of work."
> — [Steve Yegge, "Welcome to Gas Town"](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04)

This sounds chaotic. It is chaotic. But it's also the emerging reality for anyone running AI at scale.

The shift isn't from "engineer" to "prompt engineer." That's too small. The shift is from **maker** to **orchestrator**. From building to coordinating. From depth to breadth.

Some people will thrive here. They like systems thinking, coordination, judgment calls. Others will struggle. They liked the craft of code, the satisfaction of a clean implementation, the feeling of having *made* something.

Both reactions are valid. Neither is wrong.

---

## The Ecosystem Shakeout

The SaaSpocalypse isn't just about legal and financial software. It's about every tool built on the assumption that humans do the work.

### Ticketing: Jira vs. Linear vs. Beads

The irony: the ticketing systems that track human work are now racing to become platforms for AI work.

**Atlassian** launched Rovo—AI agents that live inside Jira. You can create automation rules using natural language, agents that triage tickets, summarize Confluence pages, and route work. They're treating agents as a feature layer on top of existing workflows.

**Linear** went further. Their "[Linear for Agents](https://linear.app/agents)" positions AI as full workspace members. Agents get assigned to issues. They're added to projects. You @mention them in comments. The human remains "primary assignee" while the agent is a "contributor"—they're preserving accountability while delegating execution.

> "Delegate issues, but not accountability. When an issue gets delegated to an agent, the human user remains the primary assignee, while the agent is added as a contributor."
> — [Linear](https://linear.app/agents)

**Beads** (Yegge's creation) takes the opposite approach: build the ticketing system *for* agents, not *around* them. Git-backed, designed for session continuity, with the AI literally asking for the features it needed. No legacy assumptions about human workflows.

The question: **Do you adapt existing tools for AI, or build new tools for an AI-first world?**

Linear's hybrid approach might win the transition. Beads might win the destination. Jira's adding AI to a system designed for human bureaucracy—that's a harder pivot.

### Automation: Zapier vs. n8n vs. Claude Cowork

The workflow automation platforms face an existential question: **What happens when AI can just do the thing?**

Zapier's response: lean into it. They shipped [Agent Skills for Claude](https://zapier.com/blog/zapier-mcp-agent-skills/)—MCP integrations that let Claude trigger Zapier automations across 8,000+ apps. They achieved 89% AI adoption internally with 800+ agents deployed. Their strategy: become the glue between AI and everything else.

**n8n** is betting on hybrid workflows—AI for the intelligence, n8n for the plumbing. Claude generates n8n workflows. n8n connects to everything. The platform becomes an orchestration layer that AI writes to.

**Make** (formerly Integromat) is in a similar position, competing on visual workflow building while racing to add AI capabilities.

But here's the threat: **Claude Cowork doesn't need Zapier.** If the AI can directly access APIs, authenticate with services, and execute multi-step workflows autonomously—why route through a middleman?

The automation platforms survive if they become:
1. **Connectors** — The authentication and API glue that AI uses
2. **Guardrails** — Human-in-the-loop checkpoints for risky operations
3. **Monitoring** — Observability for what agents are doing

They don't survive as "no-code" tools for humans who can't code. That market is evaporating.

### Winners and Losers

**Winners:**
- **Tools that become infrastructure for AI** — Linear (agents as teammates), Zapier (MCP integrations), n8n (workflow orchestration)
- **Tools that AI can't replace** — Authentication (Okta), observability (Datadog), infrastructure (AWS)
- **Tools that aggregate judgment** — Platforms where human decisions compound (Figma, Notion when used for strategy)

**Losers:**
- **Single-function SaaS** — If Claude can do your core function, you're a feature now
- **"No-code for humans"** — The target user can now just ask AI
- **Expensive human expertise platforms** — Legal research, financial analysis, anything Cowork plugins demonstrated

**Uncertain:**
- **GitHub/GitLab** — AI needs version control, but Copilot/Codex compete with them too
- **Slack/Teams** — Communication platforms might become agent coordination hubs... or get bypassed entirely
- **Traditional ticketing (Jira)** — Too much legacy, but also too much lock-in to die quickly

The pattern: **tools survive by becoming either infrastructure (AI needs you) or judgment aggregators (humans need you for decisions AI can't make).**

Everything in the middle—tools that automate what AI now does natively—faces compression.

### The Platform Wars

The AI providers themselves are racing to own the orchestration layer—and their strategies reveal their priorities.

**Anthropic** shipped [Agent Teams](https://docs.anthropic.com/en/docs/claude-code/agent-teams) as a native feature inside Claude Code. One CLI, one subscription, specialized agents coordinated by a lead. It's elegant, but it's also a lock-in play. Last month they [cracked down on third-party harnesses](https://venturebeat.com/technology/anthropic-cracks-down-on-unauthorized-claude-usage-by-third-party-harnesses)—tools like OpenCode that let you use your Claude subscription through external interfaces. The message: if you want flat-rate pricing, use our tools. Third-party automation gets API pricing, which runs 5-10x higher for heavy use.

**OpenAI** took a different approach. Codex CLI doesn't have native multi-agent, but they published [official documentation](https://developers.openai.com/codex/guides/agents-sdk/) for orchestrating Codex through their Agents SDK via MCP. It's modular—separate tools that compose—but it requires more setup. Their bet: developers want flexibility over integration.

**Google** is furthest behind. Gemini CLI has a detailed [community proposal](https://github.com/google-gemini/gemini-cli/discussions/7637) for multi-agent architecture—agent registries, orchestration, the whole spec—but nothing shipped yet. They're watching what works.

The pattern: **every provider wants to be the platform, not just the model.** Anthropic is betting on integration (one tool that does everything). OpenAI is betting on ecosystem (many tools that compose). Google is betting on waiting (let others de-risk the approach).

For builders, this creates a choice: **optimize for one provider's vision, or build portable abstractions?** Native Agent Teams are convenient. External orchestrators like [claude-flow](https://github.com/ruvnet/claude-flow) or [Gas Town](https://github.com/AstroMavericks/gas-town) are portable. The "right" answer depends on how much you trust any single provider to remain the best option.

### The Subsidy Question

Here's the uncomfortable math: **current AI pricing is subsidized by investor capital, not sustainable economics.**

OpenAI spent [$22 billion in 2025 against $13 billion in revenue](https://fortune.com/2025/11/12/openai-cash-burn-rate-annual-losses-2028-profitable-2030-financial-documents/)—$1.69 for every dollar earned. They project $74 billion in operating losses in 2028 alone, with cumulative cash burn reaching $115 billion through 2029. The bet: hit $200 billion in revenue by 2030 and turn profitable then.

Anthropic is more disciplined. Their cash burn is projected to drop to one-third of revenue in 2026 and just 9% by 2027, with break-even expected in 2028. They're avoiding expensive video and image generation, focusing on corporate customers (80% of revenue).

What does this mean for builders?

**The current pricing is artificially cheap.** API costs reflect what investors are willing to subsidize, not what the compute actually costs. When the subsidy ends—through profitability pressure, funding crunches, or market corrections—prices go up.

**Lock-in gets more expensive over time.** If you build deep dependencies on one provider's cheap API pricing, you're exposed when they need to raise prices. Anthropic's harness crackdown is a preview: subscription arbitrage disappeared overnight.

**The endgame is unclear.** OpenAI is betting on dominance—spend everything to win the market, then monetize. Anthropic is betting on efficiency—reach profitability faster with less risk. Google is betting on integration—bundle AI into existing products. All three could work. All three could fail.

The honest answer: **nobody knows what sustainable AI pricing looks like yet.** We're all building on shifting sand. The companies burning billions are guessing too.

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

*The tools for this transition are already shipping. In [[The Multi-Agent Moment]], I break down what's available—Claude's Agent Teams vs. Gas Town vs. the community alternatives—and how to navigate the chaos.*

---

*I'm still figuring this out. If you're feeling the same weight, I'd like to hear how you're navigating it.*
