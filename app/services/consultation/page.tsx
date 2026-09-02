import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageShell } from "@/components/services/ServicePageShell";
import { getService } from "@/lib/content";
import { OG_IMAGE } from "@/lib/seo";

const SLUG = "consultation";

export function generateMetadata(): Metadata {
  const service = getService(SLUG);
  if (!service) return {};
  return {
    title: `${service.title} — Risk-Free AI & Automation Assessment`,
    description:
      "A $5,000 AI & automation assessment for your business, with a money-back guarantee and the fee credited toward any build you move forward with.",
    openGraph: { title: service.title, description: service.summary, images: [OG_IMAGE] },
  };
}

export default function ConsultationPage() {
  const service = getService(SLUG);
  if (!service) notFound();

  return (
    <ServicePageShell service={service}>
      <div className="mt-12 max-w-2xl rounded-sm border border-accent/40 bg-surface p-8">
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          The offer
        </p>
        <p className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">
          A $5,000 consultation — risk-free
        </p>
        <ul className="mt-6 space-y-5">
          <li>
            <p className="font-heading font-semibold text-foreground">
              Money-back guarantee
            </p>
            <p className="mt-1 text-muted">
              If our assessment doesn&apos;t show how implementing AI and
              automation can save you $5,000, we&apos;ll return the fee to you.
            </p>
          </li>
          <li>
            <p className="font-heading font-semibold text-foreground">
              Credited toward your build
            </p>
            <p className="mt-1 text-muted">
              If you work with us to implement a recommended AI or automation
              development, the consultation fee is subtracted from the cost of
              the project.
            </p>
          </li>
        </ul>
      </div>
    </ServicePageShell>
  );
}
