import { Leaf, Sprout, WheatOff, Nut, Milk, Moon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DietaryTag } from "@/data/menu";

interface Symbol {
  icon: LucideIcon;
  short: string;
  label: string;
}

export const DIETARY_SYMBOLS: Record<DietaryTag, Symbol> = {
  Vegan: { icon: Sprout, short: "VG", label: "Vegan" },
  Vegetarian: { icon: Leaf, short: "V", label: "Vegetarian" },
  "Gluten-Free": { icon: WheatOff, short: "GF", label: "Gluten free" },
  "Contains Nuts": { icon: Nut, short: "N", label: "Contains nuts" },
  "Contains Dairy": { icon: Milk, short: "D", label: "Contains dairy" },
  Halal: { icon: Moon, short: "H", label: "Halal" },
};

export const DIETARY_ORDER: DietaryTag[] = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Halal",
  "Contains Dairy",
  "Contains Nuts",
];

/** Small engraved circle carrying the dietary mark. */
export function DietarySymbol({ tag }: { tag: DietaryTag }) {
  const s = DIETARY_SYMBOLS[tag];
  const Icon = s.icon;
  return (
    <span
      title={s.label}
      aria-label={s.label}
      role="img"
      className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-current opacity-60"
    >
      <Icon aria-hidden className="h-3 w-3" />
    </span>
  );
}

export function DietarySymbols({ tags }: { tags?: DietaryTag[] | undefined }) {
  if (!tags?.length) return null;
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5">
      {tags.map((t) => (
        <DietarySymbol key={t} tag={t} />
      ))}
    </span>
  );
}

/** Legend explaining every mark used on the menu. */
export function DietaryLegend({ className = "" }: { className?: string }) {
  return (
    <dl className={`space-y-3 ${className}`}>
      {DIETARY_ORDER.map((tag) => {
        const s = DIETARY_SYMBOLS[tag];
        const Icon = s.icon;
        return (
          <div key={tag} className="flex items-center gap-3">
            <dt className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current opacity-60">
              <Icon aria-hidden className="h-3 w-3" />
            </dt>
            <dd className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
              {s.label}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
