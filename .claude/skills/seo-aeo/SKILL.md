---
name: seo-aeo
description: Defines the SEO and AEO (answer-engine optimization) requirements every route on the Silicon Tundra site must meet. Use this whenever creating or editing a page.tsx, layout.tsx, route under app/, or MDX content file — a new page is not "done" until it satisfies this checklist, even if the user's request was only about layout or content and didn't mention SEO explicitly.
---

# SEO & AEO Requirements

This site's goal is to rank in traditional search AND get cited by AI answer engines (ChatGPT,
Perplexity, Google AI Overviews, etc.) for queries like "AI receptionist for med spas." Every route
needs the following before it's considered complete.

## 1. Per-page metadata (required on every route)

Use the Next.js Metadata API. Every `page.tsx` needs a unique `title` and `description` — never
inherit the root layout's generic metadata. For dynamic routes (`[vertical]`, `[slug]`), use
`generateMetadata()` so each generated page gets its own unique title/description pulled from the
content's frontmatter, not a templated generic string.

```ts
export const metadata: Metadata = {
  title: "…", // unique, ~50-60 chars, include the primary keyword
  description: "…", // unique, ~150-160 chars, natural language, answer-first
  openGraph: { title: "…", description: "…", images: ["/images/og/…"] },
};
```

## 2. Structured data (JSON-LD)

Use the builders in `lib/seo.ts` (create if missing) rather than hand-writing JSON-LD inline per
page — keeps the schema shape consistent:

- **`Organization`** — once, in the root layout, sitewide.
- **`Service`** — on each of the four service sections on `/services`.
- **`FAQPage`** — anywhere Q&A content exists (if/when an FAQ section is added).
- **`Product` / `SoftwareApplication`** — optional, on individual product entries in
  `/resources/products` if that detail-page phase gets built.

AEO leans heavily on structured data — answer engines parse JSON-LD to extract facts more reliably
than prose. When in doubt, add schema rather than skip it.

## 3. Sitemap & robots

`app/sitemap.ts` and `app/robots.ts` must stay dynamic — they should enumerate all MDX content
(every product, every prompt, every `[vertical]` page) by reading `content/` at build time, not a
hardcoded list. When a new content type or route segment is added, update the sitemap generator in
the same change, not as a follow-up.

## 4. `llms.txt`

`public/llms.txt` is a plain-language summary of the site for LLM crawlers: what Silicon Tundra
does, who it serves, and links to key pages (services, resources, contact). Keep it updated when
services or major resource categories change — treat it as equally important as the sitemap, not
an afterthought.

## 5. Vertical-specific landing pages

The `/resources/prompts/[vertical]` pages exist specifically for long-tail SEO/AEO — each vertical
(IV wellness, TRT, chiropractic, dental/ortho, med spa) needs its own indexable, crawlable URL with
real content, not just a client-side filtered view of the same page. If a new vertical is ever
added, it needs its own generated route, not just a new filter tag.

## 6. Semantic HTML & Core Web Vitals

- One `<h1>` per page, logical heading hierarchy below it — don't skip levels or use headings for
  visual sizing instead of structure.
- All images through `next/image`; all fonts through `next/font` (already covered by the
  design-system skill).
- Keep third-party embeds (Cal.com, Kit form) lazy-loaded / below-the-fold where possible so they
  don't block initial paint.

## Checklist for any new page

- [ ] Unique `title` + `description` (or `generateMetadata` for dynamic routes)
- [ ] OpenGraph image reference
- [ ] Relevant JSON-LD via `lib/seo.ts`
- [ ] Included in `sitemap.ts` (usually automatic if it reads from `content/`, but verify)
- [ ] Single `<h1>`, sensible heading order
- [ ] `llms.txt` updated if this page represents a new service/resource category
