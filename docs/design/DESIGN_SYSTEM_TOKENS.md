# Portfolio Design System & Color Tokens

Specifications for visual design tokens, typography scale, and color palettes across the personal portfolio of Y. Mohit Sai.

## 1. Minimalist Color Palette

- `--bg-primary`: `#0D0E11` (Deep space canvas background)
- `--bg-secondary`: `#16181D` (Subtle container surface)
- `--text-primary`: `#F4F5F7` (High-legibility primary typography)
- `--text-muted`: `#9A9EA7` (Secondary supporting labels and metadata)
- `--accent-cyan`: `#00E5FF` (Interactive glow and highlight emphasis)

## 2. Fluid Typographic Scaling

Using CSS `clamp()` for responsive fluid typography without abrupt breakpoint jumps:
- Headings: `clamp(2.25rem, 4vw + 1rem, 4.5rem)`
- Subheadings: `clamp(1.25rem, 1.5vw + 0.75rem, 1.875rem)`
- Body copy: `clamp(1rem, 0.5vw + 0.85rem, 1.125rem)`

