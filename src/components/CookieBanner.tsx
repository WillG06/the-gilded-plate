import { useEffect, useState } from "react";

const KEY = "pv-cookie-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function loadAnalytics() {
  const id = import.meta.env["VITE_GA_ID"];
  if (!id) return;
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) return;
  if (document.getElementById("ga4-script")) return;

  const s = document.createElement("script");
  s.id = "ga4-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  gtag("js", new Date());
  gtag("config", id);
}

/** Consent banner gating GA4 (feature 21). */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored === "all") loadAnalytics();
    if (!stored) setVisible(true);
  }, []);

  function choose(value: "all" | "essential") {
    localStorage.setItem(KEY, value);
    setVisible(false);
    if (value === "all") loadAnalytics();
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[9997] border-t border-border bg-paper px-6 py-5"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          We use cookies to understand how the site is used. Nothing is tracked until you say so.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="border border-border px-4 py-2 text-[0.68rem] tracking-[0.2em] uppercase"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="border border-wine bg-wine px-4 py-2 text-[0.68rem] tracking-[0.2em] uppercase text-primary-foreground"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
