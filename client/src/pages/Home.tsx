import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ServiceCard from "@/components/ServiceCard";
import {
  MapPin,
  Star,
  CheckCircle,
  Truck,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Car Detailing Brampton | Mobile Auto Detailing GTA | Brampton Detail Co.";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional mobile car detailing in Brampton and the GTA. Interior, exterior, and full detail packages for all vehicle types. First-time customers save 20% with code FIRST20.');
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: "🚗",
      name: "Exterior Wash & Dry",
      price: "$60+",
      description: "Professional wash and dry service",
    },
    {
      icon: "🪑",
      name: "Interior Detail",
      price: "$95+",
      description: "Deep clean of interior surfaces",
    },
    {
      icon: "✨",
      name: "Full Detail",
      price: "$150+",
      description: "Complete interior and exterior",
    },
    {
      icon: "👑",
      name: "Premium Detail",
      price: "$220+",
      description: "Ultimate detailing experience",
    },
  ];

  const testimonials = [
    {
      name: "Mike T.",
      location: "Brampton",
      text: "Booked a full detail for my F-150 and it came out looking brand new. Showed up on time, did an amazing job. 100% booking again.",
      rating: 5,
    },
    {
      name: "Sarah K.",
      location: "Mississauga",
      text: "Best detailing service I've found in the GTA. My SUV interior was destroyed by my kids — they made it look showroom clean.",
      rating: 5,
    },
    {
      name: "James R.",
      location: "Etobicoke",
      text: "Fast, professional, and the price was fair. Used the first-time coupon and saved $30. Highly recommend.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "Do you come to my location?",
      answer: "Yes — fully mobile, we bring all equipment.",
    },
    {
      question: "How long does it take?",
      answer: "2–4 hours depending on vehicle and package.",
    },
    {
      question: "What do I need to provide?",
      answer: "Just your vehicle and access to it.",
    },
    {
      question: "Do you detail SUVs and trucks?",
      answer: "Yes, all vehicle types with size-adjusted pricing.",
    },
    {
      question: "Can I pay online?",
      answer: "We accept e-Transfer to abdullah2095678@gmail.com and cash on the day of service. No payment needed to book your appointment.",
    },
    {
      question: "How do I use my first-time discount?",
      answer: "Enter code FIRST20 at checkout for 20% off.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663601325356/KZThWK4nYA5fPQhkRbxLyL/hero-black-car-detail-8hrDEnGSfuB63dNGhpd28q.webp')",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative container z-10 text-center">
          <h1 className="font-poppins font-bold text-white mb-4 text-4xl md:text-6xl leading-tight">
            Brampton's #1 Mobile Car Detailing Service
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            We come to you. Professional results every time. Serving Brampton,
            Mississauga & the GTA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-lg font-bold transition-colors">
                Book Now
              </button>
            </Link>
            <a href="tel:+19052265301" className="block">
              <button
                className="border border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg font-bold transition-colors"
              >
                Call Us
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-primary text-white py-4">
        <div className="container text-center">
          <p className="text-sm md:text-base font-medium">
            🎉 First-Time Customer? Use code <strong>FIRST20</strong> for 20%
            off your first booking.
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-card border-b border-border/50 py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center justify-center gap-3 p-4">
              <MapPin className="text-primary" size={24} />
              <div className="text-left">
                <p className="font-bold">Mobile Service</p>
                <p className="text-sm text-foreground/70">We come to you</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
              <Star className="text-primary" size={24} />
              <div className="text-left">
                <p className="font-bold">5-Star Rated</p>
                <p className="text-sm text-foreground/70">Trusted by customers</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
              <CheckCircle className="text-primary" size={24} />
              <div className="text-left">
                <p className="font-bold">Satisfaction Guaranteed</p>
                <p className="text-sm text-foreground/70">100% quality assured</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
              <Truck className="text-primary" size={24} />
              <div className="text-left">
                <p className="font-bold">All Vehicle Types</p>
                <p className="text-sm text-foreground/70">Sedans to trucks</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
              <span className="text-primary text-2xl">💳</span>
              <div className="text-left">
                <p className="font-bold">e-Transfer & Cash</p>
                <p className="text-sm text-foreground/70">Flexible payment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section
        id="services-preview"
        data-animate
        className="py-20 container"
      >
        <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-center">
          What We Offer
        </h2>
        <p className="text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
          From quick exterior washes to premium full details, we have the
          perfect package for your vehicle.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              icon={service.icon}
              name={service.name}
              description={service.description}
              price={service.price}
              href="/services"
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card border-y border-border/50">
        <div className="container">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-center">
            What Our Customers Say
          </h2>
          <p className="text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
            Trusted by customers across Brampton & the GTA.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card
                key={idx}
                className="p-6 bg-background border-border/50"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-foreground/80 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-foreground/70">
                    {testimonial.location}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 container">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
          Got questions? We have answers. Check out our most common questions
          below.
        </p>

        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-border/50 rounded-lg overflow-hidden bg-card hover:border-primary/50 transition-colors"
            >
              <button
                onClick={() =>
                  setExpandedFaq(expandedFaq === idx ? null : idx)
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-background/50 transition-colors"
              >
                <span className="font-bold text-left">{faq.question}</span>
                {expandedFaq === idx ? (
                  <Minus size={20} className="text-primary flex-shrink-0" />
                ) : (
                  <Plus size={20} className="text-primary flex-shrink-0" />
                )}
              </button>
              {expandedFaq === idx && (
                <div className="px-6 py-4 bg-background/50 border-t border-border/50">
                  <p className="text-foreground/80">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-card border-t border-border/50">
        <div className="container max-w-3xl">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6 text-center">
            About Brampton Detail Co.
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed text-center">
            Brampton Detail Co. is a mobile car detailing service based in
            Brampton, Ontario, serving the GTA including Mississauga and
            Etobicoke. We offer interior detailing, exterior detailing, and
            full detail packages for all vehicle types including sedans, SUVs,
            trucks, and vans. All services are performed at the customer's
            location. First-time customers receive 20% off with promo code
            FIRST20. To book, call{" "}
            <a
              href="tel:+19052265301"
              className="text-primary font-bold hover:underline"
            >
              (905) 226-5301
            </a>{" "}
            or use the online booking form.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container text-center">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
          Ready to Transform Your Vehicle?
        </h2>
        <p className="text-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
          Book your detailing appointment today and experience the Brampton
          Detail Co. difference.
        </p>
        <Link href="/book">
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-lg font-bold transition-colors">
            Book Your Appointment
          </button>
        </Link>
      </section>
    </div>
  );
}
