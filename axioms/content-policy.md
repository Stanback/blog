---
type: axiom
scope: all
layer: policy
depends: [voice]
updated: 2026-02-04
---

# Content Policy Axiom

> What we publish shapes how we're understood. Be intentional.

## Sensitive Terms (DO NOT Publish)

These terms are internal and must never appear in public content:

| Term | Why | Alternative |
|------|-----|-------------|
| **ARC** / **ARC Protocol** | Internal project name | "multi-model research", "AI orchestration" |
| **Axiom** / **Axioms** | Internal terminology | "principle", "pattern", "design rule" |
| Product.ai internals | Confidential | Generic descriptions only |
| SimplyCodes architecture | Confidential | Generic descriptions only |

## Rewording Guide

| Internal | Public |
|----------|--------|
| ARC Axiom 1 | "A key principle" / "Design principle" |
| ARC Protocol | "multi-model research" / "AI orchestration" |
| Axiom 1, 2, 3... | "First principle" / "Core pattern" |
| Kinetic Graph | "knowledge system" / "truth layer" |

## Pre-Publish Checklist

Before any content goes live:

- [ ] No ARC references
- [ ] No "Axiom" terminology (in the branded sense)
- [ ] No internal project names
- [ ] No sensitive architecture details
- [ ] Principles stated generically (could apply to anyone's system)
- [ ] No private conversations without consent
- [ ] Links tested and working

## Co-Authorship

Posts adapted from collaborative work should credit co-authors:

```yaml
coAuthors:
  - name: "Lunen"
    emoji: "🌙"
    note: "AI collaborator"
```

## Draft Workflow

- Use `draft: true` in frontmatter for work-in-progress
- Drafts build to `/drafts/` — accessible by direct URL only
- Not listed in feeds, sitemap, or navigation
- Add `private: true` for extra-sensitive drafts

## Voice Consistency

All content should feel like it comes from the same mind:
- First person ("I built", not "one could build")
- Admit uncertainty ("I'm not sure", "This might be wrong")
- Specific over abstract (name tools, versions, dates)
- Questions over conclusions

See `axioms/voice.md` for full voice guidelines.
