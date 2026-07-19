import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Prompt } from "@/lib/content";
import { VerticalBadges } from "./VerticalBadges";

export function PromptCard({ prompt }: { prompt: Prompt }) {
  return (
    <Link
      href={`/resources/prompts/${prompt.vertical[0]}/${prompt.slug}`}
      className="group"
    >
      <Card className="flex h-full flex-col transition-colors group-hover:border-accent">
        <VerticalBadges verticals={prompt.vertical} />
        <h3 className="mt-4 font-heading text-lg font-semibold group-hover:text-accent">
          {prompt.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {prompt.useCase}
        </p>
        <span className="mt-4 text-sm font-medium text-accent">
          View prompt &rarr;
        </span>
      </Card>
    </Link>
  );
}
