import Link from "next/link";
import type { Service } from "@/lib/content";

/**
 * Desktop "Services" nav item with a dropdown. Pure CSS (hover + focus-within)
 * so it needs no client JS. The label links to the /services overview; the
 * dropdown lists each service page.
 */
export function ServicesMenu({ services }: { services: Service[] }) {
  return (
    <div className="group relative">
      <Link
        href="/services"
        className="flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-foreground group-focus-within:text-foreground"
      >
        Services
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className="mt-0.5"
        >
          <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Link>
      {/* pt-3 bridges the gap so hover doesn't drop between label and menu */}
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="w-72 rounded-sm border border-border bg-background p-2 shadow-xl">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="block rounded-sm px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {s.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
