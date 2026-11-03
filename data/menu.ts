/**
 * Menu transcribed from the restaurant's printed menu pages
 * (public/images/raw/menu-page-01.png … menu-page-12.png).
 * Prices are in AED exactly as printed. `null` = price not shown on the photographed pages.
 * Obvious spelling slips on the printed menu were corrected; prices were not touched.
 */

export type PriceOption = { label: string; aed: number };
export type Price = number | PriceOption[] | null;

export type MenuItem = {
  name: string;
  price: Price;
  veg: boolean;
  /** 1 = medium spicy, 2 = spicy (as marked on the printed menu) */
  spice?: 1 | 2;
  /** Marked "Classic of 1987" on the printed menu */
  classic?: boolean;
  description?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
};

const fp = (fish: number, prawn: number): PriceOption[] => [
  { label: "Fish", aed: fish },
  { label: "Prawn", aed: prawn },
];
const ec = (egg: number, chicken: number): PriceOption[] => [
  { label: "Egg", aed: egg },
  { label: "Chicken", aed: chicken },
];

export const menuNotes = [
  "Add mushroom to any veg rice, noodles or rice & noodles dish for AED 2.",
  "Add prawns to any rice, noodles or rice & noodles dish for AED 9.",
  "Extra fried noodles and Szechwan sauce are chargeable.",
  "In case of any allergies, please reach out to our team.",
];

