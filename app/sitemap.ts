import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/politica-de-privacidad", priority: 0.3 },
    { path: "/terminos-y-condiciones", priority: 0.3 },
    { path: "/politica-de-cookies", priority: 0.3 },
  ];
  return pages.map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
