import { assetUrl } from "@/lib/utils";

const steak = assetUrl("/img/Steak.jpg");
const focaccia = assetUrl("/img/focaccia.jpg");  
const table = assetUrl("/img/tableFood.jpg");
const pizza = assetUrl("/img/Pizza.jpg");
const pizza2 = assetUrl("/img/pizzaSlanted.jpg");

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
      name: "Focaccia Romana",
      description:
        "Slow-fermented for 48 hours, baked at midday, torn at the table with Sicilian olive oil.",
      price: "£6.50",
      image: pizza,
      course: "Antipasti",
      tags: ["Vegan"],
    },
    {
      name: "Tagliere della Casa",
      description: "Culatello, finocchiona, aged Parmigiano, mostarda and warm bread.",
      price: "£16.50",
      image: table,
      course: "Antipasti",
      tags: ["Contains Dairy", "Contains Nuts"],
    },
    {
      name: "Tagliatelle Cacio e Pepe",
      description: "Hand-rolled ribbons, Pecorino Romano, cracked Tellicherry pepper.",
      price: "£14.00",
      image: pizza2,
      course: "Primi",
      tags: ["Vegetarian", "Contains Dairy"],
    },
    {
      name: "Insalata di Finocchio",
      description: "Shaved fennel, blood orange, Taggiasca olives, new season oil.",
      price: "£9.00",
      image: table,
      course: "Antipasti",
      tags: ["Vegan", "Gluten-Free"],
    },
    {
      name: "Panna Cotta al Limone",
      description: "Amalfi lemon, single cream set soft, candied peel.",
      price: "£7.00",
      image: pizza,
      course: "Dolci",
      tags: ["Vegetarian", "Contains Dairy", "Gluten-Free"],
    },
  ],
  Dinner: [
    {
      name: "Burrata e Pomodorini",
      description: "Puglian burrata, confit datterini, basil oil, grilled sourdough.",
      price: "£12.00",
      image: table,
      course: "Antipasti",
      tags: ["Vegetarian", "Contains Dairy"],
    },
    {
      name: "Bucatini all'Amatriciana",
      description: "Guanciale rendered slow, San Marzano, a whisper of chilli.",
      price: "£17.00",
      image: pizza2,
      course: "Primi",
      tags: ["Contains Dairy"],
    },
    {
      name: "Tagliatelle Cacio e Pepe",
      description: "Hand-rolled ribbons, Pecorino Romano, cracked Tellicherry pepper.",
      price: "£16.00",
      image: steak,
      course: "Primi",
      tags: ["Vegetarian", "Contains Dairy"],
    },
    {
      name: "Branzino al Forno",
      description: "Whole sea bass baked with lemon, capers and new season olive oil.",
      price: "£24.00",
      image: pizza,
      course: "Secondi",
      tags: ["Gluten-Free", "Halal"],
    },
    {
      name: "Melanzane alla Parmigiana",
      description: "Layered aubergine, slow tomato, Parmigiano crust, baked to order.",
      price: "£16.00",
      image: table,
      course: "Secondi",
      tags: ["Vegetarian", "Contains Dairy", "Gluten-Free"],
    },
    {
      name: "Tiramisù della Nonna",
      description: "Savoiardi soaked in Bologna espresso, mascarpone whipped to order.",
      price: "£8.00",
      image: table,
      course: "Dolci",
      tags: ["Vegetarian", "Contains Dairy"],
    },
  ],
  Brunch: [
    {
      name: "Uova in Purgatorio",
      description: "Eggs baked in spiced tomato with focaccia soldiers.",
      price: "£11.50",
      image: focaccia,
      course: "Primi",
      tags: ["Vegetarian"],
    },
    {
      name: "Cornetto & Caffè",
      description: "Butter cornetto, apricot jam, double espresso.",
      price: "£5.50",
      image: table,
      course: "Dolci",
      tags: ["Vegetarian", "Contains Dairy"],
    },
    {
      name: "Bruschetta Estiva",
      description: "Grilled bread, marinated tomato, oregano, garlic rubbed thin.",
      price: "£7.50",
      image: focaccia,
      course: "Antipasti",
      tags: ["Vegan"],
    },
  ],
  Drinks: [
    {
      name: "Negroni Sbagliato",
      description: "Campari, vermouth rosso, topped with Franciacorta.",
      price: "£10.00",
      image: pizza,
      course: "Cantina",
      tags: ["Vegan", "Gluten-Free"],
    },
    {
      name: "Chianti Classico, Riserva",
      description: "Tuscany. Sour cherry, leather, a long dusty finish.",
      price: "£38.00 bottle",
      image: pizza2,
      course: "Cantina",
      tags: ["Vegan"],
    },
    {
      name: "Etna Bianco, Carricante",
      description: "Sicily. Volcanic salt, white peach, a cold stone finish.",
      price: "£42.00 bottle",
      image: pizza2,
      course: "Cantina",
      tags: ["Vegan", "Gluten-Free"],
    },
  ],
};
