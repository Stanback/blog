---
type: axiom
scope: all
layer: design
depends: [pillars]
updated: 2026-02-04
---

# Design System Axiom

> Editorial atelier. Feels like a personal notebook crossed with a Parisian photo book crossed with a well-maintained codebase.

## North Star

**Keywords:** Quiet · Observational · Warm · Precise · Unhurried

Not brutalist. Not bloggy. Not "product page."

## Color System

### Source of Truth
All tokens live in `styles/tokens.css`. Tailwind imports these.

### Light Mode (Paper)
```css
--color-bg-main:        oklch(0.97 0.01 90);   /* paper */
--color-text-primary:   oklch(0.18 0.01 60);   /* ink */
--color-accent-500:     oklch(0.58 0.10 350);  /* rose */
```

### Dark Mode (Night Studio)
Dark mode is NOT inverted light mode. It's a night studio.

```css
--color-bg-main:        oklch(0.14 0.01 260);  /* warm charcoal */
--color-text-primary:   oklch(0.92 0.01 80);   /* warm paper */
--color-accent-500:     oklch(0.62 0.10 350);  /* rose lifts slightly */
```

**Rule:** Accent is slightly brighter in dark mode, never louder.

## Typography

| Role | Font | Use |
|------|------|-----|
| Body + UI | Inter (variable) | Everything |
| Headings | Fraunces (variable) | Adds warmth |
| Code | JetBrains Mono | Monospace |

Self-host fonts from `static/fonts/`.

### Type Scale (Fluid)
```css
--font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
```

### Measure
```css
--measure-normal: 65ch;  /* Body text */
--measure-wide: 80ch;    /* Code blocks */
```

## Spacing

Based on 0.25rem (4px) increments:
```css
--space-1:  0.25rem;   /* 4px */
--space-2:  0.5rem;    /* 8px */
--space-4:  1rem;      /* 16px */
--space-8:  2rem;      /* 32px */
--space-16: 4rem;      /* 64px */
```

## Logo & Glyphs

### The Atelier Mark
Two L-brackets at opposite corners with woven inner thread and rose accent.

### Glyph Inventory

| Glyph | Name | Use | Frequency |
|-------|------|-----|-----------|
| G0 | Full Mark | Header, footer, favicon | Rare (≤1/page) |
| G1 | Corner Anchor | Blockquotes, callouts | Common |
| G2 | Woven Thread | Section breaks | Subtle |
| G3 | Accent Thread | State indicators only | Hover/focus |

### Glyph Rules
- Never repeat full logo in prose
- Accent stroke = meaningful state only (current, selected, hover)
- Glyphs are layout punctuation, not ornament

## Responsive

### Breakpoints
| Name | Width | Purpose |
|------|-------|---------|
| sm | 640px | Nav: hamburger → inline |
| md | 768px | Layout: single → two-column |

### Touch Targets
Minimum 44×44px for all interactive elements.

## Soft Details

- Border radius: `0.5rem` cards, `0.25rem` buttons
- Subtle shadows: `0 1px 3px oklch(0 0 0 / 0.1)`
- No hard borders — use background contrast
- Generous padding
- Hover: subtle color shifts, not dramatic transforms

## Pull Quotes

For surfacing thesis sentences in long essays.

```css
.pull-quote {
  font-family: var(--font-serif);
  font-size: var(--font-size-xl);
  font-style: italic;
  color: var(--color-text-secondary);
  border-left: 3px solid var(--color-accent-500);
  padding-left: var(--space-4);
  margin: var(--space-8) 0;
}
```

**Usage rules:**
- Maximum 1 per long essay
- Use for thesis statements, not decoration
- Should be quotable out of context
- Don't overuse — density is a feature
