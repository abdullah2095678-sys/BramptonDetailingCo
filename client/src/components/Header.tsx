import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Phone } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/50 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group no-underline">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-lg">●</span>
          </div>
          <span className="font-poppins font-bold text-xl hidden sm:inline text-foreground">
            Brampton Detail Co.
          </span>
          <span className="font-poppins font-bold text-lg sm:hidden text-foreground">
            Detail Co.
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+19052265301"
            className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
          >
            <Phone size={18} />
            <span className="text-sm">(905) 226-5301</span>
          </a>
          <a
            href="/book"
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-bold transition-colors"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-foreground" />
          ) : (
            <Menu size={24} className="text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-card/50 backdrop-blur-sm">
          <nav className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/book"
              className="block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-bold transition-colors text-center"
            >
              Book Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
