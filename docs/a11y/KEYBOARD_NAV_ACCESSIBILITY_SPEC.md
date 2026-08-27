# Keyboard Navigation & Assistive Accessibility Specification

Guidelines ensuring full keyboard operability and screen-reader accessibility across portfolio navigation elements.

## 1. Focus Management

- **Skip to Content Link:** First interactive element in the DOM tree, visible on tab focus to allow users to bypass navigation.
- **Focus Rings:** High-visibility cyan ring (`outline: 2px solid #00E5FF; outline-offset: 3px`) on all `:focus-visible` elements.
- **Modal Focus Traps:** Interactive project detail dialogs trap focus and restore previous focus position on `Escape`.

## 2. ARIA Semantics

- Project showcase carousels use `role="region"` with `aria-roledescription="carousel"`.
- External project links explicitly announce target window behavior (`aria-label="Open project demo (opens in new tab)"`).

