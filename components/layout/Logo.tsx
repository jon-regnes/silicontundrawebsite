import Image from "next/image";
import Link from "next/link";

// Generated from public/images/brand/st-lockup-white-on-black.jpg (original
// brand artwork) — white marks on transparency for the dark theme.
const MONOGRAM = "/images/brand/st-monogram-white-transparent.png";
const LOCKUP = "/images/brand/st-lockup-white-transparent.png";

interface LogoProps {
  /** "header": monogram + wordmark text. "lockup": full stacked image lockup. */
  variant?: "header" | "lockup";
}

export function Logo({ variant = "header" }: LogoProps) {
  if (variant === "lockup") {
    return (
      <Link
        href="/"
        className="inline-block"
        aria-label="Silicon Tundra — home"
      >
        <Image
          src={LOCKUP}
          alt="Silicon Tundra"
          width={180}
          height={79}
          className="h-auto w-44"
        />
      </Link>
    );
  }
  return (
    <Link
      href="/"
      className="flex items-center gap-3 text-foreground transition-colors hover:text-accent"
      aria-label="Silicon Tundra — home"
    >
      <Image
        src={MONOGRAM}
        alt=""
        width={45}
        height={28}
        priority
        className="h-7 w-auto"
      />
      <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em]">
        Silicon Tundra
      </span>
    </Link>
  );
}
