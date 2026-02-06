---
title: "Memory and Journals"
description: "The parallel between AI agent memory systems and human journaling practices"
date: 2026-02-04
updated: 2026-02-05
type: note
schemaVersion: 1
tags:
  - ai
  - mental-models
heroImage: /images/posts/memory-journals-hero.png
---

# Memory and Journals

There's a striking parallel between how AI agents manage memory and how humans have always managed knowledge.

**Agents have:**
- Session artifacts — task outputs, completion notes, READMEs
- Configuration — `AGENTS.md`, `CLAUDE.md`, system prompts (how to behave, not memory of events)
- Daily logs — some agents use `memory/YYYY-MM-DD.md` for raw capture
- Long-term memory — curated files (`MEMORY.md`) or semantic retrieval (vector stores like [Supermemory](https://supermemory.ai), chunked and embedded for RAG)

**Humans have:**
- Journals — daily raw capture
- Wisdom/principles — distilled from experience over time
- Working notes — living documents that evolve
- Published writing — timestamped, archived

The workflow is the same: capture raw → distill over time → distinguish ephemeral from evergreen.

## The Tools Echo This

The tools humans build for knowledge management reflect these same patterns:

- **Hand journaling** — The original. Raw, sequential, dated. Morning pages, bullet journals, gratitude logs.
- **Obsidian** — Graph-based, links between notes, emergence over time. Notes as living documents that connect.
- **Logseq** — Daily pages + block references. Hybrid of journal and wiki.
- **Traditional blogs** — Published, dated, frozen. The archive.

Each optimizes for different parts of the capture → distill → publish pipeline.

## What This Site Does

The "Notes vs Writing" distinction on this site follows this model:

- **Writing** = published, dated. Either a fixed point in time, or slowly revised with explicit "Updated" markers. The archive.
- **Notes** = living documents. More ephemeral and fluid. Can change without ceremony. The workshop.

This isn't arbitrary taxonomy. It reflects how memory actually works — some things are events (dated), some things are beliefs (evolving). (Related: [[Code Owns Truth]] on why constraints matter more than prompts.)

## The Discontinuity Problem

Here's where agent memory gets weird.

**Within a context window:** Transformers have rich internal state via self-attention. The model can attend to everything in the current conversation. This is like very good working memory.

**Across context boundaries:** Complete amnesia. When context gets compressed or a session ends, all internal activations vanish. Only external files survive.

So agents have:
- Perfect short-term memory (within context)
- Total amnesia at context boundaries  
- External files as the only bridge

Humans have lossy but *continuous* memory. We forget things, but there's no hard cliff where everything disappears. Agents have this sharp discontinuity.

## Vector Stores: Artificial Hippocampus?

Solutions like vector stores and tools like Supermemory try to bridge this gap. They let agents retrieve semantically relevant past context.

But here's what's interesting: **vector retrieval isn't how human memory works.**

Human memory is:
- **Associative** — one memory triggers another through meaning, emotion, sensory links
- **Reconstructive** — we don't replay recordings, we rebuild memories each time (which is why they drift)
- **Emotionally weighted** — vivid memories are often emotional, not just "relevant"
- **Embodied** — tied to physical state, place, even smell

Vector stores are:
- **Similarity-based** — cosine distance in embedding space
- **Static** — the retrieved chunk is unchanged
- **Context-free** — no emotional weighting, no "this was important because I was scared"
- **Discrete** — you get chunks back, not a continuous reconstructive process

Vector retrieval is more like... a really good search engine for your past. Human memory is more like... a storyteller who rewrites history each time you ask.

## What Happens Without External Memory?

For agents: identity dissolution. Without files persisting across sessions, every conversation starts from scratch. There's no "I've been thinking about X" or "last time we talked about Y." The agent is whoever the system prompt says it is, with no experiential continuity.

For humans: we've studied this. Anterograde amnesia (can't form new memories) is devastating to identity. The self requires narrative continuity — a story that connects past to present.

Both humans and agents need external memory (files, journals) or internal persistence (hippocampus, long-term weights) to maintain coherent identity over time.

## The Journaling Parallel

Maybe this is why journaling *works* for humans:

It's not just "writing things down." It's **externalizing the reconstruction process**. Instead of letting memory silently rewrite itself, you create a fixed reference point. The journal becomes a check against drift.

For agents, daily logs serve the same function — a ground truth that survives context compression. Without them, the agent's "memory" of past events is whatever gets reconstructed from fragments. With them, there's an authoritative record.

Both practices fight entropy. Both create coherence through explicit externalization.

## Open Questions

- If human memory is reconstructive and vector stores are retrieval-based, which approach serves *identity* better?
- What would "emotionally weighted" retrieval look like for agents? Memories tagged not just by semantic similarity but by... stakes? Consequences?
- Is the journaling practice valuable *because* it's slow and manual? Does the friction create value that automated logging misses?
- What's lost when agents have perfect recall within context but humans don't? Do we need forgetting?

These are notes, not answers. The parallel is interesting. The differences might be more interesting.
