---
name: asagiri-design
description: Work with the Asagiri (朝霧) CSS framework — token-driven, classless-first SCSS library with MD3-inspired components and built-in light/dark theming. Use this skill when generating HTML/CSS that should match Asagiri's visual system, or when editing the framework itself.
user-invocable: true
---

# Asagiri Design System

Token-driven, classless-first CSS framework for bilingual (Japanese / English)
web interfaces. This manifest is for AI coding assistants generating code
against the framework.

Read [`docs/design-system/README.md`](docs/design-system/README.md) first for
the full written reference (tokens, components, voice). Then look at the files
below as needed.

## Key files

| Purpose | Path |
| --- | --- |
| Design-token source of truth | `scss/Tokens/_Color.scss`, `scss/Tokens/_Elevation-tokens.scss`, `scss/Utility/_Item.scss` |
| Pure-CSS token build (consume without Sass) | `css/tokens.css` — regenerate with `npm run build:tokens` |
| Full compiled stylesheet | `css/main.css` / `css/main.min.css` (via `npm run build` / `build:compressed`) |
| Typography | `scss/_Typography.scss` |
| Button styles | `scss/_Button.scss` |
| Component styles | `scss/Components/*.scss` |
| Interactive live catalogue | `showcase.html` at repo root |
| Written design reference | `docs/design-system/README.md` |
| Visual design specimens (26 cards) | `docs/design-system/index.html` + `docs/design-system/preview/*.html` |
| Developer guides | `docs/guides/` |
| Component pages | `docs/components/` |

## Non-negotiables

- **Never hardcode hex colors** for standard palette colors (brand, semantic,
  text, surface, border). Always reference a token — `var(--color-primary)`,
  `var(--color-text-secondary)`, `var(--color-border-subtle)`, etc. Hex is
  acceptable only for tokens defined in `_Color.scss` itself and for a handful
  of brand-accent colors (`--color-hotpink`, `--color-accent-light`).
- **Never add a component-level `[data-theme="dark"]` override** for color.
  Dark mode remaps happen centrally in `_Color.scss` via `@mixin dark-theme-tokens`.
  Components consume semantic tokens; they already adapt.
- **No emoji** in UI copy. Use Unicode separators (`/`, `×`, `…`) only as
  non-decorative punctuation.
- **Icons** — inline SVG only, `stroke="currentColor"`, `stroke-width: 2`,
  rounded caps and joins. Recommended set: **Lucide** (`unpkg.com/lucide@latest`).
  No icon fonts.
- **Headings** — `font-weight: 500` with negative `letter-spacing`. Not bold.
- **Buttons** — `display: inline-flex` with `align-items: center; justify-content: center;`,
  `line-height: 1.2`, translate `-1px` on hover, return on active. Always
  respect `prefers-reduced-motion`.
- **Palette families** — stick to the 8-family semantic palette:
  `primary`, `secondary`, `accent`, `success`, `warning`, `danger`, `info`,
  `elegant`. Don't invent new color names.

## Quick token map

| What you want | Token |
| --- | --- |
| Page background | `--color-bg` |
| Card / sheet | `--color-surface` |
| Body text | `--color-text-primary` |
| Helper text | `--color-text-secondary` |
| Captions / tags | `--color-text-tertiary` |
| Brand color | `--color-primary` |
| On a brand surface | `--color-text-on-brand` / `--color-on-primary` |
| Callout bg (light tint) | `--color-info-bg` / `--color-success-bg` / `--color-warning-bg` / `--color-danger-bg` |
| Subtle border | `--color-border-subtle` / `--color-border` / `--color-border-strong` |
| Standard corner radius | `--radius-sm` (4px) · `--radius-md` (8px) · `--radius-lg` (12px) · `--radius-full` (9999px) |
| Pill button radius | `--border-radius-all` (3rem) |
| Card shadow | `--elevation-1` through `--elevation-5` |
| Transition timing | `var(--motion-duration-short) var(--motion-ease-standard)` |
| Interactive hover overlay | `color-mix(in srgb, var(--color-primary) var(--state-hover), transparent)` |

## Component-height tokens

Buttons, inputs, and similar interactive elements use:

- `--global-component-height` = `2.45rem` (default)
- `--global-component-line-height` = legacy; button base uses flex centering with `line-height: 1.2`
- `--border-radius-all` = `3rem` (pill default)

## When generating visual artifacts (standalone HTML mocks, slides, prototypes)

Import `css/tokens.css` at the top of the artifact and reference
`var(--color-*)` throughout. The `docs/design-system/preview/_base.css`
file is a working example — it gives every specimen a token-driven base
stylesheet with a single `@import "../../../css/tokens.css"`.

## When working on the framework itself

- Token changes go in `scss/Tokens/_Color.scss` (or `_Elevation-tokens.scss`
  for elevation, `Utility/_Item.scss` for component-height globals).
- Components MUST consume tokens via `var(--color-*)`.
- After editing SCSS, rebuild: `npm run build && npm run build:compressed && npm run build:tokens`.
- Before PR: verify `showcase.html` and `docs/design-system/index.html`
  render correctly in both light and dark themes.

## Links

- Upstream: <https://github.com/BoxPistols/asagiri>
- Live showcase: `showcase.html` in repo root
- Design-system reference: `docs/design-system/README.md`
