import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Check, AlertCircle, Mail, MessageCircle } from "lucide-react";

export default function BookNow() {
  useEffect(() => {
    document.title = "Book Car Detailing Brampton | Brampton Detail Co.";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Book your mobile car detailing appointment in Brampton online. Choose your vehicle type, package, and date. We come to you. First-time discount available.');
    }
  }, []);
  const [step, setStep] = useState<"form" | "success">("form");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
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
  });

  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);

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

  const getPackagePrice = () => {
    const pkg =
      packagePrices[formData.vehicleType][formData.servicePackage];
    return pkg ? pkg.price : 0;
  };

  const handlePromoCode = () => {
    if (formData.promoCode.toUpperCase() === "FIRST20") {
      const discount = Math.round(getPackagePrice() * 0.2);
      setAppliedPromo({ code: "FIRST20", discount });
      toast.success("Promo code applied! 20% off");
    } else if (formData.promoCode) {
      toast.error("Invalid promo code");
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formData.fullName) newErrors.fullName = true;
    if (!formData.phone) newErrors.phone = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.vehicleMake) newErrors.vehicleMake = true;
    if (!formData.preferredDate) newErrors.preferredDate = true;
    if (!formData.serviceAddress) newErrors.serviceAddress = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const basePrice = getPackagePrice();
  const discount = appliedPromo ? appliedPromo.discount : 0;
  const totalPrice = basePrice - discount;
  const packageName =
    packagePrices[formData.vehicleType][formData.servicePackage]?.name || "";

  const handleEmailBooking = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

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
Promo Code Used: ${appliedPromo ? appliedPromo.code : "None"}

APPOINTMENT:
Date: ${formData.preferredDate}
Time: ${formData.preferredTime}
Service Address: ${formData.serviceAddress}

