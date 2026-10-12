import { ProductDetail } from "~/features/products/product-detail";

export default async function ProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  return <ProductDetail id={Number(id)} />;
}
