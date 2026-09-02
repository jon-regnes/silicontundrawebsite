import type { ReactNode } from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Service } from "@/lib/content";
import { serviceJsonLd } from "@/lib/seo";

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

/**
 * Shared shell for the individual service pages: breadcrumb, hero (title +
 * summary), MDX prose, then any bespoke `children` blocks, and a booking CTA.
 */
export function ServicePageShell({
  service,
  children,
}: {
  service: Service;
  children?: ReactNode;
}) {
  return (
    <Section className="pt-24">
      <Container>
        <JsonLd data={serviceJsonLd(service)} />
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/services" className="hover:text-accent">
            Services
          </Link>{" "}
          / {service.title}
        </nav>
        <p className="mt-6 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Service
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
          {service.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{service.summary}</p>

        <div className="mt-8 max-w-2xl">
          <MDXRemote source={service.body} components={mdxComponents} />
        </div>

        {children}

        <div className="mt-16 border-t border-border pt-10">
          <h2 className="font-heading text-2xl font-bold tracking-tight">
            Ready to get started?
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            Book a free 30-minute discovery call and we&apos;ll map out where
            this fits in your business.
          </p>
          <div className="mt-6">
            <Button href="/book">Book a Discovery Call</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
