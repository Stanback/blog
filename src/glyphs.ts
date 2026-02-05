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

// ═══════════════════════════════════════════════════════════════════════════
// Bespoke Editorial Icons — Thin, elegant, Parisian
// ═══════════════════════════════════════════════════════════════════════════

// Thin arrow → for navigation links
export const iconArrowRight = `<svg class="icon icon-arrow" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Thin arrow ← for back navigation
export const iconArrowLeft = `<svg class="icon icon-arrow" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Elegant flourish divider — delicate center ornament
export const glyphFlourish = `<svg class="glyph glyph-flourish" viewBox="0 0 80 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M0 4h30" stroke="var(--logo-ink, currentColor)" stroke-width="1" stroke-linecap="round" opacity="0.3"/>
  <circle cx="40" cy="4" r="2" fill="var(--logo-accent, #b8968a)"/>
  <path d="M50 4h30" stroke="var(--logo-ink, currentColor)" stroke-width="1" stroke-linecap="round" opacity="0.3"/>
</svg>`;

// Elegant thin bookmark/pin
export const iconBookmark = `<svg class="icon icon-bookmark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M4 2h8v12l-4-3-4 3V2z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// External link indicator — thin and subtle
export const iconExternal = `<svg class="icon icon-external" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Thin pen/writing icon
export const iconPen = `<svg class="icon icon-pen" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M11.5 2.5l2 2-8 8H3.5v-2l8-8z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Calendar/date icon
export const iconCalendar = `<svg class="icon icon-calendar" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.25"/>
  <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
</svg>`;

// Clock/reading time icon
export const iconClock = `<svg class="icon icon-clock" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.25"/>
  <path d="M8 4v4l2.5 1.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Tag icon
export const iconTag = `<svg class="icon icon-tag" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M2 2h5.5L14 8.5l-5.5 5.5L2 7.5V2z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="5" cy="5" r="1" fill="currentColor"/>
</svg>`;
