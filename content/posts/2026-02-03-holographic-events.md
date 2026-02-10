---
title: "Self-Healing Systems: The Holographic Event Pattern"
date: 2026-02-03T14:00
type: post
schemaVersion: 1
description: "Every event must carry everything a repair bot needs to act without asking questions. Don't scatter breadcrumbs — ship holograms."
heroImage: /images/posts/holographic-events-hero.png
tags:
  - architecture
  - engineering
  - ai
---

Last Tuesday at 2am, one of our browser automation agents hit a Cloudflare challenge on a site it had been scraping cleanly for weeks. The selector for the submit button had changed — the site redesigned overnight. The agent logged "selector failed," retried three times, and moved on. Standard behavior.

When I looked at it the next morning, I had a log line and nothing else. No screenshot of what the page actually looked like. No DOM snapshot. No record of which selectors had already been tried. Just "selector failed" and a timestamp. To figure out what happened, I had to manually navigate to the site, inspect the page, cross-reference the old selectors, and guess at what had changed. The state I needed had already shifted — the page looked different again by Wednesday.

That thirty-minute forensics session is what made the pattern click. The problem isn't that browser automation breaks constantly — selectors change, challenges appear, responses slow down. The problem is that our failure events are breadcrumbs: thin traces that force you to reconstruct context from multiple sources after the fact. That works when failures are rare and humans are cheap. Neither is true for AI-orchestrated systems running 24/7.

## Holographic Events

The fix is to make every failure event self-contained: a hologram rather than a breadcrumb.

The core principle: **Every event payload should encapsulate the full context required to replay the situation at t₀ without querying external databases.**

A holographic event for a selector failure looks like:

```json
{
  type: 'browser:selector:failed',
  subject: 'chatgpt',                    // who
  predicate: 'selector:failed',          // what happened
  object: 'submit',                      // what action
  context: {                             // when/where
    url: 'https://chatgpt.com/c/abc123',
    recipeVersion: 'v1.2.0',
    attempt: 3
  },
  evidence: {                            // proof
    screenshot: 'base64...',
    domSnapshot: '<html>...',
    selectorsAttempted: [
      '[data-testid="send-button"]',
      'button[aria-label="Send"]'
    ],
    timing: { waitedMs: 5000 }
  },
  confidence: 0.0                        // repair bot will set this
}
```

The structure mirrors the 6-tuple from [[Proof, Not Truth: Epistemic Humility in Knowledge Systems|Proof, Not Truth]] — subject, predicate, object, context, evidence, confidence. That's not a coincidence. The holographic event is a proof node: a claim about what happened, carrying its own evidence, with a confidence score that the repair system updates as it investigates.

This event is complete. A repair bot can analyze it, generate candidate fixes, test them, and update the recipe — without asking a single question.

## The Architecture

```
┌──────────────┐    holographic     ┌──────────────┐    poll/fix    ┌──────────────┐
│   Executor   │───── event ───────▶│   Event DB   │◀───────────────│  Repair Bot  │
│ (runs tasks) │                    │              │                │ (supervisor) │
│              │◀── fixed recipe ───│              │────update─────▶│              │
└──────────────┘                    └──────────────┘                └──────────────┘
```

The executor runs browser automation. On failure, it emits a holographic event and moves on — no blocking, no retry loops. The repair bot polls for pending repairs, routes each to a strategy (selector repair, timeout increase, auth escalation), and updates the recipe if a fix is found.

Next time the executor runs, it picks up the fixed recipe automatically.

## The Tradeoffs

Holographic events are heavier than breadcrumbs. You're shipping screenshots, DOM snapshots, maybe even video clips. Storage costs go up.

But:

1. **Repair latency goes down.** The bot has everything it needs immediately.
2. **Human escalation gets better.** When a bot can't fix it, the holographic event is a perfect bug report.
3. **Audit trails are complete.** You can replay any failure without hunting through logs.

For high-value, failure-prone systems — like multi-model AI orchestration — the tradeoff is worth it.

---

Don't scatter breadcrumbs. Ship holograms.

Decouple execution from repair — emit and move on.

And design events for the repair bot, not the human. If a bot can't act on it without asking questions, it's not self-contained enough.

The system that heals itself is the one that remembers everything it needs — and carries that memory in every event.
