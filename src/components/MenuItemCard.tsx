import type { DietaryTag, MenuItem } from "@/data/menu";
import { DietarySymbols } from "./DietarySymbols";

export function DietaryTags({ tags }: { tags?: DietaryTag[] | undefined }) {
  if (!tags?.length) return null;
  return (
    <div className="mt-3">
      <DietarySymbols tags={tags} />
    </div>
  );
}

/** Menu card with photo, copy, price and dietary pills (features 9 + 10). */
export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex flex-col">
      <div className="framed">
        <div className="overflow-hidden bg-secondary">
        <img
          src={item.image}
          alt={item.name}
          width={1400}
          height={1000}
          loading="eager"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:aspect-[4/3]"
        />
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl">{item.name}</h3>
        <span className="shrink-0 text-sm text-muted-foreground">{item.price}</span>
      </div>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
      <DietaryTags tags={item.tags} />
    </article>
  );
}
