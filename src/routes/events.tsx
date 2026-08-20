import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FadeInSection } from "@/components/FadeInSection";
import { GalleryStrip } from "@/components/GalleryStrip";
import { EVENTS } from "@/data/events";
import { assetUrl } from "@/lib/utils";

const inkWine = assetUrl("/img/ink-wine.png");

const GALLERY_IMAGES = [
  { src: assetUrl("/img/Interior2.jpg"), alt: "Warmly lit dining room with wooden tables, chairs and wine bottles displayed along the walls" },
  { src: assetUrl("/img/interior3.jpg"), alt: "Restaurant dining area with wooden tables, blue chairs and light wood panelled walls" },
  { src: assetUrl("/img/hero_1.jpg"), alt: "Warmly lit dining room with wooden tables, chairs and wine bottles displayed along the walls" },
  { src: assetUrl("/img/hero_2.jpg"), alt: "Restaurant dining area with wooden tables, blue chairs and light wood panelled walls" },
  { src: assetUrl("/img/hero_3.jpg"), alt: "Light wood panelled restaurant wall decorated with framed artwork, wine bottles and greenery" },
  { src: assetUrl("/img/hero_4.jpg"), alt: "Cosy restaurant interior with wooden tables, warm pendant lighting and wine displayed on the walls" },
  { src: assetUrl("/img/heroWall.jpg"), alt: "Decorative restaurant wall with wooden shelving, wine bottles, framed pictures and plants" },
  { src: assetUrl("/img/heroWall2.jpg"), alt: "Warm restaurant interior featuring wooden walls, wine displays and ambient lighting" },
  { src: assetUrl("/img/wallClose.jpg"), alt: "Close-up of the restaurant's wooden feature wall with wine bottles and decorative details" },
];

const ROTATIONS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1"];

const IMAGE_SPANS = [
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
];

type GalleryItem =
  | { type: "image"; src: string; alt: string; span: string; rotation: string }
  | { type: "event"; event: (typeof EVENTS)[number] };

function buildGallery(events: typeof EVENTS): GalleryItem[] {
  const items: GalleryItem[] = [];
  let cursor = 0;

  const pushImage = () => {
    const img = GALLERY_IMAGES[cursor % GALLERY_IMAGES.length]!;
    items.push({
      type: "image",
      src: img.src,
      alt: img.alt,
      span: IMAGE_SPANS[cursor % IMAGE_SPANS.length]!,
      rotation: ROTATIONS[cursor % ROTATIONS.length]!,
    });
    cursor += 1;
  };

  pushImage();
  pushImage();

  events.forEach((event, i) => {
    items.push({ type: "event", event });
    if (i < events.length - 1) {
      pushImage();
      if (i % 2 === 0) pushImage();
    }
  });

  pushImage();

  return items;
}

// Staggered entrance: children cascade in one after another instead of firing together.
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export const Route = createFileRoute("/events")({
  component: EventsPage,
  head: () => ({
    meta: [
      { title: "Events — Pane & Vino, Erdington" },
      {
        name: "description",
        content:
          "Wine suppers, pasta masterclasses and long-table Sundays at Pane & Vino in Erdington, Birmingham. Book your place.",
      },
      { property: "og:title", content: "Events — Pane & Vino" },
      {
        property: "og:description",
        content: "Wine suppers, pasta classes and long-table Sundays in Birmingham.",
      },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
});

function EventsPage() {
  const gallery = buildGallery(EVENTS);

  return (
    <main className="bg-paper">
      <div className="px-6 py-20 md:px-16">
        <FadeInSection>
          <img
            src={inkWine}
            alt=""
            width={512}
            height={512}
            loading="lazy"
            className="h-20 w-auto object-contain"
          />
          <p className="eyebrow mt-6">What's on</p>
          <h1 className="mt-4 font-display text-6xl">Events</h1>
          <p className="mt-6 max-w-prose text-muted-foreground">
            Small rooms, long dinners. Places are limited and go quickly — reserve early.
          </p>
        </FadeInSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-flow-dense md:auto-rows-[240px] md:grid-cols-4 md:gap-8"
        >
          {gallery.map((item, i) =>
            item.type === "image" ? (
              <motion.div
                key={`img-${i}`}
                variants={itemVariants}
                className={`framed ${item.span} ${item.rotation} transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="h-full min-h-40 w-full object-cover"
                />
              </motion.div>
            ) : (
              <motion.article
                key={item.event.name}
                variants={itemVariants}
                className="framed col-span-2 flex flex-col justify-between p-6 transition-transform duration-500 hover:-translate-y-1 md:col-span-2 md:p-8"
              >
                <div>
                  <p className="eyebrow">{item.event.date}</p>
                  <h2 className="mt-3 font-display text-2xl md:text-3xl">{item.event.name}</h2>
                  <span className="mt-4 block h-px w-10 bg-wine/40" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {item.event.description}
                  </p>
                </div>
                <div className="mt-8 flex items-end justify-between gap-4">
                  <p className="font-script text-3xl text-wine">{item.event.price}</p>
                  <a href={item.event.href} className="btn btn--wine btn--arch btn--sm">
                    <span>Book now</span>
                  </a>
                </div>
              </motion.article>
            ),
          )}
        </motion.div>
      </div>

      <GalleryStrip />
    </main>
  );
}