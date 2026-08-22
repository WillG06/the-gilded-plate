import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { FadeInSection } from "./FadeInSection";
import { DietaryTags } from "./MenuItemCard";
import { assetUrl } from "@/lib/utils";
const cimbellone = assetUrl("/img/CimbelloneBalanzone.jpg");

/** Signature dish editorial block. */
export function SignatureDish() {
  return (
    <FadeInSection className="bg-secondary">
      <div className="grid gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-16 md:py-24">
        <div className="order-2 flex flex-col justify-center md:order-1">
          <p className="eyebrow">The Signature</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Cimbellone Balanzone</h2>
          <DietaryTags tags={["Contains Dairy", "Contains Nuts"]} />
          <p className="mt-8 max-w-prose leading-relaxed text-muted-foreground">
            A toasted bun stacked with cured ham, creamy burrata and a vivid pistachio pesto — one
            of the kitchen's off-menu specials, made simply and served generously.
          </p>
          <Link to="/contact" className="btn btn--arch btn--outline mt-10 self-start">
            <span>Try it tonight</span>
          </Link>
        </div>

        <div className="order-1 self-center md:order-2">
          <div className="framed">
            <motion.img
              src={cimbellone}
              alt="Cimbellone Balanzone, a toasted bun topped with ham, burrata and pistachio pesto"
              width={1200}
              height={1200}
              loading="lazy"
              initial={{ opacity: 0, scale: 1.03 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="aspect-[4/3] w-full object-cover object-[center_78%]"
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A toasted bun topped with cured ham, burrata and a vivid pistachio pesto.
          </p>
        </div>
      </div>
    </FadeInSection>
  );
}