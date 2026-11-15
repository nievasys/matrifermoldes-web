# Rediseno Podium: design brief for writers

Reference screenshots (1440x900 unless noted) live in `odd/reference/`:
`pd-hero`, `pd-exp`, `pd-specs`, `pd-build`, `pd-build2`, `pd-qa`, `pd-qa2`, `pd-ind`, `pd-part`, `pd-foot` (.jpg), plus contact sheets `sheet0..3.jpg` (desktop, top to bottom) and `msheet0..1.jpg` (mobile 390px, left to right). Look at the ones for your sections before writing.

Goal: each MatriFer section must look and scroll like its reference section, with MatriFer colors, logo and existing copy. Stack: Astro 7 static, Tailwind v4, GSAP + ScrollTrigger (installed). No new dependencies. No Lottie.

## Foundation already written (do not edit: `src/styles/global.css`, `src/scripts/motion.ts`, `src/layouts/Layout.astro`, `src/components/SectionLabel.astro`)

Tones (set on the `<section>`; they set background and text color and the CSS vars `--bg --fg --muted --line --soft`):
`tone-dark` (#020611), `tone-night` (#030712, footer), `tone-paper` (pale cyan #E6F7FD), `tone-accent` (cyan #01C1F2, dark text), `tone-light` (#F6FAFC).
Tailwind utilities bound to the current tone: `text-tone-fg`, `text-tone-muted`, `border-tone-line`, `bg-tone-line`, `bg-tone-soft`, `bg-tone-bg`. Fixed colors: `matrifer-cyan`, `ink` (#020611), `paper`, `snow`.
Never put white text on cyan. Text on `tone-accent`/`tone-paper`/`tone-light` is ink.

Type classes: `t-display` (hero and giant section titles, 68px desktop, weight 400, -0.04em), `t-heading` (56px), `t-statement` (48px big sentence), `t-sub1` (32px/500), `t-sub2` (24px/500), `t-sub3` (20px/500), `t-label` (16px/500), `t-label-sm` (14px), `t-body-lg` (20px), `t-body` (16px). Headings are never bold and never uppercase. No uppercase tracking micro-labels.

Layout: `shell` = full-width container with 40px side padding desktop, 20px mobile. Use a 12-col grid (`grid grid-cols-12 gap-x-5`) inside it. Radius is 4px everywhere: `rounded-[4px]` (images in the reference are square: no radius on photos).

Components and classes:
- `<SectionLabel label="..." />` small square + label (reference "■ Design & engineering").
- `<span class="rule" data-rule></span>` 1px divider that draws itself from the left.
- Buttons: `<a class="btn btn-primary">Texto <i class="ph ph-arrow-elbow-down-right" aria-hidden="true"></i></a>`. Variants `btn-primary` (cyan), `btn-light` (white, wide), `btn-ink` (dark, wide). Text link with arrow: `class="link-arrow"`.
- Icons: Phosphor only (`<i class="ph ph-...">`). Do not hand-roll icon SVGs. Technical drawings are illustrations, not icons, and are hand-written inline SVG.
- Reveal on enter: add `class="reveal"` and optional `style="--d:1"` for stagger (100ms steps).

Motion hooks handled by `src/scripts/motion.ts` (desktop >=1024px, disabled with reduced motion):
- `data-rule` on a `.rule`.
- `data-under`: wrapper `<div data-under class="overflow-clip">` whose first child is a section; it slides out from under the PREVIOUS sibling. The previous sibling needs `relative z-10`.
- `data-takeover`: wrapper div (give it the tone of the previous section) whose first child scales from 0.8 to 1 (origin bottom center) while entering.
- `data-cover`: element whose clip-path opens from inset 5% to 0 while scrolling (full-bleed image).
- `data-parallax`: media drifts 2rem.
- `data-stack-track` > `data-stack-list` > `data-stack-card` (+ `data-stack-content` on what fades): pinned collapsing rows. JS sets card heights (expanded about 20rem, collapsed 5.5rem), so a card must show its title in the top 5.5rem and tolerate being clipped (`overflow` is set by JS). Without JS cards are natural height.
- `data-footer-trigger` + `data-footer-layer`: layers rise from y 100%.
- `svg[data-draw]`: its shapes fade in left to right on enter. Wrap parts that must not be touched in `<g data-draw-skip>`.
- Header listens for the `nav:close` document event (fired on anchor clicks) to close its menu.

Drawings: `<svg class="drawing" data-draw viewBox="..." aria-hidden="true">`. Class sets `fill:none; stroke: rgba(255,255,255,.34); stroke-width:1` with non-scaling strokes. Helpers: `.is-faint` (dimmer stroke), `.is-accent` (solid cyan fill, use for ONE or two tiny details like the reference's yellow light), `.is-solid` (fill = section background, to occlude lines behind a shape). On light tones set `style="--draw: rgba(2,6,17,.3); --draw-faint: rgba(2,6,17,.14)"`. Draw with many thin precise primitives (rect, line, circle, polygon) like an engineering elevation: orthogonal, symmetric, bolts as circle + X, repeated modules. Generate repeated geometry from arrays in the Astro frontmatter. Loop animations for a drawing go in that component's own `<script>` with GSAP, gated by `matchMedia("(prefers-reduced-motion: reduce)")`, paused when off screen (ScrollTrigger onToggle).

## Hard constraints

- Keep anchor ids: `#about`, `#servicios`, `#casos`, `#noticias`, `#contacto`, `#ubicacion`.
- Keep nav labels exactly: Nosotros, Servicios, Noticias, Casos de estudio, Ubicación; header CTA label "Contactar" (-> `#contacto`).
- Copy is Spanish (es-AR, voseo). Reuse the existing copy of each section verbatim (read the current file first; it is the copy source). Do not invent claims, numbers, certifications or clients. Where the reference needs a short label that does not exist, use a neutral 1 to 3 word label taken from existing wording.
- Zero em-dashes or en-dashes in visible text.
- `min-h-[100dvh]`, never `h-screen`. All motion honors `prefers-reduced-motion`. Animate only transform, opacity, clip-path (and height only where the foundation does it).
- Accessible: real headings in order (one h1 in Hero), alt text on content images, `aria-label` on icon buttons, focus visible, form labels kept.
- WhatsApp CTA: number `5491154200297`, message "Hola! Vi la página web de Matrifer Moldes y quería consultar por los servicios de inyección de plásticos.", label "Solicitar presupuesto", `target="_blank" rel="noopener noreferrer"`.
- Comments in code in the language already used by the file (Spanish). Do not commit. Do not edit files outside your allowed surfaces. Run `npm run build` at the end and report its result (other sections may still be mid-rewrite: report errors that come from your files only).
