import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getServices } from "@/lib/content";
import { absoluteUrl, itemListJsonLd, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services — AI Development, Consultation & Custom Software",
  description:
    "Three ways Silicon Tundra puts AI to work in small and medium businesses: automation & AI development, a risk-free AI & automation consultation, and a custom AI product studio.",
  openGraph: {
    title: "Silicon Tundra Services",
    description:
      "Automation & AI development, AI & automation consultation, and custom software for small and medium businesses.",
    images: [OG_IMAGE],
  },
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <Section className="pt-24">
      <Container>
        <JsonLd
          data={itemListJsonLd(
            services.map((s) => ({
              name: s.title,
              url: absoluteUrl(`/services/${s.slug}`),
            })),
            "Silicon Tundra Services",
          )}
        />
        <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Services
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Three ways to put AI to work in your business — from building the
          systems that run in the background, to figuring out where to start, to
          shipping custom software.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group"
            >
              <Card className="flex h-full flex-col transition-colors group-hover:border-accent">
                <h2 className="font-heading text-lg font-semibold group-hover:text-accent">
                  {service.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {service.summary}
                </p>
                <span className="mt-4 text-sm font-medium text-accent">
                  Learn more &rarr;
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
