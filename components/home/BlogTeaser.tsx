import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { BlogPost } from "@/lib/content";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function BlogTeaser({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <Section variant="surface">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              From the blog
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Practical thinking on putting AI and automation to work — no hype.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-accent hover:text-accent-hover"
          >
            Read the blog &rarr;
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="flex h-full flex-col bg-background transition-colors group-hover:border-accent">
                <time className="text-xs font-medium uppercase tracking-wider text-muted">
                  {formatDate(post.date)}
                </time>
                <h3 className="mt-3 font-heading text-lg font-semibold group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <span className="mt-4 text-sm font-medium text-accent">
                  Read more &rarr;
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
