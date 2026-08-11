import { useState } from "react";
import { FadeInSection } from "./FadeInSection";
import { REVIEWS } from "@/data/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < rating ? "fill-wine" : "fill-border"}`}
          aria-hidden
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ name, rating, text }: { name: string; rating: number; text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="flex flex-col border border-border bg-card p-6">
      <Stars rating={rating} />
      <h3 className="mt-4 font-display text-xl">{name}</h3>
      <p className={`mt-3 text-sm leading-relaxed text-muted-foreground ${open ? "" : "line-clamp-3"}`}>
        “{text}”
      </p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-3 self-start text-xs tracking-[0.18em] uppercase underline underline-offset-4"
      >
        {open ? "Read less" : "Read more"}
      </button>
      <p className="mt-6 text-xs tracking-[0.18em] uppercase text-muted-foreground">
        via Google Reviews
      </p>
    </article>
  );
}

/** Google review card grid (feature 15). */
export function ReviewsSection() {
  return (
    <FadeInSection className="px-6 py-24 md:px-16">
      <p className="eyebrow">Word of mouth</p>
      <h2 className="mt-4 font-display text-5xl">4.9 from our neighbours</h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {REVIEWS.slice(0, 4).map((r) => (
          <ReviewCard key={r.name} {...r} />
        ))}
      </div>
      <div className="mt-10">
        <a
          href="https://www.google.com/search?q=Pane+%26+Vino+Erdington+reviews"
          target="_blank"
          rel="noreferrer"
          className="text-xs tracking-[0.2em] uppercase text-muted-foreground underline underline-offset-[6px] transition-colors hover:text-wine"
        >
          View more reviews
        </a>
      </div>
    </FadeInSection>
  );
}
