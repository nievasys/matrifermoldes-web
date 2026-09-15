# AGENTS.md

Canonical project documentation for MatriFer Moldes. Every agent working in this repository must read and follow the rules below.

## Project

Marketing landing page for MatriFer Moldes, an Argentine plastic injection molding and mold making (matricería) company based in Moreno, Buenos Aires.

- **Stack:** [Astro 7](https://docs.astro.build) (static output) + [Tailwind CSS v4](https://tailwindcss.com) via the `@tailwindcss/vite` plugin.
- **Fonts:** self-hosted via Fontsource: Space Grotesk Variable (display) and Plus Jakarta Sans Variable (body).
- **Icons:** Phosphor (`@phosphor-icons/web/regular`). Never hand-roll SVG icons.
- **Language:** Single language, Spanish (`lang="es-AR"`), informal Argentine register ("voseo").
- **Repo remote:** `git@github.com:nievasys/matrifermoldes-web.git`.

## Commands

Use background mode for the dev server:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Other commands:

- `npm run build` — static build to `dist/` (required before committing, see Contributing).
- `npm run preview` — preview the production build.
- `npm run astro` — Astro CLI (`npm run astro -- --help`).

## Architecture

- Single page: `src/pages/index.astro` composes `src/sections/*.astro` in order: Header, Hero, About, Servicios, WhyUs, News, Contact, Footer.
- Layout in `src/layouts/Layout.astro` (head meta, OG, theme-color, `.js` class marker, reveal-observer script).
- Path alias `@/*` resolves to `src/*`.
- Design tokens live in `src/styles/global.css` (`@theme` block). Assets (images, logo) in `public/`.
- Brand glyph asset: `src/assets/triangulomatrifer.svg`.

## Design system (mandatory)

Do not invent new tokens. Use the existing system:

- **Sole accent color:** matrifer-cyan `#01C1F2`. Used for badges, numbers, hovers, strokes. Max one accent per page (Color Consistency Lock).
- **CTA backgrounds:** gradient `from-matrifer-blue-deep (#2563EB)` → `to-matrifer-indigo (#4426BC)` so white text passes WCAG AA. Never put white text on cyan (fails contrast).
- **Palette:** dark-only "void" family `#020611` → `#030712` (footer). Dark-only is the brand identity. Do not add light sections.
- **Type:** Space Grotesk for display, Plus Jakarta Sans for body. No font swaps.
- **Radius system (documented, "Precision"):** 12px for all surfaces and CTAs (`rounded-xl`), 20px for the signature glass panel. Max radius 20px site-wide. No pill radii.
- **Motion:** scroll-reveal only via the `.reveal` / `.is-visible` system in `global.css`, driven by the IntersectionObserver in `Layout.astro`, gated by `prefers-reduced-motion` and the `.js` class. Animate only `transform` and `opacity`. Never `window.addEventListener("scroll")`.

## Design rules (required)

`.agents/skills/design-taste-frontend/SKILL.md` (tasteskill v2, experimental) is the project's source of design rules. Read it before any UI task.

Non-negotiables from the skill:

- **Zero em-dashes (`—`) or en-dashes (`–`) anywhere visible.** Use hyphens, periods, or line breaks.
- `min-h-[100dvh]` for full-viewport sections, never `h-screen`.
- Hero fits the viewport: headline max 2 lines on desktop, CTA visible without scroll, top padding max `pt-24`.
- Eyebrow budget: at most `ceil(sectionCount / 3)` uppercase-tracking micro-labels above section headlines. Hero counts as one.
- No section-number labels ("01", "02"), no scroll cues, no decorative status dots.
- No duplicate CTA intent with different labels for the same action.
- All motion honors `prefers-reduced-motion`.

## SEO and integrity constraints (never change without explicit approval)

- URL structure and slugs, in particular `/`.
- Anchor IDs: `#about`, `#servicios`, `#noticias`, `#contacto`.
- Primary nav labels (Header and Footer).
- Form field names and order (none currently; WhatsApp is the only conversion path).
- Brand logo/wordmark (`public/logo.svg`, `favicon.svg`).
- Legal/consent copy in the Footer.
- Copy voice: direct, technical, es-AR. Visual changes are not content rewrites. Fix grammar bugs, do not rewrite copy.

Existing SEO setup to preserve: title + meta description keyworded with "inyección de plásticos Moreno", OG meta, `theme-color`, and LocalBusiness JSON-LD in `src/pages/index.astro`.

## Contributing

Follow [CONTRIBUTING.md](CONTRIBUTING.md):

- Work on `main`, atomic commits (one commit = one logical change).
- Conventional Commits in Spanish: `feat:`, `fix:`, `chore:`, `style:`, `docs:`, `refactor:`.
- Run `npm run build` before committing.
- Review `git status` / `git diff` before committing. Never commit secrets or `.env`.

## Documentation

Full docs: https://docs.astro.build

Relevant guides before related tasks:

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Framework components](https://docs.astro.build/en/guides/framework-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling with Tailwind](https://docs.astro.build/en/guides/styling/)