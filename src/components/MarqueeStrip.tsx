interface MarqueeStripProps {
  items?: string[] | undefined;
  tone?: "light" | "dark" | undefined;
}

const DEFAULT_ITEMS = [
  "Timeout Birmingham",
  "4.9 Stars",
  "Best New Restaurant 2025",
  "Sunday Times Food",
  "Hardens Guide",
  "Squaremeal Selected",
];

/** CSS-only looping press strip (features 8 + 16). */
export function MarqueeStrip({ items = DEFAULT_ITEMS, tone = "dark" }: MarqueeStripProps) {
  const loop = [...items, ...items];
  return (
    <div
      className={
        tone === "dark"
          ? "overflow-hidden border-y border-wine-deep bg-wine-deep py-4 text-primary-foreground"
          : "overflow-hidden border-y border-border bg-secondary py-4 text-foreground"
      }
      aria-label="Press and awards"
    >
      <div className="pv-marquee-track">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 whitespace-nowrap px-8 font-display text-sm tracking-[0.2em] uppercase"
          >
            {item}
            <span aria-hidden className="opacity-50">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
