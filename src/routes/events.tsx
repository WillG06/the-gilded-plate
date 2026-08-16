import { createFileRoute } from "@tanstack/react-router";
import { FadeInSection } from "@/components/FadeInSection";
import { EVENTS } from "@/data/events";
import { assetUrl } from "@/lib/utils";

const inkWine = assetUrl("/img/ink-wine.png");

const GALLERY_IMAGES = [
  {
    src: assetUrl("/img/interior.jpg"),
    alt: "The dining room at Pane & Vino, tables set for the evening",
  },
  {
    src: assetUrl("/img/focaccia.jpg"),
    alt: "Stacked slices of freshly baked Roman focaccia",
  },
  {
    src: assetUrl("/img/wineLights.jpg"),
    alt: "Wine glasses catching candlelight in the cellar",
  },
  {
    src: assetUrl("/img/Resturant.jpg"),
    alt: "Red wine poured into a glass in the cellar",
  },
  {
    src: assetUrl("/img/winePair.jpg"),
    alt: "A wine pairing laid out on the counter",
  },
];

// Loose rotation cycled across tiles so the gallery feels pinned-up, not gridded.
const ROTATIONS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1"];

// Bento spans cycled across image tiles (desktop only — mobile stays a clean 2-col grid).
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

/** Interleaves photos with event cards: a couple of images, an event, repeat. */
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
    <main className="bg-paper px-6 py-20 md:px-16">
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

      <FadeInSection className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:auto-rows-[240px] md:grid-cols-4 md:grid-flow-dense md:gap-8">
        {gallery.map((item, i) =>
          item.type === "image" ? (
            <div
              key={`img-${i}`}
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
            </div>
          ) : (
            <article
              key={item.event.name}
              className="col-span-2 flex flex-col justify-between border border-border bg-background p-6 md:col-span-2 md:p-8"
            >
              <div>
                <p className="eyebrow">{item.event.date}</p>
                <h2 className="mt-3 font-display text-2xl md:text-3xl">{item.event.name}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.event.description}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="font-display text-xl">{item.event.price}</p>
                <a href={item.event.href} className="btn btn--outline btn--sm">
                  <span>Book now</span>
                </a>
              </div>
            </article>
          ),
        )}
      </FadeInSection>
    </main>
  );
}