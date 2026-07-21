import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProductGrid } from "@/components/resources/ProductGrid";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getProductCategories, getProducts } from "@/lib/content";
import { itemListJsonLd, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Researched AI & Automation Tools for Small & Medium Business",
  description:
    "Curated AI and automation products for small and medium businesses — scheduling, voice AI, automation, and operations tools with honest pros and cons for each.",
  openGraph: {
    title: "Researched Products | Silicon Tundra",
    description:
      "Curated AI and automation tools for small and medium businesses, with honest pros and cons.",
    images: [OG_IMAGE],
  },
};

export default function ProductsPage() {
  const products = getProducts();
  const categories = getProductCategories();

  return (
    <Section className="pt-24">
      <Container>
        <JsonLd
          data={itemListJsonLd(
            products.map((p) => ({ name: p.name, url: p.link })),
            "Researched AI & Automation Tools for Small & Medium Business",
          )}
        />
        <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Researched Products
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Tools we&apos;ve actually evaluated for small and medium businesses.
          No affiliate spin — what each one does well, and where it falls
          short.
        </p>
        <div className="mt-12">
          <ProductGrid products={products} categories={categories} />
        </div>
      </Container>
    </Section>
  );
}
