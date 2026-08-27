import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Silicon Tundra",
  description:
    "Get in touch with Silicon Tundra about AI receptionists, agents, automation consulting, or custom software for your business.",
  openGraph: {
    title: "Contact Silicon Tundra",
    description:
      "Tell us about your business and what you'd like to automate.",
    images: [OG_IMAGE],
  },
};

export default function ContactPage() {
  return (
    <Section className="pt-24">
      <Container>
        <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Let&apos;s talk about your business
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Tell us where the manual work and missed revenue are hiding, and
          we&apos;ll get right back to you. Prefer to grab a time now?{" "}
          <a
            href="/book"
            className="font-medium text-accent hover:text-accent-hover"
          >
            Book a discovery call
          </a>
          .
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="max-w-2xl">
            <ContactForm />
          </div>
          <aside className="space-y-8">
            <div>
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted">
                Email us directly
              </h2>
              <p className="mt-3">
                <a
                  href="mailto:jon@silicontundrallc.com"
                  className="font-heading text-lg font-semibold text-accent hover:text-accent-hover"
                >
                  jon@silicontundrallc.com
                </a>
              </p>
            </div>
            <div>
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted">
                Rather book a call?
              </h2>
              <div className="mt-3">
                <Button href="/book" variant="secondary">
                  Book a Discovery Call
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
