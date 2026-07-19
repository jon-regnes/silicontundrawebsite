import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const steps = [
  {
    title: "Find the leaks",
    description:
      "We audit your practice for missed calls, manual follow-up, and admin work eating staff hours.",
  },
  {
    title: "Automate the workflows",
    description:
      "AI receptionists, follow-up agents, and automations take over the repetitive work — reliably, 24/7.",
  },
  {
    title: "Sharpen the tools",
    description:
      "Where off-the-shelf falls short, we build custom dashboards, portals, and apps around how you actually work.",
  },
  {
    title: "Reclaim patient time",
    description:
      "Your team spends less time on the phone and the keyboard, and more time in the treatment room.",
  },
];

export function HowItWorks() {
  return (
    <Section variant="surface">
      <Container>
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          How it works
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Automated workflows + smarter tools = more time for patient care.
          Here&apos;s what that looks like in practice.
        </p>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span className="font-heading text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-heading text-lg font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
