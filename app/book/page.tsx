import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BOOKING_URL, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Book a free 30-minute discovery call with Silicon Tundra to explore AI receptionists, agents, automation, and custom software for your business.",
  openGraph: {
    title: "Book a Discovery Call | Silicon Tundra",
    description:
      "A free 30-minute call to explore where AI and automation fit in your business.",
    images: [OG_IMAGE],
  },
};

// Google Appointment Scheduling embed. `?gv=true` is Google's official flag
// that renders the guest booking view and permits framing on another domain.
const embedUrl = `${BOOKING_URL}?gv=true`;

export default function BookPage() {
  return (
    <Section className="pt-24">
      <Container>
        <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Book a discovery call
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          A free 30-minute call — a straight look at the hours and revenue your
          business could reclaim with AI and automation. Pick a time that works
          and you&apos;ll get a calendar invite with a Google Meet link.
        </p>
        {/* Google's booking widget is light-themed; frame it in a white card
            with padding so it reads cleanly instead of clashing with the dark
            page. */}
        <div className="mt-12 max-w-4xl overflow-hidden rounded-lg bg-white p-3 shadow-2xl ring-1 ring-black/5 sm:p-5">
          <iframe
            src={embedUrl}
            title="Book a 30-minute discovery call"
            width="100%"
            height="700"
            frameBorder="0"
            className="block w-full rounded-md"
            style={{ border: 0, colorScheme: "light" }}
          />
        </div>
        <p className="mt-6 text-sm text-muted">
          Trouble seeing the calendar?{" "}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent hover:text-accent-hover"
          >
            Open the booking page in a new tab
          </a>
          .
        </p>
      </Container>
    </Section>
  );
}
