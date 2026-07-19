import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  variant?: "default" | "surface";
  className?: string;
}

export function Section({
  children,
  id,
  variant = "default",
  className = "",
}: SectionProps) {
  const background =
    variant === "surface" ? "bg-surface border-y border-border" : "";
  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${background} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
