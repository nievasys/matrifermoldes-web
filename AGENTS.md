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

- Single page: `src/pages/index.astro` composes `src/sections/*.astro` in order: Header, Hero, About, Servicios, WhyUs, CaseStudies, Location, Contact, Footer.
- Layout in `src/layouts/Layout.astro` (head meta, OG, theme-color, `.js` class marker, reveal observer, anchor scrolling).
- Scroll motion lives in `src/scripts/motion.ts` (Lenis smooth scroll + GSAP ScrollTrigger on one shared ticker) and is wired through `data-*` hooks. Lenis is exposed as `window.lenis`; programmatic scrolling must go through it when present.
- Shared pieces: `src/components/SectionLabel.astro` and the line drawings in `src/components/drawings/`.
- Path alias `@/*` resolves to `src/*`.
- Design tokens and component classes live in `src/styles/global.css`. Assets (images, logo) in `public/`.

## Design system (mandatory)

The layout, scroll and motion follow the reference https://www.podiumautomation.com/our-services with MatriFer brand and copy. Do not invent new tokens. Use the existing system:

- **Section tones:** every section takes one tone class: `tone-dark` (#020611), `tone-night` (footer), `tone-paper` (pale cyan), `tone-accent` (matrifer-cyan) or `tone-light`. Use the tone utilities (`text-tone-fg`, `text-tone-muted`, `border-tone-line`, `bg-tone-soft`) instead of fixed colors.
- **Sole accent color:** matrifer-cyan `#01C1F2`. Text on cyan, paper and light tones is ink `#020611`. Never put white text on cyan (fails contrast).
- **Type:** Space Grotesk for display, Plus Jakarta Sans for body. Use the scale classes (`t-display`, `t-heading`, `t-statement`, `t-sub1..3`, `t-label`, `t-body-lg`). Headings are weight 400 with tight tracking, never bold, never uppercase.
- **Radius:** 4px (`rounded-[4px]`) for buttons, boxes and controls. Photos have no radius.
- **Buttons:** `btn btn-primary` (cyan), `btn-light`, `btn-ink`, and `link-arrow`, all with the `ph-arrow-elbow-down-right` icon.
- **Layout:** `.shell` (full width, 40px side padding desktop, 20px mobile) with a 12 column grid. Rows are separated by 1px rules (`.rule`), not cards.
- **Drawings:** technical line art is hand-written inline SVG with the `.drawing` class, with at most one or two tiny cyan details each.
- **Motion:** reveal on enter via `.reveal` / `.is-visible` (IntersectionObserver in `Layout.astro`), and scroll-driven motion via the hooks in `src/scripts/motion.ts` (`data-rule`, `data-under`, `data-takeover`, `data-cover`, `data-stack-*`, `data-footer-*`, `svg[data-draw]`). Everything is gated by `prefers-reduced-motion` and works without JS. Animate `transform`, `opacity` and `clip-path`. Never add your own `window.addEventListener("scroll")`.

## Design rules (required)

`.agents/skills/design-taste-frontend/SKILL.md` (tasteskill v2, experimental) is the project's source of design rules. Read it before any UI task.

Non-negotiables from the skill:

- **Zero em-dashes (`—`) or en-dashes (`–`) anywhere visible.** Use hyphens, periods, or line breaks.
- `min-h-[100dvh]` for full-viewport sections, never `h-screen`.
- Hero: headline max 2 lines on desktop and CTA visible without scroll. The line drawing may extend below the fold.
- Eyebrow budget: at most `ceil(sectionCount / 3)` uppercase-tracking micro-labels above section headlines. Hero counts as one.
- No section-number labels ("01", "02"), no scroll cues, no decorative status dots.
- No duplicate CTA intent with different labels for the same action.
- All motion honors `prefers-reduced-motion`.

## SEO and integrity constraints (never change without explicit approval)

- URL structure and slugs, in particular `/`.
- Anchor IDs: `#about`, `#servicios`, `#casos`, `#ubicacion`, `#contacto`.
- Primary nav labels (Header and Footer).
- Form field names and order in the Contact form (`nombre`, `email`, `empresa`, `prefijo`, `telefono`, `mensaje`). The form is a copy of https://www.podiumautomation.com/contact and submits through `mailto:`.
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