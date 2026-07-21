import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getServices } from "@/lib/content";
import { OG_IMAGE, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services — AI Receptionists, Agents, Consulting & Custom Software",
  description:
    "Four ways Silicon Tundra puts AI to work in small and medium businesses: 24/7 AI receptionists, custom AI agents, automation consulting, and an AI product studio.",
  openGraph: {
    title: "Silicon Tundra Services",
    description:
      "24/7 AI receptionists, custom AI agents, automation consulting, and custom software for small and medium businesses.",
    images: [OG_IMAGE],
  },
};

const mdxComponents = {
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 leading-relaxed text-muted" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-muted" {...props} />
  ),
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <Section className="pb-0 md:pb-0">
        <Container>
          <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Services
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            From answering every call to building fully custom software — four
            ways to put AI to work in your practice.
          </p>
        </Container>
      </Section>
      {services.map((service, i) => (
        <Section
          key={service.slug}
          id={service.slug}
          variant={i % 2 === 1 ? "surface" : "default"}
          className="scroll-mt-16"
        >
          <Container>
            <JsonLd data={serviceJsonLd(service)} />
            <span className="font-heading text-sm font-semibold text-accent">
              {String(service.order).padStart(2, "0")}
            </span>
            <h2 className="mt-3 max-w-2xl font-heading text-3xl font-bold tracking-tight md:text-4xl">
              {service.title}
            </h2>
            <div className="max-w-2xl">
              <MDXRemote source={service.body} components={mdxComponents} />
            </div>
            <div className="mt-8">
              <Button href="/contact">Book a Discovery Call</Button>
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}
