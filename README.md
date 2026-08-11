# The Gilded Plate

I'm building a React/Vite/TypeScript restaurant website using Framer Motion. Implement all of the following features in one pass. Do not change any existing layout, colour palette, or typography — only add to what's there.

VISUAL FEATURES:

1. CUSTOM CURSOR — Create a <CustomCursor /> component. On desktop only (hide on touch/mobile via media query), replace the default cursor with a small filled circle (~10px) that follows the mouse with Framer Motion spring animation (stiffness: 150, damping: 15). On hover over all <a> and <button> elements, scale to 2.5× and reduce opacity to 0.5. Set cursor: none on the body. Mount once in App.tsx.

2. FILM GRAIN OVERLAY — Create a <FilmGrain /> component. Inject a hidden off-screen <svg> with an feTurbulence filter. Apply it as a CSS filter to a fixed ::after pseudo-element covering the full viewport at z-index: 9999, pointer-events: none, opacity: 0.04. No image files. Mount once in App.tsx.

3. PARALLAX HERO — In the hero section, wrap the background video or image in a Framer Motion motion.div. Use useScroll and useTransform to move it at 60% of the scroll speed of the foreground text. No external parallax library. Keep existing hero content and styling intact.

4. SCROLL-TRIGGERED ANIMATIONS — Create a reusable <FadeInSection> wrapper using Framer Motion with initial={{ opacity: 0, y: 32 }}, whileInView={{ opacity: 1, y: 0 }}, viewport={{ once: true, amount: 0.2 }}, transition={{ duration: 0.6, ease: 'easeOut' }}. Wrap all major page sections with it.

5. STICKY IMAGE / STORY SPLIT — Create a <StickyStory /> component for the about/story section. Left: image position sticky, top: 0, height: 100vh, width: 50%. Right: 3–4 scrolling text blocks. Mobile: stack vertically, image on top. Plain CSS only.

6. CHEF SPOTLIGHT — Create a <ChefSpotlight /> component. Full-width editorial section with a large portrait photo on one side and on the other: chef name in the display font, title, a 3–4 sentence bio, and a subtle philosophy pull-quote. Wrap in <FadeInSection>. Use placeholder content and /images/chef.jpg as the image path.

7. SIGNATURE DISH SECTION — Create a <SignatureDish /> component. Large editorial photo, dish name in display font, story-style description, allergen tags, and a "try it tonight — book a table" CTA linking to the reservation section. Insert between the menu and about sections.

8. HORIZONTAL MARQUEE — Create a <MarqueeStrip /> component. A looping horizontal strip of press logos, award names, or vibe words (use placeholder text like "Timeout Birmingham · 4.9 Stars · Best New Restaurant · Sunday Times Food · Hardens Guide"). CSS animation only, no library. Sits between two sections as a divider.

9. ALLERGEN & DIETARY TAGS — Add an optional tags?: string[] prop to the menu item card component. Render small pill badges for: 'Vegan', 'Vegetarian', 'Gluten-Free', 'Contains Nuts', 'Contains Dairy', 'Halal'. Subtle styling — small font, muted colour, light border. Update 3–4 example items with sample tags.

---

PAGES:

10. MENU PAGE — Create a full /menu route. Tabbed navigation for Lunch / Dinner / Brunch / Drinks. Each tab shows a visual grid of menu item cards with: photo, dish name, description, price, and allergen tags. On mobile: single column. Include a "Download PDF menu" link (placeholder href). Wrap sections in <FadeInSection>.

11. PRIVATE DINING PAGE — Create a /private-dining route. Hero image of the private room, capacity and occasion info (birthdays, corporate, celebrations), a photo gallery grid, and a dedicated enquiry form with fields: name, email, phone, occasion, date, number of guests, dietary requirements, and message. POST to Resend using VITE_RESEND_API_KEY. Show success/error inline. Wrap in <FadeInSection>.

