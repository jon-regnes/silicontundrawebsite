"use client";

import { useState } from "react";
import type { Prompt } from "@/lib/content";
import { VERTICALS, type Vertical } from "@/lib/verticals";
import { PromptCard } from "./PromptCard";

export function PromptGrid({ prompts }: { prompts: Prompt[] }) {
  const [active, setActive] = useState<Vertical | null>(null);
  const visible = active
    ? prompts.filter((p) => p.vertical.includes(active))
    : prompts;

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by vertical"
      >
        <FilterButton
          label="All"
          active={active === null}
          onClick={() => setActive(null)}
        />
        {(Object.keys(VERTICALS) as Vertical[]).map((vertical) => (
          <FilterButton
            key={vertical}
            label={VERTICALS[vertical]}
            active={active === vertical}
            onClick={() => setActive(vertical)}
          />
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((prompt) => (
          <PromptCard key={prompt.slug} prompt={prompt} />
        ))}
      </div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-sm border px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-accent bg-accent text-background"
          : "border-border text-muted hover:border-accent hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}
