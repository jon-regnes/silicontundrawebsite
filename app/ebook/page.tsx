import type { Metadata } from "next";
import Image from "next/image";
import { EbookForm } from "@/components/ebook/EbookForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { OG_IMAGE } from "@/lib/seo";

const TITLE = "From ChatGPT Curiosity to Operational Leverage";
const SUBTITLE = "Stop Prompting. Start Automating.";

export const metadata: Metadata = {
  title: "Free Ebook — From ChatGPT Curiosity to Operational Leverage",
  description:
    "A free, practical guide for small and medium businesses on moving past one-off AI prompting to real, repeatable automation. Download the PDF.",
  openGraph: {
    title: "Free Ebook: From ChatGPT Curiosity to Operational Leverage",
    description:
      "Stop prompting, start automating — a practical AI guide for SMBs. Free PDF.",
    images: [OG_IMAGE],
  },
};

const chapters = [
  "AI Without the Hype",
  "Prompts: The New Business Literacy",
  "Workflows: From One-Off Answers to Repeatable Results",
  "Automation: Connecting the Dots",
  "AI Agents: Giving AI a Job",
  "Agent Loops: When AI Can Keep Working",
  "Graph Engineering: Mapping How the Business Thinks",
  "Choosing Your First AI Project",
];

export default function EbookPage() {
  return (
    <Section className="pt-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          {/* Left: offer */}
          <div className="max-w-2xl">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Free Ebook
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
              {TITLE}
            </h1>
            <p className="mt-4 font-heading text-xl text-accent">{SUBTITLE}</p>
            <p className="mt-6 text-lg text-muted">
              Most businesses don&apos;t have an AI strategy — they have a
              ChatGPT habit. This practical guide shows how to move past
              one-off prompting and turn AI into repeatable operational
              leverage: workflows, automation, and agents that actually change
              how the work gets done.
            </p>

            <div className="mt-8 rounded-sm border border-border bg-surface p-6">
              <h2 className="font-heading text-lg font-semibold">
                Get the free PDF
              </h2>
              <div className="mt-4">
                <EbookForm />
              </div>
            </div>

            <h2 className="mt-12 font-heading text-sm font-semibold uppercase tracking-wider text-muted">
              What&apos;s inside
            </h2>
            <ol className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {chapters.map((c, i) => (
                <li key={c} className="flex gap-3 text-sm text-muted">
                  <span className="font-heading font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: cover visual (mirrors the PDF cover) */}
          <div className="mx-auto w-full max-w-sm lg:sticky lg:top-24">
            <div className="relative flex aspect-[8.5/11] flex-col justify-center overflow-hidden rounded-sm border border-border bg-background p-8 shadow-2xl">
              <p className="font-heading text-2xl font-bold leading-tight text-foreground md:text-3xl">
                {TITLE}
              </p>
              <p className="mt-5 font-heading text-base font-medium text-accent">
                {SUBTITLE}
              </p>
              <div className="mt-6 h-0.5 w-16 bg-accent" />
              <Image
                src="/images/brand/st-lockup-white-transparent.png"
                alt="Silicon Tundra"
                width={140}
                height={61}
                className="absolute bottom-8 right-8 h-auto w-28"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
