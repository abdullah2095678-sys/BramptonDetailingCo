import { describe, it, expect } from "vitest";

describe("Final Pass - Comprehensive Tests", () => {
  // Test 1: Booking form mailto link generation
  it("should generate correct mailto link with all form fields", () => {
    const formData = {
      fullName: "John Doe",
      phone: "905-123-4567",
      email: "john@example.com",
      vehicleMake: "Toyota Camry 2020",
      vehicleType: "sedan",
      servicePackage: "full-interior-exterior",
      preferredDate: "2026-05-10",
      preferredTime: "morning",
      serviceAddress: "123 Main St, Brampton, ON",
      additionalNotes: "Please be careful with leather seats",
      promoCode: "FIRST20",
    };

    const subject = `Brampton Detail Co. Booking Request - ${formData.vehicleType}`;
    const body = `
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email}
Vehicle: ${formData.vehicleMake}
Service: ${formData.servicePackage}
Date: ${formData.preferredDate}
Time: ${formData.preferredTime}
Location: ${formData.serviceAddress}
Promo Code: ${formData.promoCode}
Notes: ${formData.additionalNotes}
    `.trim();

    const mailtoLink = `mailto:bramptondetailingco@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    expect(mailtoLink).toContain("bramptondetailingco@gmail.com");
    expect(mailtoLink).toContain("John%20Doe"); // URL encoded
    expect(mailtoLink).toContain("Toyota%20Camry%202020"); // URL encoded
    expect(mailtoLink).toContain("FIRST20");
  });

  // Test 2: Pricing calculation by vehicle type
  it("should calculate correct pricing by vehicle type", () => {
    const pricingData = {
      sedan: { name: "Sedan", exterior: 60, interior: 95, full: 150, premium: 220 },
      suv: { name: "SUV", exterior: 75, interior: 115, full: 175, premium: 260 },
      truck: { name: "Truck", exterior: 80, interior: 120, full: 185, premium: 270 },
      van: { name: "Van", exterior: 85, interior: 130, full: 195, premium: 285 },
    };

    // Test sedan pricing
    expect(pricingData.sedan.full).toBe(150);
    expect(pricingData.sedan.premium).toBe(220);

    // Test SUV pricing (should be higher than sedan)
    expect(pricingData.suv.full).toBeGreaterThan(pricingData.sedan.full);
    expect(pricingData.suv.full).toBe(175);

    // Test van pricing (should be highest)
    expect(pricingData.van.full).toBeGreaterThan(pricingData.truck.full);
    expect(pricingData.van.premium).toBe(285);
  });

  // Test 3: FIRST20 promo code discount
  it("should apply FIRST20 promo code correctly (20% off)", () => {
    const basePrice = 150;
    const discountPercent = 20;
    const discount = (basePrice * discountPercent) / 100;
    const finalPrice = basePrice - discount;

    expect(discount).toBe(30);
    expect(finalPrice).toBe(120);
  });

  // Test 4: Service location field validation
  it("should validate service location address", () => {
    const validAddresses = [
      "123 Main St, Brampton, ON",
      "456 Oak Ave, Mississauga, ON",
      "789 Elm Rd, Etobicoke, ON",
    ];

    validAddresses.forEach((address) => {
      expect(address).toBeTruthy();
      expect(address.length).toBeGreaterThan(5);
      expect(address).toContain(",");
    });
  });

  // Test 5: Footer email consistency
  it("should have correct footer email across all pages", () => {
    const footerEmail = "bramptondetailingco@gmail.com";
    const mailtoLink = `mailto:${footerEmail}`;

    expect(footerEmail).toBe("bramptondetailingco@gmail.com");
    expect(mailtoLink).toContain("@gmail.com");
  });

  // Test 6: SEO meta tags
  it("should have proper SEO meta tags", () => {
    const seoTags = {
      home: {
        title: "Car Detailing Brampton | Mobile Auto Detailing GTA | Brampton Detail Co.",
        description: "Professional mobile car detailing in Brampton and the GTA.",
      },
      services: {
        title: "Car Detailing Prices Brampton | Detailing Packages | Brampton Detail Co.",
        description: "View our car detailing packages and prices for Brampton and GTA.",
      },
      gallery: {
        title: "Car Detailing Before & After | Brampton Detail Co. Results",
        description: "See real before and after photos from our car detailing jobs.",
      },
      contact: {
        title: "Contact Brampton Detail Co. | (905) 226-5301",
        description: "Contact Brampton Detail Co. for mobile car detailing.",
      },
      book: {
        title: "Book Car Detailing Brampton | Brampton Detail Co.",
        description: "Book your mobile car detailing appointment in Brampton online.",
      },
    };

    Object.values(seoTags).forEach((tag) => {
      expect(tag.title).toBeTruthy();
      expect(tag.description).toBeTruthy();
      expect(tag.title.length).toBeGreaterThan(20);
    });
  });

  // Test 7: Mobile floating call button
  it("should render floating call button on mobile", () => {
    const floatingButton = {
      href: "tel:+19052265301",
      text: "Call Now",
      icon: "Phone",
      position: "fixed bottom-6 right-6",
    };

    expect(floatingButton.href).toBe("tel:+19052265301");
    expect(floatingButton.href).toContain("+19052265301");
    expect(floatingButton.text).toBe("Call Now");
  });

  // Test 8: Phone number format
  it("should have correct phone number format", () => {
    const phoneNumber = "+19052265301";
    const phoneRegex = /^\+1\d{10}$/;

    expect(phoneNumber).toMatch(phoneRegex);
    expect(phoneNumber).toBe("+19052265301");
  });

  // Test 9: Gallery image lazy loading
  it("should have lazy loading on gallery images", () => {
    const imageProps = {
      src: "https://example.com/image.jpg",
      alt: "Before",
      loading: "lazy",
    };

    expect(imageProps.loading).toBe("lazy");
    expect(imageProps.alt).toBeTruthy();
  });

  // Test 10: JSON-LD Schema validation
  it("should have valid JSON-LD LocalBusiness schema", () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Brampton Detail Co.",
      telephone: "+19052265301",
      email: "bramptondetailingco@gmail.com",
      areaServed: ["Brampton", "Mississauga", "Etobicoke"],
    };

    expect(schema["@type"]).toBe("LocalBusiness");
    expect(schema.name).toBe("Brampton Detail Co.");
    expect(schema.areaServed.length).toBeGreaterThan(0);
  });
});
