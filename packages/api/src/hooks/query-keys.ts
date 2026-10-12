export const queryKeys = {
  me: ["auth", "me"] as const,
  products: ["products"] as const,
  product: (id: number) => ["products", id] as const,
};
