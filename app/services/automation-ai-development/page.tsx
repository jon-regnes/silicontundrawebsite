import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageShell } from "@/components/services/ServicePageShell";
import { VideoEmbed } from "@/components/services/VideoEmbed";
import { getService } from "@/lib/content";
import { OG_IMAGE } from "@/lib/seo";

const SLUG = "automation-ai-development";

export function generateMetadata(): Metadata {
  const service = getService(SLUG);
  if (!service) return {};
  return {
    title: `${service.title} — AI Receptionists, Agents & Automation`,
    description: service.summary,
    openGraph: { title: service.title, description: service.summary, images: [OG_IMAGE] },
  };
}

const CASE_STUDY_PDF =
  "/case-studies/silicon-tundra-medical-chart-automation-case-study.pdf";

const results = [
  "Eliminated manual chart review, saving significant staff time",
  "Accelerated identification of patients eligible for advanced therapy",
  "Consistent, auditable eligibility determinations",
  "Closed the loop with care facilities via automated letters + email",
  "No patient overlooked — automated 90-day re-evaluations",
];

export default function AutomationAiDevelopmentPage() {
  const service = getService(SLUG);
  if (!service) notFound();

  return (
    <ServicePageShell service={service}>
      {/* Proof 1: the voice agent video */}
      <div className="mt-16">
        <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
          See it in action
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          A voice AI agent we built, handling a live conversation — the same
          kind of always-on agent that can answer your phones and qualify
          leads 24/7.
        </p>
        <div className="mt-6 max-w-3xl">
          <VideoEmbed
            id="N6BlVCm16zg"
            title="Silicon Tundra voice AI agent demo"
          />
        </div>
      </div>

      {/* Proof 2: the automation case study */}
      <div className="mt-16">
        <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
          Case study: automating medical chart review
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          A healthcare organization was manually reviewing patient charts to
          determine eligibility for advanced therapy and notify care
          facilities — slow, hard to scale, and easy to let patients fall
          through the cracks. We built an end-to-end{" "}
          <span className="text-foreground">Power Automate</span> workflow that
          ingests charts from SharePoint, uses trained AI models to extract the
          clinical data, checks it against eligibility criteria, generates and
          emails facility approval letters, and automatically re-evaluates
          patients who don&apos;t initially qualify every 90 days.
        </p>
        <ul className="mt-6 grid max-w-2xl gap-2 sm:grid-cols-1">
          {results.map((r) => (
            <li key={r} className="flex gap-3 text-sm text-muted">
              <span className="mt-0.5 font-semibold text-accent">✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <a
            href={CASE_STUDY_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm border border-border bg-transparent px-6 py-3 font-heading text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Read the full case study (PDF)
          </a>
        </div>
      </div>
    </ServicePageShell>
  );
}
