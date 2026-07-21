import type { Service } from "./content";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.silicontundrallc.com";

export const SITE_NAME = "Silicon Tundra";

export const SITE_DESCRIPTION =
  "Silicon Tundra is the AI and Automation Navigator for small and medium businesses — AI receptionists, custom agents, automation consulting, and custom software for field services, real estate, manufacturing, lifestyle medicine, logistics, rentals & B2B operations, pet care, and agriculture businesses.";

/** Default OpenGraph image — referenced by every page's openGraph.images. */
export const OG_IMAGE = "/images/og/og-image.jpg";

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
      "operations automation",
      "marketing automation",
      "sales automation",
      "Home, Commercial & Field Services",
      "Real Estate",
      "Specialty Manufacturing & Industrial",
      "Lifestyle Medicine",
      "Logistics",
      "Rentals & B2B Operations",
      "Animal & Pet Care",
      "Agriculture & Extraction",
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
        "Small and medium businesses: field services, real estate, specialty manufacturing, lifestyle medicine, logistics, rentals & B2B operations, animal & pet care, and agriculture businesses",
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
