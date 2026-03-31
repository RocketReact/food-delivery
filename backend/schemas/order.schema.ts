import { z } from "zod";

export const orderSchema = z.object({
  customer: z.object({
    name: z.string().min(3),
    email: z
      .string()
      .trim()
      .min(3)
      .refine((val) => /^\S+@\S+\.\S+$/.test(val), {
        message: "Invalid email address"
      }),
    phone: z.string().trim().min(3),
    address: z.string().trim().min(3)
  }),
  items: z
    .array(
      z.object({
        id: z.union([z.string(), z.number()]),
        name: z.string().min(1),
        price: z.number().nonnegative(),
        quantity: z.number().int().positive(),
        image: z.string().optional()
      })
    )
    .min(1),
  totalPrice: z.number().nonnegative()
});
