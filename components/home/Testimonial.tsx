import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

// Placeholder copy — swap in real quotes as they're collected (§10 of the
// architecture doc). The grid holds 1–3 testimonials without layout changes.
const testimonials = [
  {
    quote:
      "We stopped losing after-hours calls to voicemail the first week. The front desk finally has room to breathe.",
    name: "Placeholder Client",
    role: "Practice Owner, Med Spa",
  },
];

export function Testimonial() {
  return (
    <Section variant="surface">
      <Container>
        <div className="grid gap-6 md:grid-cols-1">
          {testimonials.map((t) => (
            <Card key={t.name} className="mx-auto max-w-3xl text-center">
              <blockquote>
                <p className="font-heading text-xl font-medium leading-relaxed md:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 text-sm text-muted">
                  {t.name} &middot; {t.role}
                </footer>
              </blockquote>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
