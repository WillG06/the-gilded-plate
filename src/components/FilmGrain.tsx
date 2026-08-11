import { useEffect } from "react";

/** SVG turbulence grain over the whole viewport (feature 2). */
export function FilmGrain() {
  useEffect(() => {
    document.body.classList.add("film-grain");
    return () => document.body.classList.remove("film-grain");
  }, []);

  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <filter id="pv-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </svg>
  );
}
