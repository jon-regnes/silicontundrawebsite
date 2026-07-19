import Link from "next/link";

/**
 * Text lockup standing in for the real ST monogram + wordmark. Swap the inner
 * markup for a next/image of public/images/brand/ once the logo files are added.
 */
export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 text-foreground transition-colors hover:text-accent"
      aria-label="Silicon Tundra — home"
    >
      <span className="flex h-8 w-8 items-center justify-center border border-foreground font-heading text-sm font-bold tracking-tight">
        ST
      </span>
      <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em]">
        Silicon Tundra
      </span>
    </Link>
  );
}
