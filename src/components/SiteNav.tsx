import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Facebook, Gift, Instagram, Menu as MenuIcon, Twitter, X } from "lucide-react";
import { SITE } from "@/data/site";
import { PrivateDiningDialog } from "@/components/PrivateDiningDialog";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
] as const;

const NAV_HEIGHT = 64; // px — keep header row and mobile panel offset in sync

const listVariants: Variants = {
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.22 } },
  closed: {},
};

const itemVariants: Variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: 14 },
};

// Panel hinges in from the right edge: smaller + rotated + offset, then
// swings flat and expands to fill — instead of a plain fade/slide.
const panelVariants: Variants = {
  closed: {
    opacity: 0,
    scale: 0.92,
    rotateY: -18,
    x: "6%",
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
  open: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const ctaVariants: Variants = {
  closed: { opacity: 0, y: 14 },
  open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.45 } },
};

const taglineVariants: Variants = {
  closed: { opacity: 0, y: 10 },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.32 } },
};

/** Sticky nav with persistent booking CTA + full-screen mobile takeover (feature 14). */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";

  // Header only floats over the hero when we're actually at the top AND
  // the mobile menu isn't open — opening the menu always forces the solid style.
  const floating = overHero && !scrolled && !open;
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the takeover is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`${overHero ? "fixed" : "sticky"} top-0 right-0 left-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-[background-color,border-color,color,backdrop-filter] duration-500 ${
          floating
            ? "border-transparent bg-transparent text-primary-foreground"
            : solid
              ? "border-border bg-paper/95 text-foreground backdrop-blur-md"
              : "border-transparent bg-paper text-foreground"
        }`}
      >
        <nav
          aria-label="Primary"
          style={{ minHeight: NAV_HEIGHT }}
          className="relative z-[60] mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:px-10"
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
            <Link
              to="/contact"
              className={`btn btn--arch btn--sm hidden sm:inline-flex ${floating ? "btn--ghost" : "btn--wine"}`}
            >
              <span>Book a table</span>
            </Link>

            <a
              href={SITE.giftVouchers}
              target="_blank"
              rel="noreferrer"
              aria-label="Gift vouchers"
              className={`group hidden flex-row-reverse items-center gap-0 px-2 py-2 transition-colors sm:inline-flex ${floating ? "text-primary-foreground/75 hover:text-primary-foreground" : "text-muted-foreground hover:text-wine"}`}
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
              onClick={() => {
                // Ignore presses while the panel is mid-transition so rapid
                // tapping can't interrupt/desync the open or close animation.
                if (isAnimating) return;
                setIsAnimating(true);
                setOpen((o) => !o);
              }}
              className="ml-1 flex h-9 w-9 items-center justify-center lg:hidden disabled:opacity-100"
            >
              {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Portalled to <body> so a filtered/transformed ancestor (e.g. the header's
          own backdrop-blur) can never hijack this panel's fixed positioning.
          Positioned below the header row (not inset-0) so the header — and its
          close button — always stays visible and clickable on top of it. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu-panel"
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onAnimationComplete={() => setIsAnimating(false)}
              style={{
                top: `calc(env(safe-area-inset-top) + ${NAV_HEIGHT}px)`,
                transformPerspective: 1200,
                transformOrigin: "right center",
              }}
              className="fixed right-0 bottom-0 left-0 z-40 flex flex-col bg-paper pb-[env(safe-area-inset-bottom)] text-foreground lg:hidden"
            >
              <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-4 pb-10 sm:px-10">
                <div>
                  <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                    Menu
                  </span>
                  <motion.ul variants={listVariants} className="mt-4 flex flex-col">
                    {LINKS.map((l) => (
                      <motion.li
                        key={l.to}
                        variants={itemVariants}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="border-b border-border"
                      >
                        <Link
                          to={l.to}
                          onClick={() => setOpen(false)}
                          className="block py-6 font-display text-4xl tracking-tight transition-colors hover:text-wine"
                        >
                          {l.label}
                        </Link>
                      </motion.li>
                    ))}
                    <motion.li
                      variants={itemVariants}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="border-b border-border"
                    >
                      <PrivateDiningDialog
                        variant="bare"
                        className="!block !py-6 !font-display !text-4xl !font-normal !normal-case !tracking-tight !no-underline hover:!text-wine"
                        label="Private dining"
                      />
                    </motion.li>
                  </motion.ul>
                </div>

                <motion.div
                  variants={taglineVariants}
                  className="flex flex-1 items-center justify-center px-4 py-8 text-center"
                >
                  
                </motion.div>

                <motion.div variants={ctaVariants} className="flex flex-col gap-6">
                  <div className="flex items-center justify-center gap-6">
                    <a
                      href={SITE.instagram ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/35 text-foreground transition-colors hover:border-wine hover:text-wine"
                    >
                      <Instagram aria-hidden strokeWidth={1.25} className="h-[18px] w-[18px]" />
                    </a>
                    <a
                      href={SITE.facebook ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/35 text-foreground transition-colors hover:border-wine hover:text-wine"
                    >
                      <Facebook aria-hidden strokeWidth={1.25} className="h-[18px] w-[18px]" />
                    </a>
                    <a
                      href={SITE.twitter ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Twitter"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/35 text-foreground transition-colors hover:border-wine hover:text-wine"
                    >
                      <Twitter aria-hidden strokeWidth={1.25} className="h-[18px] w-[18px]" />
                    </a>
                  </div>
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="btn btn--arch btn--wine w-full justify-center"
                  >
                    <span>Book a table</span>
                  </Link>
                  <a
                    href={SITE.giftVouchers}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-wine"
                  >
                    <Gift aria-hidden className="h-4 w-4" /> Gift vouchers
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}