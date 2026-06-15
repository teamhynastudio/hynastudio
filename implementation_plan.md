# Performance Optimization Plan

## Goal Description
Improve the page performance to eliminate occasional UI lag caused by heavy CSS animations and backdrop-filter effects, while preserving the premium glassmorphic design.

## User Review Required
> [!IMPORTANT]
> The proposed changes will reduce blur intensity and add a `prefers-reduced-motion` media query to disable intensive animations on low‑performance devices. Please confirm if this trade‑off is acceptable.

## Open Questions
> [!WARNING]
> - Do you want to keep the current blur values (`blur(24px)` for the navbar and `blur(25px)` for cards) or lower them?
> - Should we add a manual toggle button to enable/disable the water‑blob animations?

## Proposed Changes
---
### CSS Adjustments
- Add a `@media (prefers-reduced-motion: reduce)` block that:
  - Sets `animation: none` for `.water-blob-1` and `.water-blob-2`.
  - Reduces `backdrop-filter` blur values to `12px` for the navbar and cards.
- Introduce `.animation-disabled` class that can be toggled via JavaScript to turn off animations.
- Add `will‑change: transform` to the water‑blob elements to help the browser optimise.

### JavaScript (inline script)
- Detect `prefers-reduced-motion` and automatically add the `.animation-disabled` class to `<body>` when appropriate.
- Insert a button in the navigation bar:
  ```html
  <button id="animationToggle" class="nav-cta">Animations</button>
  ```
- Script toggles the `.animation-disabled` class on the `<body>` and updates button text accordingly.

### HTML
- Add the toggle button inside the `<nav>` after the CTA link.

## Verification Plan
### Automated Tests
- Run Lighthouse performance audit locally and verify the **Performance** score improves (target > 95).
- Measure frame rate before and after changes using `console.time` and `requestAnimationFrame` logs.

### Manual Verification
- Visually confirm the glassmorphic look remains premium.
- Test the toggle button works and respects system reduced‑motion settings.
- Verify on a low‑spec device (or using Chrome dev tools throttling) that lag disappears.
