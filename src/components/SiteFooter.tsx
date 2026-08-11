import { Gift } from "lucide-react";
import { SITE } from "@/data/site";
import { assetUrl } from "@/lib/utils";
const inkWine = assetUrl("/img/ink-wine.png");

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-paper px-6 py-16 text-center">
      <img
        src={inkWine}
        alt="Ink drawing of a wine bottle and glasses"
        width={512}
        height={512}
        loading="lazy"
        className="mx-auto h-20 w-auto object-contain opacity-80"
      />
      <p className="mt-4 font-display text-3xl tracking-[0.14em] uppercase">Pane &amp; Vino</p>
      <p className="font-script text-2xl text-muted-foreground">{SITE.tagline}</p>

      <div className="mx-auto mt-10 max-w-3xl rule-line pt-10">
        <ul className="flex flex-wrap items-center justify-center gap-8 text-xs tracking-[0.2em] uppercase">
          <li>
            <a href={SITE.social.instagram} className="underline underline-offset-4">
              Instagram
            </a>
          </li>
          <li>
            <a href={SITE.social.facebook} className="underline underline-offset-4">
              Facebook
            </a>
          </li>
          <li>
            <a href={SITE.social.tripadvisor} className="underline underline-offset-4">
              Tripadvisor
            </a>
          </li>
          <li>
            <a
              href={SITE.giftVouchers}
              className="inline-flex items-center gap-1.5 underline underline-offset-4"
            >
              <Gift aria-hidden className="h-3.5 w-3.5" /> Gift Vouchers
            </a>
          </li>
        </ul>

        <address className="mt-10 space-y-2 text-sm not-italic text-muted-foreground">
          <p>
            {SITE.address.street}, {SITE.address.city} ({SITE.address.country}){" "}
            {SITE.address.postcode}
          </p>
          <p>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="underline underline-offset-4">
              {SITE.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
              {SITE.email}
            </a>
          </p>
        </address>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">© 2026 by Pane &amp; Vino</p>
    </footer>
  );
}
