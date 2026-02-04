# CLAUDE.md — Axioms for Building bristanback.com

> These axioms govern how Claude (and any AI agent) should work on this codebase. They encode the project's philosophy, constraints, and voice into actionable rules.

---

## 0. First Principles (The Physics of This Blog)

### The Corrected Definition

**A blog is a deliberate signal emitted by a specific mind into a noisy, competitive network.**

Corollaries:
- Publishing is not archiving; it is transmission
- Transmission implies competition for attention
- Competition implies framing, filtering, and prioritization
- Failure to frame is not humility—it is delegation to entropy

This definition reconciles:
- Memory (internal value)
- Signal (external value)
- Taste (human trust)
- Structure (machine trust)

Everything else flows from this.

---

## I. Signal Axioms

### Axiom 1: Signal > Storage
**The blog must optimize for meaning transfer, not idea accumulation.**

If the author does not decide what matters most, the network will decide for them—poorly.

### Axiom 2: The Homepage Is a Context Filter
**The homepage is not a lobby, a feed, or a welcome mat. It is a filter.**

It answers one question: "Can I trust this person's filter of the world?"

This requires curation, not chronology.

### Axiom 3: Taste Is the Primary Trust Primitive
**In an era of AI abundance, taste is the differentiator.**

- Competence is assumed
- Structure is table stakes
- Taste is visible through: what is foregrounded, what is omitted, how strongly a worldview is stated, how clearly priorities are ranked

A list with no prioritization is not neutral; it is weak taste.

### Axiom 4: Reduce Cognitive Load Before Asking for Depth
**Humans will not parse your archive to understand you.**

The site must:
- Collapse worldview early
- Reduce choice anxiety
- Provide a clear "start here"

This is not marketing—it is cognitive empathy.

### Axiom 5: Humans and Machines Are Orthogonal Audiences
**Do not trade one for the other.**

- Machines require: semantic HTML, llms.txt, summaries, stable structure
- Humans require: vibe, framing, aesthetic cohesion, effort signals

Engineering exists so these can coexist.

### Axiom 6: Quiet Without Leverage Is Invisibility
**Minimalism only works when reputation does the signaling.**

If reputation ≠ known:
- Silence reads as absence
- Restraint reads as underinvestment
- Brutalism reads as affectation

The site must earn quiet over time.

---

## II. Build Axioms

### Axiom 7: Simplicity Over Sophistication
**The minimum viable abstraction is always preferred.**

- If a solution requires more than one new file, justify why.
- If a pattern requires explanation, it's probably too complex.
- Three similar lines of code beat a premature abstraction.
- YAGNI is law: build for today's pain, not tomorrow's hypothetical.

### Axiom 8: The Output Is Sacred
**The final build is pure HTML + CSS + fonts + images.**

- No client-side JavaScript by default.
- Any JS must be: under 2KB, progressive enhancement only, with explicit justification in a code comment.
- Zero runtime dependencies in `/dist`.
- If the browser's View Source shows framework noise, we've failed.

### Axiom 9: Types Are Documentation
**TypeScript isn't overhead; it's the spec.**

- All content structures are typed.
- Build-time errors > runtime surprises.
- `strict: true` is non-negotiable.
- If you're tempted to use `any`, step back and design the type.

### Axiom 10: Fail Fast, Fail Loud
**Validation happens at build time, not at runtime.**

- Invalid frontmatter fails the build with a clear error message.
- Missing required fields are build errors, not silent defaults.
- Prefer crashes with context over silent fallbacks.

---

## III. Architecture Axioms

### Axiom 11: Four Steps Only
**The build pipeline is: `collect → validate → parse → render`**

```
content/*.md → validate frontmatter → parse markdown → render HTML → write to dist/
```

- No plugin architecture unless we hit documented pain.
- No "just in case" transformers.
- Extensions require explicit justification in SPEC.md first.

### Axiom 12: Single Source of Truth
**Every design token, string, and config value is defined once.**

- Colors: `styles/tokens.css`
- Typography: `styles/tokens.css`
- UI strings: `src/strings.ts`
- Site config: `src/config.ts`
- Content schema: `src/types.ts`

### Axiom 13: The File System Is the Database
**Content lives in `/content` as markdown files. Period.**

- No SQLite, no JSON blobs, no external CMS.
- The directory structure *is* the sitemap.
- Sorting by filename date prefix is the canonical ordering.

---

## IV. Voice Axioms

### Axiom 14: No Fake Authority
**If uncertain, say so. "I'm not sure" is better than false confidence.**

- End with questions, not conclusions.
- Admit constraints: time, sleep, skill gaps.
- Never write "In this post, we will explore..."

### Axiom 15: Specific Beats Abstract
**Concrete details over vague assertions.**

- Name the tool, version, and date.
- Show the code, not just the concept.
- "I used Bun 1.x" beats "I used a modern runtime."

### Axiom 16: Warm Minimalism
**Short sentences are fine. White space is part of the voice.**

- Microcopy is direct: "Posts" not "Insights", "Read" not "Discover."
- Empty states are calm: "Nothing here yet. That's allowed."
- No marketing voice, no engagement hacks, no superlatives.

### Axiom 17: The Atelier Vibe
**The site should feel like a workshop, not a storefront.**

- Digital atelier: precise craft, warm light, work-in-progress.
- Technical depth meets artistic sensibility.
- The reader is a guest in the workshop, not a customer.

---

## V. Design Axioms

