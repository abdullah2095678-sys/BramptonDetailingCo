import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function Services() {
  const [vehicleType, setVehicleType] = useState<
    "sedan" | "suv" | "truck" | "van"
  >("sedan");

  useEffect(() => {
    document.title = "Car Detailing Prices Brampton | Detailing Packages | Brampton Detail Co.";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'View our car detailing packages and prices for Brampton and GTA. Exterior wash from $60, full details from $150. Pricing by vehicle type. Mobile service — we come to you.');
    }
  }, []);

  const pricingData = {
    sedan: {
      name: "Sedan/Coupe",
      packages: [
        {
          name: "Exterior Wash & Dry",
          price: 60,
          features: [
            "Professional wash",
            "Hand dry",
            "Tire shine",
          ],
        },
        {
          name: "Interior Detail",
          price: 95,
          features: [
            "Vacuum all surfaces",
            "Wipe down interior",
            "Clean windows",
          ],
        },
        {
          name: "Full Interior + Exterior",
          price: 150,
          features: [
            "Complete exterior wash",
            "Full interior vacuum",
            "Deep clean surfaces",
            "Window cleaning",
          ],
          popular: true,
        },
        {
          name: "Premium Full Detail",
          price: 220,
          features: [
            "Complete exterior detail",
            "Deep interior cleaning",
            "Leather conditioning",
            "Final polish & shine",
          ],
        },
      ],
      addOns: [
        { name: "Engine Bay Detail", price: 40 },
        { name: "Ceramic Coating", price: 80 },
      ],
    },
    suv: {
      name: "SUV/Crossover",
      packages: [
        {
          name: "Exterior Wash & Dry",
          price: 75,
          features: [
            "Professional wash",
            "Hand dry",
            "Tire shine",
          ],
        },
        {
          name: "Interior Detail",
          price: 115,
          features: [
            "Vacuum all surfaces",
            "Wipe down interior",
            "Clean windows",
          ],
        },
        {
          name: "Full Interior + Exterior",
          price: 175,
          features: [
            "Complete exterior wash",
            "Full interior vacuum",
            "Deep clean surfaces",
            "Window cleaning",
          ],
          popular: true,
        },
        {
          name: "Premium Full Detail",
          price: 260,
          features: [
            "Complete exterior detail",
            "Deep interior cleaning",
            "Leather conditioning",
            "Final polish & shine",
          ],
        },
      ],
      addOns: [
        { name: "Engine Bay Detail", price: 50 },
        { name: "Ceramic Coating", price: 90 },
      ],
    },
    truck: {
      name: "Truck",
      packages: [
        {
          name: "Exterior Wash & Dry",
          price: 80,
          features: [
            "Professional wash",
            "Hand dry",
            "Tire shine",
          ],
        },
        {
          name: "Interior Detail",
          price: 120,
          features: [
            "Vacuum all surfaces",
            "Wipe down interior",
            "Clean windows",
          ],
        },
        {
          name: "Full Interior + Exterior",
          price: 185,
          features: [
            "Complete exterior wash",
            "Full interior vacuum",
            "Deep clean surfaces",
            "Window cleaning",
          ],
          popular: true,
        },
        {
          name: "Premium Full Detail",
          price: 270,
          features: [
            "Complete exterior detail",
            "Deep interior cleaning",
            "Leather conditioning",
            "Final polish & shine",
          ],
        },
      ],
      addOns: [
        { name: "Engine Bay Detail", price: 50 },
        { name: "Ceramic Coating", price: 90 },
      ],
    },
    van: {
      name: "Van/Minivan",
      packages: [
        {
          name: "Exterior Wash & Dry",
          price: 85,
          features: [
            "Professional wash",
            "Hand dry",
            "Tire shine",
          ],
        },
        {
          name: "Interior Detail",
          price: 130,
          features: [
            "Vacuum all surfaces",
            "Wipe down interior",
            "Clean windows",
          ],
        },
        {
          name: "Full Interior + Exterior",
          price: 195,
          features: [
            "Complete exterior wash",
            "Full interior vacuum",
            "Deep clean surfaces",
            "Window cleaning",
          ],
          popular: true,
        },
        {
          name: "Premium Full Detail",
          price: 285,
          features: [
            "Complete exterior detail",
            "Deep interior cleaning",
            "Leather conditioning",
            "Final polish & shine",
          ],
        },
      ],
      addOns: [
        { name: "Engine Bay Detail", price: 55 },
        { name: "Ceramic Coating", price: 95 },
      ],
    },
  };

  const currentPricing = pricingData[vehicleType];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-16 bg-card border-b border-border/50">
        <div className="container">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">
            Our Services & Pricing
          </h1>
          <p className="text-foreground/70 text-lg max-w-2xl">
            Professional detailing packages tailored for every vehicle type.
            Select your vehicle to see pricing.
          </p>
        </div>
      </section>

      {/* Vehicle Type Selector */}
      <section className="py-12 container">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {(
            [
              { key: "sedan", label: "Sedan/Coupe" },
              { key: "suv", label: "SUV/Crossover" },
              { key: "truck", label: "Truck" },
              { key: "van", label: "Van/Minivan" },
            ] as const
          ).map((type) => (
            <button
              key={type.key}
              onClick={() => setVehicleType(type.key)}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                vehicleType === type.key
                  ? "bg-primary text-white"
                  : "bg-card border border-border/50 text-foreground hover:border-primary/50"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Pricing Cards with Enhanced Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {currentPricing.packages.map((pkg, idx) => (
            <Card
              key={idx}
              className={`p-6 relative border transition-all overflow-hidden group ${
                pkg.popular
                  ? "border-primary bg-card shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                  : "border-border/50 bg-background hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              }`}
            >
              {/* Animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {pkg.popular && (
                <Badge className="absolute top-4 right-4 bg-primary z-10">
                  Most Popular
                </Badge>
              )}

              <div className="relative z-10">
                <h3 className="font-poppins font-bold text-lg mb-2 transition-colors duration-300 group-hover:text-primary">
                  {pkg.name}
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-primary transition-all duration-300 group-hover:scale-105 origin-left inline-block">
                    ${pkg.price}
                  </span>
                  <p className="text-sm text-foreground/60">per service</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, fidx) => (
                    <li key={fidx} className="flex gap-2 text-sm transition-colors duration-300 group-hover:text-foreground/90">
                      <Check size={16} className="text-primary flex-shrink-0" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/book" className="block">
                  <button
                    className={`w-full transition-all duration-300 px-4 py-2 rounded-lg font-bold ${
                      pkg.popular
                        ? "bg-primary hover:bg-primary/90 group-hover:shadow-lg group-hover:shadow-primary/30 text-white"
                        : "bg-card border border-primary/50 text-primary hover:bg-primary/10 group-hover:border-primary group-hover:bg-primary group-hover:text-white"
                    }`}
                  >
                    Book This Package
                  </button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Add-ons */}
        <div className="bg-card border border-border/50 rounded-lg p-8">
          <h3 className="font-poppins font-bold text-2xl mb-6">
            Premium Add-ons
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPricing.addOns.map((addon, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50 hover:border-primary/50 transition-all hover:shadow-md hover:shadow-primary/10 group"
              >
                <span className="font-bold transition-colors duration-300 group-hover:text-primary">{addon.name}</span>
                <span className="text-primary font-bold text-lg transition-all duration-300 group-hover:scale-110">
                  +${addon.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-card border-t border-border/50">
        <div className="container max-w-3xl">
          <h2 className="font-poppins font-bold text-3xl mb-8 text-center">
            What's Included?
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Exterior Wash & Dry</h3>
              <p className="text-foreground/70">
                Professional hand wash with premium soaps, thorough drying, and
                tire shine application.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Interior Detail</h3>
              <p className="text-foreground/70">
                Complete vacuuming of all surfaces, wipe down of dashboard and
                trim, and window cleaning.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">
                Full Interior + Exterior
              </h3>
              <p className="text-foreground/70">
                Our most popular package combining complete exterior wash with
                deep interior cleaning for a showroom finish.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Premium Full Detail</h3>
              <p className="text-foreground/70">
                The ultimate experience: complete exterior detail with paint
                protection, deep interior cleaning, leather conditioning, and
                final polish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Info */}
      <section className="py-16 bg-card border-y border-border/50">
        <div className="container text-center">
          <h2 className="font-bold text-2xl mb-4">💳 Payment by e-Transfer</h2>
          <p className="text-foreground/70 text-lg mb-2">
            <strong>abdullah2095678@gmail.com</strong>
          </p>
          <p className="text-foreground/70">or cash after service</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 container text-center">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
          Ready to Book?
        </h2>
        <p className="text-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
          First-time customers save 20% with code FIRST20. Book your
          appointment now.
        </p>
        <a
          href="/book"
          className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-lg font-bold transition-colors"
        >
          Book Now
        </a>
      </section>
    </div>
  );
}
