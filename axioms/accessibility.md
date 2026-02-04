# Accessibility Axiom

> Accessibility is not a feature—it is a constraint that improves everything.

## WCAG 2.1 AA Compliance (Required)

### Perceivable

- [ ] **Alt text**: Every `<img>` has meaningful `alt` (or `alt=""` for decorative)
- [ ] **Color contrast**: 4.5:1 minimum for body text, 3:1 for large text
- [ ] **No color-only info**: Never convey meaning through color alone
- [ ] **Resizable text**: Works at 200% zoom without horizontal scroll
- [ ] **Captions**: Video content has captions (when applicable)

### Operable

- [ ] **Keyboard navigation**: All interactive elements reachable via Tab
- [ ] **Focus visible**: Clear focus indicators (never `outline: none` without replacement)
- [ ] **Skip links**: "Skip to main content" link as first focusable element
- [ ] **Touch targets**: Minimum 44×44px for all interactive elements
- [ ] **No keyboard traps**: User can always Tab away from any element

### Understandable

- [ ] **Language**: `<html lang="en">` declared
- [ ] **Consistent navigation**: Same nav structure across pages
- [ ] **Error identification**: Form errors clearly labeled and associated
- [ ] **Labels**: All inputs have associated `<label>` elements

### Robust

- [ ] **Valid HTML**: Passes W3C validator (or close)
- [ ] **ARIA when needed**: Use semantic HTML first; ARIA for complex widgets
- [ ] **Landmark regions**: `<header>`, `<main>`, `<footer>`, `<nav>` used correctly

## HTML Patterns

### Skip Link (Required)
```html
<a href="#main" class="skip-link">Skip to main content</a>
<!-- ... header/nav ... -->
<main id="main">
```

### Images
```html
<!-- Informative image -->
<img src="chart.png" alt="Bar chart showing 40% growth in Q4">

<!-- Decorative image -->
<img src="flourish.svg" alt="" role="presentation">
```

### Buttons vs Links
```html
<!-- Link: navigates somewhere -->
<a href="/about/">About</a>

<!-- Button: performs action -->
<button type="button" onclick="toggleMenu()">Menu</button>
```

### Focus Styles
```css
/* Never do this alone */
:focus { outline: none; }

/* Always provide alternative */
:focus-visible {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
}
```

## Testing Checklist

1. **Keyboard only**: Navigate entire site without mouse
2. **Screen reader**: Test with VoiceOver (Mac) or NVDA (Windows)
3. **Zoom**: Test at 200% browser zoom
4. **Color blind**: Use simulator to check contrast
5. **Reduced motion**: Respect `prefers-reduced-motion`

## Motion & Animation

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

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Axe DevTools](https://www.deque.com/axe/devtools/)
