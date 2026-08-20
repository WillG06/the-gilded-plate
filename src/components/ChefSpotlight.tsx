import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { assetUrl } from "@/lib/utils";
const img = assetUrl("/img/chefOwner.jpg");

const LOCK_AT = 0.65; // fraction down the image where the text locks in place

/**
 * Editorial chef spotlight (feature 6).
 *
 * The text column starts flush with the top of the image and scrolls
 * normally with the page until it reaches 65% of the way down the
 * image's height, at which point position: sticky holds it there for
 * the rest of the image's scroll.
 *
 * Two deliberate choices to keep this reliable:
 *  - The sticky offset is a *measured* pixel value (65% of the image's
 *    actual rendered height), not a CSS percentage. Percentage `top`
 *    values need a definite-height containing block to resolve against,
 *    and that's a common, easy-to-miss way this pattern silently breaks.
 *  - The fade-in here only ever animates opacity — never transform or
 *    overflow — since either of those on an ancestor is a classic way to
 *    disable position: sticky on a descendant. That's almost certainly
 *    what was happening with FadeInSection. Send over FadeInSection's
 *    source any time and I can fold this back into it properly.
 */
export function ChefSpotlight() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState(0);

  useLayoutEffect(() => {
    const el = imageRef.current;
    if (!el) return;
    const update = () => setStickyTop(el.offsetHeight * LOCK_AT);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="grid gap-12 px-6 py-24 md:grid-cols-2 md:gap-20 md:px-16"
    >
      <div ref={imageRef} className="framed self-start">
        <img
          src={img}
          alt="A tray of freshly baked focaccia and sourdough loaves in the Pane & Vino kitchen"
          width={600}
          height={400}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
      </div>

      <div>
        <div className="flex flex-col md:sticky" style={{ top: stickyTop }}>
          <p className="eyebrow">Chef Spotlight</p>
          <h2 className="mt-4 font-display text-5xl">Shawky</h2>
          <p className="mt-2 text-sm tracking-[0.2em] uppercase text-muted-foreground">
            Head Chef &amp; Founder
          </p>
          <p className="mt-8 max-w-prose leading-relaxed text-muted-foreground">
            Shawky has worked as a food preparer his whole life in Italy, including five years as
            Pavarotti's personal chef, starting in 1991. In 2015 he left Bologna to pursue a
            dream of opening a restaurant in England — first in Ladywood, then Erdington, then
            the City Centre, and now back home at Pane &amp; Vino. Wherever he's cooked, one thing
            has stayed the same: homemade, genuine Italian food, made fresh every day.
          </p>
        </div>
      </div>
    </motion.section>
  );
}