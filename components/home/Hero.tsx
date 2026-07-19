import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function Hero() {
  return (
    <Section className="pt-24 md:pt-36">
      <Container>
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-accent">
          AI &amp; Automation for Lifestyle Medicine
        </p>
        <h1 className="mt-6 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          The AI and Automation Navigator for Lifestyle Medicine.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
          Automated workflows + smarter tools = more time to focus on patient
          care. We help med spas, chiropractors, dental offices, IV wellness,
          and men&apos;s health clinics run leaner and grow faster.
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
