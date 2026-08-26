export const SITE = {
  name: "Pane & Vino",
  url: "https://willg06.github.io/the-gilded-plate",
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
    { day: "Sunday", time: "Closed" },
    { day: "Monday", time: "Closed" },
    { day: "Tuesday", time: "12pm – 10pm" },
    { day: "Wednesday", time: "12pm – 10pm" },
    { day: "Thursday", time: "12pm – 10pm" },
    { day: "Friday", time: "12pm – 10pm" },
    { day: "Saturday", time: "12pm – 10pm" },
  ],
  privateDining: {
    backRoomCapacity: 10,
    frontRoomCapacity: 25,
  },
  social: {
    instagram: "https://www.instagram.com/panevino.uk/?hl=en",
    facebook: "https://www.facebook.com/p/PaneVino-100091737691975/",
    tripadvisor: "https://tripadvisor.com/panevino",
  },
  giftVouchers: "https://giftpro.co.uk/panevino",
} as const;
