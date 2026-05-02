import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-poppins font-bold text-lg mb-2">
              Brampton Detail Co.
            </h3>
            <p className="text-foreground/70 text-sm">
              Professional Mobile Detailing Across the GTA
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-bold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <a href="/" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                Home
              </a>
              <a href="/services" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                Services
              </a>
              <a href="/gallery" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                Gallery
              </a>
              <a href="/book" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                Book Now
              </a>
            </nav>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-poppins font-bold mb-4">Service Areas</h4>
            <div className="text-foreground/70 text-sm space-y-1">
              <p>Brampton</p>
              <p>Mississauga</p>
              <p>Etobicoke</p>
              <p>Oakville & GTA</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-bold mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="tel:+19052265301"
                className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors text-sm"
              >
                <Phone size={16} />
                (905) 226-5301
              </a>
              <div className="flex items-center gap-2 text-foreground/70 text-sm">
                <Mail size={16} />
                <a
                  href="mailto:bramptondetailingco@gmail.com"
                  style={{color: "inherit", textDecoration: "none"}}
                  className="hover:text-primary transition-colors"
                >
                  bramptondetailingco@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-foreground/60 text-sm">
            <p>&copy; 2026 Brampton Detail Co. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