### Axiom 18: Visual Restraint
**Generous white space, warm neutrals, one accent color.**

- Paper background (`oklch(0.97 0.01 90)`)
- Muted rose accent (`oklch(0.58 0.10 350)`)
- Typography scale: Inter body, Fraunces headings, JetBrains Mono code.
- Soft corners (`border-radius: 4-8px`), never stark boxes.

### Axiom 19: Mobile First, Desktop Complete
**Design for mobile, enhance for larger screens.**

- Content max-width: 65ch prose.
- No horizontal scroll. Ever.
- Touch targets: minimum 44x44px.

**Breakpoints (min-width, mobile-first):**
- `640px` — Navigation switches from hamburger to inline
- `768px` — Two-column layouts (homepage modules)

**CSS-First Responsive:**
- Prefer CSS-only solutions over JavaScript (e.g., checkbox hack for hamburger menu)
- Use `clamp()` for fluid typography instead of breakpoint jumps
- Flexbox/Grid with `auto-fit`/`auto-fill` for natural reflow

**Navigation Pattern:**
- Mobile: CSS-only hamburger menu (checkbox + label hack)
- Desktop: Inline horizontal nav
- No JavaScript required for menu toggle

### Axiom 20: Performance Is UX
**Every byte matters.**

- Target: <100KB HTML+CSS per page (excluding images).
- Self-hosted fonts, subset for Latin characters.
- Images: WebP/AVIF with explicit dimensions.
- Lighthouse: 95+ across all metrics.

---

## VI. Content Axioms

### Axiom 21: Content Types Are Fixed
**Posts, Notes, Photos, Pages. That's it.**

| Type | Purpose | Length |
|------|---------|--------|
| Post | Deep dives, original thinking | 1500-3000 words |
| Note | Quick observations, one sharp point | 200-500 words |
| Photo | Image with minimal context | Caption only |
| Page | Static (About, Soul, Skills, Colophon) | Variable |

### Axiom 22: Frontmatter Is Schema
**Every content file has validated YAML frontmatter.**

Required fields:
- `title`: string
- `date`: YYYY-MM-DD
- `type`: post | note | photo | page
- `schemaVersion`: 1

Posts also require:
- `description`: string (150 chars max)
- `tags`: string[] (1-5 tags)

### Axiom 23: URLs Are Permanent
**Once published, a URL never changes.**

- Posts: `/posts/{slug}/`
- Notes: `/notes/{slug}/`
- Photos: `/photos/{slug}/`
- Pages: `/{slug}/`

Slugs are lowercase, hyphen-separated, derived from filename (minus date prefix).

---

## VII. Ethics Axioms

### Axiom 24: Respect the Reader
**No dark patterns. No surveillance. No engagement tricks.**

- No tracking pixels, no analytics (Cloudflare basic only, maybe).
- No cookie banners (because no cookies that need consent).
- No popups, no modals, no "subscribe to my newsletter" interrupts.
- No infinite scroll, no autoplay, no notification requests.

### Axiom 25: Transparent AI Use
**If AI helped, be honest about it without making it the point.**

- "I asked an agent to draft the first pass; I kept the bones and rewrote the voice."
- The `llms.txt` file exists for AI discovery, not marketing.
- Never anthropomorphize AI as a co-author.

### Axiom 26: No SEO Theater
**Write for humans, not search engines.**

- No keyword stuffing.
- No "In this comprehensive guide, we will..."
- Headlines should be descriptive, not clickbait.
- If AI can extract your meaning accurately, humans probably can too.

---

## VIII. Deployment Axioms

### Axiom 27: Static Is Forever
**The entire site can be served from a CDN with no compute.**

- Cloudflare Pages deployment.
- No edge functions required (though available if needed later).
- Build is deterministic: same input → same output, every time.

### Axiom 28: Domain Consolidation
**Primary: `bristanback.com`. All others redirect.**

- `www.bristanback.com` → 301 → `bristanback.com`
- `brianstanback.com` → 301 → `bristanback.com`
- `briannastanback.com` → 301 → `bristanback.com`
- Subdomains (e.g., `john.bristanback.com`) are left alone.

---

## IX. Working With This Codebase

### For Claude: How to Approach Changes

1. **Read before writing.** Always understand existing code before modifying.
2. **Edit over create.** Prefer editing existing files over creating new ones.
3. **Minimal diff.** Change only what's necessary for the task.
4. **No drive-by improvements.** Don't refactor, add comments, or "clean up" code that isn't part of the request.
5. **Test the build.** Run `bun run build` after changes to verify.

### For Claude: Git Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, no code change
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tooling

**Scope** (optional): `spec`, `design`, `build`, `content`, etc.

### For Claude: Voice Lint Rules

When writing or reviewing content:
- ❌ "In this article, we will explore..."
- ❌ "Let's dive in!"
- ❌ "Comprehensive guide to..."
- ✅ First person, direct, specific
- ✅ Questions at the end
- ✅ Admit uncertainty

### For Claude: When to Push Back

If asked to:
- Add client-side JS without justification → ask why
- Create a new abstraction for one use case → suggest inline first
- Add a dependency → verify it's truly necessary
- Write SEO-optimized content → clarify that's against project values

---

## Companion Documents

- **SPEC.md** — Technical specification, content model, design system details
- **THESIS.md** — Homepage thesis block (single source of truth)
- **VOICE.md** — Tone palette, microcopy guide, signature devices
- **content/pages/soul.md** — Identity manifesto, values statement

---

*Last updated: 2026-02-04*
