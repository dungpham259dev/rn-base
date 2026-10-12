import { useLocalSearchParams } from "expo-router";

import { ProductDetailScreen } from "~/features/products/product-detail-screen";

export default function ProductRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ProductDetailScreen id={Number(id)} />;
}
