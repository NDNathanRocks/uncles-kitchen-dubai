import type { StaticImageData } from "next/image";
import chickenChilli from "@/public/images/dishes/chicken-chilli-dry.webp";
import hakka from "@/public/images/dishes/chicken-hakka-noodles.webp";
import paneerChilli from "@/public/images/dishes/paneer-chilli.webp";
import garlic from "@/public/images/dishes/chicken-garlic-hot-sweet.webp";
import vegFriedRice from "@/public/images/dishes/veg-fried-rice.webp";
import sesameToast from "@/public/images/dishes/sesame-toast-fingers.webp";

import friedPrawns from "@/public/images/dishes/fried-prawns.webp";
import chopSuey from "@/public/images/dishes/chicken-american-chop-suey.webp";
import paneerCrispy from "@/public/images/dishes/paneer-crispy.webp";
import vegPotRice from "@/public/images/dishes/veg-pot-rice.webp";
import fishFingers from "@/public/images/dishes/fish-fingers.webp";
import mongolian from "@/public/images/dishes/chicken-mongolian.webp";

export type Dish = { name: string; line: string; price?: string; image: StaticImageData; alt: string };

/** Prices match data/menu.ts. */
export const signatureDishes: Dish[] = [
  {
    name: "Chicken Chilli",
    line: "Boneless, no batter, tossed with green chillies. A customer favourite since 1987.",
    price: "AED 29",
    image: chickenChilli,
    alt: "Dry chicken chilli with green chillies on a black plate",
  },
  {
    name: "Hakka Noodles",
    line: "Wok-tossed in a soy-based mix of shredded vegetables. A 1987 classic.",
    price: "Veg 23 · Chicken 24",
    image: hakka,
    alt: "Chicken Hakka noodles with green capsicum in a black wok bowl",
  },
  {
    name: "Paneer Chilli",
    line: "Paneer in a soy-based, medium-spicy sauce with green chillies.",
    price: "AED 25",
    image: paneerChilli,
    alt: "Paneer chilli with spring onions on a black plate",
  },
  {
    name: "Chicken in Garlic Sauce",
    line: "Hot, sweet and garlicky. Order it dry or as a gravy.",
    price: "AED 23",
    image: garlic,
    alt: "Chicken in hot and sweet garlic sauce, served dry with spring onions",
  },
  {
    name: "Veg Fried Rice",
    line: "Classic soy-based fried rice, wok-tossed with vegetables and spring onions.",
    price: "AED 21",
    image: vegFriedRice,
    alt: "Vegetable fried rice with babycorn in a black wok bowl",
  },
  {
    name: "Sesame Toast Fingers",
    line: "Topped with sesame, fried golden and cut into 8–10 fingers.",
    price: "Veg 23 · Chicken 24",
    image: sesameToast,
    alt: "Golden sesame toast fingers on a black plate",
  },
];

export const instagramTiles: { image: StaticImageData; alt: string }[] = [
  { image: friedPrawns, alt: "Fried prawns with onion rings" },
  { image: chopSuey, alt: "Chicken American chop suey topped with a fried egg" },
  { image: paneerCrispy, alt: "Paneer crispy" },
  { image: vegPotRice, alt: "Uncle's special veg pot rice" },
  { image: fishFingers, alt: "Fish fingers" },
  { image: mongolian, alt: "Chicken Mongolian hot and sweet" },
];
