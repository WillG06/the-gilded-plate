export const SITE = {
  name: "Pane & Vino",
  tagline: "Little Italy Deli",
  phone: "0121 384 3075",
  email: "welcome@panevino.uk",
  address: {
    street: "170 Gravelly Lane, Erdington",
    city: "Birmingham",
    postcode: "B23 5SN",
    country: "UK",
  },
  hours: [
    { day: "Monday", time: "12pm – 10pm" },
    { day: "Tuesday", time: "Closed" },
    { day: "Wednesday", time: "12pm – 10pm" },
    { day: "Thursday", time: "12pm – 10pm" },
    { day: "Friday", time: "12pm – 11pm" },
    { day: "Saturday", time: "12pm – 11pm" },
    { day: "Sunday", time: "12pm – 9pm" },
  ],
  social: {
    instagram: "https://instagram.com/panevino",
    facebook: "https://facebook.com/panevino",
    tripadvisor: "https://tripadvisor.com/panevino",
  },
  giftVouchers: "https://giftpro.co.uk/panevino",
} as const;
