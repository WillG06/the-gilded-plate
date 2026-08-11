import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { FadeInSection } from "@/components/FadeInSection";
import { assetUrl } from "@/lib/utils";
import { StickyStory } from "@/components/StickyStory";
import { ChefSpotlight } from "@/components/ChefSpotlight";
import { SignatureDish } from "@/components/SignatureDish";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { ReviewsSection } from "@/components/ReviewsSection";
import { InstagramFeed } from "@/components/InstagramFeed";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { InkPanel } from "@/components/InkPanel";
import { PrivateDiningDialog } from "@/components/PrivateDiningDialog";
import { MenuItemCard } from "@/components/MenuItemCard";
import { MENU } from "@/data/menu";
const inkGrapes = assetUrl("/img/ink-grapes.png");

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Pane & Vino — Italian Restaurant in Erdington, Birmingham" },
      {
        name: "description",
        content:
          "Family-owned Italian kitchen in Erdington. Handmade pasta, 48-hour focaccia and an Italian wine list. Book a table in Birmingham.",
      },
      { property: "og:title", content: "Pane & Vino — Little Italy Deli, Birmingham" },
      {
        property: "og:description",
        content: "Handmade pasta, 48-hour focaccia and honest Italian wine in Erdington.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <main>
      <Hero />

      <FadeInSection className="mx-auto max-w-3xl px-6 py-24 text-center">
        <img
          src={inkGrapes}
          alt=""
          width={512}
          height={512}
          loading="lazy"
          className="mx-auto h-20 w-auto object-contain"
        />
        <p className="mt-8 font-display text-2xl leading-relaxed md:text-3xl">
          Welcome to our cosy, family-owned Italian restaurant where every dish is crafted with
          love and passion. From our handmade pasta to our crusty Roman bread, everything begins
          at six in the morning.
        </p>
      </FadeInSection>

      <MarqueeStrip />

      <StickyStory />

      <FadeInSection className="px-6 py-24 md:px-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">On the menu</p>
            <h2 className="mt-4 font-display text-5xl">A taste of tonight</h2>
          </div>
          <a
            href="/menu"
            className="text-xs tracking-[0.2em] uppercase underline underline-offset-4"
          >
            See the full menu
          </a>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {MENU.Dinner.slice(0, 3).map((item) => (
            <MenuItemCard key={item.name} item={item} />
          ))}
        </div>
      </FadeInSection>

      <SignatureDish />
      <ChefSpotlight />
      <ReviewsSection />

      <InkPanel className="px-6 py-24 text-center md:px-16">
        <p className="eyebrow !text-primary-foreground/70">Reservations</p>
        <h2 className="mt-4 font-display text-5xl">A table is waiting</h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed opacity-80">
          We hold a handful of tables for walk-ins, but weekends fill fast. Book ahead and we'll
          confirm by email.
        </p>
        <a
          href="/contact"
          className="btn btn--arch btn--ghost mt-10"
        >
          <span>Book a table</span>
        </a>
        <div className="mt-6">
          <PrivateDiningDialog
            variant="bare"
            className="!text-[0.65rem] opacity-80"
            label="Or enquire about private dining"
          />
        </div>
      </InkPanel>

      <MarqueeStrip
        items={[
          "Timeout Birmingham",
          "4.9 on Google",
          "Best New Restaurant 2025",
          "Sunday Times Food",
          "Hardens Guide",
        ]}
      />
      <InstagramFeed />
      <NewsletterSignup />
    </main>
  );
}
