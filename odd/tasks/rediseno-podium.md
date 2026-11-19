# Rediseno Podium

Rebuild the MatriFer landing with the layout, scroll and motion of
https://www.podiumautomation.com/our-services, keeping MatriFer brand, colors and copy.
Backup of the previous state: branch `backup/pre-rediseno-podium` and tag `backup-pre-rediseno-podium` (includes the uncommitted Contact form WIP).

## Specs

- S1. "quiero que demos un giro 180 grados y pasemos esa página que hay ejemplo a Matrifer, con el mismo Design, conteniendo los mismos colores, marcas y demás, y filosofía de la marca de matrifer"
- S2. "quiero que se mantenga la filosofía de cada sección, pero que sea idéntica a la página que te pasé de ejemplo. Igual, con el mismo scroll, con los mismos secciones, pero adaptada siempre a Matrifer."
- S3. "Sé que esa página de ejemplo tiene muchos dibujos técnicos que a la ser scroll se animan y tiene varias cosas, si no lo puede llegar a hacer, decime cómo lo puedo hacer para plasmarlo, pero la idea es que quede igual a la página que está de ejemplo"
- S4. "no dudes en reemplazar lo que esta hecho es mas, hace un backup mejor antes y empeza a trabajar con esto."

Reference mapping (Podium section -> MatriFer section, tone):

| Podium | MatriFer | Tone |
|---|---|---|
| Nav: logo + boxed links + CTA, collapses on scroll | Header | fixed |
| Hero: title, rule, label + lead, line-art drawing | Hero | dark |
| Experience: label + statement / photo | About `#about` | paper |
| Specs: big title + stacking rows | Servicios `#servicios` | accent |
| Build: statement + 3 photo columns + heading + full-bleed image | CaseStudies `#casos` + WhyUs image | dark |
| QA: statement + list + CTA + wireframe that opens | WhyUs pillars | dark |
| Industries: label + lead + card scroller | News `#noticias` | light |
| Partnerships: title + text + blueprint grid | Location `#ubicacion` | light |
| (footer contact cards) | Contact `#contacto` form | paper |
| Footer: giant nav, small links, blueprint + cards | Footer | dark |

Decisions (reversible, token level):
- Section tones are CSS classes (`tone-dark`, `tone-paper`, `tone-accent`, `tone-light`) in `global.css`; Podium yellow maps to matrifer-cyan, Podium cream maps to a pale cyan tint.
- Fonts stay Space Grotesk / Plus Jakarta Sans. Radius follows the reference (4px).
- No new dependencies: GSAP + ScrollTrigger (already installed) drive scroll motion; drawings are inline SVG, not Lottie.
- Anchors, title, meta, JSON-LD, nav labels and existing copy are preserved.

## Tasks

- [x] T1 (S1,S2) Foundation: tokens, tones, type scale, buttons, labels, rules, motion helpers in `global.css` + `Layout.astro`; shared components. inline. Commit 08fe49c.
- [x] T2 (S2,S3) Header + Hero with animated line-art drawing. writer. Commit 08cae9a.
- [x] T3 (S2) About + Servicios (stacking rows). writer. Commit 9124c15.
- [x] T4 (S2,S3) CaseStudies + WhyUs (full-bleed image, mold drawing that opens). writer. Commit 9124c15.
- [x] T5 (S2) News scroller + Location + Contact. writer. Commit c29f45c.
- [x] T6 (S2) Footer with blueprint grid and layered cards. writer. Commit c29f45c.
- [x] T7 (S1-S4) Verify: build, desktop + mobile browser pass, reduced motion; update AGENTS.md design system. inline. Docs commit follows c29f45c.

## Log

- L1. "Bueno, ahora que podés ver la página que te pasé como ejemplo, quiero que demos un giro 180 grados y pasemos esa página que hay ejemplo a Matrifer, con el mismo Design, conteniendo los mismos colores, marcas y demás, y filosofía de la marca de matrifer, es decir, quiero que se mantenga la filosofía de cada sección, pero que sea idéntica a la página que te pasé de ejemplo. Igual, con el mismo scroll, con los mismos secciones, pero adaptada siempre a Matrifer. Sé que esa página de ejemplo tiene muchos dibujos técnicos que a la ser scroll se animan y tiene varias cosas, si no lo puede llegar a hacer, decime cómo lo puedo hacer para plasmarlo, pero la idea es que quede igual a la página que está de ejemplo, no dudes en reemplazar lo que esta hecho es mas, hace un backup mejor antes y empeza a trabajar con esto."
- L2. Reference mechanics read from the live page: reveal on enter (fade + 1rem), horizontal rules drawn with clip-path, overlap reveal (next section slides from -20rem), takeover (scale .8 to 1), clip-path cover on the full-bleed image, sticky stacking rows that collapse, looping line drawings, cabinet doors sliding open, footer layers sliding up, nav collapsing to a menu button after scroll.
- L3. Verification (preview of the production build, Chromium 1440x900 and 390x844): build passes; no console or page errors; no horizontal overflow; h1 on 2 lines and hero CTA above the fold; nav collapses after scroll and the logo switches to ink on light tones; service rows pin and collapse; mold opens; news scroller, map, contact form and footer cards render; reduced motion leaves every `.reveal` visible, no pinned rows and the video replaced by the still; page readable with JS disabled. Fixes after the pass: component classes moved into `@layer components` (unlayered `.btn` was beating `hidden`), h1 width, larger hero drawing, service titles top aligned, footer cards above the grid notes, wider news cards, monochrome logo on light tones.
- L4. Not done: smooth wheel scrolling (the reference uses Lenis, a new dependency) and Lottie-grade drawings. Intermediate commits were not built one by one; only the final tree was.
- L5. User: "agrega lenis si". Added lenis 1.3.27 driven by the GSAP ticker; skipped under reduced motion; news track and menu keep native scroll. Anchor clicks now use layout offsets (offsetTop) because transformed sections shifted the target by about 90px.
- L6. User: "las secciones claras y cyan y cambia contacto a exactamente el ejemplo https://www.podiumautomation.com/contact". Tones kept. Contact rebuilt from the live contact page: tone-dark, big title + lead at col 8, rule, email/phone/address on the left, line form on the right with Nombre*, Email*, Empresa, prefix + Teléfono*, Tu mensaje*, white submit. Added fields email, empresa, prefijo, telefono (explicitly requested by "exactamente el ejemplo"); mailto body carries all of them.
- L7. User: "quiero un calco de esa seccion [sirviendo a todo tipo de industrias] en reemplazo total de la seccion de noticias, toma la segunda seccion de casos de estudio para contenido y quita los detalles tecnicos". Answers: "la de casos de estudio de ahora arriba de la planta quitala"; "quita noticias junto con el link". CaseStudies rewritten as the industries carousel (#casos, tone-light, in the takeover slot after WhyUs); News removed with its nav links.
