import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/cars-and-coffee`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];
}
