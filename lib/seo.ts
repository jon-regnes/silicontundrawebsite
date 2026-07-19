import type { Service } from "./content";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.silicontundrallc.com";

export const SITE_NAME = "Silicon Tundra";

export const SITE_DESCRIPTION =
  "Silicon Tundra is the AI and Automation Navigator for lifestyle medicine — AI receptionists, custom agents, automation consulting, and custom software for med spas, chiropractors, dental offices, IV wellness, and TRT clinics.";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    email: "jon@silicontundrallc.com",
    knowsAbout: [
      "AI receptionists",
      "AI agents",
      "practice automation",
      "lifestyle medicine",
      "med spas",
      "chiropractic clinics",
      "dental and orthodontic offices",
      "IV wellness clinics",
      "TRT and men's health clinics",
    ],
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: absoluteUrl(`/services#${service.slug}`),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: "United States",
    audience: {
      "@type": "Audience",
      audienceType:
        "Lifestyle medicine businesses: med spas, plastic surgery practices, chiropractors, dental and orthodontic offices, IV wellness clinics, men's health/TRT clinics",
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function itemListJsonLd(
  items: { name: string; url: string }[],
  name: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
