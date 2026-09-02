"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const otherLinks = [
  { href: "/resources", label: "Resources" },
  { href: "/ebook", label: "Free Ebook" },
  { href: "/contact", label: "Contact" },
];

interface ServiceLink {
  slug: string;
  title: string;
}

export function MobileNav({ services }: { services: ServiceLink[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center text-foreground"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          {open ? (
            <path d="M4 4l12 12M16 4L4 16" />
          ) : (
            <path d="M2 5h16M2 10h16M2 15h16" />
          )}
        </svg>
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-border bg-background px-6 py-6">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {/* Services group */}
            <div>
              <Link
                href="/services"
                onClick={close}
                className="font-heading text-lg font-medium text-foreground hover:text-accent"
              >
                Services
              </Link>
              <div className="mt-2 flex flex-col gap-2 border-l border-border pl-4">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={close}
                    className="text-sm text-muted hover:text-foreground"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            {otherLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="font-heading text-lg font-medium text-foreground hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/book" className="mt-2 w-full">
              Book a Call
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
