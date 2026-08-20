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
import { ImageLightbox } from "@/components/ImageLightbox";

const inkGrapes = assetUrl("/img/ink-grapes.png");
const inkPattern = assetUrl("/img/ink-pattern.png");

const GALLERY_IMAGES = [
  {
    src: assetUrl("/img/GnocchiAlPesto.jpg"),
    alt: "Gnocchi al Pesto, potato dumplings tossed in fresh basil pesto",
    caption: "Gnocchi al Pesto",
  },
  {
    src: assetUrl("/img/PappardelleAllOssobuco.jpg"),
    alt: "Pappardelle all'Ossobuco, wide ribbon pasta with slow-braised ossobuco",
    caption: "Pappardelle all'Ossobuco",
  },
  {
    src: assetUrl("/img/PastaAlRagu.jpg"),
    alt: "Pasta al Ragù, pasta in a slow-cooked meat sauce",
    caption: "Pasta al Ragù",
  },
  {
    src: assetUrl("/img/TortelliniAllaPanna.jpg"),
    alt: "Tortellini alla Panna, filled pasta in a creamy sauce",
    caption: "Tortellini alla Panna",
  },
  {
    src: assetUrl("/img/CimbelloneBalanzone.jpg"),
    alt: "Cimbellone Balanzone, toasted bun topped with ham, burrata and pistachio pesto",
    caption: "Cimbellone Balanzone",
  },
  {
    src: assetUrl("/img/menu1.jpg"),
    alt: "Dish from the Pane & Vino menu",
    caption: "",
  },
  {
    src: assetUrl("/img/menu2.jpg"),
    alt: "Dish from the Pane & Vino menu",
    caption: "",
  },
  {
    src: assetUrl("/img/menu3.jpg"),
    alt: "Dish from the Pane & Vino menu",
    caption: "",
  },
  {
    src: assetUrl("/img/menu4.jpg"),
    alt: "Dish from the Pane & Vino menu",
    caption: "",
  },
  {
    src: assetUrl("/img/menu5.jpg"),
    alt: "Dish from the Pane & Vino menu",
    caption: "",
  },
  {
    src: assetUrl("/img/menu6.jpg"),
    alt: "Dish from the Pane & Vino menu",
    caption: "",
  },
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

export function FoodGalleryStrip() {
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
              className={`framed-dark gallery-frame w-[68vw] shrink-0 snap-start sm:w-[46vw] md:w-[300px] ${OFFSETS[i % OFFSETS.length]}`}
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
                  loading="lazy"
                  draggable={false}
                  className="h-[260px] w-full object-cover sm:h-[340px] md:h-[420px]"
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