# TODO - Performance Optimization (Hyna Studio)

- [x] 1) Update `index.html`:
  - [ ] Add `@media (prefers-reduced-motion: reduce)` to disable intensive animations (water blobs + other continuous decorative layers as needed)
  - [ ] Reduce `backdrop-filter` blur intensity for nav/cards (e.g., 24px -> 12px)
  - [ ] Add `.animation-disabled` class rules to stop animations
  - [ ] Add `will-change: transform` for blob elements (if not already)
  - [ ] Add nav toggle button: `#animationToggle`
  - [ ] Add JS: read prefers-reduced-motion, toggle body class, update button label

- [ ] 2) Mirror the same changes in `zypher_ai.html`.

- [ ] 3) Quick manual verification steps:
  - [ ] Load both pages and confirm default look
  - [ ] Toggle animations button
  - [ ] OS-level reduced motion should disable animations by default
  - [ ] Lighthouse run (optional)

