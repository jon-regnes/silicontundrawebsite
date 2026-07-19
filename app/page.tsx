import type { Metadata } from "next";
import { BookingCTA } from "@/components/home/BookingCTA";
import { EmailCaptureBand } from "@/components/home/EmailCaptureBand";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ResourcesTeaser } from "@/components/home/ResourcesTeaser";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Testimonial } from "@/components/home/Testimonial";
import { getPrompts, getServices } from "@/lib/content";
import { OG_IMAGE } from "@/lib/seo";

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
  const featuredPrompts = getPrompts().slice(0, 3);

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
