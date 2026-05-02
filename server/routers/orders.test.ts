import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";
import type { User } from "../../drizzle/schema";

const adminUser: User = {
  id: 1,
  openId: "admin-user",
  email: "admin@example.com",
  name: "Admin User",
  loginMethod: "manus",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

const regularUser: User = {
  id: 2,
  openId: "regular-user",
  email: "user@example.com",
  name: "Regular User",
  loginMethod: "manus",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

function createContext(user?: User): TrpcContext {
  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("orders router", () => {
  it("should create a new order", async () => {
    const caller = appRouter.createCaller(createContext());

    const result = await caller.orders.create({
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerPhone: "4165551234",
      vehicleType: "sedan",
      servicePackage: "Full Detail",
      price: 15000,
      paymentMethod: "etransfer",
      finalPrice: 12000,
      serviceDate: "2026-05-10",
      serviceTime: "10:00 AM",
      address: "123 Main St, Brampton, ON",
      specialRequests: "Extra care on leather seats",
    });

    expect(result).toBeDefined();
    expect(result?.customerName).toBe("John Doe");
    expect(result?.status).toBe("pending");
    expect(result?.paymentMethod).toBe("etransfer");
  });

  it("should prevent non-admin users from viewing all orders", async () => {
    const caller = appRouter.createCaller(createContext(regularUser));

    try {
      await caller.orders.getAll();
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
      expect(error.message).toContain("Only admins");
    }
  });

  it("should allow admin users to view all orders", async () => {
    const caller = appRouter.createCaller(createContext(adminUser));

    const result = await caller.orders.getAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should prevent non-admin users from updating order status", async () => {
    const caller = appRouter.createCaller(createContext(regularUser));

    try {
      await caller.orders.updateStatus({
        id: 1,
        status: "completed",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
      expect(error.message).toContain("Only admins");
    }
  });

  it("should validate required fields on order creation", async () => {
    const caller = appRouter.createCaller(createContext());

    try {
      await caller.orders.create({
        customerName: "",
        customerEmail: "invalid-email",
        customerPhone: "123",
        vehicleType: "sedan",
        servicePackage: "Full Detail",
        price: 15000,
        paymentMethod: "etransfer",
        finalPrice: 12000,
        serviceDate: "2026-05-10",
        serviceTime: "10:00 AM",
        address: "123 Main St",
        specialRequests: undefined,
      } as any);
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error).toBeDefined();
    }
  });

  it("should accept both etransfer and cash payment methods", async () => {
    const caller = appRouter.createCaller(createContext());

    const etransferOrder = await caller.orders.create({
      customerName: "Jane Doe",
      customerEmail: "jane@example.com",
      customerPhone: "4165552345",
      vehicleType: "suv",
      servicePackage: "Exterior Wash",
      price: 6000,
      paymentMethod: "etransfer",
      finalPrice: 6000,
      serviceDate: "2026-05-11",
      serviceTime: "2:00 PM",
      address: "456 Oak Ave, Mississauga, ON",
    });

    expect(etransferOrder?.paymentMethod).toBe("etransfer");

    const cashOrder = await caller.orders.create({
      customerName: "Bob Smith",
      customerEmail: "bob@example.com",
      customerPhone: "4165553456",
      vehicleType: "truck",
      servicePackage: "Interior Detail",
      price: 9500,
      paymentMethod: "cash",
      finalPrice: 9500,
      serviceDate: "2026-05-12",
      serviceTime: "9:00 AM",
      address: "789 Pine Rd, Etobicoke, ON",
    });

    expect(cashOrder?.paymentMethod).toBe("cash");
  });
});
