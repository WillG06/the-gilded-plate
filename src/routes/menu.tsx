import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FadeInSection } from "@/components/FadeInSection";
import { InkPanel } from "@/components/InkPanel";
import { PrivateDiningDialog } from "@/components/PrivateDiningDialog";
import {
  DietaryLegend,
  DietarySymbols,
  DIETARY_ORDER,
} from "@/components/DietarySymbols";
import { COURSE_ORDER, MENU, type DietaryTag, type MenuService } from "@/data/menu";
import { assetUrl } from "@/lib/utils";
const inkGrapes = assetUrl("/img/ink-grapes.png");

const SERVICES: MenuService[] = ["Lunch", "Dinner", "Brunch", "Drinks"];

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => ({
    meta: [
      { title: "Menu — Pane & Vino, Erdington" },
      {
        name: "description",
        content:
          "Lunch, dinner, brunch and drinks at Pane & Vino. Handmade pasta, Roman focaccia and Italian wine, with allergen information on every dish.",
      },
      { property: "og:title", content: "Menu — Pane & Vino" },
      { property: "og:description", content: "Lunch, dinner, brunch and drinks in Erdington." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
});

function MenuPage() {
  const [service, setService] = useState<MenuService>("Dinner");
  const [diets, setDiets] = useState<DietaryTag[]>([]);

  const items = useMemo(
    () =>
      MENU[service].filter((i) => diets.every((d) => i.tags?.includes(d))),
    [service, diets],
  );

  const courses = COURSE_ORDER.filter((c) => items.some((i) => i.course === c));

  function toggleDiet(tag: DietaryTag) {
    setDiets((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  return (
    <main>
      <InkPanel className="px-6 py-14 text-center md:px-16 md:py-16">
        <img
          src={inkGrapes}
          alt=""
          width={512}
          height={512}
          className="mx-auto h-12 w-auto object-contain opacity-90 invert"
        />
        <p className="eyebrow mt-4 !text-primary-foreground/70">The menu</p>
        <h1 className="mt-3 font-display text-5xl">Eat with us</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed opacity-80">
          Menus change with the market and the season. Every dish carries its allergen marks —
          please tell your server about anything we should know.
        </p>
      </InkPanel>


      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-20 md:px-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20">
        {/* Filter rail */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Service</p>
          <ul className="mt-4 space-y-2 border-l border-border pl-5">
            {SERVICES.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => setService(s)}
                  aria-pressed={service === s}
                  className={`font-display text-lg transition-colors ${
                    service === s
                      ? "text-wine underline underline-offset-[6px]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-12">Dietary</p>
          <ul className="mt-4 space-y-2 border-l border-border pl-5">
            {DIETARY_ORDER.map((tag) => (
              <li key={tag}>
                <button
                  type="button"
                  onClick={() => toggleDiet(tag)}
                  aria-pressed={diets.includes(tag)}
                  className={`text-xs tracking-[0.16em] uppercase transition-colors ${
                    diets.includes(tag)
                      ? "text-wine underline underline-offset-[6px]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
          {diets.length > 0 && (
            <button
              type="button"
              onClick={() => setDiets([])}
              className="mt-6 text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground underline underline-offset-4"
            >
              Clear filters
            </button>
          )}

          <p className="eyebrow mt-12">Key</p>
          <DietaryLegend className="mt-4" />

          <a
            href="/menus/pane-e-vino.pdf"
            className="mt-12 inline-block text-[0.65rem] tracking-[0.2em] uppercase underline underline-offset-4"
          >
            Download PDF menu
          </a>

          <div className="mt-12 border-t border-border pt-8">
            <p className="eyebrow">Private dining</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A back room for up to 24 — one long table, its own service, a door that closes.
            </p>
            <PrivateDiningDialog className="mt-5 w-full" label="Enquire" />
          </div>
        </aside>


        {/* Traditional printed menu */}
        <FadeInSection key={`${service}-${diets.join()}`}>
          <div className="border border-border bg-card px-6 py-14 md:px-16 md:py-20">
            <div className="text-center">
              <p className="eyebrow">Pane &amp; Vino</p>
              <h2 className="mt-3 font-display text-4xl tracking-[0.08em] uppercase">
                {service}
              </h2>
              <p className="font-script mt-1 text-3xl text-muted-foreground">
                alla carta
              </p>
            </div>

            {courses.length === 0 && (
              <p className="mt-16 text-center text-sm text-muted-foreground">
                Nothing on this service matches those marks. Try clearing a filter.
              </p>
            )}

            {courses.map((course) => (
              <section key={course} className="mt-16">
                <h3 className="text-center text-[0.7rem] tracking-[0.32em] uppercase text-muted-foreground">
                  {course}
                </h3>
                <div
                  aria-hidden
                  className="mx-auto mt-3 h-px w-16 bg-[color-mix(in_oklab,var(--gold)_70%,transparent)]"
                />

                <ul className="mt-8 space-y-8">
                  {items
                    .filter((i) => i.course === course)
                    .map((item) => (
                      <li key={item.name} className="mx-auto max-w-2xl">
                        <div className="flex items-baseline">
                          <h4 className="font-display text-xl">{item.name}</h4>
                          <span aria-hidden className="menu-leader" />
                          <span className="font-display text-lg text-muted-foreground">
                            {item.price}
                          </span>
                        </div>
                        <div className="mt-2 flex items-start justify-between gap-6">
                          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                          <DietarySymbols tags={item.tags} />
                        </div>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        </FadeInSection>
      </div>
    </main>
  );
}
