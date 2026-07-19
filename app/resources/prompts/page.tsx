import type { Metadata } from "next";
import Link from "next/link";
import { PromptGrid } from "@/components/resources/PromptGrid";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getPrompts, VERTICALS, type Vertical } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI Prompt Library for Lifestyle Medicine Practices",
  description:
    "Free plug-and-play AI prompts for med spas, chiropractors, dental offices, IV wellness, and TRT clinics — follow-ups, reactivation, reviews, and intake, ready to copy.",
  openGraph: {
    title: "AI Prompt Library | Silicon Tundra",
    description:
      "Free plug-and-play AI prompts for lifestyle medicine practices, organized by vertical.",
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
          Plug-and-play prompts for the AI tools you already use. Filter by
          your vertical, open a prompt, copy it, done.
        </p>
        <div className="mt-12">
          <PromptGrid prompts={prompts} />
        </div>
        <nav className="mt-16 border-t border-border pt-8" aria-label="Prompts by vertical">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Browse by vertical
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {(Object.keys(VERTICALS) as Vertical[]).map((vertical) => (
              <li key={vertical}>
                <Link
                  href={`/resources/prompts/${vertical}`}
                  className="text-sm text-accent hover:text-accent-hover"
                >
                  AI prompts for {VERTICALS[vertical]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
