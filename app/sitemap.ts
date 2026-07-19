import type { MetadataRoute } from "next";
import { getPrompts, VERTICALS, type Vertical } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/services",
    "/resources",
    "/resources/products",
    "/resources/prompts",
    "/contact",
  ].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const verticalRoutes = (Object.keys(VERTICALS) as Vertical[]).map(
    (vertical) => ({
      url: absoluteUrl(`/resources/prompts/${vertical}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  // Each prompt is listed once, under its primary (first) vertical — matching
  // the canonical URL set on the prompt detail page.
  const promptRoutes = getPrompts().map((prompt) => ({
    url: absoluteUrl(`/resources/prompts/${prompt.vertical[0]}/${prompt.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...verticalRoutes, ...promptRoutes];
}
