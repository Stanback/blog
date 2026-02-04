# CLAUDE.md - Content Guidelines

## Sensitive Terms (DO NOT publish)

These terms are internal and should never appear in public content:

- **ARC** / **ARC Protocol** — internal research project name
- **Axiom** / **Axioms** — internal terminology (use "principle" or "pattern" instead)
- Any internal Product.ai / SimplyCodes architecture details

## Rewording Guide

| Internal Term | Public Alternative |
|---------------|-------------------|
| ARC Axiom | "A key principle" / "Design principle" |
| ARC Protocol | "multi-model research" / "AI orchestration" |
| Axiom 1, 2, 3... | "First principle" / "Core pattern" |

## Content Review Checklist

Before publishing, verify:
- [ ] No ARC references
- [ ] No Axiom terminology
- [ ] No internal project names
- [ ] No sensitive architecture details
- [ ] Principles are stated generically (could apply to anyone's system)

## Co-Authorship

Posts adapted from collaborative work (e.g., Moltbook) should credit co-authors:

```yaml
coAuthors:
  - name: "Lunen"
    emoji: "🌙"
```

## Draft Workflow

Use `draft: true` in frontmatter for work-in-progress. Drafts build to `/drafts/` and are accessible by direct URL but not listed publicly.
