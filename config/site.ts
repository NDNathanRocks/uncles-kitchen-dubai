/**
 * Every business detail for the site lives here.
 * Change a value once and it updates the whole site (pages, buttons, SEO data).
 */

/** Zomato delivery link. Leave empty ("") to hide every "Order" button. */
// TODO: paste the restaurant's Zomato page URL here.
export const ZOMATO_URL = "";

export type DayHours = {
  /** 0 = Sunday … 6 = Saturday */
  day: number;
  /** Opening windows as "HH:MM" 24h strings. A close of "24:00" or later means after midnight. */
  windows: { open: string; close: string }[];
};

const weekdayWindows = [
  { open: "11:30", close: "15:30" },
  { open: "18:30", close: "24:00" },
];
const weekendWindows = [
  { open: "11:30", close: "15:30" },
  { open: "18:30", close: "24:30" },
];

export const site = {
  name: "Uncle's Kitchen",
  tagline: "A Timeless Legacy of Indo-Chinese Cuisine since 1987",
  secondaryLine: "From the Nook of Mumbai to the Heart of Dubai",
  foundedYear: 1987,
  cuisine: "Indo-Chinese",

  /** Public URL of the live site (used for SEO, sitemap and social previews). */
  // TODO: switch to the custom domain once one is connected.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://uncles-kitchen.vercel.app",

  phone: {
    display: "+971 50 588 1752",
    e164: "+971505881752",
  },

  whatsapp: {
    // TODO: confirm WhatsApp — currently assumed to be the same as the phone number.
    number: "971505881752",
    message: "Hi Uncle's Kitchen, I'd like to place an order",
  },

  address: {
    building: "Era Building, Shop No. 8",
    landmark: "Exit 2, behind BurJuman Metro Station",
    area: "Al Karama",
    city: "Dubai",
    country: "AE",
    countryName: "United Arab Emirates",
  },

  /** Google Maps search used for the embedded map and directions. */
  mapQuery: "Uncle's Kitchen, Era Building, Al Karama, Dubai",
  googlePlaceId: "ChIJx5ETkY1DXz4Rl2QtTFclxfs",

  rating: {
    value: 4.1,
    count: 278,
  },

  instagram: {
    handle: "1987_uncles_kitchen_",
    url: "https://www.instagram.com/1987_uncles_kitchen_/",
  },

  zomatoUrl: ZOMATO_URL,

  timeZone: "Asia/Dubai",

  hours: [
    { day: 1, windows: weekdayWindows },
    { day: 2, windows: weekdayWindows },
    { day: 3, windows: weekdayWindows },
    { day: 4, windows: weekdayWindows },
    { day: 5, windows: weekendWindows },
    { day: 6, windows: weekendWindows },
    { day: 0, windows: weekendWindows },
  ] satisfies DayHours[],
} as const;

const enc = encodeURIComponent;

export const links = {
  call: `tel:${site.phone.e164}`,
  whatsapp: `https://wa.me/${site.whatsapp.number}?text=${enc(site.whatsapp.message)}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${enc(site.mapQuery)}&destination_place_id=${site.googlePlaceId}`,
  mapEmbed: `https://maps.google.com/maps?q=${enc(site.mapQuery)}&z=17&output=embed`,
  reviews: `https://search.google.com/local/reviews?placeid=${site.googlePlaceId}`,
  instagram: site.instagram.url,
  zomato: site.zomatoUrl,
  menuPdf: "/uncles-kitchen-menu.pdf",
} as const;

export const fullAddress = `${site.address.building}, ${site.address.landmark}, ${site.address.area}, ${site.address.city}`;
