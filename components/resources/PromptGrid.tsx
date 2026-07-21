"use client";

import { useState } from "react";
import type { Prompt } from "@/lib/content";
import {
  FUNCTIONS,
  INDUSTRIES,
  type Industry,
  type PromptFunction,
} from "@/lib/taxonomy";
import { PromptCard } from "./PromptCard";

export function PromptGrid({ prompts }: { prompts: Prompt[] }) {
  const [activeFunction, setActiveFunction] = useState<PromptFunction | null>(
    null,
  );
  const [activeIndustry, setActiveIndustry] = useState<Industry | null>(null);

  const visible = prompts.filter((p) => {
    const matchesFunction = activeFunction === null || p.function === activeFunction;
    const matchesIndustry =
      activeIndustry === null || p.industries.includes(activeIndustry);
    return matchesFunction && matchesIndustry;
  });

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by function"
      >
        <FilterButton
          label="All"
          active={activeFunction === null}
          onClick={() => setActiveFunction(null)}
        />
        {(Object.keys(FUNCTIONS) as PromptFunction[]).map((fn) => (
          <FilterButton
            key={fn}
            label={FUNCTIONS[fn]}
            active={activeFunction === fn}
            onClick={() => setActiveFunction(fn)}
          />
        ))}
      </div>
      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by industry"
      >
        <FilterButton
          label="All"
          active={activeIndustry === null}
          onClick={() => setActiveIndustry(null)}
        />
        {(Object.keys(INDUSTRIES) as Industry[]).map((industry) => (
          <FilterButton
            key={industry}
            label={INDUSTRIES[industry]}
            active={activeIndustry === industry}
            onClick={() => setActiveIndustry(industry)}
          />
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((prompt) => (
          <PromptCard key={prompt.slug} prompt={prompt} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="mt-12 text-muted">
          No prompts match this combination yet — check back soon.
        </p>
      )}
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
