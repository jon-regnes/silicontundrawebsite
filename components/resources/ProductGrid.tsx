"use client";

import { useState } from "react";
import type { Product } from "@/lib/content";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const visible = active
    ? products.filter((p) => p.category === active)
    : products;

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        <FilterButton
          label="All"
          active={active === null}
          onClick={() => setActive(null)}
        />
        {categories.map((category) => (
          <FilterButton
            key={category}
            label={category}
            active={active === category}
            onClick={() => setActive(category)}
          />
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-sm border px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-accent bg-accent text-background"
          : "border-border text-muted hover:border-accent hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}
