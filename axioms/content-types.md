---
type: axiom
scope: all
layer: editorial
depends: [pillars]
updated: 2026-02-04
---

# Content Types Axiom

> The distinction between content types should reflect how knowledge actually works, not arbitrary categories.

## The Pipeline

Content moves through stages of confidence and vulnerability:

```
Drafts (private) → Notes (public exploration) → Writing (published commitment)
```

This isn't just about polish — it's about emotional readiness.

## The Three Layers

### Drafts (Private)
- **Intimate.** The stuff you're not sure about yet.
- **Vulnerable.** Might be wrong. Might be embarrassing. Might change your mind completely.
- **Not ready to defend.** You're still working it out.
- Lives in `content/posts/` with `draft: true` — exists in the repo, but never published.

Drafts aren't just "unfinished notes." They're a different emotional register. The ideas that feel too raw to think about in public. The opinions you haven't stress-tested. The things you might regret saying.

### Notes (Public Exploration)  
- **Thinking in public.** You're okay being incomplete.
- **Living documents.** Can evolve without ceremony.
- **Exploratory.** "I'm working through this" rather than "here's my position."
- Lives in `content/notes/` — published but understood to be in flux.

Notes are the workshop floor. You're comfortable being seen mid-process.

### Writing (Published Commitment)
- **Standing behind it.** You've thought it through enough to commit.
- **Dated and timestamped.** A fixed point in time.
- **Edited and structured.** Ready for external scrutiny.
- Lives in `content/posts/` — the archive, what you're willing to defend.

Writing doesn't mean you'll never change your mind. It means you're ready to say "this is where I am" publicly.

## The Graduation Model

Content can move between layers:

**Draft → Note:** When you're ready to think in public, but not ready to commit.

**Draft → Writing:** When something crystallizes directly into a finished piece.

**Note → Writing:** When a note matures — develops structure, makes clear claims, feels "done enough" to stand behind.

When graduating a note to writing:
1. Move file from `content/notes/` to `content/posts/`
2. Add proper `description` frontmatter
3. Set the `date` to the graduation date (or keep original)
4. Optionally add `graduatedFrom: note` to preserve history

## Wikilinks & Connections

Use `[[Title]]` syntax to link between content:
- Creates a knowledge graph
- Shows relationships between ideas
- Notes and Writing can link freely to each other

The graph doesn't care about the Writing/Notes distinction — ideas connect regardless of their maturity level.

## What Goes Where

### Writing (Posts)
- Essays with a thesis
- Tutorials and how-tos
- Announcements or updates
- Anything you'd share on social media
- Content with external references

### Notes
- Quick observations (2-3 paragraphs)
- Frames and mental models still being tested
- Ideas you're not ready to fully commit to
- Rough sketches that might become posts

### Photos
- Visual observations with intention
- Each photo has a reason for existing
- Not a photo dump — curated

### Pages
- Static, rarely-changing content (About, Colophon)
- Not dated, not part of any feed

## The Human Constraint

The decision of "where does this belong?" is itself a human constraint — it requires taste and judgment. No rule can fully capture it.

When in doubt:
- If you're not ready for *anyone* to see it → Draft
- If you'd be embarrassed to share it widely but okay with people stumbling across it → Note
- If you're ready for it to represent you → Writing
- If you're genuinely not sure → Start as Draft, move to Note when you're comfortable, graduate when it's ready

The vulnerability gradient: **Drafts** (private, might be wrong) → **Notes** (public, exploratory) → **Writing** (public, committed).

## Anti-Patterns

- ❌ Don't let Drafts become a graveyard — review them, decide their fate
- ❌ Don't use Notes as a dumping ground for half-baked posts
- ❌ Don't let Notes accumulate without ever graduating any
- ❌ Don't make Writing so precious that nothing gets published
- ❌ Don't stress the distinction — it's a tool, not a law

## Why This Matters

The pipeline isn't about quality control. It's about **emotional readiness**.

Some ideas need privacy to develop. They're too fragile for public scrutiny. Drafts give them that protected space.

Some ideas benefit from public exploration. You learn by writing them out loud. Notes create that workshop environment.

Some ideas are ready to be staked. You've done the thinking. Writing is where you plant the flag.

Respecting these stages makes it easier to write at all. You don't have to be ready to defend everything you think. You just have to know which layer you're working in.
