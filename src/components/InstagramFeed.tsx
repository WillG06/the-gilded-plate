import { FadeInSection } from "./FadeInSection";
import { SITE } from "@/data/site";
import { assetUrl } from "@/lib/utils";
const pasta = assetUrl("/img/dish-pasta.jpg");
const focaccia = assetUrl("/img/focaccia.jpg");
const interior = assetUrl("/img/interior.jpg");
const wine = assetUrl("/img/hero-wine.jpg");
const chef = assetUrl("/img/chef.jpg");

const POSTS = [
  { src: pasta, alt: "Tagliatelle cacio e pepe", likes: 412, comments: 18 },
  { src: focaccia, alt: "Stacked Roman focaccia", likes: 689, comments: 44 },
  { src: interior, alt: "Candlelit dining room", likes: 301, comments: 12 },
  { src: wine, alt: "A glass of red wine", likes: 254, comments: 9 },
  { src: chef, alt: "Chef Matteo with focaccia", likes: 833, comments: 61 },
  { src: pasta, alt: "Fresh pasta on the bench", likes: 197, comments: 6 },
];

/** Instagram grid with hover engagement overlay (feature 17). */
export function InstagramFeed() {
  return (
    <FadeInSection className="px-6 py-24 md:px-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">From the kitchen</p>
          <h2 className="mt-4 font-display text-5xl">@panevino</h2>
        </div>
        <a
          href={SITE.social.instagram}
          target="_blank"
          rel="noreferrer"
          className="text-xs tracking-[0.2em] uppercase underline underline-offset-4"
        >
          Follow us
        </a>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-3">
        {POSTS.map((p, i) => (
          <li key={i} className="group relative overflow-hidden">
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer">
              <img
                src={p.src}
                alt={p.alt}
                width={1000}
                height={1000}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center gap-6 bg-wine-deep/70 text-sm text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                <span>♥ {p.likes}</span>
                <span>💬 {p.comments}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </FadeInSection>
  );
}
