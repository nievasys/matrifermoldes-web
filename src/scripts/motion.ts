// Scroll motion for the whole page. Everything here is progressive enhancement:
// without JS or with reduced motion the page stays static and fully readable.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const all = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(selector));

function initRules() {
  all("[data-rule]").forEach((line) => {
    gsap.fromTo(
      line,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: { trigger: line, start: "top 88%" },
      },
    );
  });
}

// Line drawings fade in shape by shape, left to right, like a plotter.
function initDrawings() {
  all<SVGSVGElement>("svg[data-draw]").forEach((svg) => {
    const shapes = all<SVGGraphicsElement>(
      "line, rect, circle, path, polygon, polyline, ellipse",
      svg,
    ).filter((shape) => !shape.closest("[data-draw-skip]"));
    if (!shapes.length) return;
    const ordered = shapes
      .map((shape) => ({ shape, x: shape.getBBox().x }))
      .sort((a, b) => a.x - b.x)
      .map((item) => item.shape);
    gsap.fromTo(
      ordered,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        stagger: { amount: 1.4 },
        scrollTrigger: { trigger: svg, start: "top 85%" },
      },
    );
  });
}

function initDesktop() {
  // The next section sits under the previous one and slides out from below it.
  all("[data-under]").forEach((wrapper) => {
    const previous = wrapper.previousElementSibling;
    const content = wrapper.firstElementChild;
    if (!previous || !content) return;
    gsap.fromTo(
      content,
      { y: "-20rem" },
      {
        y: "0rem",
        ease: "none",
        scrollTrigger: {
          trigger: previous,
          start: "bottom bottom",
          end: "bottom 10%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  });

  // A section grows from 80% to full width as it takes over the screen.
  all("[data-takeover]").forEach((wrapper) => {
    const content = wrapper.firstElementChild;
    if (!content) return;
    gsap.fromTo(
      content,
      { scale: 0.8 },
      {
        scale: 1,
        ease: "none",
        transformOrigin: "50% 100%",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "top 30%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  });

  // Full-bleed image opens from an inset frame.
  all("[data-cover]").forEach((cover) => {
    gsap.fromTo(
      cover,
      { clipPath: "inset(5% 5% 5% 5%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: { trigger: cover, start: "top bottom", end: "top top", scrub: true },
      },
    );
  });

  // Soft parallax on media.
  all("[data-parallax]").forEach((media) => {
    gsap.fromTo(
      media,
      { y: "2rem" },
      {
        y: "-2rem",
        ease: "none",
        scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  // Footer cards rise in layers.
  const footerTrigger = document.querySelector("[data-footer-trigger]");
  const footerLayers = all("[data-footer-layer]");
  if (footerTrigger && footerLayers.length) {
    gsap.fromTo(
      footerLayers,
      { y: "100%" },
      {
        y: "0%",
        duration: 1.6,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: footerTrigger,
          start: "center bottom",
          toggleActions: "play none none reverse",
        },
      },
    );
  }
}

// Service rows stay pinned while each one collapses to its title.
function initStack() {
  const track = document.querySelector<HTMLElement>("[data-stack-track]");
  const list = document.querySelector<HTMLElement>("[data-stack-list]");
  const cards = all("[data-stack-card]");
  if (!track || !list || cards.length < 2) return;

  const collapsing = cards.slice(0, -1);
  const remPx = () => parseFloat(getComputedStyle(document.documentElement).fontSize);
  const collapsed = () => 5.5 * remPx();
  const expanded = () =>
    Math.max(
      15 * remPx(),
      Math.min(20 * remPx(), window.innerHeight - 8 * remPx() - collapsing.length * collapsed()),
    );
  const distance = () => collapsing.length * (expanded() - collapsed()) * 1.25;

  const measure = () => {
    gsap.set(cards, { height: expanded(), overflow: "hidden" });
    const finalHeight = collapsing.length * collapsed() + expanded();
    track.style.height = `${distance() + finalHeight}px`;
    list.style.position = "sticky";
    list.style.top = "6rem";
  };
  measure();

  const slice = 1 / collapsing.length;
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: track,
      start: "top 96px",
      end: () => `+=${distance()}`,
      scrub: true,
      invalidateOnRefresh: true,
      onRefreshInit: measure,
    },
  });
  collapsing.forEach((card, index) => {
    const content = all("[data-stack-content]", card);
    timeline.to(card, { height: collapsed, ease: "none", duration: slice }, index * slice);
    if (content.length) {
      timeline.to(content, { opacity: 0, ease: "none", duration: slice * 0.6 }, index * slice);
    }
  });

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
    gsap.set(cards, { clearProps: "height,overflow" });
    gsap.set(all("[data-stack-content]"), { clearProps: "opacity" });
    track.style.height = "";
    list.style.position = "";
    list.style.top = "";
  };
}

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

// Scroll suave con inercia, como la referencia. Un solo reloj: GSAP mueve a Lenis
// y ScrollTrigger lee la posición en cada paso. Con movimiento reducido no se crea.
function initSmoothScroll() {
  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.8,
    smoothWheel: true,
    // Carrusel de noticias y menú: scroll nativo.
    prevent: (node) => Boolean(node.closest("[data-news-track], #site-menu")),
  });
  window.lenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

if (!reduce) {
  initSmoothScroll();
  const mm = gsap.matchMedia();
  initRules();
  initDrawings();
  mm.add("(min-width: 1024px)", initDesktop);
  mm.add("(min-width: 1024px)", initStack);

  window.addEventListener("load", () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
