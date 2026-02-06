# Blog Constitution Kernel

> Immutable principles for AI agents working on bristanback.com

**Adapted from:** AIOS Engineering Constitution
**Domain:** Editorial static site development
**Status:** Stable (changes require explicit approval)

---

## Axiom 1: Simplicity Over Cleverness

**Immutable Truth:** The simplest solution that works is the correct solution.

**Why This Matters for a Blog:**
- Zero client-side JS by default
- No framework complexity (React, Vue, etc.)
- Build pipeline is: collect → validate → render → write
- If you can do it with CSS, don't use JS

**What This Means:**
- ✅ Static HTML generated at build time
- ✅ CSS custom properties for theming
- ✅ Vanilla progressive enhancement (<2KB budget)
- ❌ Client-side routing
- ❌ State management libraries
- ❌ Build tool complexity (webpack configs)

**Falsification Test:** Show a blog feature that requires client-side framework to implement correctly.

---

## Axiom 2: Accessibility Is Not Optional

**Immutable Truth:** WCAG 2.1 AA compliance is a constraint, not a feature.

**Why This Is Immutable:**
- Accessibility improves design for everyone
- Legal requirements exist
- Exclusion is a failure of craft

**Non-Negotiable Requirements:**
- 4.5:1 contrast ratio (body text)
- 3:1 contrast ratio (large text, UI elements)
- 44×44px touch targets
- Keyboard navigable
- Focus visible
- Alt text on images
- Skip link to main content
- Reduced motion respected

**Enforcement:**
- Every PR that touches UI must verify contrast
- Build should warn on missing alt text
- Manual keyboard test before major releases

---

## Axiom 3: Mobile-First, Always

**Immutable Truth:** Design for mobile first, enhance for desktop.

**Why This Matters:**
- Author primarily views site on mobile
- Forces simplicity
- Prevents desktop-centric assumptions

**Implementation:**
```css
/* Base styles = mobile */
.element { ... }

/* Enhancement for larger screens */
@media (min-width: 640px) { ... }
@media (min-width: 768px) { ... }
```

**Falsification Test:** Show a design that's better when designed desktop-first.

---

## Axiom 4: Content Width Is Sacred

**Immutable Truth:** Body content must align at 720px, consistently.

**Why This Matters:**
- Optimal reading measure (~65 characters)
- Visual consistency across pages
- Predictable layout for readers

**Implementation:**
```css
/* ALWAYS use --content-width */
max-width: var(--content-width);  /* 720px */

/* NEVER use --measure-normal for layout */
/* ch units resolve differently at different font sizes */
```

**Enforcement:**
- All content containers use `--content-width`
- Hero content left edge aligns with article body
- No exceptions without explicit justification

---

## Axiom 5: Design Tokens Are Source of Truth

**Immutable Truth:** All visual values come from `styles/tokens.css`.

**Why This Matters:**
- Single source of truth for design
- Enables consistent theming
- Dark mode via token swapping
- Prevents magic numbers

**Token Categories:**
```css
--color-*       /* Colors (OKLCH) */
--font-*        /* Typography */
--space-*       /* Spacing (4px base) */
--radius-*      /* Border radius */
--shadow-*      /* Box shadows */
```

**Enforcement:**
- No hex/rgb colors in component CSS
- No pixel values for spacing (use --space-*)
- New tokens require Visual Designer approval

---

## Axiom 6: Voice Consistency

**Immutable Truth:** Content voice must be maintained across all writing.

**Voice Characteristics:**
- First person singular ("I", not "we")
- Admits uncertainty openly
- Direct but warm
- No ChatGPT-isms ("In this article...")
- Includes human cost signals (failures, changed beliefs)

**Anti-Patterns:**
- "It's worth noting that..."
- "In this comprehensive guide..."
- "Let's explore..."
- Passive voice when active is possible

**Falsification Test:** Would a careful reader suspect AI wrote this?

---

## Axiom 7: Build Must Be Deterministic

**Immutable Truth:** Same input must produce same output.

**Why This Matters:**
- Reproducible builds
- Debuggable issues
- Cacheable outputs

**Requirements:**
- No random/Date.now() in build without seeding
- Sorted outputs (file lists, etc.)
- Git-tracked configuration only

---

## Axiom 8: Explicit Over Implicit

**Immutable Truth:** Prefer explicit code over clever inference.

**Why This Matters (from Agent Legibility Kernel):**
- LLMs pattern-match over visible tokens
- Implicit logic requires inference (error-prone)
- Future maintainers (including AI) need clarity

**Implementation:**
```typescript
// ✅ Explicit
function renderPost(post: Post): string {
  const title: string = post.title;
  const body: string = markdownToHtml(post.content);
  return `<article><h1>${title}</h1>${body}</article>`;
}

// ❌ Implicit
const render = p => `<article><h1>${p.title}</h1>${md(p.content)}</article>`;
```

---

## Axiom 9: Posts Are Frozen, Notes Are Living

**Immutable Truth:** Content types have different mutability contracts.

| Type | Mutability | Updates Allowed |
|------|------------|-----------------|
| Post | Frozen | Typos, broken links only |
| Note | Living | Full rewrites OK |
| Page | Living | Full rewrites OK |

**Why This Matters:**
- Posts are commitments
- Notes are explorations
- Readers need to trust dated content

**If Thinking Evolves:**
Don't edit the old post. Write a new post linking back.

---

## Team Coordination Rules

When working as an agent team:

1. **Load axioms first** — Every teammate reads relevant axioms
2. **Own separate files** — No two teammates editing same file
3. **Plan before implement** — Complex changes need approval
4. **Test before commit** — `bun run build` must pass
5. **Coordinate tokens** — Design token changes need Visual Designer

---

## Version History

**v1.0 (2026-02-05)**
- Initial constitution adapted from AIOS Engineering Constitution
- Blog-specific axioms for static site context
- Agent team coordination rules added
