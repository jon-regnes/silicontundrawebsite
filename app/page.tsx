import type { Metadata } from "next";
import { BlogTeaser } from "@/components/home/BlogTeaser";
import { BookingCTA } from "@/components/home/BookingCTA";
import { EbookCTA } from "@/components/home/EbookCTA";
import { EmailCaptureBand } from "@/components/home/EmailCaptureBand";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ResourcesTeaser } from "@/components/home/ResourcesTeaser";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Testimonial } from "@/components/home/Testimonial";
import { getPosts, getPrompts, getServices, type Prompt } from "@/lib/content";
import { OG_IMAGE } from "@/lib/seo";

/**
 * Pick `count` random prompts, favoring a mix of distinct functions. Runs at
 * build time (page is static), so the selection rotates per deploy, not per
 * visit. Flagship prompts tagged to many industries are skipped so the
 * teaser cards keep a clean single-badge look, unless too few remain.
 */
function pickFeaturedPrompts(prompts: Prompt[], count = 3): Prompt[] {
  const shuffled = [...prompts].sort(() => Math.random() - 0.5);
  const singleIndustry = shuffled.filter((p) => p.industries.length <= 1);
  const pool = singleIndustry.length >= count ? singleIndustry : shuffled;

  const picked: Prompt[] = [];
  const usedFunctions = new Set<string>();
  for (const prompt of pool) {
    if (picked.length === count) break;
    if (usedFunctions.has(prompt.function)) continue;
    picked.push(prompt);
    usedFunctions.add(prompt.function);
  }
  for (const prompt of pool) {
    if (picked.length === count) break;
    if (!picked.includes(prompt)) picked.push(prompt);
  }
  return picked;
}

export const metadata: Metadata = {
  title: "Silicon Tundra — AI & Automation for Small & Medium Business",
  description:
    "AI receptionists, custom agents, automation consulting, and custom software for field services, real estate, manufacturing, lifestyle medicine, logistics, rentals & B2B, pet care, and agriculture businesses. Book a discovery call.",
  openGraph: {
    title: "Silicon Tundra — AI & Automation for Small & Medium Business",
    description:
      "Automated workflows + smarter tools = more time to focus on what your business does best.",
    images: [OG_IMAGE],
  },
};

export default function HomePage() {
  const services = getServices();
  const featuredPrompts = pickFeaturedPrompts(getPrompts());
  const latestPosts = getPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <Testimonial />
      <ServicesPreview services={services} />
      <HowItWorks />
      <BlogTeaser posts={latestPosts} />
      <ResourcesTeaser prompts={featuredPrompts} />
      <EbookCTA />
      <EmailCaptureBand />
      <BookingCTA />
    </>
  );
}
