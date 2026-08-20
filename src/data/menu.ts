import { assetUrl } from "@/lib/utils";

const GnocchiAlPesto = assetUrl("/img/GnocchiAlPesto.jpg");
const PappardelleAllOssobuco = assetUrl("/img/PappardelleAllOssobuco.jpg");
const PastaAlRagu = assetUrl("/img/PastaAlRagu.jpg");
const TortelliniAllaPanna = assetUrl("/img/TortelliniAllaPanna.jpg");
const CimbelloneBalanzone = assetUrl("/img/CimbelloneBalanzone.jpg");

export type DietaryTag =
  | "Vegan"
  | "Vegetarian"
  | "Gluten-Free"
  | "Contains Nuts"
  | "Contains Dairy"
  | "Halal";

export type Course = "Antipasti" | "Primi" | "Secondi" | "Dolci" | "Cantina";

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  course: Course;
  tags?: DietaryTag[];
}

export type MenuService = "Lunch" | "Dinner" | "Brunch" | "Drinks";

export const COURSE_ORDER: Course[] = ["Antipasti", "Primi", "Secondi", "Dolci", "Cantina"];

export const MENU: Record<MenuService, MenuItem[]> = {
  Lunch: [
    {
      name: "Pappardelle all’Ossobuco",
      description:
        "Silky hand-cut pappardelle served with slow-braised ossobuco, rich veal jus and fresh herbs.",
      price: "£16.50",
      image: PappardelleAllOssobuco,
      course: "Primi",
      tags: ["Contains Dairy"],
    },

    {
      name: "Tortellini alla Panna",
      description:
        "Delicate handmade tortellini filled with Parmesan and prosciutto, finished in a silky cream sauce.",
      price: "£15.50",
      image: TortelliniAllaPanna,
      course: "Primi",
      tags: ["Contains Dairy"],
    },

    {
      name: "Pasta al Ragù",
      description:
        "Handmade pasta tossed through a slow-cooked Italian ragù of beef, tomato and aromatic herbs.",
      price: "£14.50",
      image: PastaAlRagu,
      course: "Primi",
      tags: [],
    },
    {
      name: "Insalata di Finocchio",
      description: "Shaved fennel, blood orange, Taggiasca olives, new season oil.",
      price: "£9.00",
      image: TortelliniAllaPanna,
      course: "Antipasti",
      tags: ["Vegan", "Gluten-Free"],
    },
    {
      name: "Panna Cotta al Limone",
      description: "Amalfi lemon, single cream set soft, candied peel.",
      price: "£7.00",
      image: CimbelloneBalanzone,
      course: "Dolci",
      tags: ["Vegetarian", "Contains Dairy", "Gluten-Free"],
    },
  ],
  Dinner: [

    {
      name: "Tortellini alla Panna",
      description:
        "Delicate handmade tortellini filled with Parmesan and prosciutto, finished in a silky cream sauce.",
      price: "£15.50",
      image: TortelliniAllaPanna,
      course: "Primi",
      tags: ["Contains Dairy"],
    },

    {
      name: "Pappardelle all’Ossobuco",
      description:
        "Silky hand-cut pappardelle served with slow-braised ossobuco, rich veal jus and fresh herbs.",
      price: "£16.50",
      image: PappardelleAllOssobuco,
      course: "Primi",
      tags: ["Contains Dairy"],
    },

    {
      name: "Pasta al Ragù",
      description:
        "Handmade pasta tossed through a slow-cooked Italian ragù of beef, tomato and aromatic herbs.",
      price: "£14.50",
      image: PastaAlRagu,
      course: "Primi",
      tags: [],
    },
    {
      name: "Branzino al Forno",
      description: "Whole sea bass baked with lemon, capers and new season olive oil.",
      price: "£24.00",
      image: TortelliniAllaPanna,
      course: "Secondi",
      tags: ["Gluten-Free", "Halal"],
    },
    {
      name: "Melanzane alla Parmigiana",
      description: "Layered aubergine, slow tomato, Parmigiano crust, baked to order.",
      price: "£16.00",
      image: CimbelloneBalanzone,
      course: "Secondi",
      tags: ["Vegetarian", "Contains Dairy", "Gluten-Free"],
    },
    {
      name: "Tiramisù della Nonna",
      description: "Savoiardi soaked in Bologna espresso, mascarpone whipped to order.",
      price: "£8.00",
      image: CimbelloneBalanzone,
      course: "Dolci",
      tags: ["Vegetarian", "Contains Dairy"],
    },
  ],
  Brunch: [
    {
      name: "Uova in Purgatorio",
      description: "Eggs baked in spiced tomato with focaccia soldiers.",
      price: "£11.50",
      image: PappardelleAllOssobuco,
      course: "Primi",
      tags: ["Vegetarian"],
    },
    {
      name: "Cornetto & Caffè",
      description: "Butter cornetto, apricot jam, double espresso.",
      price: "£5.50",
      image: CimbelloneBalanzone,
      course: "Dolci",
      tags: ["Vegetarian", "Contains Dairy"],
    },
    {
      name: "Bruschetta Estiva",
      description: "Grilled bread, marinated tomato, oregano, garlic rubbed thin.",
      price: "£7.50",
      image: PappardelleAllOssobuco,
      course: "Antipasti",
      tags: ["Vegan"],
    },
  ],
  Drinks: [
    {
      name: "Negroni Sbagliato",
      description: "Campari, vermouth rosso, topped with Franciacorta.",
      price: "£10.00",
      image: GnocchiAlPesto,
      course: "Cantina",
      tags: ["Vegan", "Gluten-Free"],
    },
    {
      name: "Chianti Classico, Riserva",
      description: "Tuscany. Sour cherry, leather, a long dusty finish.",
      price: "£38.00 bottle",
      image: PastaAlRagu,
      course: "Cantina",
      tags: ["Vegan"],
    },
    {
      name: "Etna Bianco, Carricante",
      description: "Sicily. Volcanic salt, white peach, a cold stone finish.",
      price: "£42.00 bottle",
      image: TortelliniAllaPanna,
      course: "Cantina",
      tags: ["Vegan", "Gluten-Free"],
    },
  ],
};
