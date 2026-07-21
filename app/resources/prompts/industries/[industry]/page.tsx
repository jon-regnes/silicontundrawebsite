import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PromptCard } from "@/components/resources/PromptCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getPromptsByIndustry } from "@/lib/content";
import {
  FUNCTIONS,
  INDUSTRIES,
  isIndustry,
  type Industry,
  type PromptFunction,
} from "@/lib/taxonomy";
import { absoluteUrl, itemListJsonLd, OG_IMAGE } from "@/lib/seo";

interface Props {
  params: Promise<{ industry: string }>;
}

export function generateStaticParams() {
  return (Object.keys(INDUSTRIES) as Industry[]).map((industry) => ({
    industry,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  if (!isIndustry(industry)) return {};
  const label = INDUSTRIES[industry];
  return {
    title: `AI Prompts for ${label}`,
    description: `Free plug-and-play AI prompts for ${label.toLowerCase()} businesses — copy a prompt and use it in the AI tool you already have.`,
    alternates: {
      canonical: absoluteUrl(`/resources/prompts/industries/${industry}`),
    },
    openGraph: {
      title: `AI Prompts for ${label} | Silicon Tundra`,
      description: `Free plug-and-play AI prompts for ${label.toLowerCase()} businesses.`,
      images: [OG_IMAGE],
    },
  };
}

export default async function IndustryPromptsPage({ params }: Props) {
  const { industry } = await params;
  if (!isIndustry(industry)) notFound();
  const label = INDUSTRIES[industry];
  const prompts = getPromptsByIndustry(industry);

  return (
    <Section className="pt-24">
      <Container>
        <JsonLd
          data={itemListJsonLd(
            prompts.map((p) => ({
              name: p.title,
              url: absoluteUrl(`/resources/prompts/${p.function}/${p.slug}`),
            })),
            `AI Prompts for ${label}`,
          )}
        />
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/resources/prompts" className="hover:text-accent">
            Prompt Library
          </Link>{" "}
          / {label}
        </nav>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
          AI Prompts for {label}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Copy-and-paste prompts built for the workflows that actually eat
          staff time in {label.toLowerCase()} — ready for the AI tool you
          already use.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
        {prompts.length === 0 && (
          <p className="mt-12 text-muted">
            Prompts for this industry are on the way — check back soon.
          </p>
        )}
        <nav
          className="mt-16 border-t border-border pt-8"
          aria-label="Prompts by function"
        >
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
        <div className="mt-16 rounded-sm border border-border bg-surface p-8">
          <h2 className="font-heading text-2xl font-semibold">
            Want this automated instead of copy-pasted?
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            These prompts are a starting point. We build AI agents that run
            workflows like these automatically for {label.toLowerCase()}.
          </p>
          <div className="mt-6">
            <Button href="/contact">Book a Discovery Call</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
