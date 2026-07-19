import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyPromptButton } from "@/components/resources/CopyPromptButton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getPrompt, getPrompts, isVertical, VERTICALS } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

interface Props {
  params: Promise<{ vertical: string; slug: string }>;
}

export function generateStaticParams() {
  return getPrompts().flatMap((prompt) =>
    prompt.vertical.map((vertical) => ({ vertical, slug: prompt.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vertical, slug } = await params;
  const prompt = getPrompt(slug);
  if (!prompt || !isVertical(vertical) || !prompt.vertical.includes(vertical)) {
    return {};
  }
  return {
    title: `${prompt.title} — AI Prompt for ${VERTICALS[vertical]}`,
    description: `${prompt.useCase} Free plug-and-play AI prompt from Silicon Tundra — copy it and use it in the AI tool you already have.`,
    // Canonical points at the prompt's primary vertical so multi-vertical
    // prompts don't compete with themselves in search.
    alternates: {
      canonical: absoluteUrl(
        `/resources/prompts/${prompt.vertical[0]}/${prompt.slug}`,
      ),
    },
    openGraph: {
      title: prompt.title,
      description: prompt.useCase,
    },
  };
}

export default async function PromptDetailPage({ params }: Props) {
  const { vertical, slug } = await params;
  const prompt = getPrompt(slug);
  if (!prompt || !isVertical(vertical) || !prompt.vertical.includes(vertical)) {
    notFound();
  }

  return (
    <Section className="pt-24">
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/resources/prompts" className="hover:text-accent">
            Prompt Library
          </Link>{" "}
          /{" "}
          <Link
            href={`/resources/prompts/${vertical}`}
            className="hover:text-accent"
          >
            {VERTICALS[vertical]}
          </Link>{" "}
          / {prompt.title}
        </nav>
        <div className="mt-6 flex flex-wrap gap-2">
          {prompt.vertical.map((v) => (
            <Badge key={v}>{VERTICALS[v]}</Badge>
          ))}
          {prompt.tags.map((tag) => (
            <Badge key={tag} className="text-muted">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
          {prompt.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{prompt.useCase}</p>
        <div className="mt-10 max-w-3xl">
          <div className="rounded-sm border border-border bg-surface p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
                The prompt
              </h2>
              <CopyPromptButton text={prompt.promptText} />
            </div>
            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {prompt.promptText}
            </pre>
          </div>
          <p className="mt-4 text-sm text-muted">
            Replace the [BRACKETED] placeholders with your practice&apos;s
            details, then paste into ChatGPT, Claude, or the AI tool you
            already use.
          </p>
        </div>
        <div className="mt-16 rounded-sm border border-border bg-surface p-8">
          <h2 className="font-heading text-2xl font-semibold">
            Want workflows like this running on autopilot?
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            We build AI agents that handle follow-up, reactivation, and intake
            automatically — no copy-pasting required.
          </p>
          <div className="mt-6">
            <Button href="/contact">Book a Discovery Call</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
