import { assetUrl } from "@/lib/utils";

// Real photography from /public/img. Only "Pasta al Ragù" has a dish-specific
// shot (PastaAlRagu.jpg) — everything else cycles through the closest generic
// real photo available. TortelliniAllaPanna.jpg, PappardelleAllOssobuco.jpg
// and GnocchiAlPesto.jpg are off-menu specials, reserved for the chef's
// recommendations section rather than used here. Desserts has no dedicated
// shot yet — flag if you have one.

const imgPastaAlRagu = assetUrl("/img/PastaAlRagu.jpg");
const imgPappardelle = assetUrl("/img/PappardelleAllOssobuco.jpg");
const imgTortellini = assetUrl("/img/TortelliniAllaPanna.jpg");
//const imgCimbellone = assetUrl("/img/CimbelloneBalanzone.jpg");

export type DietaryTag =
  | "Vegetarian"
  | "Vegan"
  | "Gluten-Free"
  | "Contains Nuts"
  | "Contains Dairy"
  | "Halal";

// "Specials" is off-menu — it never appears on the printed menu, so it's
// intentionally excluded from COURSE_ORDER and TAB_COURSES below. It exists
// only so HOMEPAGE_SPECIALS (further down) can satisfy the MenuItem type.
export type Course =
  | "Nibbles"
  | "Antipasti"
  | "Pasta"
  | "Pizza"
  | "Secondi"
  | "Sides"
  | "Desserts"
  | "Specials";

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  course: Course;
  tags?: DietaryTag[];
  /** Small footnote, e.g. the "*Subject to availability" marker on the Costoletta */
  note?: string;
}

export interface MenuImgItem {
  name: string;
  description: string;
  price: string;
  course: Course;
  tags?: DietaryTag[];
  /** Small footnote, e.g. the "*Subject to availability" marker on the Costoletta */
  note?: string;
  /** URL of the image for this menu item */
  image?: string;
}

export type MenuTab =
  | "Nibbles & Antipasti"
  | "Pasta"
  | "Secondi & Sides"
  | "Pizza & Desserts"
  | "Wine & Cocktails"
  | "Soft Drinks";

export const TAB_ORDER: MenuTab[] = [
  "Nibbles & Antipasti",
  "Pasta",
  "Secondi & Sides",
  "Pizza & Desserts",
  "Wine & Cocktails",
  "Soft Drinks",
];

// Which food courses render (and in which order) under each tab.
export const TAB_COURSES: Partial<Record<MenuTab, Course[]>> = {
  "Nibbles & Antipasti": ["Nibbles", "Antipasti"],
  "Pasta": ["Pasta"],
  "Pizza & Desserts": ["Pizza", "Desserts"],
  "Secondi & Sides": ["Secondi", "Sides"],
};

export interface Extra {
  label: string;
  price: string;
}

// "Extra Truffle 3.50" style add-ons printed at the top of a page.
export const COURSE_EXTRAS: Partial<Record<Course, Extra[]>> = {
  Pasta: [
    { label: "Extra Truffle", price: "£3.50" },
    { label: "Extra Mozzarella", price: "£2.50" },
    { label: "Extra Parmesan", price: "£1.00" },
  ],
  Pizza: [{ label: "Extra Ingredient", price: "£2.50" }],
  Secondi: [
    { label: "Extra Garlic Butter", price: "£1.50" },
    { label: "Extra Truffle Butter", price: "£1.75" },
    { label: "Extra Peppercorn Sauce", price: "£1.50" },
  ],
};

export const COURSE_ORDER: Course[] = [
  "Nibbles",
  "Antipasti",
  "Pasta",
  "Pizza",
  "Secondi",
  "Sides",
  "Desserts",
];

