import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { VerticalBadges } from "@/components/resources/VerticalBadges";
import type { Prompt } from "@/lib/content";

export function ResourcesTeaser({ prompts }: { prompts: Prompt[] }) {
  return (
    <Section>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              Free resources
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Researched tools and plug-and-play AI prompts, built for
              lifestyle medicine practices.
            </p>
          </div>
          <Link
            href="/resources"
            className="text-sm font-medium text-accent hover:text-accent-hover"
          >
            Browse all resources &rarr;
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {prompts.map((prompt) => (
            <Link
              key={prompt.slug}
              href={`/resources/prompts/${prompt.vertical[0]}/${prompt.slug}`}
              className="group"
            >
              <Card className="h-full transition-colors group-hover:border-accent">
                <VerticalBadges verticals={prompt.vertical} />
                <h3 className="mt-4 font-heading text-lg font-semibold group-hover:text-accent">
                  {prompt.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {prompt.useCase}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
