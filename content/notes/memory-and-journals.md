---
title: "Memory and Journals"
date: 2026-02-07T12:00
type: note
schemaVersion: 1
description: "AI agents have perfect memory within a conversation and total amnesia between them. What can human journaling teach us about what memory should actually be?"
tags:
  - ai
  - philosophy
heroImage: /images/posts/memory-and-journals-hero.png
---

I found a journal entry from 2019 last week. I'd written about a production outage at work — the event pipeline backed up, we lost six hours of data, and I described the specific sinking feeling of watching the monitoring dashboard turn red while being on a video call I couldn't leave. Reading it, the feeling came back immediately. Not the facts of the outage — I'd forgotten most of those — but the tension in my shoulders, the taste of cold coffee, the way I kept muting myself to swear.

The journal didn't preserve the event. It preserved the experience. And that's a different thing entirely.

I've been thinking about this because AI agents have the opposite problem. Within a context window, a transformer can attend to everything — every earlier message, every detail, every correction. Better working memory than any human has ever had. Then the session ends. The context compresses or vanishes. The agent wakes up next time with no idea you've ever spoken.

There's no gradual fade. No "I vaguely remember we discussed this." Just a cliff.

Humans have lossy but continuous memory. We forget constantly — names, dates, what we had for lunch — but the forgetting is gradual, weighted, shaped by repetition and emotion and salience. There's never a moment where everything before Thursday disappears.

This discontinuity is the central problem in agent memory, and most solutions are trying to fix it by making agents remember more.

I think that's the wrong direction.

---

The current fix is external memory. Agents write logs, save files, dump context into vector stores that can be searched later by semantic similarity. Solutions like Supermemory chunk past conversations, embed them, and retrieve relevant fragments when they seem useful.

It works, roughly. But it's worth noticing how different this is from how human memory actually functions.

Vector retrieval is similarity-based — cosine distance in embedding space. It's static: the retrieved chunk comes back unchanged, exactly as it was stored. It has no emotional weighting, no sense of "this was important because the stakes were high." It returns fragments, not narratives.

Human memory is associative — one memory triggers another through meaning, emotion, sensory connection. It's reconstructive: we don't replay recordings, we rebuild memories each time we access them, which is why they drift. It's emotionally weighted: vivid memories are usually vivid because something was at stake, not because the information was semantically relevant. And it's continuous — not chunks retrieved on demand but a living, shifting substrate that colors everything.

Vector retrieval is a really good search engine for your past. Human memory is a storyteller who rewrites history each time you ask.

Both are useful. They're not the same thing. And the differences point somewhere interesting.

---

In 1942, Borges wrote "Funes the Memorious." A young man falls from a horse and wakes with perfect memory. He can recall every leaf on every tree he's ever seen, every moment of every day.

It destroys him.

He can't abstract. He can't generalize. He's disturbed that a dog seen in profile at 3:14 has the same name as the same dog seen from the front at 3:15. They look different — how can they be the same word?

Funes is drowning in raw data with no compression. He remembers everything and understands nothing.

Three years later, Borges wrote "The Aleph" — a point in space that contains all other points. The narrator sees everything at once, every angle of every place on Earth simultaneously. It's beautiful and annihilating. The story ends with the narrator forgetting most of what he saw.

Maybe that's necessary.

These are fiction, but the insight is real: perfect recall isn't the same as understanding. It might be the opposite. Total retention without compression produces noise, not knowledge. The ability to forget — to let irrelevant details fade so that patterns can emerge — might be what makes thought possible at all.

---

This maps onto something I've noticed in my own life.

I journal. Not consistently — I go through phases — but enough to have years of entries.

The useful thing about a journal isn't the record. It's the externalization. Instead of letting memory silently rewrite itself — smoothing out the embarrassing parts, inflating the heroic ones — I have a fixed reference point. The journal is a check against drift.

Agent daily logs serve the same function. Without them, the agent's "memory" of past events is whatever gets reconstructed from fragments at retrieval time. With them, there's an authoritative record.

Both practices fight entropy. Both create coherence through explicit externalization.

But here's the part that interests me: the journal works partly *because* it's slow. The friction of writing by hand, of choosing what to capture and what to skip, is itself a form of compression. You can't write everything, so you write what mattered. The constraint forces salience.

Automated logging doesn't have this. It captures everything equally, which is Funes's problem.

---

So if forgetting is adaptive — if it enables generalization, emotional regulation, relevance filtering, manageable cognitive load — then the right question about agent memory isn't "how do we help them remember more?"

It might be: how do we help them forget the right things?

What would that look like? Reinforcement signals that strengthen memories that get accessed often and let others decay. Compression that preserves gist over detail. Some equivalent of "this faded because it wasn't rehearsed" — the natural pruning that human brains do automatically and that current agent memory systems don't do at all.

Right now, agent memory is building toward Funes: total recall, every detail equally weighted, no decay. The Borges stories suggest this is a dead end.

What agents might need is something closer to what humans have — imperfect, lossy, reconstructive memory that drifts over time but preserves what matters.

Not a better search engine for the past. A better storyteller.

---

I keep coming back to one question: is the journaling practice valuable *because* it's slow and manual? Does the friction create something that automated logging misses?

I think the answer is yes, and I think it matters for how we build memory into agents.

The value isn't in the completeness of the record. It's in the act of compression — deciding what's worth keeping, which is another way of deciding what something meant.

Agents that log everything are agents that understand nothing. The ones that learn to forget well might be the ones that actually think.

These are notes, not conclusions. But the parallel between my journal and an agent's memory files is too clean to ignore, and the differences are more interesting than the similarities.
