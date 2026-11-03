import type { StaticImageData } from "next/image";

/**
 * Homepage "classics". Prices match data/menu.ts.
 * Add `image` (a real, full-frame photo) to any dish and its card shows it.
 */
export type Dish = {
  name: string;
  line: string;
  price?: string;
  veg?: boolean;
  spice?: 1 | 2;
  classic?: boolean;
  image?: StaticImageData;
  alt?: string;
};

export const signatureDishes: Dish[] = [
  {
    name: "Chicken Lollipop",
    line: "The famous one. Ask the team for today's price.",
    veg: false,
  },
  {
    name: "Hakka Noodles",
    line: "Wok-tossed in a soy-based mix of shredded vegetables.",
    price: "Veg 23 · Chicken 24",
    classic: true,
  },
  {
    name: "Paneer Chilli",
    line: "Paneer in a soy-based, medium-spicy sauce with green chillies.",
    price: "AED 25",
    veg: true,
    spice: 2,
    classic: true,
  },
  {
    name: "Chicken in Garlic Sauce",
    line: "Hot, sweet and garlicky. Order it dry or as a gravy.",
    price: "AED 23",
    veg: false,
    classic: true,
  },
  {
    name: "Chicken Chilli",
    line: "Boneless, no batter, tossed with green chillies. A customer favourite since 1987.",
    price: "AED 29",
    veg: false,
    spice: 2,
    classic: true,
  },
  {
    name: "Sweet Corn Soup",
    line: "Thick, cream-corn soup, slightly sweet. Plain, veg or mushroom.",
    price: "12 · 13 · 15",
    veg: true,
    classic: true,
  },
];
