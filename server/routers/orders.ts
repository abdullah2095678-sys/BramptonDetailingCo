import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { createOrder, getAllOrders, getOrderById, updateOrderStatus } from "../db";
import { TRPCError } from "@trpc/server";
import { ENV } from "../_core/env";

export const ordersRouter = router({
  create: publicProcedure
    .input(
      z.object({
        customerName: z.string().min(1),
        customerEmail: z.string().email(),
        customerPhone: z.string().min(10),
        vehicleType: z.enum(["sedan", "suv", "truck", "van"]),
        servicePackage: z.string().min(1),
        price: z.number().int().positive(),
        paymentMethod: z.enum(["etransfer", "cash"]),
        promoCode: z.string().optional(),
        discountAmount: z.number().int().default(0),
        finalPrice: z.number().int().positive(),
        serviceDate: z.string(),
        serviceTime: z.string(),
        address: z.string().min(5),
        specialRequests: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const order = await createOrder({
        ...input,
        status: "pending",
      });

      // Send notification to owner
      if (order && input.paymentMethod === "etransfer") {
        const emailBody = `
New Booking Received!

Customer: ${input.customerName}
Email: ${input.customerEmail}
Phone: ${input.customerPhone}

Vehicle Type: ${input.vehicleType}
Service Package: ${input.servicePackage}
Final Price: $${(input.finalPrice / 100).toFixed(2)}

Payment Method: E-Transfer
Date: ${input.serviceDate}
Time: ${input.serviceTime}
Address: ${input.address}

Special Requests: ${input.specialRequests || "None"}

Please send E-Transfer payment to: ${ENV.ownerEmail || "abdullah2095678@gmail.com"}
`;

        try {
          await fetch(`${ENV.forgeApiUrl}/v1/notification/send-email`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${ENV.forgeApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: ENV.ownerEmail || "abdullah2095678@gmail.com",
              subject: `New Booking: ${input.customerName} - ${input.servicePackage}`,
              body: emailBody,
            }),
          });
        } catch (error) {
          console.error("Failed to send email notification:", error);
        }
      }

      return order;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Only admins can view all orders",
      });
    }
    return getAllOrders();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return getOrderById(input.id);
    }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "completed", "cancelled"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can update order status",
        });
      }
      return updateOrderStatus(input.id, input.status);
    }),
});
