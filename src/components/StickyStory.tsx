import { assetUrl } from "@/lib/utils";

const wall = assetUrl("/img/enhanced.jpg");
const inkGrapes = assetUrl("/img/ink-grapes.png");

const BLOCKS = [
  {
    title: "1991, Italy",
    body: "Our story begins with chef Shawky, who spent his whole life preparing food in Italy — including five years as Pavarotti's personal chef, starting in 1991.",
  },
  {
    title: "2015, Bologna to Birmingham",
    body: "In 2015, Shawky left Bologna to chase a dream: opening a restaurant of his own in England.",
  },
  {
    title: "Ladywood to Erdington",
    body: "Since then he's always run his own kitchens — starting in Ladywood, then Erdington, then a spell in the City Centre — before bringing it all home to Pane & Vino.",
  },
  {
    title: "Today",
    body: "One thing has followed him the whole way: a passion for honest, homemade Italian food. Fresh pasta, bakery and desserts, made the same way every single day.",
  },
];

/** Sticky image left, scrolling copy right (feature 5). */
export function StickyStory() {
  return (
    <div className="sticky-story border-y border-border">
      <div className="sticky-story__media">
        <img
          src={wall}
          alt="Interior of the restaurant"
          width={400}
          height={600}
          loading="lazy"
          className="h-[60vh] w-full object-cover md:h-full"
        />
      </div>

      <div className="sticky-story__copy px-6 py-20 md:px-16">
        <img
          src={inkGrapes}
          alt=""
          width={512}
          height={512}
          loading="lazy"
          className="h-16 w-auto object-contain"
        />
        <h2 className="mt-6 font-display text-4xl md:text-5xl">Our Story</h2>
        <div className="mt-12 space-y-24">
          {BLOCKS.map((b) => (
            <div key={b.title} className="max-w-md">
              <p className="eyebrow">{b.title}</p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}