import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const lastModified = "2026-11-02";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/menu`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
}