export const MENU: MenuItem[] = [
  // ── NIBBLES & ANTIPASTI ─────────────────────────────────
  {
    name: "Olives",
    description: "",
    price: "£5.00",
    course: "Nibbles",
    tags: ["Vegan", "Gluten-Free"],
  },
  {
    name: "Pickled Vegetables",
    description: "",
    price: "£5.00",
    course: "Nibbles",
    tags: ["Gluten-Free"],
  },
  {
    name: "Calamari Fritti",
    description: "Crispy squid rings served with squid ink aioli.",
    price: "£9.50",
    course: "Antipasti",
  },
  {
    name: "Tagliere di Salumi e Formaggi (x2)",
    description: "Sharing platter of Italian cured meats and cheeses, pickles and our bread.",
    price: "£24.00",
    course: "Antipasti",
  },
  {
    name: "Fritto all'Italiana",
    description: "Fried mix of mozzarella, stuffed olives, courgette flowers, mini arancini and potato croquettes.",
    price: "£10.50",
    course: "Antipasti",
  },
  {
    name: "Bruschetta",
    description: "Fresh tomatoes, roasted pepper, basil and oregano on bread, topped with lettuce.",
    price: "£8.00",
    course: "Antipasti",
    tags: ["Vegetarian"],
  },
  {
    name: "Arancini alla Norma",
    description: "Fried rice croquettes with tomato sauce, aubergines and mozzarella, topped with peperonata sauce.",
    price: "£9.50",
    course: "Antipasti",
    tags: ["Vegetarian"],
  },
  {
    name: "Garlic Bread",
    description: "Two slices of focaccia with garlic, mozzarella, drops of tomato sauce and balsamic vinegar.",
    price: "£7.50",
    course: "Antipasti",
    tags: ["Vegetarian"],
  },
  {
    name: "Grana & Bresaola",
    description: "Cured beef with Parmesan flakes and baby gem.",
    price: "£9.50",
    course: "Antipasti",
    tags: ["Gluten-Free"],
  },
  {
    name: "Caprese",
    description: "Fior di latte, fresh tomatoes, basil and pistachio pesto.",
    price: "£9.00",
    course: "Antipasti",
    tags: ["Vegetarian", "Gluten-Free"],
  },
  {
    name: "Garlic Bun",
    description: "Ciabatta bread filled with garlic butter, mozzarella and herby oil.",
    price: "£9.00",
    course: "Antipasti",
    tags: ["Vegetarian"],
  },
  {
    name: "Burrata e Crudo",
    description: "Burrata and Parma ham, olive oil and drops of balsamic vinegar.",
    price: "£9.50",
    course: "Antipasti",
  },
  {
    name: "Bread or Focaccia",
    description: "Home-made focaccia or bread served with olive oil and balsamic vinegar.",
    price: "£5.00",
    course: "Antipasti",
    tags: ["Vegan"],
  },

  // ── PASTA ────────────────────────────────────────────────
  {
    name: "Lasagna alla Bolognese",
    description: "Layers of home-made egg pasta with tomato sauce, ragù sauce and béchamel.",
    price: "£14.00",
    course: "Pasta",
  },
  {
    name: "Aubergine Parmigiana",
    description: "Layers of aubergine with tomato sauce, mozzarella and Parmesan.",
    price: "£14.00",
    course: "Pasta",
    tags: ["Vegetarian"],
  },
  {
    name: "Risotto di Mare",
    description: "Risotto with mixed seafood in a tomato sauce.",
    price: "£16.00",
    course: "Pasta",
    tags: ["Gluten-Free"],
  },
  {
    name: "Mezzelune",
    description: "Home-made stuffed egg pasta — ask for today's filling.",
    price: "£16.00",
    course: "Pasta",
  },
  {
    name: "Carbonara",
    description: "Home-made bucatini, eggs, Pecorino, aged guanciale and lots of black pepper.",
    price: "£16.00",
    course: "Pasta",
  },
  {
    name: "Amatriciana",
    description: "Home-made maccheroni, aged guanciale, tomato sauce, Parmesan.",
    price: "£16.00",
    course: "Pasta",
  },
  {
    name: "Fettuccine ai Porcini",
    description: "Home-made fettuccine, porcini mushroom, garlic gremolata, parsley and Parmesan.",
    price: "£17.00",
    course: "Pasta",
    tags: ["Vegetarian"],
  },
  {
    name: "Spaghetti alle Vongole",
    description: "Home-made spaghetti with clams, olive oil and fresh chilli.",
    price: "£16.00",
    course: "Pasta",
  },
  {
    name: "Caserecci N'Duja",
    description: "Home-made caserecci with melted spicy pork sausage, red onions and smoked cheese.",
    price: "£16.00",
    course: "Pasta",
  },
  {
    name: "Fettuccine al Tartufo",
    description: "Home-made fettuccine with truffle butter sauce, Parmesan and fresh truffle.",
    price: "£20.00",
    course: "Pasta",
    tags: ["Vegetarian"],
  },
  {
    name: "Pasta al Ragù",
    description: "Home-made pasta with ragù sauce and Parmesan.",
    price: "£15.00",
    course: "Pasta",
  },
  {
    name: "Pasta al Pomodoro",
    description: "Home-made pasta with tomato sauce and Parmesan.",
    price: "£14.50",
    course: "Pasta",
    tags: ["Vegetarian"],
  },
  {
    name: "Pasta all'Arrabbiata",
    description: "Home-made pasta with spicy tomato sauce, chillies and garlic.",
    price: "£14.50",
    course: "Pasta",
    tags: ["Vegetarian"],
  },
  {
    name: "Kids' Pasta",
    description: "Home-made pasta with the choice of tomato sauce, ragù sauce, or butter and Parmesan.",
    price: "£7.50",
    course: "Pasta",
  },

  // ── PIZZA ────────────────────────────────────────────────
  {
    name: "Margherita",
    description: "The classic, with tomato sauce and mozzarella.",
    price: "£13.00",
    course: "Pizza",
    tags: ["Vegetarian"],
  },
  {
    name: "4 Formaggi",
    description: "Four different cheeses and tomato sauce.",
    price: "£15.00",
    course: "Pizza",
    tags: ["Vegetarian"],
  },
  {
    name: "Pepperoni",
    description: "Pepperoni, tomato sauce and mozzarella.",
    price: "£15.00",
    course: "Pizza",
  },
  {
    name: "Verdure",
    description: "Mixed vegetables, tomato sauce and mozzarella.",
    price: "£15.50",
    course: "Pizza",
    tags: ["Vegetarian"],
  },
  {
    name: "N'Duja",
    description: "Tomato sauce, melted spicy pork sausage and smoked cheese.",
    price: "£15.50",
    course: "Pizza",
  },

  // ── DESSERTS ─────────────────────────────────────────────
  {
    name: "Tiramisù",
    description: "Ladyfingers soaked in coffee, mascarpone, topped with cocoa.",
    price: "£8.00",
    course: "Desserts",
    tags: ["Vegetarian"],
  },
  {
    name: "Panna Cotta",
    description: "Rich and thick vanilla cream, served with home-made jam.",
    price: "£8.00",
    course: "Desserts",
    tags: ["Vegetarian", "Gluten-Free"],
  },
  {
    name: "Crème Caramel",
    description: "Rich and thick egg cream with caramel sauce.",
    price: "£8.00",
    course: "Desserts",
    tags: ["Vegetarian", "Gluten-Free"],
  },
  {
    name: "Cannolo Siciliano",
    description: "Crunchy pastry shell filled with sweet goat's ricotta and chocolate nibs.",
    price: "£7.00",
    course: "Desserts",
    tags: ["Vegetarian"],
  },
  {
    name: "Chocolate Cake",
    description: "Dark chocolate sponge cake, served with a scoop of gelato.",
    price: "£7.00",
    course: "Desserts",
    tags: ["Vegetarian"],
  },
  {
    name: "Limoncello Mousse",
    description: "Delicate cream mousse, limoncello, whipped cream and lemon zest.",
    price: "£8.00",
    course: "Desserts",
    tags: ["Vegetarian", "Gluten-Free"],
  },
  {
    name: "Crema Catalana",
    description: "Rich and thick egg cream, caramelised on top.",
    price: "£8.00",
    course: "Desserts",
    tags: ["Vegetarian", "Gluten-Free"],
  },
  {
    name: "Gelato",
    description: "Three scoops of ice cream — ask for the flavour of the day.",
    price: "£7.50",
    course: "Desserts",
    tags: ["Vegetarian"],
  },

  // ── SECONDI ──────────────────────────────────────────────
  {
    name: "Bistecca di Manzo",
    description: "Chargrilled sirloin steak, dry aged 30 days (8oz).",
    price: "£17.00",
    course: "Secondi",
    tags: ["Gluten-Free"],
  },
  {
    name: "Costoletta",
    description: "Chargrilled tomahawk, dry aged 30 days (16oz).",
    price: "£25.00",
    course: "Secondi",
    tags: ["Gluten-Free"],
    note: "Subject to availability",
  },
  {
    name: "Porchetta",
    description: "Pork belly with crispy skin, served with red wine sauce and roasted potatoes.",
    price: "£18.00",
    course: "Secondi",
    tags: ["Gluten-Free"],
  },
  {
    name: "Cotoletta alla Milanese",
    description: "Breaded and fried chicken breast, served with tomato sauce, salad and Parmesan flakes.",
    price: "£17.00",
    course: "Secondi",
  },
  {
    name: "Anatra alla Cacciatora",
    description: "Tender slow-cooked duck, served with saucy vegetables and olives.",
    price: "£17.00",
    course: "Secondi",
    tags: ["Gluten-Free"],
  },
  {
    name: "Sicilian Seabass",
    description: "Chargrilled filleted seabass, served with salad, anchovies, cherry tomatoes, olives and capers.",
    price: "£18.50",
    course: "Secondi",
    tags: ["Gluten-Free"],
  },
  {
    name: "Fiorentina",
    description: "Tender chargrilled T-bone steak, dry aged 30 days (20oz).",
    price: "£30.00",
    course: "Secondi",
    tags: ["Gluten-Free"],
  },

  // ── SIDES ────────────────────────────────────────────────
  {
    name: "Truffle Chips",
    description: "Fried potatoes with truffle oil and truffle Parmesan.",
    price: "£8.50",
    course: "Sides",
    tags: ["Vegetarian"],
  },
  {
    name: "Potatoes",
    description: "Rosemary and garlic roasted potatoes, or chips.",
    price: "£5.00",
    course: "Sides",
    tags: ["Vegan"],
  },
  {
    name: "Salad",
    description: "Mixed leaves salad with fresh vegetables.",
    price: "£6.00",
    course: "Sides",
    tags: ["Vegan"],
  },
  {
    name: "Roasted Vegetables",
    description: "Roasted mixed vegetables with herby oil.",
    price: "£6.50",
    course: "Sides",
    tags: ["Vegan"],
  },
  {
    name: "Broccoli",
    description: "Steamed broccoli with garlic and olive oil.",
    price: "£5.00",
    course: "Sides",
    tags: ["Vegan"],
  },
  {
    name: "Schiacciatina",
    description: "Pizza bread with garlic oil and drops of tomato sauce — good for the table.",
    price: "£13.00",
    course: "Sides",
    tags: ["Vegetarian"],
  },
];

