import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FadeInSection } from "@/components/FadeInSection";
import { FoodGalleryStrip } from "@/components/FoodGalleryStrip";
import { InkPanel } from "@/components/InkPanel";
import { PrivateDiningDialog } from "@/components/PrivateDiningDialog";
import {
  DietaryLegend,
  DietarySymbols,
  DIETARY_ORDER,
} from "@/components/DietarySymbols";
import {
  BEERS_AND_CIDER,
  COCKTAILS,
  COFFEES,
  COURSE_EXTRAS,
  DRINKS_FOOTNOTE,
  FOOD_FOOTNOTE,
  JUICE,
  MENU,
  SODA,
  SPIRITS,
  TAB_COURSES,
  TAB_ORDER,
  WATER,
  WINE_SECTIONS,
  type Course,
  type DietaryTag,
  type MenuTab,
} from "@/data/menu";
import { assetUrl } from "@/lib/utils";
const inkGrapes = assetUrl("/img/ink-grapes.png");

const FOOD_TABS: MenuTab[] = ["Pasta", "Pizza & Desserts", "Secondi & Sides"];

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => ({
    meta: [
      { title: "Menu — Pane & Vino, Erdington" },
      {
        name: "description",
        content:
          "Pasta, pizza, secondi, wine and cocktails at Pane & Vino. Handmade pasta, dry-aged steaks and an Italian wine list, with allergen information on every dish.",
      },
      { property: "og:title", content: "Menu — Pane & Vino" },
      { property: "og:description", content: "Pasta, pizza, secondi, wine and cocktails in Erdington." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
});

function MenuPage() {
  const [tab, setTab] = useState<MenuTab>("Pasta");
  const [diets, setDiets] = useState<DietaryTag[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  // Jump to the top of the printed-menu panel whenever a new tab is opened,
  // so switching from a long page (e.g. Wine & Cocktails) doesn't leave the
  // reader scrolled halfway down the next one.
  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [tab]);

  const isFoodTab = FOOD_TABS.includes(tab);

  const courses = (TAB_COURSES[tab] ?? []) as Course[];

  const itemsByCourse = useMemo(() => {
    const map = new Map<Course, typeof MENU>();
    for (const course of courses) {
      map.set(
        course,
        MENU.filter(
          (item) => item.course === course && diets.every((d) => item.tags?.includes(d)),
        ),
      );
    }
    return map;
  }, [courses, diets]);

  function selectTab(next: MenuTab) {
    setTab(next);
    setDiets([]); // dietary marks only apply to food pages
  }

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
          Our menu changes with the market and the season. Every dish carries its allergen marks —
          please tell your server about anything we should know.
        </p>
      </InkPanel>

      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-20 md:px-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20">
        {/* Filter rail */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Menu</p>
          <ul className="mt-4 space-y-2 border-l border-border pl-5">
            {TAB_ORDER.map((t) => (
              <li key={t}>
                <button
                  type="button"
                  onClick={() => selectTab(t)}
                  aria-pressed={tab === t}
                  className={`font-display text-lg transition-colors ${
                    tab === t
                      ? "text-wine underline underline-offset-[6px]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>

          {isFoodTab && (
            <>
              <p className="eyebrow mt-12">Dietary</p>
              <ul className="mt-4 space-y-2 border-l border-border pl-5">
                {DIETARY_ORDER.filter((tag: DietaryTag) =>
                  ["Vegetarian", "Vegan", "Gluten-Free"].includes(tag),
                ).map((tag: DietaryTag) => (
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
            </>
          )}

          <a
            href={assetUrl("/menus/pane-e-vino.pdf")}
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
        <FadeInSection key={`${tab}-${diets.join()}`}>
          <div ref={panelRef} className="border border-border bg-card px-6 py-14 md:px-16 md:py-20 scroll-mt-28">
            <div className="text-center">
              <p className="eyebrow">Pane &amp; Vino</p>
              <h2 className="mt-3 font-display text-4xl tracking-[0.08em] uppercase">{tab}</h2>
              <p className="font-script mt-1 text-3xl text-muted-foreground">alla carta</p>
            </div>

            {isFoodTab ? (
              <FoodPages courses={courses} itemsByCourse={itemsByCourse} />
            ) : tab === "Wine & Cocktails" ? (
              <WineAndCocktailsPage />
            ) : (
              <SoftDrinksPage />
            )}
          </div>
        </FadeInSection>
      </div>

      <FoodGalleryStrip />
    </main>
  );
}

function FoodPages({
  courses,
  itemsByCourse,
}: {
  courses: Course[];
  itemsByCourse: Map<Course, typeof MENU>;
}) {
  const anyItems = courses.some((c) => (itemsByCourse.get(c) ?? []).length > 0);

  if (!anyItems) {
    return (
      <p className="mt-16 text-center text-sm text-muted-foreground">
        Nothing on this page matches those marks. Try clearing a filter.
      </p>
    );
  }

  return (
    <>
      {courses.map((course) => {
        const items = itemsByCourse.get(course) ?? [];
        if (items.length === 0) return null;
        const extras = COURSE_EXTRAS[course];

        return (
          <section key={course} className="mt-16">
            <h3 className="text-center text-[0.7rem] tracking-[0.32em] uppercase text-muted-foreground">
              {course}
            </h3>
            <div
              aria-hidden
              className="mx-auto mt-3 h-px w-16 bg-[color-mix(in_oklab,var(--gold)_70%,transparent)]"
            />

            {extras && (
              <p className="mx-auto mt-4 max-w-2xl text-center text-xs italic text-muted-foreground">
                {extras.map((e) => `${e.label} ${e.price}`).join(" · ")}
              </p>
            )}

            <ul className="mt-8 space-y-8">
              {items.map((item) => (
                <li key={item.name} className="mx-auto max-w-2xl">
                  <div className="flex items-baseline">
                    <h4 className="font-display text-xl">
                      {item.name}
                      {item.note && <span className="align-super text-xs">*</span>}
                    </h4>
                    <span aria-hidden className="menu-leader" />
                    <span className="font-display text-lg text-muted-foreground">{item.price}</span>
                  </div>
                  <div className="mt-2 flex items-start justify-between gap-6">
                    <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                      {item.note && (
                        <span className="block text-xs italic text-muted-foreground/70">
                          *{item.note}
                        </span>
                      )}
                    </p>
                    <DietarySymbols tags={item.tags} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <p className="mx-auto mt-16 max-w-2xl text-center text-xs text-muted-foreground">
        {FOOD_FOOTNOTE}
      </p>
    </>
  );
}

function MenuLine({
  name,
  price,
  description,
}: {
  name: string;
  price: string;
  description?: string | undefined;
}) {
  return (
    <li className="mx-auto max-w-2xl">
      <div className="flex items-baseline">
        <h4 className="font-display text-xl">{name}</h4>
        <span aria-hidden className="menu-leader" />
        <span className="font-display text-lg text-muted-foreground">{price}</span>
      </div>
      {description && (
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </li>
  );
}

function WineAndCocktailsPage() {
  return (
    <>
      {WINE_SECTIONS.map((section) => (
        <section key={section.title} className="mt-16">
          <h3 className="text-center text-[0.7rem] tracking-[0.32em] uppercase text-muted-foreground">
            {section.title}
          </h3>
          <p className="mt-1 text-center text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground/60">
            {section.servingLabel}
          </p>
          <div
            aria-hidden
            className="mx-auto mt-3 h-px w-16 bg-[color-mix(in_oklab,var(--gold)_70%,transparent)]"
          />
          <ul className="mt-8 space-y-6">
            {section.items.map((wine) => (
              <MenuLine
                key={wine.name}
                name={wine.name}
                price={wine.pour ? `${wine.pour} / ${wine.bottle}` : wine.bottle}
                description={wine.region}
              />
            ))}
          </ul>
        </section>
      ))}

      <section className="mt-16">
        <h3 className="text-center text-[0.7rem] tracking-[0.32em] uppercase text-muted-foreground">
          Beers &amp; Cider
        </h3>
        <div
          aria-hidden
          className="mx-auto mt-3 h-px w-16 bg-[color-mix(in_oklab,var(--gold)_70%,transparent)]"
        />
        <ul className="mt-8 space-y-6">
          {BEERS_AND_CIDER.map((b) => (
            <MenuLine key={b.name} name={b.name} price={b.price} description={b.size} />
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h3 className="text-center text-[0.7rem] tracking-[0.32em] uppercase text-muted-foreground">
          Cocktails
        </h3>
        <div
          aria-hidden
          className="mx-auto mt-3 h-px w-16 bg-[color-mix(in_oklab,var(--gold)_70%,transparent)]"
        />
        <ul className="mt-8 space-y-6">
          {COCKTAILS.map((c) => (
            <MenuLine key={c.name} name={c.name} price={c.price} description={c.description} />
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h3 className="text-center text-[0.7rem] tracking-[0.32em] uppercase text-muted-foreground">
          Spirits
        </h3>
        <div
          aria-hidden
          className="mx-auto mt-3 h-px w-16 bg-[color-mix(in_oklab,var(--gold)_70%,transparent)]"
        />
        <ul className="mt-8 space-y-6">
          {SPIRITS.map((s) => (
            <MenuLine key={s.name} name={s.name} price={s.price} description={s.size} />
          ))}
        </ul>
      </section>

      <p className="mx-auto mt-16 max-w-2xl text-center text-xs text-muted-foreground">
        {DRINKS_FOOTNOTE}
      </p>
    </>
  );
}

function SoftDrinksPage() {
  const groups: { title: string; items: typeof COFFEES }[] = [
    { title: "Coffees", items: COFFEES },
    { title: "Soda", items: SODA },
    { title: "Juice", items: JUICE },
    { title: "Water", items: WATER },
  ];

  return (
    <>
      {groups.map((group) => (
        <section key={group.title} className="mt-16">
          <h3 className="text-center text-[0.7rem] tracking-[0.32em] uppercase text-muted-foreground">
            {group.title}
          </h3>
          <div
            aria-hidden
            className="mx-auto mt-3 h-px w-16 bg-[color-mix(in_oklab,var(--gold)_70%,transparent)]"
          />
          <ul className="mt-8 space-y-6">
            {group.items.map((item) => (
              <MenuLine key={item.name} name={item.name} price={item.price} />
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}