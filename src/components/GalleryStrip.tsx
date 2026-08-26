// GalleryStrip.tsx
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion } from "motion/react";
import { assetUrl } from "@/lib/utils";
import { ImageLightbox } from "@/components/ImageLightbox";

const inkGrapes = assetUrl("/img/ink-grapes.png");
const inkPattern = assetUrl("/img/ink-pattern.png");

const GALLERY_IMAGES = [
  { src: assetUrl("/img/frontGlasses.jpg"), alt: "Close-up of the restaurant's wooden feature wall with wine bottles and decorative details", caption: "The wine wall" },
  { src: assetUrl("/img/sideBarTables.jpg"), alt: "Close-up of the restaurant's wooden feature wall with wine bottles and decorative details", caption: "A seat at the bar" },
  { src: assetUrl("/img/welllit.jpg"), alt: "Detailed view of the restaurant wall featuring wine bottles, artwork and rustic wooden shelving", caption: "Evening light" },
  { src: assetUrl("/img/hero_1.jpg"), alt: "Warmly lit dining room with wooden tables, chairs and wine bottles displayed along the walls", caption: "The dining room" },
  { src: assetUrl("/img/hero_2.jpg"), alt: "Restaurant dining area with wooden tables, blue chairs and light wood panelled walls", caption: "Gather around" },
  { src: assetUrl("/img/hero_3.jpg"), alt: "Light wood panelled restaurant wall decorated with framed artwork, wine bottles and greenery", caption: "Details" },
  { src: assetUrl("/img/hero_4.jpg"), alt: "Cosy restaurant interior with wooden tables, warm pendant lighting and wine displayed on the walls", caption: "A warm welcome" },
  { src: assetUrl("/img/heroWall2.jpg"), alt: "Warm restaurant interior featuring wooden walls, wine displays and ambient lighting", caption: "Pane & Vino" },
  { src: assetUrl("/img/wallClose.jpg"), alt: "Close-up of the restaurant's wooden feature wall with wine bottles and decorative details", caption: "The little things" },
  { src: assetUrl("/img/wallClose2.jpg"), alt: "Detailed view of the restaurant wall featuring wine bottles, artwork and rustic wooden shelving", caption: "Made for lingering" },
];

// Three copies back to back — the middle copy is where we start, giving
// room to drag either direction before the loop-reset kicks in.
const STRIP_IMAGES = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES];

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
 *
 * The loop-reset only happens once scrolling has settled (see onScroll) —
 * doing it mid-gesture used to fight iOS/Android momentum scrolling and
 * caused a visible stutter on mobile.
 */
function useInfiniteDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ startX: 0, startScroll: 0, moved: false, pointerId: -1 });
  const scrollEndTimer = useRef<number | undefined>(undefined);

  // Start in the middle copy so there's a full set-width of buffer either side.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
  }, []);

  useEffect(() => {
    return () => {
      if (scrollEndTimer.current) window.clearTimeout(scrollEndTimer.current);
    };
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
    if (e.target instanceof Element && e.target.closest("button, a")) return;
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

  const onClickCapture = (e: ReactMouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const onScroll = () => {
    if (scrollEndTimer.current) window.clearTimeout(scrollEndTimer.current);
    scrollEndTimer.current = window.setTimeout(wrap, 120);
  };

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="ink-panel py-20" style={inkPanelStyle}>
      {/* ...header unchanged... */}

      <div className="relative mt-12 -mx-6 md:-mx-16">
        <div
          ref={drag.ref}
          onPointerDown={drag.onPointerDown}
          onPointerMove={drag.onPointerMove}
          onPointerUp={drag.onPointerUp}
          onPointerLeave={drag.onPointerLeave}
          onClickCapture={drag.onClickCapture}
          onScroll={drag.onScroll}
          className={`flex snap-x snap-mandatory gap-5 overflow-x-auto touch-pan-x overscroll-x-contain px-6 pb-6 select-none [scrollbar-width:none] [will-change:scroll-position] md:gap-8 md:px-16 [&::-webkit-scrollbar]:hidden ${
            drag.isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab scroll-smooth"
          }`}
        >
          {STRIP_IMAGES.map((img, i) => (
            <motion.figure
              key={`${img.src}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: (i % 5) * 0.12 }}
              className={`framed-dark gallery-frame w-[82vw] shrink-0 snap-start sm:w-[46vw] md:w-[300px] ${OFFSETS[i % OFFSETS.length]}`}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(i % GALLERY_IMAGES.length)}
                className="block w-full cursor-pointer"
                aria-label={`View larger image: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={700}
                  height={900}
                  loading="eager"
                  draggable={false}
                  className="aspect-[3/4] h-auto w-full object-cover sm:h-[380px] md:aspect-[7/9] md:h-[460px]"
                />
              </button>
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

      <ImageLightbox
        images={GALLERY_IMAGES}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}