// Off-menu specials, used only by the homepage "A taste of tonight" teaser —
// not on the printed menu, so not part of MENU/COURSE_ORDER/TAB_COURSES.
// None of these have a listed price (they're not printed anywhere), so
// price reads "Ask your server" rather than inventing a number — swap in
// real prices if you'd rather show them.
export const HOMEPAGE_SPECIALS: MenuImgItem[] = [
  {
    name: "Tortellini alla Panna",
    description:
      "Delicate handmade tortellini filled with braised beef, served with a cream, paresan sauce.",
    price: "Ask your server",
    image: imgTortellini,
    course: "Specials",
    tags: ["Contains Dairy"],
  },
  {
    name: "Pappardelle all'Ossobuco",
    description:
      "Silky hand-cut pappardelle served with slow-braised ossobuco, rich veal jus and fresh herbs.",
    price: "Ask your server",
    image: imgPappardelle,
    course: "Specials",
    tags: ["Contains Dairy"],
  },

  { 
    name: "Pasta al Ragù",
    description:
      "Handmade pasta tossed through a slow-cooked Italian ragù of beef, tomato and aromatic herbs.",
    price: "Ask your server",
    image:imgPastaAlRagu,
    course: "Specials",
  },
];

export const FOOD_FOOTNOTE =
  "Dairy / Vegetarian / Vegan options are available on request. Please inform the staff of any allergies or intolerances, we will do our best.";

