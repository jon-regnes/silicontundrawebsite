import type { Metadata } from "next";
import Link from "next/link";
import { PromptGrid } from "@/components/resources/PromptGrid";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getPrompts } from "@/lib/content";
import { FUNCTIONS, INDUSTRIES, type Industry, type PromptFunction } from "@/lib/taxonomy";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Prompt Library for Small & Mid-Sized Businesses",
  description:
    "Free plug-and-play AI prompts for operations, marketing, and sales teams — organized by function and industry, ready to copy into the AI tool you already use.",
  openGraph: {
    title: "AI Prompt Library | Silicon Tundra",
    description:
      "Free plug-and-play AI prompts for small and mid-sized businesses, organized by function and industry.",
    images: [OG_IMAGE],
  },
};

export default function PromptsPage() {
  const prompts = getPrompts();

  return (
    <Section className="pt-24">
      <Container>
        <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Prompt Library
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Plug-and-play prompts for the AI tools you already use. Browse by
          function or industry, open a prompt, copy it, done.
        </p>
        <div className="mt-12">
          <PromptGrid prompts={prompts} />
        </div>
        <nav className="mt-16 border-t border-border pt-8" aria-label="Prompts by function">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Browse by function
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {(Object.keys(FUNCTIONS) as PromptFunction[]).map((fn) => (
              <li key={fn}>
                <Link
                  href={`/resources/prompts/${fn}`}
                  className="text-sm text-accent hover:text-accent-hover"
                >
                  AI {FUNCTIONS[fn]} Prompts
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="mt-8 border-t border-border pt-8" aria-label="Prompts by industry">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Browse by industry
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {(Object.keys(INDUSTRIES) as Industry[]).map((industry) => (
              <li key={industry}>
                <Link
                  href={`/resources/prompts/industries/${industry}`}
                  className="text-sm text-accent hover:text-accent-hover"
                >
                  AI Prompts for {INDUSTRIES[industry]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
