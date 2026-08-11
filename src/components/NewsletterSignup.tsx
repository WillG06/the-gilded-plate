import { useState, type FormEvent } from "react";
import { assetUrl } from "@/lib/utils";
const inkBread = assetUrl("/img/ink-bread.png");

/** Single-field newsletter form (feature 20). */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      // Placeholder list endpoint — swap for your Mailchimp/Klaviyo endpoint.
      const key = import.meta.env["VITE_MAILCHIMP_KEY"];
      if (key) {
        await fetch("/api/public/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      }
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="border-y border-border bg-secondary px-6 py-20 text-center md:px-16">
      <img
        src={inkBread}
        alt=""
        width={512}
        height={512}
        loading="lazy"
        className="mx-auto h-16 w-auto object-contain"
      />
      <h2 className="mt-6 font-display text-4xl">Supper club letters</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Menu changes, wine finds and first refusal on event tables. One email a month.
      </p>

      <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 border border-input bg-card px-4 py-3 text-sm"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="shrink-0 border border-wine bg-wine px-5 py-3 text-[0.68rem] tracking-[0.2em] uppercase text-primary-foreground"
        >
          {status === "sending" ? "…" : "Join"}
        </button>
      </form>

      {status === "done" && (
        <p role="status" className="mt-4 text-sm text-wine">
          Grazie — you're on the list.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          Please check your email address and try again.
        </p>
      )}
    </div>
  );
}
