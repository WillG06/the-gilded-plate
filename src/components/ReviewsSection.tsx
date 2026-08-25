// ReviewsSection.tsx
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEWS_URL, REVIEWS } from "@/data/reviews";
import { FadeInSection } from "./FadeInSection";

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-3 w-3 ${filled ? "fill-wine" : "fill-border"}`}
      aria-hidden
    >
      <path d="M10 1.5l2.2 4.6 5 .7-3.6 3.6.9 5-4.5-2.4-4.5 2.4.9-5L2.8 6.8l5-.7L10 1.5z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < rating} />
      ))}
    </div>
  );
}

function GoogleMark() {
  return (
    <span
      aria-hidden
      className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[0.6rem] font-semibold leading-none"
    >
      G
    </span>
  );
}

function ReviewCard({ name, rating, text }: { name: string; rating: number; text: string }) {
  return (
    <figure className="flex h-full flex-col border-t border-border pt-8">
      <Stars rating={rating} />
      <blockquote className="mt-5 flex-1 font-display text-lg leading-snug line-clamp-6">
        "{text}"
      </blockquote>
      <figcaption className="mt-6 text-xs tracking-[0.2em] uppercase text-muted-foreground">
        {name}
      </figcaption>
    </figure>
  );
}

/* reviews render as a 3x2 hairline grid on desktop. */
export function ReviewsSection() {
  const shown = REVIEWS.slice(0, 6);
  return (
    <FadeInSection className="px-6 py-24 md:px-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Word of mouth</p>
          <h2 className="mt-4 font-display text-5xl">What our guests are saying</h2>

          <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-wine"
          >
          <GoogleMark />
          <span className="text-sm">
            <span className="font-display text-lg text-foreground">
              {GOOGLE_RATING.toFixed(1)}
            </span>{" "}
            from {GOOGLE_REVIEW_COUNT} Google reviews
          </span>
        </a>
      </div>
      </div>

      <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((r) => (
          <ReviewCard key={r.name} {...r} />
        ))}
      </div>

      <div className="mt-14">

        <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noreferrer"
        className="text-xs tracking-[0.2em] uppercase text-muted-foreground underline underline-offset-[6px] transition-colors hover:text-wine"
        >
        Read all reviews on Google
      </a>
    </div>
    </FadeInSection >
  );
}