12. EVENTS PAGE — Create an /events route. A grid of upcoming event cards, each with: event name, date, short description, price per head, and a "Book now" CTA. Use placeholder data for 3–4 events. Each card links to a booking form or external URL. Wrap in <FadeInSection>.

---

RESERVATIONS:

13. BOOKING WIDGET — In the main page and nav, add a prominent "Book a table" button that scrolls to or opens the reservation section. Embed an OpenTable or Resy widget using a placeholder restaurant ID, OR create a custom booking form with: date picker, time selector (dropdown of available slots), number of guests (1–12), name, email, phone, and special requests. POST to Resend on submit. Show confirmation inline.

14. STICKY NAV WITH BOOKING CTA — Ensure the main nav becomes sticky on scroll with a "Book a table" button always visible. On mobile, the nav collapses to a hamburger menu with a full-screen overlay. The booking CTA stays visible in both states.

---

SOCIAL PROOF:

15. GOOGLE REVIEWS SECTION — Create a <ReviewsSection /> component. A card grid of 4–5 styled review cards with: reviewer name, star rating (rendered as SVG stars), review excerpt (truncated to 3 lines with a "read more" toggle), and Google logo attribution. Use placeholder review content. Wrap in <FadeInSection>.

16. PRESS & AWARDS STRIP — Use the <MarqueeStrip /> component from feature 8. Place it just above the footer with real-looking placeholder press names and ratings.

17. INSTAGRAM FEED — Create an <InstagramFeed /> component. A 6-image grid using placeholder image paths (/images/insta-1.jpg through insta-6.jpg) with a hover overlay showing a like/comment count. Link to the restaurant's Instagram (placeholder href). Place above the footer. Wrap in <FadeInSection>.

---

FOUNDATIONS:

18. SEO & STRUCTURED DATA — Add Helmet or equivalent meta management with unique title and description per page. Add Open Graph tags. Inject a Restaurant JSON-LD schema in the root layout with: name, address, telephone, openingHours, servesCuisine, menu URL, priceRange, and hasMap. Use placeholder values. Generate sitemap.xml and robots.txt via vite-plugin-sitemap or equivalent.

19. CONTACT & FIND US SECTION — Create a <FindUs /> section. Left: Google Maps embed with a custom brand-matched style JSON via the Maps JavaScript API (placeholder API key VITE_MAPS_KEY). Right: address, opening hours by day (Mon–Sun format), phone, email, and transport/parking notes. Wrap in <FadeInSection>.

20. NEWSLETTER SIGNUP — Create a <NewsletterSignup /> component. A simple one-field email form above the footer. On submit, POST to a Mailchimp or Klaviyo list endpoint (placeholder API key VITE_MAILCHIMP_KEY). Show success confirmation inline. No page reload.

21. GA4 + COOKIE CONSENT — Add GA4 via gtag.js in index.html using placeholder ID VITE_GA_ID. Create a <CookieBanner /> component fixed to the bottom of the viewport, styled to the brand palette. Two buttons: "Accept all" and "Reject non-essential". Store preference in localStorage. Only fire GA4 after consent. Don't track on localhost.

22. IMAGE OPTIMISATION — Audit all <img> tags: add loading="lazy" below the fold, width and height on all images, and convert hero images to <picture> with .webp source and .jpg fallback. Install vite-imagetools for automatic webp conversion on import if not already present.

23. GIFT VOUCHERS LINK — In the nav and footer, add a "Gift vouchers" link to a placeholder external URL (e.g. Giftpro or Toggle). This is a high-value upsell that drives revenue — flag it visually with a small gift icon.

24. 404 PAGE — Create a branded 404.tsx page. Restaurant name or logo, an on-brand message, and a "back to home" and "book a table" button. Register in the React Router config.

25. LIGHTHOUSE OPTIMISATION — After all the above: ensure all images have descriptive alt text, all interactive elements have aria-labels, colour contrast meets WCAG AA, and there are no console errors. Add <link rel="preconnect"> in index.html for Google Fonts, Maps, and Analytics domains.

---
