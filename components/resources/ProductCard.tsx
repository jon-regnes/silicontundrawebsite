import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Product } from "@/lib/content";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-heading text-lg font-semibold">{product.name}</h3>
        <Badge>{product.category}</Badge>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {product.description}
      </p>
      <p className="mt-3 text-sm text-foreground">
        <span className="font-medium text-accent">Best for:</span>{" "}
        {product.bestFor}
      </p>
      <div className="mt-4 grid flex-1 gap-4 sm:grid-cols-2">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Pros
          </h4>
          <ul className="mt-2 space-y-1">
            {product.pros.map((pro) => (
              <li key={pro} className="text-sm text-muted">
                + {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Cons
          </h4>
          <ul className="mt-2 space-y-1">
            {product.cons.map((con) => (
              <li key={con} className="text-sm text-muted">
                &minus; {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 text-sm font-medium text-accent hover:text-accent-hover"
      >
        Visit {product.name} &rarr;
      </a>
    </Card>
  );
}