// ── WINE & DRINKS ────────────────────────────────────────────

export interface WineItem {
  name: string;
  region: string;
  /** Per-glass or per-measure price. Omitted where the printed menu only lists a bottle price. */
  pour?: string;
  bottle: string;
}

export interface WineSection {
  title: string;
  /** Column header on the printed menu, e.g. "Glass / Bottle" or "75 ml / Bottle" */
  servingLabel: string;
  items: WineItem[];
}

export const WINE_SECTIONS: WineSection[] = [
  {
    title: "Red Wines",
    servingLabel: "Glass / Bottle",
    items: [
      { name: "Merlot", region: "Veneto", pour: "£7.50", bottle: "£29.00" },
      { name: "Pinot Nero", region: "Veneto", pour: "£7.50", bottle: "£29.00" },
      { name: "Sangiovese", region: "Emilia Romagna", pour: "£7.50", bottle: "£29.00" },
      { name: "Montepulciano", region: "Abruzzo", pour: "£8.00", bottle: "£30.00" },
      { name: "Primitivo", region: "Puglia", bottle: "£30.00" },
      { name: "Nero D'Avola", region: "Sicilia", bottle: "£30.00" },
      { name: "Chianti", region: "Toscana", bottle: "£31.00" },
      { name: "Cannonau", region: "Sardegna", bottle: "£31.00" },
      { name: "Valpolicella Ripasso", region: "Veneto", bottle: "£33.00" },
      { name: "Amarone", region: "Veneto", bottle: "£43.00" },
      { name: "Barolo", region: "Piemonte", bottle: "£43.00" },
    ],
  },
  {
    title: "White Wines",
    servingLabel: "Glass / Bottle",
    items: [
      { name: "Pinot Grigio", region: "Veneto", pour: "£7.50", bottle: "£29.00" },
      { name: "Verduzzo", region: "Veneto", pour: "£7.50", bottle: "£29.00" },
      { name: "Trebbiano", region: "Emilia Romagna", pour: "£7.50", bottle: "£29.00" },
      { name: "Grillo", region: "Sicilia", pour: "£7.50", bottle: "£29.00" },
      { name: "Gavi", region: "Piemonte", pour: "£8.00", bottle: "£30.00" },
      { name: "Pecorino", region: "Marche", pour: "£8.00", bottle: "£30.00" },
      { name: "Lugana", region: "Lombardia", bottle: "£33.00" },
      { name: "Falanghina", region: "Campania", bottle: "£35.00" },
    ],
  },
  {
    title: "Sparkling Wines",
    servingLabel: "Glass / Bottle",
    items: [
      { name: "Lambrusco (red)", region: "Emilia Romagna", pour: "£7.50", bottle: "£29.00" },
      { name: "Prosecco (white)", region: "Veneto", pour: "£7.50", bottle: "£29.00" },
      { name: "Moscato (white)", region: "Piemonte", pour: "£7.50", bottle: "£29.00" },
      { name: "Pignoletto (white)", region: "Emilia Romagna", pour: "£8.00", bottle: "£30.00" },
    ],
  },
  {
    title: "Dessert Wines",
    servingLabel: "75 ml / Bottle",
    items: [
      { name: "Marsala (red)", region: "Sicilia", pour: "£7.50", bottle: "£29.00" },
      { name: "Vin Santo (white)", region: "Toscana", pour: "£8.50", bottle: "£32.00" },
    ],
  },
];

