import { fullAddress, links, site } from "@/config/site";
import { DAY_NAMES } from "@/lib/hours";

/** schema.org Restaurant data for local search. */
export function RestaurantJsonLd() {
  const toSchemaTime = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return `${String(h % 24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${site.url}/#restaurant`,
    name: site.name,
    slogan: site.tagline,
    description: `Mumbai-style Indo-Chinese restaurant in Al Karama, Dubai. ${site.tagline}.`,
    url: site.url,
    telephone: site.phone.e164,
    image: [`${site.url}/images/interior-1.webp`],
    logo: `${site.url}/icon.png`,
    servesCuisine: [site.cuisine, "Chinese", "Indian"],
    foundingDate: String(site.foundedYear),
    hasMenu: `${site.url}/menu`,
    acceptsReservations: false,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.building}, ${site.address.landmark}`,
      addressLocality: `${site.address.area}, ${site.address.city}`,
      addressRegion: site.address.city,
      addressCountry: site.address.country,
    },
    hasMap: links.directions,
    openingHoursSpecification: site.hours.flatMap((d) =>
      d.windows.map((w) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${DAY_NAMES[d.day]}`,
        opens: toSchemaTime(w.open),
        closes: toSchemaTime(w.close),
      })),
    ),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    sameAs: [site.instagram.url, ...(site.zomatoUrl ? [site.zomatoUrl] : [])],
    keywords: `Indo Chinese restaurant Karama, Chinese near BurJuman, Mumbai Chinese Dubai. ${fullAddress}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
