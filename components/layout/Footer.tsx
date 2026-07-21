import Link from "next/link";
import { EmailCaptureForm } from "@/components/home/EmailCaptureForm";
import { Logo } from "./Logo";

const links = [
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/resources/products", label: "Products" },
  { href: "/resources/prompts", label: "Prompts" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted">
            The AI and Automation Navigator for Small &amp; Medium Business.
            Automated workflows + smarter tools = more time to focus on what
            your business does best.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
            Explore
          </h2>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
            Join the list
          </h2>
          <p className="mt-4 text-sm text-muted">
            Practical AI &amp; automation ideas for small and medium
            businesses.
          </p>
          <div className="mt-4">
            <EmailCaptureForm />
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Silicon Tundra LLC. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
