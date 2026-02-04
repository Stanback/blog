/**
 * Atelier Mark Glyph System
 *
 * SVG components for the logo mark used as typographic devices.
 * All glyphs use CSS custom properties for theming:
 *   --logo-ink: Primary stroke color (defaults to currentColor)
 *   --logo-accent: Accent color (defaults to #C45A8A)
 *
 * Glyph inventory:
 *   G0 - Full Mark: Complete logo (rare, ≤1 per page above fold)
 *   G1 - Corner Anchor: Single L-corner (common)
 *   G2 - Woven Thread: Inner offset line at 45% opacity (subtle)
 *   G3 - Accent Thread: Short rose segment (state indicator only)
 */

// G0 — Full Mark (32×32)
// Use cases: header lockup, favicon, footer signature, thesis hero
export const glyphMarkFull = `<svg class="glyph glyph-mark" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M 6 16 V 6 H 16 M 26 18 V 26 H 18" stroke="var(--logo-ink, currentColor)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 8 14 V 8 H 14" stroke="var(--logo-ink, currentColor)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.45"/>
  <path d="M 12 8 H 14" stroke="var(--logo-accent, #C45A8A)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// G0 — Full Mark (48×48, scaled 1.5x for hero)
export const glyphMarkFullLarge = `<svg class="glyph glyph-mark glyph-mark--large" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M 9 24 V 9 H 24 M 39 27 V 39 H 27" stroke="var(--logo-ink, currentColor)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 12 21 V 12 H 21" stroke="var(--logo-ink, currentColor)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.45"/>
  <path d="M 18 12 H 21" stroke="var(--logo-accent, #C45A8A)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// G1 — Corner Anchor, Top-Left
// Use cases: blockquotes, callouts, module headers, image captions
export const glyphCornerTL = `<svg class="glyph glyph-corner glyph-corner--tl" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M 3 13 V 3 H 13" stroke="var(--logo-ink, currentColor)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// G1 — Corner Anchor, Bottom-Right
export const glyphCornerBR = `<svg class="glyph glyph-corner glyph-corner--br" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M 13 3 V 13 H 3" stroke="var(--logo-ink, currentColor)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// G2 — Woven Thread
// Use cases: section breaks, list separators
export const glyphThread = `<svg class="glyph glyph-thread" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M 2 10 V 2 H 10" stroke="var(--logo-ink, currentColor)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.45"/>
</svg>`;

// G3 — Accent Thread (horizontal dash)
// Use cases: active nav indicator, hover states, selected items
// Rule: Exactly one per component, never mirrored
export const glyphAccentDash = `<svg class="glyph glyph-accent" viewBox="0 0 10 4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M 2 2 H 8" stroke="var(--logo-accent, #C45A8A)" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// G3 — Accent Thread (vertical dash variant)
export const glyphAccentDashVertical = `<svg class="glyph glyph-accent glyph-accent--vertical" viewBox="0 0 4 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M 2 2 V 8" stroke="var(--logo-accent, #C45A8A)" stroke-width="2" stroke-linecap="round"/>
</svg>`;
