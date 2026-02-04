/**
 * Atelier Mark Glyph System
 *
 * SVG components for the logo mark used as typographic devices.
 * All glyphs use CSS custom properties for theming:
 *   --logo-ink: Primary stroke color (defaults to currentColor)
 *   --logo-accent: Accent color (defaults to #9d6b6b)
 *
 * The logo is a weighted viewfinder with two corners:
 *   - Top-left: heavy anchor (primary)
 *   - Bottom-right: delicate whisper with rose accent
 *
 * Glyph inventory:
 *   G0 - Full Mark: Two-corner weighted viewfinder (the logo)
 *   G1 - Corner Anchor: Single L-corner for modules/decoration
 *   G3 - Accent Dash: Short rose segment for list items
 */

// G0 — Full Mark (32×32) - Two-corner weighted viewfinder
// TL: heavy anchor, BR: delicate whisper with warm dusty rose accent
// Use cases: header lockup, favicon, thesis decoration
export const glyphMarkFull = `<svg class="glyph glyph-mark" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- TL anchor -->
  <path d="M 6 6 V 18" stroke="var(--logo-ink, currentColor)" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M 6 6 H 18" stroke="var(--logo-ink, currentColor)" stroke-width="2.5" stroke-linecap="round"/>
  <!-- BR whisper - warm dusty rose -->
  <path d="M 26 26 V 19" stroke="var(--logo-accent, #b8968a)" stroke-width="2" stroke-linecap="round"/>
  <path d="M 26 26 H 19" stroke="var(--logo-accent, #b8968a)" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// G0 — Full Mark (48×48, scaled for larger contexts)
// Used in thesis/hero sections
export const glyphMarkFullLarge = `<svg class="glyph glyph-mark glyph-mark--large" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- TL anchor -->
  <path d="M 8 8 V 28" stroke="var(--logo-ink, currentColor)" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M 8 8 H 28" stroke="var(--logo-ink, currentColor)" stroke-width="3.5" stroke-linecap="round"/>
  <!-- BR whisper - warm dusty rose -->
  <path d="M 40 40 V 28" stroke="var(--logo-accent, #b8968a)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 40 40 H 28" stroke="var(--logo-accent, #b8968a)" stroke-width="2.5" stroke-linecap="round"/>
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
// The warm dusty rose accent dash used before featured post titles
export const glyphAccentDash = `<svg class="glyph glyph-accent" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M 1 2 H 11" stroke="var(--logo-accent, #b8968a)" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// Theme toggle icons
export const iconSun = `<svg class="icon icon-sun" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="10" cy="10" r="4" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

export const iconMoon = `<svg class="icon icon-moon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M17.5 10.5a7.5 7.5 0 01-10-10 7.5 7.5 0 1010 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
