import Link from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

/**
 * Long-form MDX component map for blog posts. Design-system tokens throughout;
 * comfortable reading measure and rhythm.
 */
export const proseComponents = {
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 font-heading text-xl font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-5 leading-relaxed text-muted" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-muted" {...props} />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-muted" {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  em: (props: HTMLAttributes<HTMLElement>) => (
    <em className="italic" {...props} />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-2 border-accent pl-5 text-lg italic text-foreground"
      {...props}
    />
  ),
  a: ({ href = "#", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const external = href.startsWith("http");
    return (
      <Link
        href={href}
        className="font-medium text-accent underline-offset-2 hover:underline"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  },
  hr: () => <hr className="my-10 border-border" />,
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded-sm bg-surface px-1.5 py-0.5 font-mono text-sm text-foreground"
      {...props}
    />
  ),
};
