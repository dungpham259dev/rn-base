import type { ApiClient } from "./client";
import { authEndpoints } from "./endpoints/auth";
import { productEndpoints } from "./endpoints/products";

export const createServices = (client: ApiClient) => ({
  auth: authEndpoints(client),
  products: productEndpoints(client),
});

export type Services = ReturnType<typeof createServices>;
