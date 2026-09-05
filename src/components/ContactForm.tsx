import { useState, type FormEvent } from "react";
import { assetUrl } from "@/lib/utils";
import { PrivateDiningDialog } from "@/components/PrivateDiningDialog";
import { SITE } from "@/data/site";
const inkWine = assetUrl("/img/ink-wine.png");

const field =
  "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-wine focus:outline-none";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

/** Minimal, editorial contact / email enquiry form. */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...data }),
      });
      if (!response.ok) throw new Error("Form submission failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto grid max-w-[1200px] gap-16 px-6 py-24 md:px-16 lg:grid-cols-[0.85fr_1fr] lg:gap-24">
      <div>
        <img
          src={inkWine}
          alt=""
          width={512}
          height={512}
          loading="lazy"
          className="h-14 w-auto object-contain opacity-80"
        />
        <p className="eyebrow mt-8">Write to us</p>
        <h2 className="mt-4 font-display text-5xl leading-[1.05]">
          Anything else,
          <br />
          just ask
        </h2>
        <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Allergies, celebrations, press, suppliers or a lost umbrella. One of us reads every
          message and replies within a day.
        </p>
        <div className="mt-8">
          <PrivateDiningDialog label="Planning something private?" />
        </div>
      </div>

      <form
        name="contact"
        onSubmit={onSubmit}
        data-netlify="true"
        netlify-honeypot="bot-field"
        className="grid gap-10 sm:grid-cols-2"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden">
          <label>
            Don't fill this out: <input name="bot-field" />
          </label>
        </p>

        <div className="sm:col-span-1">
          <label className="eyebrow block" htmlFor="c-name">
            Name
          </label>
          <input className={field} id="c-name" name="name" required maxLength={100} />
        </div>
        <div className="sm:col-span-1">
          <label className="eyebrow block" htmlFor="c-email">
            Email
          </label>
          <input
            className={field}
            id="c-email"
            name="email"
            type="email"
            required
            maxLength={255}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="eyebrow block" htmlFor="c-subject">
            Subject
          </label>
          <input className={field} id="c-subject" name="subject" maxLength={140} />
        </div>
        <div className="sm:col-span-2">
          <label className="eyebrow block" htmlFor="c-message">
            Message
          </label>
          <textarea
            className={field}
            id="c-message"
            name="message"
            rows={5}
            required
            maxLength={2000}
          />
        </div>

        <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
          <p className="w-full text-sm text-muted-foreground">
            Email booking is temporarily unavailable. Please call us on{" "}
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="underline underline-offset-4">
              {SITE.phone}
            </a>
            .
          </p>
          <button
            type="submit"
            disabled={status === "sending"}
            className="border border-wine px-8 py-3.5 text-[0.68rem] tracking-[0.28em] uppercase text-wine transition-colors hover:bg-wine hover:text-primary-foreground disabled:opacity-50"
          >
            {status === "sending" ? "Sending" : "Send message"}
          </button>
          {status === "done" && (
            <p role="status" className="text-sm text-wine">
              Grazie — your message is with us.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-destructive">
              Something went wrong. Please call us instead.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}