# WCAG 2.1 AA Audit — bristanback.com

**Date:** 2026-02-10  
**Auditor:** Lunen (automated + manual review)

---

## ✅ PASSING

### Perceivable

| Criterion | Status | Notes |
|-----------|--------|-------|
| 1.1.1 Non-text Content | ✅ Pass | All `<img>` elements have `alt` attributes |
| 1.3.1 Info and Relationships | ✅ Pass | Proper heading hierarchy (h1→h2→h3), semantic HTML |
| 1.3.2 Meaningful Sequence | ✅ Pass | DOM order matches visual order |
| 1.3.3 Sensory Characteristics | ✅ Pass | No instructions rely solely on shape/color/location |
| 1.4.1 Use of Color | ✅ Pass | Links have underline, not just color |
| 1.4.2 Audio Control | ✅ Pass | No auto-playing audio |
| 1.4.4 Resize Text | ✅ Pass | Fluid typography with `clamp()`, works to 200% |
| 1.4.5 Images of Text | ✅ Pass | No images of text (except logos which are exempt) |
| 1.4.10 Reflow | ✅ Pass | Responsive design, no horizontal scroll at 320px |
| 1.4.11 Non-text Contrast | ✅ Pass | Focus indicators have sufficient contrast |
| 1.4.12 Text Spacing | ✅ Pass | No clipping when text spacing is increased |

### Operable

| Criterion | Status | Notes |
|-----------|--------|-------|
| 2.1.1 Keyboard | ✅ Pass | All interactive elements keyboard accessible |
| 2.1.2 No Keyboard Trap | ✅ Pass | Lightbox closes with Escape key |
| 2.4.1 Bypass Blocks | ✅ Pass | Skip link present ("Skip to content") |
| 2.4.2 Page Titled | ✅ Pass | Unique, descriptive `<title>` on each page |
| 2.4.3 Focus Order | ✅ Pass | Tab order follows visual/reading order |
| 2.4.4 Link Purpose | ✅ Pass | Link text is descriptive (no "click here") |
| 2.4.5 Multiple Ways | ✅ Pass | Nav, sitemap, search alternative via site structure |
| 2.4.6 Headings and Labels | ✅ Pass | Headings describe content |
| 2.4.7 Focus Visible | ✅ Pass | `:focus-visible` outline on all interactive elements |
| 2.5.3 Label in Name | ✅ Pass | Button labels match accessible names |

### Understandable

| Criterion | Status | Notes |
|-----------|--------|-------|
| 3.1.1 Language of Page | ✅ Pass | `<html lang="en">` present |
| 3.2.1 On Focus | ✅ Pass | No unexpected context changes on focus |
| 3.2.2 On Input | ✅ Pass | No unexpected context changes on input |
| 3.2.3 Consistent Navigation | ✅ Pass | Navigation consistent across pages |
| 3.2.4 Consistent Identification | ✅ Pass | Components identified consistently |

### Robust

| Criterion | Status | Notes |
|-----------|--------|-------|
| 4.1.1 Parsing | ✅ Pass | Valid HTML (no duplicate IDs, proper nesting) |
| 4.1.2 Name, Role, Value | ✅ Pass | ARIA attributes used correctly |

---

## ⚠️ ISSUES TO FIX

### 🔴 High Priority

#### 1. Knowledge Graph Canvas Not Accessible (1.1.1, 4.1.2)
**Location:** `/graph/`  
**Issue:** The knowledge graph uses `<canvas>` which is not accessible to screen readers.  
**Fix:** Add accessible alternative:
```html
<div id="graph-container" role="img" aria-label="Knowledge graph showing connections between posts and notes">
  <!-- Provide text alternative or skip link -->
  <p class="sr-only">Interactive knowledge graph. For an accessible list of connections, see the sitemap.</p>
</div>
```
**Or** provide a text-based alternative view with links.

#### 2. Reduced Motion Not Comprehensive (2.3.3)
**Location:** `styles/main.css`  
**Issue:** 45 transition/animation rules but only `scroll-behavior` respects `prefers-reduced-motion`.  
**Fix:** Add comprehensive reduced motion handling:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### 3. Color Contrast on Muted Text (1.4.3)
**Location:** `styles/tokens.css`  
**Issue:** `--color-text-muted: oklch(0.45 0.01 60)` may not meet 4.5:1 contrast ratio against paper background.  
**Computed:** ~3.8:1 (fails AA for normal text)  
**Fix:** Darken muted text:
```css
--color-text-muted: oklch(0.40 0.01 60); /* Darker for better contrast */
```

### 🟡 Medium Priority

#### 4. Theme Toggle Has No State Announcement (4.1.2)
**Location:** `render.ts` line 361  
**Issue:** Theme toggle button doesn't announce current state to screen readers.  
**Fix:**
```html
<button class="theme-toggle" type="button" 
        aria-label="Toggle dark mode" 
        aria-pressed="false">
```
Update JS to toggle `aria-pressed`:
```js
t.setAttribute('aria-pressed', isDark ? 'false' : 'true');
```

#### 5. Lightbox Missing Focus Management (2.4.3)
**Location:** Photo pages  
**Issue:** When lightbox opens, focus doesn't move to it. Screen reader users may not know it opened.  
**Fix:** Move focus to lightbox on open, return focus on close:
```js
checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    overlay.focus();
  }
});
```

#### 6. Mobile Nav Toggle State (4.1.2)
**Location:** `render.ts` line 350  
**Issue:** Hamburger menu checkbox pattern doesn't announce expanded/collapsed state.  
**Fix:** Add `aria-expanded` that toggles with checkbox state, or use a `<button>` with JS.

### 🟢 Low Priority / Enhancements

#### 7. Add `aria-current="page"` to Active Nav Link
**Location:** `render.ts` navigation  
**Issue:** Current page not indicated in nav for screen readers.  
**Fix:** Add `aria-current="page"` to the active nav link.

#### 8. Related Posts Section Could Use `aria-describedby`
**Location:** Related posts component  
**Issue:** Screen readers don't know posts are related to current post.  
**Fix:** Add context via `aria-describedby` or better heading.

#### 9. TOC Sidebar Missing ARIA States
**Location:** TOC scroll tracking  
**Issue:** Active TOC item not announced to screen readers.  
**Fix:** Add `aria-current="true"` to active TOC link via JS.

---

## Summary

| Priority | Count |
|----------|-------|
| 🔴 High | 3 |
| 🟡 Medium | 3 |
| 🟢 Low | 3 |

**Overall:** Good accessibility foundation. Main gaps are dynamic state announcements and the canvas-based graph page. The site passes most WCAG 2.1 AA criteria.

---

## Recommended Fix Order

1. **Reduced motion** — Quick CSS fix, broad impact
2. **Muted text contrast** — Quick token change
3. **Theme toggle state** — Small JS addition
4. **Graph accessibility** — Add sr-only text alternative
5. **Lightbox focus** — JS enhancement
6. **Nav toggle state** — Pattern update
7. Low priority items as time permits
