# Content Types Axiom

> The distinction between content types should reflect how knowledge actually works, not arbitrary categories.

## The Spectrum

Content lives on a spectrum from ephemeral to evergreen:

```
Raw capture → Working notes → Published essays → Archived reference
```

## Writing vs Notes: The Core Distinction

| Aspect | Writing | Notes |
|--------|---------|-------|
| **Temporality** | Dated, timestamped | Living, can evolve |
| **Intent** | "I'm making a claim" | "I'm thinking out loud" |
| **Polish** | Edited, structured | May be rough |
| **Commitment** | This is my position | This might change |
| **Updated field** | Shows revision history | Updates silently |

### Writing (Posts)
- Published pieces with a date
- Either a fixed point in time, or slowly revised with explicit "Updated" markers
- The archive — what you're willing to stand behind
- Shows reading time, has descriptions for SEO/sharing

### Notes  
- Living documents that can evolve without ceremony
- More ephemeral and fluid
- The workshop — thinking in public
- May graduate to Writing when mature

## The Graduation Model

Notes can "graduate" to Writing when they:
- Have substantial structure (sections, references)
- Make clear claims rather than exploring
- Feel "done" (even if they'll be updated later)
- Are worth standing behind publicly

When graduating a note to a post:
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

The decision of "is this a Note or Writing?" is itself a human constraint — it requires taste and judgment. No rule can fully capture it.

When in doubt:
- If you'd be embarrassed to share it widely → Note
- If you're ready for it to represent you → Writing
- If you're not sure → Start as Note, graduate later

## Anti-Patterns

- ❌ Don't use Notes as a dumping ground for half-baked posts
- ❌ Don't let Notes accumulate without ever graduating any
- ❌ Don't make Writing so precious that nothing gets published
- ❌ Don't stress the distinction — it's a tool, not a law
