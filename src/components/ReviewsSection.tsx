import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, REVIEWS } from "@/data/reviews";
import { FadeInSection } from "./FadeInSection";

/** Small single-color star, sized for a compact rating row. */
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

/** Quiet "G" badge — a deliberate, minimal stand-in for the Google mark
 *  rather than reproducing the full colour logo, so it reads as a subtle
 *  credibility cue instead of a widget badge. */
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
    <figure className="border-t border-border pt-8">
      <Stars rating={rating} />
      <blockquote className="mt-5 max-w-prose font-display text-xl leading-snug line-clamp-4">
        "{text}"
      </blockquote>
      <figcaption className="mt-6 text-xs tracking-[0.2em] uppercase text-muted-foreground">
        {name}
      </figcaption>
    </figure>
  );
}

/** Google review section (feature 15). One aggregate rating up top for
 *  credibility, then a hairline grid of pull-quotes rather than
 *  boxed, widget-style cards. */
export function ReviewsSection() {
  const shown = REVIEWS.slice(0, 4);
  return (
    <FadeInSection className="px-6 py-24 md:px-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Word of mouth</p>
          <h2 className="mt-4 font-display text-5xl">What our guests are saying</h2>
          <a
            href="https://www.google.com/search?q=Pane%26Vino+Erdington+reviews"
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

          <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {shown.map((r) => (
              <ReviewCard key={r.name} {...r} />
            ))}
          </div>

          <div className="mt-14">
            <a
              href="https://www.google.com/search?q=Pane%26Vino+Erdington+reviews"
              target="_blank"
              rel="noreferrer"
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground underline underline-offset-[6px] transition-colors hover:text-wine"
            >
              Read all reviews on Google
            </a>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
