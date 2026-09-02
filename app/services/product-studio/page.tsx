import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageShell } from "@/components/services/ServicePageShell";
import { getService } from "@/lib/content";
import { OG_IMAGE } from "@/lib/seo";

const SLUG = "product-studio";

export function generateMetadata(): Metadata {
  const service = getService(SLUG);
  if (!service) return {};
  return {
    title: `${service.title} — Custom Web Apps for Your Business`,
    description: service.summary,
    openGraph: { title: service.title, description: service.summary, images: [OG_IMAGE] },
  };
}

export default function ProductStudioPage() {
  const service = getService(SLUG);
  if (!service) notFound();

  return (
    <ServicePageShell service={service}>
      <div className="mt-16">
        <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
          A product we built end to end: ShowLynk
        </h2>
        <div className="mt-6 max-w-2xl rounded-sm border border-border bg-surface p-8">
          <p className="leading-relaxed text-muted">
            <a
              href="https://www.showlynk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:text-accent-hover"
            >
              ShowLynk
            </a>{" "}
            is a live-music booking platform we designed and built from the
            ground up — a two-sided marketplace connecting performers (bands,
            DJs, KJs) with venues looking for talent. Musicians build rich
            profiles and apply to venue &ldquo;open calls&rdquo; in one click;
            venues post the date, the vibe, and the pay, and let talent come to
            them. Both sides manage every booking, message, and review in a
            single dashboard — no cold emails, no spreadsheets.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            It&apos;s a working example of what the Product Studio does: take an
            idea and turn it into a real, polished product — profiles, search
            and filtering, in-app messaging, booking management, and reviews —
            built for actual users, not a demo.
          </p>
          <a
            href="https://www.showlynk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-medium text-accent hover:text-accent-hover"
          >
            Visit ShowLynk &rarr;
          </a>
        </div>
      </div>
    </ServicePageShell>
  );
}
