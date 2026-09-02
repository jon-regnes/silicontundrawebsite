import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getServices } from "@/lib/content";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { ServicesMenu } from "./ServicesMenu";

const links = [
  { href: "/resources", label: "Resources" },
  { href: "/ebook", label: "Free Ebook" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const services = getServices();
  const serviceLinks = services.map((s) => ({ slug: s.slug, title: s.title }));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          <ServicesMenu services={services} />
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact">Book a Call</Button>
        </nav>
        <MobileNav services={serviceLinks} />
      </div>
    </header>
  );
}
