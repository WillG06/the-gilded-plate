import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { assetUrl } from "@/lib/utils";
const hero1 = assetUrl("/img/hero_1.jpg");
const hero2 = assetUrl("/img/hero_2.jpg");
const hero3 = assetUrl("/img/hero_3.jpg");
const hero4 = assetUrl("/img/hero_4.jpg");

const SLIDES = [
  { src: hero1, alt: "Candlelit long table laid for dinner at Pane & Vino", caption: "La sala" },
  { src: hero2, alt: "Hand-cut tagliatelle nests dusted with flour", caption: "Fatto a mano" },
  { src: hero3, alt: "Red wine poured into a glass in the cellar", caption: "La cantina" },
  { src: hero4, alt: "Freshly baked focaccia and bread on a stone counter", caption: "Il forno" },
];

const INTERVAL = 6000;

/**
 * Two independent blur panels, each a rounded rectangle:
 *  - TITLE_PANEL sits behind the script/heading/button.
 *  - SLIDER_PANEL is a thin strip behind just the slide markers.
 * Both share PANEL_MARGIN_X so they're the same width. Everything outside
 * both panels — including the gap between them — gets the light "top" blur.
 *
 * All values are fractions of the hero's bounding box (0–1). Corner
 * fractions must stay under half of their panel's own height or the path
 * will pinch — e.g. SLIDER panel is 0.065 tall, so its cy must stay < 0.0325.
 */
const PANEL_MARGIN_X = 0.06;

const TITLE_PANEL_TOP_Y = 0.3;
const TITLE_PANEL_BOTTOM_Y = 0.62;
const TITLE_PANEL_CORNER_X = 0.035; // tighter corners than before
const TITLE_PANEL_CORNER_Y = 0.05;

const SLIDER_PANEL_TOP_Y = 0.87;
const SLIDER_PANEL_BOTTOM_Y = 0.935; // thinner strip (was 0.85–0.94)
const SLIDER_PANEL_CORNER_X = 0.015;
const SLIDER_PANEL_CORNER_Y = 0.012;

const TOP_BLUR_PX = 1; // light blur over everything outside the two panels
const PANEL_BLUR_PX = 8; // heavy blur inside both panels

const left = PANEL_MARGIN_X;
const right = 1 - PANEL_MARGIN_X;

/** Builds a rounded rectangle path. */
function roundedRectPath(l: number, t: number, r: number, b: number, cx: number, cy: number) {
  return (
    `M${l},${t + cy} ` +
    `Q${l},${t} ${l + cx},${t} ` +
    `L${r - cx},${t} ` +
    `Q${r},${t} ${r},${t + cy} ` +
    `L${r},${b - cy} ` +
    `Q${r},${b} ${r - cx},${b} ` +
    `L${l + cx},${b} ` +
    `Q${l},${b} ${l},${b - cy} ` +
    `Z`
  );
}

const TITLE_PANEL_PATH = roundedRectPath(
  left,
  TITLE_PANEL_TOP_Y,
  right,
  TITLE_PANEL_BOTTOM_Y,
  TITLE_PANEL_CORNER_X,
  TITLE_PANEL_CORNER_Y
);

const SLIDER_PANEL_PATH = roundedRectPath(
  left,
  SLIDER_PANEL_TOP_Y,
  right,
  SLIDER_PANEL_BOTTOM_Y,
  SLIDER_PANEL_CORNER_X,
  SLIDER_PANEL_CORNER_Y
);

/** Union of both panels — the heavy-blur region. */
const PANELS_MASK_PATH = `${TITLE_PANEL_PATH} ${SLIDER_PANEL_PATH}`;

/** Full-rect minus both panels (evenodd) — the light-blur "everything else" region. */
const TOP_MASK_PATH = `M0,0 L1,0 L1,1 L0,1 Z ${PANELS_MASK_PATH}`;

/** Full-bleed hero carousel; the header floats over it and separates on scroll. */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(t);
  }, [reduce]);

  const slide = SLIDES[index] ?? SLIDES[0]!;

  return (
    <div
      ref={ref}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-wine-deep"
    >
      {/* Hidden SVG asset defining the two blur-region masks — not rendered visually itself */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <mask
            id="hero-blur-mask-top"
            maskUnits="objectBoundingBox"
            maskContentUnits="objectBoundingBox"
          >
            <path d={TOP_MASK_PATH} fill="#fff" fillRule="evenodd" />
          </mask>
          <mask
            id="hero-blur-mask-panels"
            maskUnits="objectBoundingBox"
            maskContentUnits="objectBoundingBox"
          >
            <path d={PANELS_MASK_PATH} fill="#fff" />
          </mask>
        </defs>
      </svg>

      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={1920}
            height={1280}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4, ease: "easeInOut" }, scale: { duration: 8, ease: "linear" } }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        {/* Light blur over everything outside the two panels, including the gap between them */}
        <div
          className="absolute inset-0 bg-black/5"
          style={{
            backdropFilter: `blur(${TOP_BLUR_PX}px)`,
            WebkitBackdropFilter: `blur(${TOP_BLUR_PX}px)`,
            WebkitMaskImage: "url(#hero-blur-mask-top)",
            maskImage: "url(#hero-blur-mask-top)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        />
        {/* Heavy blur inside the title panel and the slider panel */}
        <div
          className="absolute inset-0 bg-black/20"
          style={{
            backdropFilter: `blur(${PANEL_BLUR_PX}px)`,
            WebkitBackdropFilter: `blur(${PANEL_BLUR_PX}px)`,
            WebkitMaskImage: "url(#hero-blur-mask-panels)",
            maskImage: "url(#hero-blur-mask-panels)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        />
      </motion.div>

      {/* Title block — pinned to the title panel's bounds, content vertically centered within it */}
      <motion.div
        style={{
          opacity,
          top: `${TITLE_PANEL_TOP_Y * 100}%`,
          bottom: `${(1 - TITLE_PANEL_BOTTOM_Y) * 100}%`,
        }}
        className="absolute inset-x-0 z-10 flex flex-col items-center justify-center px-6 text-center text-primary-foreground"
      >
        <p className="font-script text-4xl leading-none opacity-90 md:text-5xl">Little Italy Deli</p>
        <h1 className="mt-2 font-display text-[15vw] leading-[0.92] tracking-[0.01em] sm:text-[11vw] md:text-[7vw] lg:text-[6rem]">
          Pane &amp; Vino
        </h1>
        <span className="mt-6 block h-px w-16 bg-primary-foreground/40" />
        <Link to="/contact" className="btn btn--arch btn--ghost mt-8">
          <span>Prenota — book a table</span>
        </Link>
      </motion.div>

      {/* Slide markers — old caption + marker layout, centered on the slider panel, white/maroon */}
      <div
        style={{ top: `${((SLIDER_PANEL_TOP_Y + SLIDER_PANEL_BOTTOM_Y) / 2) * 100}%` }}
        className="absolute inset-x-0 z-10 flex -translate-y-1/2 items-center justify-center gap-6 px-6 text-primary-foreground"
      >
        <span className="hidden font-script text-2xl opacity-70 sm:block">{slide.caption}</span>
        <div className="flex items-center gap-3">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show ${s.caption}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="group py-3"
            >
              <span
                className={`block h-px w-8 transition-all duration-500 md:w-12 ${
                  i === index
                    ? "bg-wine-deep"
                    : "bg-primary-foreground/35 group-hover:bg-primary-foreground/70"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}