ADDITIONAL NOTES:
${formData.additionalNotes || "None"}
================================
Book a time by calling or texting (905) 226-5301
================================`;

    const mailtoLink = `mailto:bramptondetailingco@gmail.com?subject=New Booking Request — ${packageName} — ${formData.fullName}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    setStep("success");
  };

  const handleSmsBooking = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const smsMessage = `Hi, I'd like to book a ${packageName} for my ${formData.vehicleMake} on ${formData.preferredDate} at ${formData.preferredTime}. My name is ${formData.fullName}. Please confirm.`;
    const smsLink = `sms:+19052265301?body=${encodeURIComponent(smsMessage)}`;
    window.location.href = smsLink;
    setStep("success");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }
  };

  if (step === "success") {
    return (
      <div className="w-full">
        <section className="py-20 container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-primary" />
              </div>
              <h1 className="font-poppins font-bold text-4xl mb-4">
                Booking Request Sent!
              </h1>
              <p className="text-foreground/70 text-lg mb-8">
                We'll confirm your appointment within 2 hours. Questions?
                <br />
                Call or text us at{" "}
                <a
                  href="tel:+19052265301"
                  className="text-primary font-bold hover:underline"
                >
                  (905) 226-5301
                </a>
              </p>
            </div>

            <Card className="p-8 bg-card border-border/50 mb-8">
              <h2 className="font-bold text-xl mb-6">Booking Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-border/50">
                  <span className="text-foreground/70">Name:</span>
                  <span className="font-bold">{formData.fullName}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-border/50">
                  <span className="text-foreground/70">Vehicle:</span>
                  <span className="font-bold">{formData.vehicleMake}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-border/50">
                  <span className="text-foreground/70">Service:</span>
                  <span className="font-bold">{packageName}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-border/50">
                  <span className="text-foreground/70">Date:</span>
                  <span className="font-bold">{formData.preferredDate}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total:</span>
                  <span className="text-primary font-bold">${totalPrice}</span>
                </div>
              </div>
            </Card>

            <a
              href="/"
              className="block text-center bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Return to Home
            </a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-16 bg-card border-b border-border/50">
        <div className="container">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">
            Book Your Appointment
          </h1>
          <p className="text-foreground/70 text-lg max-w-2xl">
            Schedule your detailing service in just a few minutes. We'll come to
            you.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 container">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Personal Information */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="font-bold text-xl mb-6">Your Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-foreground">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className={`bg-background border-border/50 text-foreground ${
                      errors.fullName ? "border-red-500" : ""
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      <AlertCircle size={14} className="inline mr-1" />
                      This field is required
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={`bg-background border-border/50 text-foreground ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    placeholder="(905) 555-0123"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      <AlertCircle size={14} className="inline mr-1" />
                      This field is required
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`bg-background border-border/50 text-foreground ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      <AlertCircle size={14} className="inline mr-1" />
                      This field is required
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Vehicle Information */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="font-bold text-xl mb-6">Vehicle Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="vehicleMake" className="text-foreground">
                    Vehicle Make & Model *
                  </Label>
                  <Input
                    id="vehicleMake"
                    required
                    value={formData.vehicleMake}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicleMake: e.target.value })
                    }
                    className={`bg-background border-border/50 text-foreground ${
                      errors.vehicleMake ? "border-red-500" : ""
                    }`}
                    placeholder="e.g., Toyota Camry 2020"
                  />
                  {errors.vehicleMake && (
                    <p className="text-red-500 text-sm mt-1">
                      <AlertCircle size={14} className="inline mr-1" />
                      This field is required
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="vehicleType" className="text-foreground">
                    Vehicle Type *
                  </Label>
                  <Select
                    value={formData.vehicleType}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        vehicleType: value as any,
                        servicePackage: "full-interior-exterior",
                      })
                    }
                  >
                    <SelectTrigger className="bg-background border-border/50 text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border/50">
                      <SelectItem value="sedan">Sedan/Coupe</SelectItem>
                      <SelectItem value="suv">SUV/Crossover</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="van">Van/Minivan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Service Selection */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="font-bold text-xl mb-6">Service Package</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="servicePackage" className="text-foreground">
                    Select Package *
                  </Label>
                  <Select
                    value={formData.servicePackage}
                    onValueChange={(value) =>
                      setFormData({ ...formData, servicePackage: value })
                    }
                  >
                    <SelectTrigger className="bg-background border-border/50 text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border/50">
                      {Object.entries(
                        packagePrices[formData.vehicleType]
                      ).map(([key, pkg]) => (
                        <SelectItem key={key} value={key}>
                          {pkg.name} - ${pkg.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Appointment Details */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="font-bold text-xl mb-6">Appointment Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="preferredDate" className="text-foreground">
                    Preferred Date *
                  </Label>
                  <Input
                    id="preferredDate"
                    required
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredDate: e.target.value })
                    }
                    className={`bg-background border-border/50 text-foreground ${
                      errors.preferredDate ? "border-red-500" : ""
                    }`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.preferredDate && (
                    <p className="text-red-500 text-sm mt-1">
                      <AlertCircle size={14} className="inline mr-1" />
                      This field is required
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="preferredTime" className="text-foreground">
                    Preferred Time *
                  </Label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(value) =>
                      setFormData({ ...formData, preferredTime: value })
                    }
                  >
                    <SelectTrigger className="bg-background border-border/50 text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border/50">
                      <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                      <SelectItem value="afternoon">
                        Afternoon (12 PM - 4 PM)
                      </SelectItem>
                      <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="serviceAddress" className="text-foreground">
                    Service Location (Your Address) *
                  </Label>
                  <Input
                    id="serviceAddress"
                    required
                    value={formData.serviceAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        serviceAddress: e.target.value,
                      })
                    }
                    className={`bg-background border-border/50 text-foreground ${
                      errors.serviceAddress ? "border-red-500" : ""
                    }`}
                    placeholder="123 Main St, Brampton, ON"
                  />
                  {errors.serviceAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      <AlertCircle size={14} className="inline mr-1" />
                      This field is required
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="notes" className="text-foreground">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.additionalNotes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        additionalNotes: e.target.value,
                      })
                    }
                    className="bg-background border-border/50 text-foreground"
                    placeholder="Any special requests or concerns?"
                    rows={4}
                  />
                </div>
              </div>
            </Card>

            {/* Promo Code */}
            <Card className="p-6 bg-card border-border/50">
              <h2 className="font-bold text-xl mb-6">Promo Code</h2>
              <div className="flex gap-2">
                <Input
                  value={formData.promoCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      promoCode: e.target.value,
                    })
                  }
                  className="bg-background border-border/50 text-foreground"
                  placeholder="Enter promo code (e.g., FIRST20)"
                />
                <Button
                  type="button"
                  onClick={handlePromoCode}
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/10"
                >
                  Apply
                </Button>
              </div>
              {appliedPromo && (
                <div className="mt-3 p-3 bg-primary/10 border border-primary/50 rounded text-sm text-primary">
                  ✓ {appliedPromo.code} applied: -${appliedPromo.discount}
                </div>
              )}
            </Card>

            {/* Order Summary */}
            <Card className="p-6 bg-primary/10 border border-primary/50">
              <h2 className="font-bold text-xl mb-6">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Service:</span>
                  <span className="font-bold">{packageName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Vehicle:</span>
                  <span className="font-bold">{formData.vehicleType}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-primary/50">
                  <span className="text-foreground/70">Price:</span>
                  <span className="font-bold">${basePrice}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between pb-3 border-b border-primary/50">
                    <span className="text-foreground/70">Discount:</span>
                    <span className="font-bold text-primary">
                      -${appliedPromo.discount}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total:</span>
                  <span className="text-primary font-bold text-xl">
                    ${totalPrice}
                  </span>
                </div>
              </div>
            </Card>

            {/* Confirmation Button */}
            <Button
              type="button"
              onClick={handleEmailBooking}
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-bold"
            >
              Send Booking Request
            </Button>

            <p className="text-sm text-foreground/70 text-center">
              This opens your email app with your booking details already filled in. Just hit Send.
              <br />
              Prefer to call? <a href="tel:+19052265301" className="text-primary font-bold hover:underline">(905) 226-5301</a>
            </p>

            <Card className="p-4 bg-card border border-border/50">
              <p className="text-sm text-foreground text-center">
                <strong>💳 Pay by e-Transfer to</strong><br />
                <strong className="text-primary">abdullah2095678@gmail.com</strong><br />
                <span className="text-foreground/70">or cash on the day of service</span><br />
                <span className="text-xs text-foreground/60 mt-2 block">No payment needed to book your appointment</span>
              </p>
            </Card>
          </form>
        </div>
      </section>
    </div>
  );
}
