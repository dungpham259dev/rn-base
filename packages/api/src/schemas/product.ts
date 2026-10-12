import { z } from "zod/v4";

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  rating: z.number().optional(),
  thumbnail: z.string(),
  category: z.string().optional(),
});
export type Product = z.infer<typeof ProductSchema>;

export const ProductPageSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});
export type ProductPage = z.infer<typeof ProductPageSchema>;
