import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { assetUrl } from "@/lib/utils";
const hero1 = assetUrl("/img/interior.jpg");
const hero2 = assetUrl("/img/Pizza.jpg");
const hero3 = assetUrl("/img/Resturant.jpg");
const hero4 = assetUrl("/img/tableFood.jpg");

const SLIDES = [
  { src: hero1, alt: "Candlelit long table laid for dinner at Pane & Vino", caption: "La sala" },
  { src: hero2, alt: "Hand-cut tagliatelle nests dusted with flour", caption: "Fatto a mano" },
  { src: hero3, alt: "Red wine poured into a glass in the cellar", caption: "La cantina" },
  { src: hero4, alt: "Freshly baked focaccia and bread on a stone counter", caption: "Il forno" },
];

const INTERVAL = 6000;

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
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[6px]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative flex h-full flex-col items-center justify-center px-6 text-center text-primary-foreground"
      >
        <p className="font-script text-4xl leading-none opacity-90 md:text-5xl">Little Italy Deli</p>
        <h1 className="mt-2 font-display text-[15vw] leading-[0.92] tracking-[0.01em] sm:text-[11vw] md:text-[7vw] lg:text-[6rem]">
          Pane &amp; Vino
        </h1>
        <span className="mt-6 block h-px w-16 bg-primary-foreground/40" />
        <a href="/contact" className="btn btn--arch btn--ghost mt-8">
          <span>Prenota — book a table</span>
        </a>
      </motion.div>

      {/* slide markers */}
      <div className="absolute inset-x-0 bottom-24 z-10 flex items-center justify-center gap-6 px-6 text-primary-foreground sm:bottom-9">
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
                    ? "bg-gold"
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
