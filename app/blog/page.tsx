import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getPosts } from "@/lib/content";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog — AI & Automation for Small Business",
  description:
    "Practical thinking on putting AI and automation to work in small and medium businesses — from Silicon Tundra.",
  openGraph: {
    title: "Silicon Tundra Blog",
    description:
      "Practical thinking on AI and automation for small and medium businesses.",
    images: [OG_IMAGE],
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <Section className="pt-24">
      <Container>
        <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Blog
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Practical thinking on putting AI and automation to work in your
          business — no hype, just what actually moves the needle.
        </p>

        {posts.length === 0 ? (
          <p className="mt-12 text-muted">New posts are on the way — check back soon.</p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="flex h-full flex-col transition-colors group-hover:border-accent">
                  <time className="text-xs font-medium uppercase tracking-wider text-muted">
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-3 font-heading text-xl font-semibold group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 text-sm font-medium text-accent">
                    Read more &rarr;
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
