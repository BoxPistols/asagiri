# Claude Code guide — Asagiri CSS framework

This file briefs Claude Code on how to work productively inside this repo.
Skim the short rules below; deeper material lives in `docs/design-system/README.md`
and in `SKILL.md` (for AI-assistant consumers of the framework).

## What this project is

Asagiri is a **classless-first, token-driven CSS framework** (SCSS source →
compiled `css/main.css` + `css/main.min.css` + `css/tokens.css`). No React,
no JSX, no component-per-file npm package — pure CSS with MD3-inspired
components consumed via classless defaults or `.btn-*` / `.badge-*` variants.

- Primary consumable paths: `css/main.css`, `css/main.min.css`, `css/tokens.css`
- SCSS source: `scss/main.scss` (+ partials under `scss/Tokens/`, `scss/Components/`, `scss/Utility/`)
- Live component catalogue: `showcase.html` at repo root
- Design-system reference: `docs/design-system/`

## Build

```bash
npm run build            # scss/main.scss → css/main.css (expanded)
npm run build:compressed # → css/main.min.css
npm run build:tokens     # scss/tokens.scss → css/tokens.css (token-only build)
npm run validate         # link + style checks (prepublishOnly runs build + build:compressed + build:tokens)
```

After any SCSS change, always run the three build commands.

## Tokens — the four-layer rule

Every color / spacing / motion / radius value must come from
`scss/Tokens/_Color.scss` or `scss/Tokens/_Elevation-tokens.scss`. The layers are:

1. **Reference (`--ref-*`)** — raw tonal palettes. Never consumed directly.
2. **System (`--color-*`)** — semantic tokens. Light + dark modes remap these.
3. **Component (`--comp-*`)** — optional per-component aliases (in each component's SCSS).
4. **Legacy aliases** — kept for backward compat. Do not use in new code.

Hard rules:

- No hardcoded hex for palette colors anywhere under `scss/` or `docs/`. Use
  `var(--color-primary)`, `var(--color-text-secondary)`, etc.
- No component-level `[data-theme="dark"]` selectors for color. Dark mode
  remaps happen once, inside `@mixin dark-theme-tokens` in `_Color.scss`.
- When applying a semantic background color, always pair it with the matching
  `--color-on-<name>` foreground token: `.my-btn { background: var(--color-success); color: var(--color-on-success); }`.
- Prefer `--color-text-link` over `--color-primary` for brand-colored text
  (link / heading accent). Primary in light mode is medium cyan — white text
  on it fails WCAG AA.

## Components — accessibility non-negotiables

- **Contrast**: text must meet WCAG AA (4.5:1 normal, 3:1 large) in both light
  and dark themes. Verify with `node scripts/audit-light-dark.mjs` (starts a
  local server at :8899, screenshots every page in both themes, reports low-contrast pairs).
- **Button base**: `display: inline-flex; align-items: center; justify-content: center;`
  with `line-height: 1.2`. Do not rely on `line-height` to vertically center
  text — `overflow: hidden` (Ripple support) clips otherwise.
- **Tabs / other `<button>` elements inside components**: reset the
  framework's default button styles (`border-radius: 0; height: auto; margin: 0; letter-spacing: normal;`).
  The classless-first approach applies button styles to bare `<button>`
  globally, which cascades into component-internal buttons.
- **Motion**: respect `@media (prefers-reduced-motion: reduce)` by zeroing
  `--motion-duration-*`. This is handled centrally in `_Color.scss`.
- **Focus**: every interactive element keeps a visible `:focus-visible` ring
  (`outline: 2px solid var(--color-border-focus); outline-offset: 2px`).

## Voice & content rules

- **No emoji** in UI copy, inline SVG, or generated HTML. Unicode separators
  (`/`, `×`, `…`) are fine.
- **Icons** are always inline SVG, `stroke="currentColor"`, `stroke-width: 2`,
  rounded caps/joins. Recommended set: **Lucide** (`unpkg.com/lucide@latest`).
  No icon fonts.
- **Headings** use `font-weight: 500` + negative letter-spacing, never bold.
- **`design-font-en`** is the English display accent (Poppins + `--color-hotpink`),
  used sparingly.

## Visual-quality workflow

1. Edit SCSS.
2. `npm run build && npm run build:compressed && npm run build:tokens`.
3. `(npx serve . -p 8899 &) && sleep 2`.
4. `node scripts/audit-light-dark.mjs` — WCAG AA contrast audit across every
   design-system page, docs guide, and `showcase.html` in both themes.
5. Review `/tmp/asagiri-audit/report.md` — fix any real contrast regressions.
   (Remaining false positives: `h1`/`p` on linear-gradient heros; audit reads
   only solid `backgroundColor`.)
6. Screenshot individual pages with `scripts/capture-after.mjs` when visually
   iterating.

## Commit conventions

Semantic commit subjects (`fix(design-system):`, `feat(docs):`, `chore:`).
Explain *why* in the body. Keep the compiled `css/*.css*` rebuilt before committing.

## Never

- Revert committed work or drop user's in-progress changes without explicit ask.
- Run `npm publish` without explicit approval — version bumps + the release
  itself are user decisions.
- Force-push `main`.
- Add emoji to any file.
- Hardcode hex colors from the 8-family palette; reach for a token.

## Useful references

- Component source of truth: `scss/_Button.scss`, `scss/Components/*.scss`
- Written design doc: `docs/design-system/README.md`
- AI-assistant manifest (for framework *consumers*): `SKILL.md`
- Playwright audit: `scripts/audit-light-dark.mjs`
- Upstream: https://github.com/BoxPistols/asagiri
