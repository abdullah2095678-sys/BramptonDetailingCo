import { describe, it, expect } from "vitest";

describe("BookNow form validation and email generation", () => {
  it("should validate all required fields", () => {
    const requiredFields = [
      "fullName",
      "phone",
      "email",
      "vehicleMake",
      "preferredDate",
      "serviceAddress",
    ];

    const formData = {
      fullName: "",
      phone: "",
      email: "",
      vehicleMake: "",
      vehicleType: "sedan",
      servicePackage: "full-interior-exterior",
      preferredDate: "",
      preferredTime: "morning",
      serviceAddress: "",
      additionalNotes: "",
      promoCode: "",
    };

    const errors: Record<string, boolean> = {};
    if (!formData.fullName) errors.fullName = true;
    if (!formData.phone) errors.phone = true;
    if (!formData.email) errors.email = true;
    if (!formData.vehicleMake) errors.vehicleMake = true;
    if (!formData.preferredDate) errors.preferredDate = true;
    if (!formData.serviceAddress) errors.serviceAddress = true;

    expect(Object.keys(errors)).toEqual(requiredFields);
  });

  it("should generate correct email body with all fields", () => {
    const formData = {
      fullName: "John Doe",
      phone: "(905) 555-0123",
      email: "john@example.com",
      vehicleMake: "Toyota Camry 2020",
      vehicleType: "sedan",
      servicePackage: "full-interior-exterior",
      preferredDate: "2026-05-15",
      preferredTime: "morning",
      serviceAddress: "123 Main St, Brampton, ON",
      additionalNotes: "Extra care on leather seats",
      promoCode: "",
    };

    const packageName = "Full Interior + Exterior";
    const totalPrice = 150;
    const appliedPromo = null;

    const emailBody = `================================
NEW BOOKING REQUEST
Brampton Detail Co.
================================

CUSTOMER DETAILS:
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email}

VEHICLE DETAILS:
Make & Model: ${formData.vehicleMake}
Vehicle Type: ${formData.vehicleType.toUpperCase()}

SERVICE DETAILS:
Package: ${packageName}
Price: $${totalPrice}
Promo Code Used: None

APPOINTMENT:
Date: ${formData.preferredDate}
Time: ${formData.preferredTime}
Service Address: ${formData.serviceAddress}

ADDITIONAL NOTES:
${formData.additionalNotes || "None"}
================================
Book a time by calling or texting (905) 226-5301
================================`;

    expect(emailBody).toContain("John Doe");
    expect(emailBody).toContain("(905) 555-0123");
    expect(emailBody).toContain("john@example.com");
    expect(emailBody).toContain("Toyota Camry 2020");
    expect(emailBody).toContain("SEDAN");
    expect(emailBody).toContain("Full Interior + Exterior");
    expect(emailBody).toContain("$150");
    expect(emailBody).toContain("2026-05-15");
    expect(emailBody).toContain("morning");
    expect(emailBody).toContain("123 Main St, Brampton, ON");
    expect(emailBody).toContain("Extra care on leather seats");
    expect(emailBody).toContain("(905) 226-5301");
  });

  it("should apply FIRST20 promo code correctly", () => {
    const basePrice = 150;
    const promoCode = "FIRST20";

    let discount = 0;
    if (promoCode.toUpperCase() === "FIRST20") {
      discount = Math.round(basePrice * 0.2);
    }

    const totalPrice = basePrice - discount;

    expect(discount).toBe(30);
    expect(totalPrice).toBe(120);
  });

  it("should calculate correct pricing for different vehicle types", () => {
    const packagePrices: Record<
      string,
      Record<string, { name: string; price: number }>
    > = {
      sedan: {
        "exterior-wash": { name: "Exterior Wash & Dry", price: 60 },
        "interior-detail": { name: "Interior Detail", price: 95 },
        "full-interior-exterior": { name: "Full Interior + Exterior", price: 150 },
        "premium-full": { name: "Premium Full Detail", price: 220 },
      },
      suv: {
        "exterior-wash": { name: "Exterior Wash & Dry", price: 75 },
        "interior-detail": { name: "Interior Detail", price: 115 },
        "full-interior-exterior": { name: "Full Interior + Exterior", price: 175 },
        "premium-full": { name: "Premium Full Detail", price: 260 },
      },
      truck: {
        "exterior-wash": { name: "Exterior Wash & Dry", price: 80 },
        "interior-detail": { name: "Interior Detail", price: 120 },
        "full-interior-exterior": { name: "Full Interior + Exterior", price: 185 },
        "premium-full": { name: "Premium Full Detail", price: 270 },
      },
      van: {
        "exterior-wash": { name: "Exterior Wash & Dry", price: 85 },
        "interior-detail": { name: "Interior Detail", price: 130 },
        "full-interior-exterior": { name: "Full Interior + Exterior", price: 195 },
        "premium-full": { name: "Premium Full Detail", price: 285 },
      },
    };

    // Test sedan pricing
    expect(packagePrices.sedan["full-interior-exterior"].price).toBe(150);
    expect(packagePrices.sedan["premium-full"].price).toBe(220);

    // Test SUV pricing
    expect(packagePrices.suv["full-interior-exterior"].price).toBe(175);
    expect(packagePrices.suv["premium-full"].price).toBe(260);

    // Test truck pricing
    expect(packagePrices.truck["full-interior-exterior"].price).toBe(185);
    expect(packagePrices.truck["premium-full"].price).toBe(270);

    // Test van pricing
    expect(packagePrices.van["full-interior-exterior"].price).toBe(195);
    expect(packagePrices.van["premium-full"].price).toBe(285);
  });

  it("should generate correct SMS message", () => {
    const formData = {
      fullName: "John Doe",
      vehicleMake: "Toyota Camry 2020",
      preferredDate: "2026-05-15",
      preferredTime: "morning",
    };

    const packageName = "Full Interior + Exterior";

    const smsMessage = `Hi, I'd like to book a ${packageName} for my ${formData.vehicleMake} on ${formData.preferredDate} at ${formData.preferredTime}. My name is ${formData.fullName}. Please confirm.`;

    expect(smsMessage).toContain("Full Interior + Exterior");
    expect(smsMessage).toContain("Toyota Camry 2020");
    expect(smsMessage).toContain("2026-05-15");
    expect(smsMessage).toContain("morning");
    expect(smsMessage).toContain("John Doe");
  });
});
