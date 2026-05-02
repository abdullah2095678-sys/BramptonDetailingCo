import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Brampton Detail Co. | (905) 226-5301";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact Brampton Detail Co. for mobile car detailing in Brampton and the GTA. Call or text (905) 226-5301 or email bramptondetailingco@gmail.com.');
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submitContactForm = trpc.contact.submit.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send message. Please try again.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Message length validation
    if (formData.message.length < 10) {
      toast.error("Message must be at least 10 characters long");
      return;
    }

    submitContactForm.mutate({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });
  };

  const serviceAreas = [
    "Brampton",
    "Mississauga",
    "Etobicoke",
    "Oakville",
    "Burlington",
    "Milton",
    "Georgetown",
    "Acton",
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-16 bg-card border-b border-border/50">
        <div className="container">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">
            Get in Touch
          </h1>
          <p className="text-foreground/70 text-lg max-w-2xl">
            Have questions? We'd love to hear from you. Reach out anytime.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Phone */}
          <Card className="p-8 bg-card border-border/50 text-center hover:border-primary/50 transition-colors">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-primary" size={32} />
            </div>
            <h3 className="font-bold text-lg mb-2">Phone</h3>
            <a
              href="tel:+19052265301"
              className="text-primary hover:underline font-bold text-lg"
            >
              (905) 226-5301
            </a>
            <p className="text-foreground/60 text-sm mt-2">
              Available Mon-Sun, 8 AM - 7 PM
            </p>
          </Card>

          {/* Email */}
          <Card className="p-8 bg-card border-border/50 text-center hover:border-primary/50 transition-colors">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-primary" size={32} />
            </div>
            <h3 className="font-bold text-lg mb-2">Email</h3>
            <div className="space-y-3">
              <div>
                <p className="text-foreground/60 text-sm mb-1">Booking Inquiries:</p>
                <a
                  href="mailto:bramptondetailingco@gmail.com"
                  className="text-primary hover:underline font-bold break-all"
                >
                  bramptondetailingco@gmail.com
                </a>
              </div>
              <div className="border-t border-border/30 pt-3">
                <p className="text-foreground/60 text-sm mb-1">e-Transfer Payments:</p>
                <a
                  href="mailto:abdullah2095678@gmail.com"
                  className="text-primary hover:underline font-bold break-all"
                >
                  abdullah2095678@gmail.com
                </a>
              </div>
            </div>
            <p className="text-foreground/60 text-sm mt-3">
              We respond within 24 hours
            </p>
          </Card>

          {/* Service Area */}
          <Card className="p-8 bg-card border-border/50 text-center hover:border-primary/50 transition-colors">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-primary" size={32} />
            </div>
            <h3 className="font-bold text-lg mb-2">Service Area</h3>
            <p className="text-foreground/80 font-bold">Greater Toronto Area</p>
            <p className="text-foreground/60 text-sm mt-2">
              Mobile service to your location
            </p>
          </Card>
        </div>

        {/* Contact Form and Service Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-card border-border/50">
              <h2 className="font-bold text-2xl mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-background border-border/50 text-foreground"
                    placeholder="Your name"
                    disabled={submitContactForm.isPending}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-background border-border/50 text-foreground"
                    placeholder="your@email.com"
                    disabled={submitContactForm.isPending}
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-background border-border/50 text-foreground"
                    placeholder="Tell us what you're interested in..."
                    rows={6}
                    disabled={submitContactForm.isPending}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitContactForm.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-bold"
                >
                  {submitContactForm.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Service Areas Sidebar */}
          <div>
            <Card className="p-8 bg-card border-border/50 sticky top-24">
              <h3 className="font-bold text-xl mb-6">Service Areas</h3>
              <div className="space-y-3">
                {serviceAreas.map((area) => (
                  <div
                    key={area}
                    className="flex items-center gap-2 text-foreground/80"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>{area}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-foreground/60 mt-6">
                We serve the entire GTA and surrounding areas. Contact us to
                confirm service availability for your location.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="py-16 bg-card border-t border-border/50">
        <div className="container max-w-2xl">
          <div className="flex items-start gap-4">
            <Clock className="text-primary flex-shrink-0 mt-1" size={32} />
            <div>
              <h2 className="font-bold text-2xl mb-4">Business Hours</h2>
              <div className="space-y-2 text-foreground/80">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-bold">8:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-bold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-bold">10:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 container text-center">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
          Ready to Book?
        </h2>
        <p className="text-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
          Schedule your detailing appointment online or give us a call.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/book"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold transition-colors"
          >
            Book Online
          </a>
          <a
            href="tel:+19052265301"
            className="inline-block border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg font-bold transition-colors"
          >
            Call Us
          </a>
        </div>
      </section>
    </div>
  );
}
