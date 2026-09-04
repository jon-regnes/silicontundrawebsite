import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { JsonLd } from "@/components/JsonLd";
import { proseComponents } from "@/components/mdx/prose";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getPost, getPosts } from "@/lib/content";
import { absoluteUrl, articleJsonLd, OG_IMAGE } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      images: [OG_IMAGE],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Section className="pt-24">
      <Container>
        <JsonLd data={articleJsonLd(post)} />
        <article className="mx-auto max-w-2xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/blog" className="hover:text-accent">
              Blog
            </Link>
          </nav>
          <h1 className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted">
            <time>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.author}</span>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} className="text-muted">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-8">
            <MDXRemote source={post.body} components={proseComponents} />
          </div>

          <div className="mt-16 rounded-sm border border-border bg-surface p-8">
            <h2 className="font-heading text-2xl font-semibold">
              Want this working in your business?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Grab the free ebook for the full playbook, or book a call and
              we&apos;ll map out where AI and automation fit for you.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href="/book">Book a Discovery Call</Button>
              <Button href="/ebook" variant="secondary">
                Get the free ebook
              </Button>
            </div>
          </div>
        </article>
      </Container>
    </Section>
  );
}
