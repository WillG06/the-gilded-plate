import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FadeInSection } from "./FadeInSection";
import { DietaryTags } from "./MenuItemCard";
import { assetUrl } from "@/lib/utils";
const steak = assetUrl("/img/Steak.jpg");
const steak2 = assetUrl("/img/steak2.jpg");
const table = assetUrl("/img/tableFood.jpg");
const pairing = assetUrl("/img/wineParing.jpg");

const PLATES = [
  {
    src: steak,
    label: "Cacio e Pepe",
    alt: "Tagliatelle cacio e pepe twirled on a fork above a dark bowl",
    note: "Egg pasta rolled at nine, Pecorino aged eight months, pepper toasted to order.",
  },
  {
    src: steak2,
    label: "Steak",
    alt: "A perfectly cooked steak on a plate",
    note: "Premium cut, seasoned and grilled to perfection.",
  },
  {
    src: table,
    label: "Table Food",
    alt: "A selection of dishes served on a wooden table",
    note: "A variety of our signature dishes, presented beautifully on a wooden table.",
  },
  {
    src: pairing,
    label: "The Pairing",
    alt: "A glass of Chianti Classico beside a plate of pasta and Parmigiano",
    note: "Chianti Classico Riserva — sour cherry, leather, a long dusty finish.",
  },
];

/** Signature dish editorial block with a plate-by-plate image switcher. */
export function SignatureDish() {
  const [i, setI] = useState(0);
  const plate = PLATES[i] ?? PLATES[0]!;

  return (
    <FadeInSection className="bg-secondary">
      <div className="grid gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-16 md:py-24">
        <div className="order-2 flex flex-col justify-center md:order-1">
          <p className="eyebrow">The Signature</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Tagliatelle Cacio e Pepe</h2>
          <p className="mt-8 max-w-prose leading-relaxed text-muted-foreground">
            Three ingredients, nowhere to hide. Egg pasta rolled thin at nine in the morning,
            Pecorino Romano aged eight months, and Tellicherry pepper toasted to order. It is
            emulsified in a copper pan, finished with a ladle of starchy water and nothing else.
            It has been on the menu since our first service and it is not leaving.
          </p>
          <DietaryTags tags={["Vegetarian", "Contains Dairy"]} />
          <a href="/contact" className="btn btn--arch btn--outline mt-10 self-start">
            <span>Try it tonight</span>
          </a>
        </div>

        <div className="order-1 self-center md:order-2">
          <div className="framed">
            <AnimatePresence mode="wait">
              <motion.img
                key={plate.src}
                src={plate.src}
                alt={plate.alt}
                width={1200}
                height={1200}
                loading="lazy"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="aspect-[4/3] w-full object-cover"
              />
            </AnimatePresence>
          </div>
          <p className="mt-4 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
            {plate.note}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {PLATES.map((p, idx) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setI(idx)}
                aria-current={idx === i}
                className={`text-[0.65rem] tracking-[0.24em] uppercase transition-colors ${
                  idx === i
                    ? "text-wine underline decoration-gold underline-offset-[6px]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
