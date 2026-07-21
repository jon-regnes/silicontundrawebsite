import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getProducts, getPrompts } from "@/lib/content";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Resources — AI Tools & Prompts for Small & Medium Business",
  description:
    "Free resources for small and medium businesses: researched AI and automation tools, plus plug-and-play prompts for field services, real estate, manufacturing, lifestyle medicine, logistics, rentals & B2B, pet care, and agriculture businesses.",
  openGraph: {
    title: "Silicon Tundra Resources",
    description:
      "Researched AI tools and plug-and-play prompts for small and medium businesses.",
    images: [OG_IMAGE],
  },
};

export default function ResourcesPage() {
  const productCount = getProducts().length;
  const promptCount = getPrompts().length;

  return (
    <Section className="pt-24">
      <Container>
        <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Resources
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Everything here is free: tools we&apos;ve actually researched, and
          prompts you can paste straight into your AI of choice.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link href="/resources/products" className="group">
            <Card className="h-full transition-colors group-hover:border-accent">
              <h2 className="font-heading text-2xl font-semibold group-hover:text-accent">
                Researched Products
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                AI and automation tools we&apos;ve evaluated for small and
                medium businesses — what each one does, who it&apos;s best
                for, and the honest pros and cons.
              </p>
              <span className="mt-6 inline-block text-sm font-medium text-accent">
                Browse {productCount} products &rarr;
              </span>
            </Card>
          </Link>
          <Link href="/resources/prompts" className="group">
            <Card className="h-full transition-colors group-hover:border-accent">
              <h2 className="font-heading text-2xl font-semibold group-hover:text-accent">
                Prompt Library
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Plug-and-play AI prompts for follow-ups, reactivation, reviews,
                and intake — organized by function and industry, ready to
                copy.
              </p>
              <span className="mt-6 inline-block text-sm font-medium text-accent">
                Browse {promptCount} prompts &rarr;
              </span>
            </Card>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
