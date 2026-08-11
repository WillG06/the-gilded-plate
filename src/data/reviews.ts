export interface Review {
  name: string;
  rating: number;
  text: string;
}

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
    name: "Hannah",
    rating: 5,
    text: "Booked for a birthday and they made a real fuss of us without ever being over the top. The focaccia alone is worth the trip across the city, and the wine list is full of things you won't find anywhere else in Birmingham.",
  },
  {
    name: "Michael",
    rating: 5,
    text: "Everything is done with passion. You can see how much care has been put into this business from the owners. Will most definitely be back again, soon if not weekly, introducing new friends and family each time.",
  },
];