export interface SimpleDrinkItem {
  name: string;
  size?: string;
  price: string;
}

export const BEERS_AND_CIDER: SimpleDrinkItem[] = [
  { name: "Small Moretti or Peroni", size: "330ml", price: "£5.00" },
  { name: "Large Moretti or Peroni", size: "660ml", price: "£7.00" },
  { name: "Angioletti Italian Cider", size: "500ml", price: "£7.00" },
  { name: "Ichnusa", size: "330ml", price: "£5.50" },
];

export interface CocktailItem {
  name: string;
  description: string;
  price: string;
}

export const COCKTAILS: CocktailItem[] = [
  { name: "Spritz", description: "The classic Aperol / Campari or Limoncello / Lambrusco.", price: "£8.00" },
  { name: "Hugo", description: "Prosecco, elderflower cordial, soda.", price: "£8.00" },
  { name: "Bellini", description: "Peach purée & Prosecco.", price: "£8.00" },
  { name: "Campari Soda", description: "Campari & seltz.", price: "£8.00" },
  { name: "Negroni", description: "Gin, red vermouth, Campari.", price: "£9.00" },
  { name: "Manhattan", description: "Whisky, red vermouth, bitter.", price: "£9.00" },
  { name: "Other Cocktails", description: "Ask your server.", price: "Single £9.00 / Double £12.00" },
];

