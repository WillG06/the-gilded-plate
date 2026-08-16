import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion } from "motion/react";
import { assetUrl } from "@/lib/utils";

const inkGrapes = assetUrl("/img/ink-grapes.png");
const inkPattern = assetUrl("/img/ink-pattern.png");

const BASE_IMAGES = [
  { src: assetUrl("/img/interior.jpg"), alt: "The dining room set for the evening", caption: "La sala" },
  { src: assetUrl("/img/focaccia.jpg"), alt: "Hand-shaped focaccia dough proving", caption: "Fatto a mano" },
  { src: assetUrl("/img/wineLights.jpg"), alt: "Candlelight caught in a glass of red wine", caption: "La cantina" },
  { src: assetUrl("/img/Resturant.jpg"), alt: "Wine poured in the cellar", caption: "Il vino" },
  { src: assetUrl("/img/winePair.jpg"), alt: "A pairing laid out on the stone counter", caption: "Il forno" },
];

// Three copies back to back — the middle copy is where we start, giving
// room to drag either direction before the loop-reset kicks in.
const STRIP_IMAGES = [...BASE_IMAGES, ...BASE_IMAGES, ...BASE_IMAGES];

// Alternating vertical offsets so the strip hangs unevenly, like a contact sheet.
const OFFSETS = ["md:mt-0", "md:mt-10", "md:mt-2", "md:mt-12", "md:mt-4"];

/** Sets the shared --pv-ink-tile custom property this element's .ink-panel reads. */
const inkPanelStyle = {
  "--pv-ink-tile": `url(${inkPattern})`,
} as CSSProperties;

function ArrowLeftIcon() {
  return (
    <svg width="30" height="10" viewBox="0 0 30 10" fill="none" aria-hidden="true">
      <path d="M1 5H29" stroke="currentColor" strokeWidth="1" />
      <path d="M6 1L1.5 5L6 9" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="30" height="10" viewBox="0 0 30 10" fill="none" aria-hidden="true">
      <path d="M1 5H29" stroke="currentColor" strokeWidth="1" />
      <path d="M24 1L28.5 5L24 9" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

/**
 * Click-and-drag horizontal scroll (mouse/pen) with a seamless infinite loop:
 * three copies of the strip are rendered, and once scroll position nears
 * either edge of the middle copy, it's silently reset one set-width over —
 * so dragging in one direction never runs out of images.
 */
function useInfiniteDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ startX: 0, startScroll: 0, moved: false, pointerId: -1 });

  // Start in the middle copy so there's a full set-width of buffer either side.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
  }, []);

  const wrap = () => {
    const el = ref.current;
    if (!el) return;
    const setWidth = el.scrollWidth / 3;
    if (setWidth <= 0) return;
    if (el.scrollLeft < setWidth * 0.5) {
      el.scrollLeft += setWidth;
    } else if (el.scrollLeft > setWidth * 1.5) {
      el.scrollLeft -= setWidth;
    }
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    const el = ref.current;
    if (!el) return;
    drag.current = { startX: e.clientX, startScroll: el.scrollLeft, moved: false, pointerId: e.pointerId };
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !isDragging) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
    wrap();
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el && el.hasPointerCapture(drag.current.pointerId)) {
      el.releasePointerCapture(drag.current.pointerId);
    }
    setIsDragging(false);
  };

  // Swallow the click that would otherwise fire right after a drag release.
  const onClickCapture = (e: ReactMouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Catches touch scrolling and wheel scrolling too, not just mouse drag.
  const onScroll = () => wrap();

  return {
    ref,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerLeave: endDrag,
    onClickCapture,
    onScroll,
  };
}

export function GalleryStrip() {
  const drag = useInfiniteDragScroll();

  return (
    <section className="ink-panel py-20" style={inkPanelStyle}>
      <div className="px-6 md:px-16">
        <img
          src={inkGrapes}
          alt=""
          width={512}
          height={512}
          loading="lazy"
          className="h-14 w-auto object-contain opacity-90"
        />
        <p className="eyebrow mt-6 !text-primary-foreground/60">Behind the pass</p>
        <h2 className="mt-3 font-display text-4xl text-primary-foreground md:text-5xl">
          A look inside
        </h2>
      </div>

      {/* Bleeds past the section's own padding so the strip touches both screen edges. */}
      <div className="relative mt-12 -mx-6 md:-mx-16">
        <div
          ref={drag.ref}
          onPointerDown={drag.onPointerDown}
          onPointerMove={drag.onPointerMove}
          onPointerUp={drag.onPointerUp}
          onPointerLeave={drag.onPointerLeave}
          onClickCapture={drag.onClickCapture}
          onScroll={drag.onScroll}
          className={`flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 select-none [scrollbar-width:none] md:gap-8 md:px-16 [&::-webkit-scrollbar]:hidden ${
            drag.isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {STRIP_IMAGES.map((img, i) => (
            <motion.figure
              key={`${img.src}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: (i % 5) * 0.12 }}
              className={`framed-dark gallery-frame w-[72vw] shrink-0 snap-start sm:w-[46vw] md:w-[300px] ${OFFSETS[i % OFFSETS.length]}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={700}
                height={900}
                loading="lazy"
                draggable={false}
                className="h-[380px] w-full object-cover md:h-[420px]"
              />
              <figcaption className="mt-4 px-1 pb-1 font-script text-3xl text-primary-foreground md:text-4xl">
                {img.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 px-6 text-primary-foreground md:px-16">
        <ArrowLeftIcon />
        <span className="text-xs tracking-[0.3em] uppercase">Drag to explore</span>
        <ArrowRightIcon />
      </div>
    </section>
  );
}