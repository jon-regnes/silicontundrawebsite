import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function Hero() {
  return (
    <Section className="pt-24 md:pt-36">
      <Container>
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-accent">
          AI &amp; Automation for Small &amp; Medium Business
        </p>
        <h1 className="mt-6 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          The AI and Automation Navigator for Small &amp; Medium Business.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
          Automated workflows + smarter tools = more time to focus on what
          your business does best. We help businesses in field services, real
          estate, manufacturing, lifestyle medicine, logistics, rentals &amp;
          B2B, pet care, and agriculture run leaner and grow faster.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/contact">Book a Discovery Call</Button>
          <Button href="/services" variant="secondary">
            See Services
          </Button>
        </div>
      </Container>
    </Section>
  );
}
