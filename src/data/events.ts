export interface RestaurantEvent {
  name: string;
  date: string;
  description: string;
  price: string;
  href: string;
}

export const EVENTS: RestaurantEvent[] = [
  {
    name: "Barolo & Truffle Supper",
    date: "Thursday 18 September",
    description:
      "Five courses built around Alba truffle, poured alongside three vintages of Barolo.",
    price: "£75 per head",
    href: "/contact",
  },
  {
    name: "Pasta Masterclass",
    date: "Saturday 4 October",
    description: "Two hours at the bench with Matteo, then lunch with what you made.",
    price: "£55 per head",
    href: "/contact",
  },
  {
    name: "Sunday Long Table",
    date: "Every last Sunday",
    description: "One table, one menu, twenty strangers who leave as neighbours.",
    price: "£38 per head",
    href: "/contact",
  },
  {
    name: "Festive Feast Nights",
    date: "December, Thurs – Sat",
    description: "Roman-style festive sharing menu with a welcome Sbagliato.",
    price: "£48 per head",
    href: "/contact",
  },
];
