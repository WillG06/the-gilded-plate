import type { CSSProperties, ReactNode } from "react";
import { assetUrl } from "@/lib/utils";
const inkTile = assetUrl("/img/ink-pattern.png");

/**
 * Dark section ground: repeating hand-drawn ink motif covered by the solid
 * wine colour at 65% opacity.
 */
export function InkPanel({
  children,
  className = "",
  as: Tag = "section",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "footer";
  id?: string;
}) {
  const style = { "--pv-ink-tile": `url(${inkTile})` } as CSSProperties;
  return (
    <Tag id={id} style={style} className={`ink-panel text-primary-foreground ${className}`}>
      {children}
    </Tag>
  );
}
