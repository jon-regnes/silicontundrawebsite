import type { Metadata } from "next";
import { BookingCTA } from "@/components/home/BookingCTA";
import { EmailCaptureBand } from "@/components/home/EmailCaptureBand";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ResourcesTeaser } from "@/components/home/ResourcesTeaser";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Testimonial } from "@/components/home/Testimonial";
import { getPrompts, getServices, type Prompt } from "@/lib/content";
import { OG_IMAGE } from "@/lib/seo";

/**
 * Pick `count` random prompts, each from a different vertical. Runs at build
 * time (page is static), so the selection rotates per deploy, not per visit.
 * Prompts tagged to many verticals are skipped so the teaser cards stay clean.
 */
function pickFeaturedPrompts(prompts: Prompt[], count = 3): Prompt[] {
  const shuffled = [...prompts].sort(() => Math.random() - 0.5);
  const picked: Prompt[] = [];
  const usedVerticals = new Set<string>();
  for (const prompt of shuffled) {
    if (picked.length === count) break;
    if (prompt.vertical.length === 0 || prompt.vertical.length > 2) continue;
    if (prompt.vertical.some((v) => usedVerticals.has(v))) continue;
    picked.push(prompt);
    prompt.vertical.forEach((v) => usedVerticals.add(v));
  }
  for (const prompt of shuffled) {
    if (picked.length === count) break;
    if (!picked.includes(prompt)) picked.push(prompt);
  }
  return picked;
}

export const metadata: Metadata = {
  title: "Silicon Tundra — AI & Automation for Lifestyle Medicine",
  description:
    "AI receptionists, custom agents, automation consulting, and custom software for med spas, chiropractors, dental offices, IV wellness, and TRT clinics. Book a discovery call.",
  openGraph: {
    title: "Silicon Tundra — AI & Automation for Lifestyle Medicine",
    description:
      "Automated workflows + smarter tools = more time to focus on patient care.",
    images: [OG_IMAGE],
  },
};

export default function HomePage() {
  const services = getServices();
  const featuredPrompts = pickFeaturedPrompts(getPrompts());

  return (
    <>
      <Hero />
      <Testimonial />
      <ServicesPreview services={services} />
      <HowItWorks />
      <ResourcesTeaser prompts={featuredPrompts} />
      <EmailCaptureBand />
      <BookingCTA />
    </>
  );
}
