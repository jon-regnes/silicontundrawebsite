import type { MetadataRoute } from "next";
import { getPrompts } from "@/lib/content";
import { FUNCTIONS, INDUSTRIES, type Industry, type PromptFunction } from "@/lib/taxonomy";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/services",
    "/resources",
    "/resources/products",
    "/resources/prompts",
    "/ebook",
    "/book",
    "/contact",
  ].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const functionRoutes = (Object.keys(FUNCTIONS) as PromptFunction[]).map(
    (fn) => ({
      url: absoluteUrl(`/resources/prompts/${fn}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  const industryRoutes = (Object.keys(INDUSTRIES) as Industry[]).map(
    (industry) => ({
      url: absoluteUrl(`/resources/prompts/industries/${industry}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  // Each prompt is listed once, under its (single-valued) function — matching
  // the canonical URL set on the prompt detail page.
  const promptRoutes = getPrompts().map((prompt) => ({
    url: absoluteUrl(`/resources/prompts/${prompt.function}/${prompt.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...functionRoutes,
    ...industryRoutes,
    ...promptRoutes,
  ];
}
