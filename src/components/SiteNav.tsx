import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Gift, Menu as MenuIcon, X } from "lucide-react";
import { SITE } from "@/data/site";
import { PrivateDiningDialog } from "@/components/PrivateDiningDialog";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
] as const;

/** Sticky nav with persistent booking CTA + mobile overlay (feature 14). */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";
  const floating = overHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${overHero ? "fixed" : "sticky"} top-0 right-0 left-0 z-50 border-b transition-[background-color,border-color,color,backdrop-filter] duration-500 ${
        floating
          ? "border-transparent bg-transparent text-primary-foreground"
          : scrolled
            ? "border-border bg-paper/92 text-foreground backdrop-blur-md"
            : "border-transparent bg-paper text-foreground"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-10"
      >
        <div className="flex min-w-0 items-center gap-8">
          <Link to="/" className="font-display text-lg tracking-[0.22em] uppercase">
            Pane &amp; Vino
          </Link>
          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`text-xs tracking-[0.2em] uppercase transition-colors ${floating ? "text-primary-foreground/75 hover:text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <PrivateDiningDialog
                variant="bare"
                className={`!text-xs !tracking-[0.2em] !no-underline ${floating ? "text-primary-foreground/75 hover:text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                label="Private dining"
              />
            </li>
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a href="/contact" className={`btn btn--arch btn--sm ${floating ? "btn--ghost" : "btn--wine"}`}>
            <span>Book a table</span>
          </a>

          <a
            href={SITE.giftVouchers}
            target="_blank"
            rel="noreferrer"
            aria-label="Gift vouchers"
            className={`group inline-flex flex-row-reverse items-center gap-0 px-2 py-2 transition-colors ${floating ? "text-primary-foreground/75 hover:text-primary-foreground" : "text-muted-foreground hover:text-wine"}`}
          >
            <Gift aria-hidden className="h-[18px] w-[18px] shrink-0" />
            <span className="type-reveal">
              <span className="type-reveal__text">Gift&nbsp;vouchers</span>
            </span>
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="ml-1 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 top-[65px] z-40 bg-paper px-6 py-10 text-foreground lg:hidden">
          <ul className="flex flex-col gap-6">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <PrivateDiningDialog
                variant="bare"
                className="!font-display !text-3xl !normal-case !tracking-normal !no-underline"
                label="Private dining"
              />
            </li>
            <li>
              <a
                href={SITE.giftVouchers}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-display text-3xl"
              >
                <Gift aria-hidden className="h-5 w-5" /> Gift vouchers
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
