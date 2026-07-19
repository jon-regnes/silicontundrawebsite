import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PromptCard } from "@/components/resources/PromptCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  getPromptsByVertical,
  isVertical,
  VERTICALS,
  type Vertical,
} from "@/lib/content";
import { absoluteUrl, itemListJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ vertical: string }>;
}

export function generateStaticParams() {
  return (Object.keys(VERTICALS) as Vertical[]).map((vertical) => ({
    vertical,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vertical } = await params;
  if (!isVertical(vertical)) return {};
  const label = VERTICALS[vertical];
  return {
    title: `AI Prompts for ${label}`,
    description: `Free plug-and-play AI prompts built for ${label.toLowerCase()} — patient follow-up, reactivation, reviews, and intake. Copy a prompt and use it in the AI tool you already have.`,
    alternates: { canonical: absoluteUrl(`/resources/prompts/${vertical}`) },
    openGraph: {
      title: `AI Prompts for ${label} | Silicon Tundra`,
      description: `Free plug-and-play AI prompts built for ${label.toLowerCase()}.`,
    },
  };
}

export default async function VerticalPromptsPage({ params }: Props) {
  const { vertical } = await params;
  if (!isVertical(vertical)) notFound();
  const label = VERTICALS[vertical];
  const prompts = getPromptsByVertical(vertical);

  return (
    <Section className="pt-24">
      <Container>
        <JsonLd
          data={itemListJsonLd(
            prompts.map((p) => ({
              name: p.title,
              url: absoluteUrl(`/resources/prompts/${p.vertical[0]}/${p.slug}`),
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
          staff time in {label.toLowerCase()} — follow-up, reactivation,
          reviews, and intake.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
        {prompts.length === 0 && (
          <p className="mt-12 text-muted">
            Prompts for this vertical are on the way — check back soon.
          </p>
        )}
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
