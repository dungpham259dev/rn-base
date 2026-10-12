import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { PRODUCT_PAGE_SIZE } from "../endpoints/products";
import { useServices } from "../provider";
import { queryKeys } from "./query-keys";

export const useProducts = () => {
  const { products } = useServices();
  return useInfiniteQuery({
    queryKey: queryKeys.products,
    queryFn: ({ pageParam }) => products.list(pageParam),
    initialPageParam: 0,
    getNextPageParam: (last) => {
      const next = last.skip + PRODUCT_PAGE_SIZE;
      return next < last.total ? next : undefined;
    },
  });
};

export const useProduct = (id: number) => {
  const { products } = useServices();
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => products.detail(id),
  });
};
