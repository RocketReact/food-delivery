import { z } from "zod";
import { CATEGORIES } from "../models/Product";

export const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  image: z.string().min(1),
  price: z.number().positive(),
  category: z.enum(CATEGORIES)
});