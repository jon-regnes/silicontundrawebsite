// lib/taxonomy.ts
// Two prompt-library dimensions. See docs/superpowers/specs/2026-07-20-smb-pivot-design.md.
// Do not rename slugs casually — each is a public URL.

export const FUNCTIONS = {
  operations: "Operations",
  marketing: "Marketing",
  sales: "Sales",
} as const;

export type PromptFunction = keyof typeof FUNCTIONS;

export function isFunction(value: string): value is PromptFunction {
  return Object.hasOwn(FUNCTIONS, value);
}

export const INDUSTRIES = {
  "field-services": "Home, Commercial & Field Services",
  "real-estate": "Real Estate",
  manufacturing: "Specialty Manufacturing & Industrial",
  "lifestyle-medicine": "Lifestyle Medicine",
  logistics: "Logistics",
  "rentals-b2b": "Rentals & B2B Operations",
  "pet-care": "Animal & Pet Care",
  agriculture: "Agriculture & Extraction",
} as const;

export type Industry = keyof typeof INDUSTRIES;

export function isIndustry(value: string): value is Industry {
  return Object.hasOwn(INDUSTRIES, value);
}
