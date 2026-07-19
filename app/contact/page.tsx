import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact — Book a Discovery Call",
  description:
    "Get in touch with Silicon Tundra about AI receptionists, agents, automation consulting, or custom software for your lifestyle medicine practice.",
  openGraph: {
    title: "Contact Silicon Tundra",
    description:
      "Book a discovery call about AI and automation for your practice.",
    images: [OG_IMAGE],
  },
};

// Placeholder page — the full contact form + /api/contact (Resend) lands in
// build-order item 6 of silicon-tundra-architecture.md.
export default function ContactPage() {
  return (
    <Section className="pt-24">
      <Container>
        <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Let&apos;s talk about your practice
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          A 30-minute discovery call — a straight look at the hours and revenue
          your practice could reclaim with AI and automation.
        </p>
        <div className="mt-12 max-w-2xl rounded-sm border border-border bg-surface p-8">
          <h2 className="font-heading text-xl font-semibold">
            Reach out directly
          </h2>
          <p className="mt-3 text-muted">
            Online booking and a contact form are coming to this page shortly.
            In the meantime, email us and we&apos;ll get right back to you:
          </p>
          <p className="mt-6">
            <a
              href="mailto:jon@silicontundrallc.com"
              className="font-heading text-lg font-semibold text-accent hover:text-accent-hover"
            >
              jon@silicontundrallc.com
            </a>
          </p>
        </div>
      </Container>
    </Section>
  );
}
