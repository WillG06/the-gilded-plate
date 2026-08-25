// data/reviews.ts
export interface Review {
  name: string;
  rating: number;
  text: string;
}

export const GOOGLE_RATING = 4.7;
export const GOOGLE_REVIEW_COUNT = 311;

// Get this from Google's Place ID Finder (see chat) — replace PLACE_ID once you have it.
export const GOOGLE_REVIEWS_URL =
  "https://search.google.com/local/reviews?placeid=PLACE_ID&q=Pane+%26+Vino";

export const REVIEWS: Review[] = [
  {
    name: "Robyn",
    rating: 5,
    text: "Erdington has been blessed with this hidden gem! What a fabulous little restaurant, friendly staff and very passionate chefs. We enjoyed our meal so much and as a huge foodie, I can say without a doubt it is better than Italians I have dined at in the city centre. We all can't stop talking about how good the food was, freshly made, beautifully presented and the value for money was unbelievable.",
  },
  {
    name: "Garion",
    rating: 5,
    text: "Fantastic unassuming yet authentic Italian restaurant with amazing food at a reasonable price. All the staff were really friendly. We were a table of 4 and shared 4 antipasti, 2 'bakery' pizzas and 2 pastas followed by desserts with a bottle of wine shared with it. Everything was fresh and delicious. Would absolutely recommend.",
  },
  {
    name: "Dario",
    rating: 5,
    text: "Absolutely amazing experience from start to finish. The welcome, the service, the recommendations, the knowledge of the food and the quality of the food was just superb. My grandparents are all from Italy, so we head back very often. It reminds me of the very traditional Italian restaurants in the small villages of Italy but with a sophistication.",
  },
  {
    name: "S. K.",
    rating: 5,
    text: "The most authentic Italian food in the West Midlands. The ingredients were of highest quality, service impeccable and the prices humble. Our most favourite plate was the bone marrow which we got as a starter. Thank you for the kind service as well by the owner Matteo himself!",
  },
  {
    name: "Justin",
    rating: 5,
    text: "A great little independent restaurant with good traditional menu and specials. The pasta and breads are all freshly made, which really shows in the quality. Highly recommend the Gamberoni and Arancini starters. The Fettuccini Porcini and Ravioli were both superb, aswell as the ‘Real’ Carbonara and the fab Garlic Bun! Highly recommend this little gem!",
  },
  {
    name: "Ucha",
    rating: 5,
    text: "First time visiting here and the flavours brought back memories of being in Italy 🇮🇹 Amazing food, highly recommend!! Lovely welcoming atmosphere and hospitality is second to none. This place will now be our regular spot for our Italian kick!",
  },
];