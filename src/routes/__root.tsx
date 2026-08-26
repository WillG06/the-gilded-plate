import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { FilmGrain } from "@/components/FilmGrain";
import { Loader } from "@/components/Loader";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE } from "@/data/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-6 text-center">
      <p className="font-display text-3xl tracking-[0.2em] uppercase">Pane &amp; Vino</p>
      <h1 className="mt-6 font-display text-6xl">404</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        This table isn't laid. The page you're looking for has been cleared away — but the
        kitchen is very much open.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="border border-border px-6 py-3 text-[0.7rem] tracking-[0.24em] uppercase"
        >
          Back to home
        </Link>
        <Link
          to="/contact"
          className="border border-wine bg-wine px-6 py-3 text-[0.7rem] tracking-[0.24em] uppercase text-primary-foreground"
        >
          Book a table
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-wine bg-wine px-4 py-2 text-sm text-primary-foreground"
          >
            Try again
          </button>
          <Link to="/" className="border border-border px-4 py-2 text-sm">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE.name,
  url: `${SITE.url}/`,
  image: `${SITE.url}/og-image.jpg`,
  telephone: SITE.phone,
  email: SITE.email,
  servesCuisine: "Italian",
  priceRange: "££",
  menu: `${SITE.url}/menu`,
  hasMap: "https://maps.google.com/?q=170+Gravelly+Lane+Erdington+Birmingham+B23+5SN",
  sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.tripadvisor],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    postalCode: SITE.address.postcode,
    addressCountry: "GB",
  },
  openingHours: [
    "Tu-Sa 12:00-22:00",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "https://schema.org/Tuesday",
      "https://schema.org/Wednesday",
      "https://schema.org/Thursday",
      "https://schema.org/Friday",
      "https://schema.org/Saturday",
    ],
    opens: "12:00",
    closes: "22:00",
  },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Loader />
      <FilmGrain />
      <SiteNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      {/* Required: nested routes render here. */}
      <Outlet />
      <SiteFooter />
      <CookieBanner />
    </QueryClientProvider>
  );
}
