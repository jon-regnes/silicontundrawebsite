import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function BookingCTA() {
  return (
    <Section variant="surface">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold tracking-tight md:text-4xl">
          Ready to see where AI fits in your business?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          A 30-minute discovery call. No pitch deck — just a straight look at
          the hours and revenue your business could reclaim.
        </p>
        <div className="mt-8">
          <Button href="/contact">Book a Discovery Call</Button>
        </div>
      </Container>
    </Section>
  );
}
