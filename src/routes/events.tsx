import { createFileRoute } from "@tanstack/react-router";
import { FadeInSection } from "@/components/FadeInSection";
import { EVENTS } from "@/data/events";
import { assetUrl } from "@/lib/utils";
const inkWine = assetUrl("/img/ink-wine.png");

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
  return (
    <main className="px-6 py-20 md:px-16">
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

      <FadeInSection className="mt-16 grid gap-8 md:grid-cols-2">
        {EVENTS.map((e) => (
          <article key={e.name} className="flex flex-col border border-border p-8">
            <p className="eyebrow">{e.date}</p>
            <h2 className="mt-3 font-display text-3xl">{e.name}</h2>
            <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{e.description}</p>
            <p className="mt-6 font-display text-xl">{e.price}</p>
            <a
              href={e.href}
              className="mt-6 inline-block self-start border border-wine bg-wine px-6 py-3 text-[0.7rem] tracking-[0.24em] uppercase text-primary-foreground"
            >
              Book now
            </a>
          </article>
        ))}
      </FadeInSection>
    </main>
  );
}
