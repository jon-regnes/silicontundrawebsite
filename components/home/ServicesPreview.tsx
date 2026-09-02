import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Service } from "@/lib/content";

export function ServicesPreview({ services }: { services: Service[] }) {
  return (
    <Section>
      <Container>
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          What we build
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Three ways to put AI to work in your business — from the front desk to
          fully custom software.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group"
            >
              <Card className="flex h-full flex-col transition-colors group-hover:border-accent">
                <h3 className="font-heading text-lg font-semibold group-hover:text-accent">
                  {service.title}
                </h3>
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
