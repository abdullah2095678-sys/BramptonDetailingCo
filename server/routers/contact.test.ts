import { describe, it, expect, vi } from "vitest";
import { contactRouter } from "./contact";

describe("contact router", () => {
  it("should validate required fields", async () => {
    const caller = contactRouter.createCaller({} as any);

    try {
      await caller.submit({
        name: "",
        email: "test@example.com",
        message: "Test message",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("at least 2 characters");
    }
  });

  it("should validate email format", async () => {
    const caller = contactRouter.createCaller({} as any);

    try {
      await caller.submit({
        name: "John Doe",
        email: "invalid-email",
        message: "Test message",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Invalid email");
    }
  });

  it("should validate message length", async () => {
    const caller = contactRouter.createCaller({} as any);

    try {
      await caller.submit({
        name: "John Doe",
        email: "test@example.com",
        message: "Short",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("at least 10 characters");
    }
  });

  it("should accept valid contact form submission", async () => {
    const caller = contactRouter.createCaller({} as any);

    const result = await caller.submit({
      name: "John Doe",
      email: "john@example.com",
      message: "This is a test message about car detailing services.",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("sent successfully");
  });

  it("should handle long valid messages", async () => {
    const caller = contactRouter.createCaller({} as any);

    const longMessage = "I am interested in your car detailing services. ".repeat(50);

    const result = await caller.submit({
      name: "Jane Smith",
      email: "jane@example.com",
      message: longMessage,
    });

    expect(result.success).toBe(true);
  });

  it("should reject messages exceeding max length", async () => {
    const caller = contactRouter.createCaller({} as any);

    const tooLongMessage = "a".repeat(5001);

    try {
      await caller.submit({
        name: "John Doe",
        email: "test@example.com",
        message: tooLongMessage,
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("5000");
    }
  });

  it("should handle special characters in name", async () => {
    const caller = contactRouter.createCaller({} as any);

    const result = await caller.submit({
      name: "José García-López",
      email: "jose@example.com",
      message: "I am interested in your detailing services.",
    });

    expect(result.success).toBe(true);
  });

  it("should handle email with plus addressing", async () => {
    const caller = contactRouter.createCaller({} as any);

    const result = await caller.submit({
      name: "John Doe",
      email: "john+brampton@example.com",
      message: "I would like to book a detailing appointment.",
    });

    expect(result.success).toBe(true);
  });
});
