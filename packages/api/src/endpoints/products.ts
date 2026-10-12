import type { ApiClient } from "../client";
import { ProductPageSchema, ProductSchema } from "../schemas/product";

export const PRODUCT_PAGE_SIZE = 20;

export const productEndpoints = (client: ApiClient) => ({
  list: (skip = 0, limit = PRODUCT_PAGE_SIZE) =>
    client.get("products", ProductPageSchema, { skip, limit }),
  detail: (id: number) => client.get(`products/${id}`, ProductSchema),
});
