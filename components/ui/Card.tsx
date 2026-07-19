import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-sm border border-border bg-surface p-6 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
