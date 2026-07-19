import type { ReactNode } from "react";

export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border border-border bg-transparent px-2.5 py-0.5 text-xs font-medium text-accent ${className}`.trim()}
    >
      {children}
    </span>
  );
}
