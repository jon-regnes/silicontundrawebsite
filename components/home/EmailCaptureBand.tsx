import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { EmailCaptureForm } from "./EmailCaptureForm";

export function EmailCaptureBand() {
  return (
    <Section>
      <Container>
        <div className="rounded-sm border border-border bg-surface px-6 py-12 md:px-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                Join the list
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted">
                Practical AI &amp; automation ideas for small and medium
                businesses — no fluff, unsubscribe anytime.
              </p>
            </div>
            <EmailCaptureForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