export const SPIRITS: SimpleDrinkItem[] = [
  { name: "Grappa", size: "25 ml / Bottle", price: "£7.00 / £31.00" },
  { name: "Limoncello", size: "25 ml / Bottle", price: "£7.00 / £31.00" },
  { name: "Special Spirits", size: "Ask our staff", price: "£8.00" },
];

export const DRINKS_FOOTNOTE = "Please be prepared to prove that you are over 18 when buying age restricted products.";

export const COFFEES: SimpleDrinkItem[] = [
  { name: "Caffè Espresso", price: "£2.50" },
  { name: "Cappuccino", price: "£3.50" },
  { name: "Americano", price: "£3.50" },
  { name: "Latte", price: "£3.50" },
  { name: "Double", price: "£3.00" },
  { name: "Tea", price: "£2.50" },
  { name: "Hot Chocolate", price: "£3.50" },
  { name: "Caffè Corretto", price: "£5.50" },
];

export const SODA: SimpleDrinkItem[] = [
  { name: "Barr Cola", price: "£3.00" },
  { name: "Tonic Water", price: "£3.00" },
  { name: "San Pellegrino Lemon", price: "£3.00" },
  { name: "San Pellegrino Orange", price: "£3.00" },
  { name: "San Pellegrino Zero Clementine & Peach", price: "£3.00" },
];

export const JUICE: SimpleDrinkItem[] = [
  { name: "Orange Juice", price: "£2.50" },
  { name: "Apple Juice", price: "£2.50" },
];

export const WATER: SimpleDrinkItem[] = [
  { name: "Large Still Water Bottle", price: "£4.00" },
  { name: "Large Sparkling Water Bottle", price: "£4.00" },
  { name: "Small Still Water Bottle", price: "£3.00" },
  { name: "Small Sparkling Water Bottle", price: "£3.00" },
];