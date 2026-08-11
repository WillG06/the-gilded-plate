import { FadeInSection } from "./FadeInSection";
import { assetUrl } from "@/lib/utils";
const chef = assetUrl("/img/chef.jpg");

/** Editorial chef spotlight (feature 6). */
export function ChefSpotlight() {
  return (
    <FadeInSection className="grid gap-12 px-6 py-24 md:grid-cols-2 md:gap-20 md:px-16">
      <div className="framed self-start">
      <img
        src={chef}
        alt="A tray of freshly baked focaccia and sourdough loaves in the Pane & Vino kitchen"
        width={1000}
        height={1300}
        loading="lazy"
        className="aspect-[4/5] w-full object-cover"
      />
      </div>
      <div className="flex flex-col justify-center">
        <p className="eyebrow">Chef Spotlight</p>
        <h2 className="mt-4 font-display text-5xl">Matteo Rossi</h2>
        <p className="mt-2 text-sm tracking-[0.2em] uppercase text-muted-foreground">
          Head Chef &amp; Co-founder
        </p>
        <p className="mt-8 max-w-prose leading-relaxed text-muted-foreground">
          Matteo grew up in Veneto, where Sunday started with flour on the table and ended with
          the last bottle emptied. He trained with Gabriele Bonci and Gianluca Fonsato before
          spending five years in Birmingham's finest kitchens. His dough ferments for forty-eight
          hours because that is how long it takes. He still rolls every ribbon of tagliatelle by
          hand, before service, every single day.
        </p>
        <blockquote className="mt-10 border-l-2 border-wine pl-6 font-display text-2xl leading-snug">
          “If my grandmother wouldn't send it out of her kitchen, it doesn't leave mine.”
        </blockquote>
      </div>
    </FadeInSection>
  );
}
