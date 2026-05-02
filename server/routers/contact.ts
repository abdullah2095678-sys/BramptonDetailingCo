import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";
import { ENV } from "../_core/env";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export const contactRouter = router({
  submit: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      try {
        // Send notification to owner
        const notificationResult = await notifyOwner({
          title: `New Contact Form Submission from ${input.name}`,
          content: `
Email: ${input.email}
Name: ${input.name}

Message:
${input.message}

---
Reply to: ${input.email}
          `.trim(),
        });

        if (!notificationResult) {
          console.warn("[Contact] Notification service temporarily unavailable");
          // Still return success to user even if notification fails
          // The form was valid and we attempted to send
        }

        return {
          success: true,
          message: "Your message has been sent successfully. We'll get back to you soon!",
        };
      } catch (error) {
        console.error("[Contact] Error submitting contact form:", error);
        throw new Error("Failed to send message. Please try again later.");
      }
    }),
});
