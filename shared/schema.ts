import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/* Base schema from Drizzle */
const baseInsertSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

/* Extended validation rules */
export const insertContactSchema = baseInsertSchema.extend({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .string()
    .email("Invalid email format")
    .refine(
      (val) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(val),
      "Only @gmail.com email addresses are allowed"
    ),

  message: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 500 characters"),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSchema>;