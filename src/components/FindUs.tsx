import { FadeInSection } from "./FadeInSection";
import { SITE } from "@/data/site";

/** Map + practical details (feature 19). */
export function FindUs() {
  const query = encodeURIComponent(
    `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.postcode}`,
  );
  const mapsKey = import.meta.env["VITE_MAPS_KEY"];
  const embedSrc = mapsKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${query}`
    : `https://maps.google.com/maps?q=${query}&output=embed`;

  return (
    <FadeInSection id="find-us" className="grid border-y border-border md:grid-cols-2">
      <iframe
        title="Map showing Pane & Vino in Erdington, Birmingham"
        src={embedSrc}
        loading="lazy"
        className="h-[420px] w-full grayscale md:h-full"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="px-6 py-16 md:px-16">
        <p className="eyebrow">Find us</p>
        <h2 className="mt-4 font-display text-5xl">Come and sit down</h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="eyebrow">Address</p>
            <address className="mt-2 text-sm not-italic leading-relaxed text-muted-foreground">
              {SITE.address.street}
              <br />
              {SITE.address.city}, {SITE.address.postcode}
            </address>

            <p className="eyebrow mt-8">Contact</p>
            <p className="mt-2 text-sm text-muted-foreground">
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="underline underline-offset-4">
                {SITE.phone}
              </a>
              <br />
              <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
                {SITE.email}
              </a>
            </p>

            <p className="eyebrow mt-8">Getting here</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Free street parking on Gravelly Lane after 6pm. Erdington station is an eight
              minute walk; the 66 and 67 stop directly outside.
            </p>
          </div>

          <div>
            <p className="eyebrow">Opening hours</p>
            <dl className="mt-2 space-y-1 text-sm text-muted-foreground">
              {SITE.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <dt>{h.day}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
