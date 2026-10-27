import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z.string().trim().min(2, "Subject must be at least 2 characters.").max(150),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters long.")
    .max(2000, "Message is too long."),
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email("A valid email is required."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const replySchema = z.object({
  messageId: z.string().min(1, "Message ID is required."),
  content: z.string().trim().min(3, "Reply must be at least 3 characters.").max(2000),
});
