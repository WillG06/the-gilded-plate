import { assetUrl } from "@/lib/utils";

const wall = assetUrl("/img/enhanced.jpg");
const inkGrapes = assetUrl("/img/ink-grapes.png");

const BLOCKS = [
  {
    title: "1991, Bologna",
    body: "Our story begins with chef Shawky, who has prepared food his whole life in Italy, including a year as Pavarotti's personal chef.",
  },
  {
    title: "2015, Birmingham",
    body: "Shawky left Bologna to chase a restaurant of his own in England. There he met Matteo, a young chef from Veneto trained under Gabriele Bonci and Gianluca Fonsato.",
  },
  {
    title: "2023, Erdington",
    body: "After seven years running his own place downtown, Shawky sold up. Together the two friends opened Pane & Vino — old-school method, new-school craft.",
  },
  {
    title: "Today",
    body: "The beginning of a new story, which we hope you'll be part of. Everything is made in house, every morning, by hand.",
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
