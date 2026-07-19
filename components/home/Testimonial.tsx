import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

// The grid holds 1–3 testimonials without layout changes.
const testimonials = [
  {
    quote:
      "I had the opportunity to work with Silicon Tundra as a consultant on the automation of two of our major systems at Mendota Health. They created two Power Automate flows that are now in use across our organization: one dedicated to roster preprocessing and another for our Wound Alert™ process. Silicon Tundra’s work was delivered with professionalism, accuracy, and attention to detail, and the results have made an immediate impact on our team. Beyond their technical skill, Silicon Tundra are reliable, professional, and easy to work with. They consistently met deadlines, communicated clearly, and provided ongoing support to make sure our team was confident using the new systems. I highly recommend Silicon Tundra to any organization looking for technical expertise and professional results.",
    role: "Vice President of Operations",
    company: "Mendota Health",
  },
];

export function Testimonial() {
  return (
    <Section variant="surface">
      <Container>
        <div className="grid gap-6 md:grid-cols-1">
          {testimonials.map((t) => (
            <Card key={t.company} className="mx-auto max-w-3xl">
              <blockquote>
                <p className="text-base leading-relaxed text-foreground md:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-border pt-4 text-sm text-muted">
                  <span className="font-heading font-semibold text-foreground">
                    {t.role}
                  </span>{" "}
                  &middot; {t.company}
                </footer>
              </blockquote>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
