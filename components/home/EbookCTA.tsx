import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function EbookCTA() {
  return (
    <Section>
      <Container>
        <div className="rounded-sm border border-accent/30 bg-surface px-6 py-12 md:px-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Free Ebook
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight md:text-3xl">
                From ChatGPT Curiosity to Operational Leverage
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                A practical guide to moving past one-off prompting and putting
                AI to work in your business. Stop prompting. Start automating.
              </p>
            </div>
            <Button href="/ebook" className="shrink-0">
              Get the free ebook
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
