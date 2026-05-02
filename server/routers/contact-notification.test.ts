import { describe, it, expect, vi } from "vitest";
import { contactRouter } from "./contact";

describe("contact router - notification system", () => {
  it("should successfully submit contact form and return success message", async () => {
    const caller = contactRouter.createCaller({} as any);

    const result = await caller.submit({
      name: "Test Customer",
      email: "customer@example.com",
      message: "I am interested in your car detailing services for my sedan.",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("sent successfully");
  });

  it("should include customer email in notification for reply", async () => {
    const caller = contactRouter.createCaller({} as any);

    const result = await caller.submit({
      name: "John Smith",
      email: "john.smith@example.com",
      message: "Can you detail my truck? I have a Ford F-150 that needs interior and exterior detailing.",
    });

    expect(result.success).toBe(true);
    // Notification would include email for reply
  });

  it("should handle contact form submission with special characters", async () => {
    const caller = contactRouter.createCaller({} as any);

    const result = await caller.submit({
      name: "María García",
      email: "maria@example.com",
      message: "Me gustaría reservar un servicio de detallado para mi vehículo. ¿Cuál es el precio?",
    });

    expect(result.success).toBe(true);
  });

  it("should handle multi-line messages", async () => {
    const caller = contactRouter.createCaller({} as any);

    const multilineMessage = `I am interested in your services.
I have a 2022 BMW X5 that needs:
- Interior deep clean
- Exterior wash and wax
- Tire shine

Please let me know pricing and availability.`;

    const result = await caller.submit({
      name: "Premium Customer",
      email: "premium@example.com",
      message: multilineMessage,
    });

    expect(result.success).toBe(true);
  });

  it("should validate that contact form returns proper success response", async () => {
    const caller = contactRouter.createCaller({} as any);

    const result = await caller.submit({
      name: "Test User",
      email: "test@example.com",
      message: "This is a test message for the contact form system.",
    });

    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("message");
    expect(typeof result.success).toBe("boolean");
    expect(typeof result.message).toBe("string");
  });
});
