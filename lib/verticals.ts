/**
 * Fixed vertical tag list — each value maps 1:1 to a generated route at
 * /resources/prompts/[vertical]. See .claude/skills/content-schema/SKILL.md
 * before adding or changing a value.
 *
 * Lives in its own module (no fs imports) so client components can use it.
 */
export const VERTICALS = {
  "iv-wellness": "IV Wellness Clinics",
  trt: "TRT / Men's Health Clinics",
  chiropractic: "Chiropractors",
  "dental-ortho": "Dental / Orthodontic Offices",
  "med-spa": "Med Spas",
} as const;

export type Vertical = keyof typeof VERTICALS;

export function isVertical(value: string): value is Vertical {
  return value in VERTICALS;
}
