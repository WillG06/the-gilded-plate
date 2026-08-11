import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/ContactForm";
import { BookingForm } from "@/components/BookingForm";
import { FindUs } from "@/components/FindUs";
import { InkPanel } from "@/components/InkPanel";
import { PrivateDiningDialog } from "@/components/PrivateDiningDialog";
import { assetUrl } from "@/lib/utils";
const inkBread = assetUrl("/img/ink-bread.png");

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact & Find Us — Pane & Vino, Erdington" },
      {
        name: "description",
        content:
          "Book a table, email the kitchen, or find Pane & Vino on Gravelly Lane in Erdington, Birmingham. Opening hours, parking and directions.",
      },
      { property: "og:title", content: "Contact & Find Us — Pane & Vino" },
      {
        property: "og:description",
        content: "Reservations, enquiries, opening hours and directions in Erdington, Birmingham.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  return (
    <main>
      <InkPanel className="px-6 py-14 text-center md:px-16 md:py-16">
        <img
          src={inkBread}
          alt=""
          width={512}
          height={512}
          className="mx-auto h-12 w-auto object-contain opacity-90 invert"
        />
        <p className="eyebrow mt-4 !text-primary-foreground/70">Contact</p>
        <h1 className="mt-3 font-display text-5xl">Come and find us</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed opacity-80">
          Reserve a table, send us a note, or simply turn up and see if there's a stool at the
          counter.
        </p>
      </InkPanel>
        
      <BookingForm />                                                          {/* Change so the private dining is next to left section not below */}
      <div className="px-6 pb-16 text-center md:px-16">
        <PrivateDiningDialog label="Planning something private?" />
      </div>
      <div className="rule-line" />
      
      <FindUs />
      <ContactForm />
    </main>
  );
}