export const menu: MenuCategory[] = [
  {
    id: "soups",
    title: "Soups",
    items: [
      {
        name: "Sweet Corn Soup",
        price: [
          { label: "Plain", aed: 12 },
          { label: "Veg", aed: 13 },
          { label: "Mushroom", aed: 15 },
        ],
        veg: true,
        classic: true,
        description: "Thick cream-corn soup, slightly sweet. Plain, with chopped vegetables or with diced mushrooms.",
      },
      {
        name: "Paneer & Spinach Soup",
        price: 14,
        veg: true,
        description: "Clear vegetable broth with shredded spinach and diced paneer.",
      },
      {
        name: "Kitchen Special Hot & Sour Veg Soup",
        price: 14,
        veg: true,
        spice: 1,
        classic: true,
        description: "Uncle's special. Thick, soy based, mildly spiced, with vegetables, bamboo shoots, mushrooms, ginger and garlic.",
      },
      {
        name: "Hot & Sour Veg Clear Soup",
        price: 14,
        veg: true,
        spice: 1,
        description: "Clear, soy based and mildly spiced, with shredded vegetables, bamboo shoots and mushrooms.",
      },
      {
        name: "Manchow Soup Veg",
        price: 15,
        veg: true,
        classic: true,
        description: "Thick, soy based, non-spicy soup with ginger, garlic, vegetables, bamboo shoots and mushroom.",
      },
      {
        name: "Mix Veg Clear Soup",
        price: 13,
        veg: true,
        description: "Vegetable broth with diced cabbage, carrots and babycorn, finished with white pepper.",
      },
      {
        name: "Veg Wonton Noodle Soup",
        price: 16,
        veg: true,
        classic: true,
        description: "Clear vegetable broth with 3 steamed vegetable wontons and boiled noodles.",
      },
      {
        name: "Veg Noodle Soup",
        price: 14,
        veg: true,
        description: "Clear vegetable broth with shredded vegetables and boiled noodles.",
      },
    ],
  },
  {
    id: "veg-starters",
    title: "Veg Starters",
    items: [
      {
        name: "Veg Spring Rolls",
        price: 21,
        veg: true,
        classic: true,
        description: "Shredded vegetables tossed in soy sauce, rolled, shallow fried and cut into 8–10 pieces.",
      },
      {
        name: "Veg Sesame Toast Fingers",
        price: 23,
        veg: true,
        description: "Vegetable paste on bread, topped with sesame seeds, fried and cut into 8–10 strips.",
      },
      {
        name: "Veg Fried Won-Tons",
        price: 24,
        veg: true,
        classic: true,
        description: "Chopped vegetables wrapped like dumplings in wonton wrappers and fried.",
      },
      {
        name: "Veg Crispy",
        price: 25,
        veg: true,
        description: "Babycorn, cabbage, carrots, onions and capsicum in Uncle's marinade, shallow fried and tossed in a sweet and spicy sauce.",
      },
      {
        name: "Paneer or Mushroom Crispy",
        price: 26,
        veg: true,
        description: "Paneer cubes or diced mushrooms in Uncle's in-house spices, batter fried. No wok preparation.",
      },
      {
        name: "Paneer Crispy Szechwan Sautee",
        price: 27,
        veg: true,
        spice: 1,
        description: "Batter-fried paneer wok tossed in Szechwan sauce: a fiery kick with a hint of sweetness.",
      },
      {
        name: "Veg Chilli",
        price: 23,
        veg: true,
        spice: 2,
        classic: true,
        description: "Vegetable balls tossed in a soy based sauce with green chillies.",
      },
      {
        name: "Veg Manchurian",
        price: 23,
        veg: true,
        classic: true,
        description: "Vegetable balls tossed in a soy based sauce with ginger, garlic and green chillies.",
      },
      {
        name: "Veg Szechwan",
        price: 24,
        veg: true,
        spice: 1,
        classic: true,
        description: "Vegetable balls tossed in Uncle's in-house Szechwan sauce.",
      },
      {
        name: "Veg Garlic Hot n Sweet",
        price: 22,
        veg: true,
        classic: true,
        description: "Vegetable balls in a hot and sweet sauce with minced garlic, on the sweeter side.",
      },
    ],
  },
  {
    id: "paneer-mushroom",
    title: "Mushroom / Paneer / Baby Corn / Potatoes",
    note: "Choose one, or any two together. Most can be served dry or as a gravy.",
    items: [
      {
        name: "Black Pepper",
        price: 25,
        veg: true,
        spice: 1,
        description: "White onions and black pepper sauce, with a kick of black pepper.",
      },
      {
        name: "Chilli",
        price: 25,
        veg: true,
        spice: 2,
        classic: true,
        description: "Soy based, medium-spicy sauce with green chillies. Paneer Chilli is the favourite.",
      },
      {
        name: "Manchurian",
        price: 25,
        veg: true,
        classic: true,
        description: "Soy based sauce with chopped ginger, garlic and green chillies.",
      },
      {
        name: "Garlic Hot & Sweet",
        price: 25,
        veg: true,
        classic: true,
        description: "Hot and sweet sauce with minced garlic, on the sweeter side.",
      },
      {
        name: "Szechwan",
        price: 25,
        veg: true,
        classic: true,
        description: "Tossed in Uncle's in-house spicy Szechwan.",
      },
      {
        name: "Beijing",
        price: 25,
        veg: true,
        description: "Thick sauce of onions, bell peppers and red chilli paste.",
      },
      {
        name: "Red Chilli",
        price: 25,
        veg: true,
        description: "Medium-spicy sauce made with Uncle's in-house red chilli blend.",
      },
      {
        name: "Shanghai",
        price: 25,
        veg: true,
        description: "Mildly spiced ginger-based gravy with sliced onions and diced capsicum.",
      },
    ],
  },
  {
    id: "veg-gravies",
    title: "Veg Gravies",
    items: [
      {
        name: "Veg Chilli",
        price: 23,
        veg: true,
        spice: 2,
        classic: true,
        description: "Vegetable balls cooked in a soy based sauce with green chillies.",
      },
      {
        name: "Veg Manchurian",
        price: 23,
        veg: true,
        classic: true,
        description: "Vegetable balls in a soy based sauce with ginger, garlic and green chillies.",
      },
      {
        name: "Veg Szechwan",
        price: 24,
        veg: true,
        spice: 1,
        classic: true,
        description: "Vegetable balls in Uncle's in-house Szechwan sauce.",
      },
      {
        name: "Veg Garlic Hot & Sweet",
        price: 22,
        veg: true,
        classic: true,
        description: "Vegetable balls in a hot and sweet garlic sauce, on the sweeter side.",
      },
      {
        name: "Diced Vegetables in Black Pepper Sauce",
        price: 25,
        veg: true,
        spice: 1,
        description: "Mushrooms, babycorn, broccoli, cabbage and carrots with white onions and black pepper sauce.",
      },
      {
        name: "Diced Vegetables in Red Chilli Sauce",
        price: 24,
        veg: true,
        description: "Mixed vegetables in Uncle's in-house red chilli sauce, medium spicy.",
      },
      {
        name: "Diced Vegetables in Shanghai Sauce",
        price: 24,
        veg: true,
        description: "Mixed vegetables in a mildly spiced ginger gravy with sliced onions and capsicum.",
      },
      {
        name: "Diced Vegetables in Beijing Sauce",
        price: 25,
        veg: true,
        description: "Mixed vegetables in a thick onion, bell pepper and red chilli sauce, mildly spiced.",
      },
    ],
  },
  {
    id: "veg-rice",
    title: "Veg Rice",
    items: [
      {
        name: "Uncle's Special Veg Pot Rice",
        price: 25,
        veg: true,
        description: "Steamed rice under a non-spicy gravy of paneer, mushrooms, babycorn, broccoli and carrots with star anise.",
      },
      {
        name: "Fried Rice Veg",
        price: 21,
        veg: true,
        classic: true,
        description: "Classic soy-based fried rice wok tossed with vegetables and spring onions.",
      },
      {
        name: "Hot Chilli Fried Rice Veg",
        price: 22,
        veg: true,
        spice: 1,
        description: "Fried rice with a blend of red chillies, vegetables and spring onions.",
      },
      {
        name: "Singapore Fried Rice Veg",
        price: 23,
        veg: true,
        description: "Mildly spiced with star anise and red chilli flakes.",
      },
      {
        name: "Szechwan Fried Rice Veg",
        price: 24,
        veg: true,
        spice: 2,
        classic: true,
        description: "Fried rice cooked in Uncle's spicy in-house Szechwan paste.",
      },
      {
        name: "Veg Stewed Rice",
        price: 22,
        veg: true,
        classic: true,
        description: "Steamed rice topped with a non-spicy vegetable stew.",
      },
      {
        name: "Veg Szechwan Stewed Rice",
        price: 23,
        veg: true,
        spice: 1,
        description: "Steamed rice topped with a spicy Szechwan vegetable stew.",
      },
    ],
  },
  {
    id: "veg-noodles",
    title: "Veg Noodles",
    items: [
      {
        name: "Hakka Noodles Veg",
        price: 23,
        veg: true,
        classic: true,
        description: "Noodles wok tossed in a non-spicy soy based mix of shredded vegetables.",
      },
      {
        name: "Hot Chilli Noodles Veg",
        price: 24,
        veg: true,
        spice: 1,
        description: "Noodles in a medium-spicy chilli blend with shredded vegetables.",
      },
      {
        name: "Singapore Noodles Veg",
        price: 25,
        veg: true,
        description: "Mildly spiced with star anise and red chilli flakes.",
      },
      {
        name: "Szechwan Noodles Veg",
        price: 26,
        veg: true,
        spice: 2,
        description: "Noodles in a spicy base of Uncle's in-house Szechwan with shredded vegetables.",
      },
      {
        name: "Veg Chinese Chop Suey",
        price: 22,
        veg: true,
        description: "Non-spicy sauce with diced vegetables, served with crispy fried noodles.",
      },
      {
        name: "Veg American Chop Suey",
        price: 24,
        veg: true,
        classic: true,
        description: "Sweet sauce with shredded vegetables, served with crispy fried noodles.",
      },
      {
        name: "Veg Chow-Mein",
        price: 24,
        veg: true,
        classic: true,
        description: "Steamed noodles topped with a non-spicy sauce and shredded vegetables.",
      },
      {
        name: "Veg Szechwan Chow-Mein",
        price: 25,
        veg: true,
        spice: 1,
        description: "Steamed noodles topped with Uncle's spicy Szechwan sauce and vegetables.",
      },
    ],
  },
  {
    id: "veg-rice-noodles",
    title: "Veg Rice & Noodles Mix",
    items: [
      {
        name: "Veg Rice 'N' Noodles Mix",
        price: 24,
        veg: true,
        description: "Rice and noodles wok tossed in a non-spicy soy sauce with vegetables, onions, capsicum and spring onions.",
      },
      {
        name: "Veg Hot Chilli Rice 'N' Noodles Mix",
        price: 25,
        veg: true,
        spice: 1,
        description: "Rice and noodles in a medium-spicy chilli blend with vegetables.",
      },
      {
        name: "Veg Singapore Rice 'N' Noodles Mix",
        price: 26,
        veg: true,
        description: "Mildly spiced with star anise and red chilli flakes.",
      },
      {
        name: "Veg Szechwan Rice 'N' Noodles Mix",
        price: 27,
        veg: true,
        spice: 2,
        description: "Rice and noodles wok tossed with Uncle's spicy in-house Szechwan.",
      },
    ],
  },
  {
    id: "chicken-starters",
    title: "Chicken Starters",
    items: [
      {
        name: "Chicken Lollipop",
        price: null,
        veg: false,
        description: "The famous one. Not on the photographed menu pages, so ask the team for today's price.",
      },
      {
        name: "Boneless Chicken Lollipops",
        price: 27,
        veg: false,
        description: "Boneless chicken cubes marinated in Uncle's special sauces and spices, then fried.",
      },
      {
        name: "Coriander Chicken Tenders",
        price: 26,
        veg: false,
        description: "Boneless chicken strips in a coriander and green chilli blend, fried.",
      },
      {
        name: "Chicken Sesame Toast Fingers",
        price: 24,
        veg: false,
        description: "Seasoned chicken mince on bread, topped with sesame, fried and cut into 8–10 strips.",
      },
      {
        name: "Chicken Fried Won-Tons",
        price: 25,
        veg: false,
        classic: true,
        description: "Seasoned chicken mince wrapped like dumplings and fried.",
      },
      {
        name: "Chicken Chilli (Boneless)",
        price: 29,
        veg: false,
        spice: 2,
        classic: true,
        description: "Shredded and diced chicken, no batter, tossed in soy sauce with green chillies. A customer favourite since 1987.",
      },
      {
        name: "Chicken Garlic Chilli",
        price: 25,
        veg: false,
        spice: 1,
        description: "Batter-fried chicken strips in a garlic soy sauce with green chillies.",
      },
      {
        name: "Chicken Manchurian",
        price: 24,
        veg: false,
        classic: true,
        description: "Batter-fried chicken in a soy sauce with ginger, garlic and green chillies.",
      },
      {
        name: "Chicken Mongolian Hot n Sweet",
        price: 23,
        veg: false,
        description: "Chicken meatballs in a hot and sweet sauce with bell peppers and ginger.",
      },
      {
        name: "Chicken in Black Pepper Sauce",
        price: 26,
        veg: false,
        spice: 1,
        description: "Batter-fried chicken strips with white onions and black pepper sauce.",
      },
      {
        name: "Chicken in Red Chilli Sauce",
        price: 25,
        veg: false,
        description: "Batter-fried chicken in Uncle's in-house red chilli sauce, medium spicy.",
      },
      {
        name: "Chicken in Beijing Sauce",
        price: 26,
        veg: false,
        description: "Batter-fried chicken strips in a thick onion, bell pepper and red chilli sauce.",
      },
      {
        name: "Chicken Garlic Sauce Hot n Sweet",
        price: 23,
        veg: false,
        classic: true,
        description: "Chicken in a hot and sweet sauce with minced garlic, on the sweeter side.",
      },
      {
        name: "Chicken Spring Rolls",
        price: 23,
        veg: false,
        classic: true,
        description: "Shredded chicken and vegetables in soy sauce, rolled, shallow fried and cut into 8–10 pieces.",
      },
      {
        name: "Chicken Liver Fry or Liver Chilli",
        price: [
          { label: "Fry", aed: 21 },
          { label: "Chilli", aed: 22 },
        ],
        veg: false,
        classic: true,
        description: "Chicken liver in Uncle's special sauces and spices, fried, or tossed in soy sauce with green chillies.",
      },
    ],
  },
  {
    id: "seafood-starters",
    title: "Seafood Starters",
    note: "Seasonal. Fish is boneless hammour.",
    items: [
      {
        name: "Fish / Prawn Chilli",
        price: fp(33, 27),
        veg: false,
        spice: 2,
        classic: true,
        description: "Coated and tossed in a soy based sauce with green chillies.",
      },
      {
        name: "Fish / Prawn Manchurian",
        price: fp(33, 27),
        veg: false,
        classic: true,
        description: "Coated and tossed in soy sauce with ginger, garlic and green chillies.",
      },
      {
        name: "Fish / Prawn in Black Pepper Sauce",
        price: fp(33, 27),
        veg: false,
        description: "Tossed with white onions and black pepper sauce, medium spicy.",
      },
      {
        name: "Fish / Prawn in Garlic Sauce Hot n Sweet",
        price: fp(33, 27),
        veg: false,
        classic: true,
        description: "Hot and sweet sauce with minced garlic, on the sweeter side.",
      },
      {
        name: "Fish / Prawn in Red Chilli Sauce",
        price: fp(33, 27),
        veg: false,
        description: "Tossed in Uncle's in-house red chilli sauce, medium spicy.",
      },
      {
        name: "Fish / Prawn in Beijing Sauce",
        price: fp(33, 27),
        veg: false,
        description: "Thick sauce of onions, bell peppers and red chilli paste, mildly spiced.",
      },
      {
        name: "Fish Fingers",
        price: 34,
        veg: false,
        classic: true,
        description: "Boneless hammour strips marinated in Uncle's in-house sauces and fried to a crisp.",
      },
      {
        name: "Fried Prawns",
        price: 27,
        veg: false,
        classic: true,
        description: "Prawns marinated in Uncle's special sauces and spices, fried.",
      },
    ],
  },
  {
    id: "chicken-gravies",
    title: "Chicken Gravies",
    items: [
      {
        name: "Chicken Manchurian",
        price: 24,
        veg: false,
        classic: true,
        description: "Batter-fried chicken in a soy gravy with ginger, garlic and green chillies.",
      },
      {
        name: "Chicken Chilli (Boneless)",
        price: 29,
        veg: false,
        spice: 2,
        description: "Shredded and diced chicken, no batter, in a soy sauce with green chillies. A customer favourite since 1987.",
      },
      {
        name: "Chicken in Shanghai Sauce",
        price: 23,
        veg: false,
        description: "Batter-fried chicken strips in a mildly spiced ginger gravy with onions and capsicum.",
      },
      {
        name: "Chicken in Black Pepper Sauce",
        price: 26,
        veg: false,
        spice: 1,
        description: "Batter-fried chicken strips with white onions and black pepper sauce.",
      },
      {
        name: "Chicken in Beijing Sauce",
        price: 26,
        veg: false,
        description: "Thick sauce of onions, bell peppers and red chilli paste, mildly spiced.",
      },
      {
        name: "Chicken in Red Chilli Sauce",
        price: 25,
        veg: false,
        description: "Batter-fried chicken in Uncle's in-house red chilli sauce, medium spicy.",
      },
      {
        name: "Chicken in Oyster Sauce",
        price: 23,
        veg: false,
        description: "Non-spicy oyster sauce with mushrooms and broccoli, topped with sesame seeds.",
      },
      {
        name: "Chicken in Szechwan Sauce",
        price: 25,
        veg: false,
        spice: 1,
        classic: true,
        description: "Batter-fried chicken in Uncle's special in-house Szechwan.",
      },
      {
        name: "Chicken in Garlic Sauce (Hot n Sweet)",
        price: 23,
        veg: false,
        classic: true,
        description: "Batter-fried chicken in a hot and sweet garlic sauce, on the sweeter side.",
      },
      {
        name: "Chicken Oyster in Chilli Sauce",
        price: 25,
        veg: false,
        description: "Batter-fried chicken strips in a mildly spiced oyster sauce with green chillies.",
      },
    ],
  },
  {
    id: "seafood-gravies",
    title: "Seafood Gravies",
    note: "Seasonal. Fish is boneless hammour.",
    items: [
      {
        name: "Fish / Prawn Chilli",
        price: fp(33, 27),
        veg: false,
        spice: 2,
        classic: true,
        description: "Cooked in a soy based sauce with green chillies.",
      },
      {
        name: "Fish / Prawn Manchurian",
        price: fp(33, 27),
        veg: false,
        classic: true,
        description: "Soy based sauce with ginger, garlic and green chillies.",
      },
      {
        name: "Fish / Prawn in Black Pepper Sauce",
        price: fp(33, 27),
        veg: false,
        spice: 1,
        description: "White onions and black pepper sauce, medium spicy.",
      },
      {
        name: "Fish / Prawn in Beijing Sauce",
        price: fp(33, 27),
        veg: false,
        description: "Thick sauce of onions, bell peppers and red chilli paste, mildly spiced.",
      },
      {
        name: "Fish / Prawn in Red Chilli Sauce",
        price: fp(33, 27),
        veg: false,
        description: "Uncle's in-house red chilli sauce, medium spicy.",
      },
      {
        name: "Fish / Prawn in Oyster Sauce",
        price: fp(33, 27),
        veg: false,
        description: "Non-spicy oyster sauce with mushrooms and broccoli, topped with sesame seeds.",
      },
      {
        name: "Fish / Prawn in Szechwan Sauce",
        price: fp(33, 27),
        veg: false,
        spice: 1,
        classic: true,
        description: "Spicy sauce made with Uncle's special in-house Szechwan.",
      },
      {
        name: "Fish / Prawn in Garlic Sauce (Hot n Sweet)",
        price: fp(33, 27),
        veg: false,
        classic: true,
        description: "Hot and sweet sauce with minced garlic, on the sweeter side.",
      },
      {
        name: "Fish / Prawn Oyster in Chilli Sauce",
        price: fp(33, 27),
        veg: false,
        description: "Mildly spiced oyster sauce with green chillies.",
      },
    ],
  },
  {
    id: "chicken-rice",
    title: "Egg & Chicken Rice",
    items: [
      {
        name: "Uncle's Special Chicken Mushroom Pot Rice",
        price: 27,
        veg: false,
        description: "Steamed rice under a non-spicy chicken and mushroom gravy with star anise.",
      },
      {
        name: "Fried Rice Egg / Chicken",
        price: ec(20, 22),
        veg: false,
        classic: true,
        description: "Classic soy-based fried rice with scrambled eggs, diced chicken and spring onions.",
      },
      {
        name: "Hot Chilli Fried Rice Egg / Chicken",
        price: ec(21, 23),
        veg: false,
        spice: 1,
        description: "Fried rice with a red chilli blend, scrambled eggs and diced chicken.",
      },
      {
        name: "Singapore Fried Rice Egg / Chicken",
        price: ec(22, 24),
        veg: false,
        description: "Mildly spiced with star anise and red chilli flakes.",
      },
      {
        name: "Szechwan Fried Rice Egg / Chicken",
        price: ec(23, 25),
        veg: false,
        spice: 2,
        classic: true,
        description: "Fried rice in Uncle's spicy in-house Szechwan paste.",
      },
      {
        name: "Chicken Stewed Rice with Vegetables",
        price: 23,
        veg: false,
        classic: true,
        description: "Steamed rice topped with a non-spicy chicken and vegetable stew.",
      },
      {
        name: "Chicken Szechwan Stewed Rice with Vegetables",
        price: 24,
        veg: false,
        spice: 1,
        description: "Steamed rice topped with a spicy Szechwan chicken stew.",
      },
    ],
  },
  {
    id: "chicken-noodles",
    title: "Chicken Noodles",
    items: [
      {
        name: "Hakka Noodles Chicken",
        price: 24,
        veg: false,
        classic: true,
        description: "Noodles wok tossed in a non-spicy soy based mix of vegetables and chicken.",
      },
      {
        name: "Hot Chilli Noodles Chicken",
        price: 25,
        veg: false,
        spice: 1,
        description: "Noodles in a medium-spicy chilli blend with vegetables and chicken.",
      },
      {
        name: "Singapore Noodles Chicken",
        price: 26,
        veg: false,
        description: "Mildly spiced with star anise and red chilli flakes.",
      },
      {
        name: "Szechwan Noodles Chicken",
        price: 27,
        veg: false,
        spice: 2,
        classic: true,
        description: "Noodles in a spicy base of Uncle's in-house Szechwan with vegetables and chicken.",
      },
      {
        name: "Chicken Chow-Mein",
        price: 25,
        veg: false,
        classic: true,
        description: "Steamed noodles topped with a non-spicy sauce, vegetables and chicken.",
      },
      {
        name: "Chicken American Chop Suey",
        price: 27,
        veg: false,
        classic: true,
        description: "Sweet sauce with vegetables and chicken, crispy fried noodles and a fried egg.",
      },
      {
        name: "Chicken Chinese Chop Suey",
        price: 23,
        veg: false,
        description: "Non-spicy sauce with diced vegetables and chicken, served with crispy fried noodles.",
      },
      {
        name: "Chicken Szechwan Chow-Mein",
        price: 26,
        veg: false,
        spice: 1,
        description: "Steamed noodles topped with Uncle's spicy Szechwan sauce, vegetables and chicken.",
      },
    ],
  },
  {
    id: "chicken-rice-noodles",
    title: "Egg & Chicken Rice & Noodles Mix",
    items: [
      {
        name: "Rice & Noodles Mix Egg / Chicken",
        price: ec(23, 25),
        veg: false,
        description: "Wok tossed in a non-spicy soy sauce with scrambled eggs, diced chicken, onions and capsicum.",
      },
      {
        name: "Hot Chilli Rice & Noodles Mix Egg / Chicken",
        price: ec(24, 26),
        veg: false,
        spice: 1,
        description: "A medium-spicy chilli blend with scrambled eggs and diced chicken.",
      },
      {
        name: "Singapore Rice & Noodles Mix Egg / Chicken",
        price: ec(25, 27),
        veg: false,
        description: "Mildly spiced with star anise and red chilli flakes.",
      },
      {
        name: "Szechwan Rice & Noodles Mix Egg / Chicken",
        price: ec(26, 28),
        veg: false,
        spice: 2,
        description: "Wok tossed with Uncle's spicy in-house Szechwan.",
      },
    ],
  },
  {
    id: "beverages",
    title: "Beverages",
    items: [
      { name: "Soft Drink Can", price: 6, veg: true },
      { name: "Fresh Lime Water", price: 7, veg: true },
      { name: "Fresh Lime Soda", price: 9, veg: true },
      { name: "Lemon Iced Tea", price: 11, veg: true },
      { name: "Fresh Juice", price: 12, veg: true },
      { name: "Small Water Bottle", price: 3, veg: true },
      { name: "Big Water Bottle", price: 5, veg: true },
    ],
  },
];

export const menuPages = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { src: `/images/menu/menu-page-${n}.webp`, original: `/images/raw/menu-page-${n}.png`, page: i + 1 };
});

export function formatPrice(price: Price) {
  if (price === null) return "Ask";
  if (typeof price === "number") return `AED ${price}`;
  return price.map((p) => `${p.label} ${p.aed}`).join(" · ");
}
