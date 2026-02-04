/**
 * Atelier Mark Glyph System
 *
 * SVG components for the logo mark used as typographic devices.
 * All glyphs use CSS custom properties for theming:
 *   --logo-ink: Primary stroke color (defaults to currentColor)
 *   --logo-accent: Accent color (defaults to #C45A8A)
 *
 * The logo is a simple corner bracket (two L-strokes) in the top-left.
 * Used as a decorative element to frame content.
 *
 * Glyph inventory:
 *   G0 - Corner Mark: Simple L-bracket (the logo)
 *   G1 - Corner Anchor: Single L-corner for decoration
 *   G3 - Accent Dash: Short rose segment for list items
 */

// G0 — Corner Mark (32×32) - The simplified logo
// Just two strokes forming an L in the top-left corner
// Use cases: header lockup, favicon, thesis decoration
export const glyphMarkFull = `<svg class="glyph glyph-mark" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M 6 6 V 20" stroke="var(--logo-ink, currentColor)" stroke-width="3" stroke-linecap="round"/>
  <path d="M 6 6 H 20" stroke="var(--logo-ink, currentColor)" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// G0 — Corner Mark (48×48, scaled for larger contexts)
// Used in thesis/hero sections
export const glyphMarkFullLarge = `<svg class="glyph glyph-mark glyph-mark--large" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M 8 8 V 32" stroke="var(--logo-ink, currentColor)" stroke-width="4" stroke-linecap="round"/>
  <path d="M 8 8 H 32" stroke="var(--logo-ink, currentColor)" stroke-width="3" stroke-linecap="round"/>
</svg>`;

// G1 — Corner Anchor, Top-Left (smaller, for modules)
// Use cases: blockquotes, callouts, module headers, image captions
export const glyphCornerTL = `<svg class="glyph glyph-corner glyph-corner--tl" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M 3 3 V 17" stroke="var(--logo-ink, currentColor)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 3 3 H 17" stroke="var(--logo-ink, currentColor)" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// G1 — Corner Anchor, Bottom-Right (for framing)
export const glyphCornerBR = `<svg class="glyph glyph-corner glyph-corner--br" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M 17 17 V 3" stroke="var(--logo-ink, currentColor)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 17 17 H 3" stroke="var(--logo-ink, currentColor)" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// G3 — Accent Dash (horizontal, for list items)
// The rose accent dash used before featured post titles
export const glyphAccentDash = `<svg class="glyph glyph-accent" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M 1 2 H 11" stroke="var(--logo-accent, #C45A8A)" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// Theme toggle icons
export const iconSun = `<svg class="icon icon-sun" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="10" cy="10" r="4" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

export const iconMoon = `<svg class="icon icon-moon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M17.5 10.5a7.5 7.5 0 01-10-10 7.5 7.5 0 1010 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
