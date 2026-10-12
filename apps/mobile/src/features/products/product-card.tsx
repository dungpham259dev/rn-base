import { Image, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

import type { Product } from "@rnbase/api";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={{ pathname: "/product/[id]", params: { id: product.id } }}
      asChild
    >
      <Pressable className="bg-card border-border flex-row gap-3 rounded-xl border p-3 active:opacity-80">
        <Image
          source={{ uri: product.thumbnail }}
          className="bg-muted size-20 rounded-lg"
        />
        <View className="flex-1 gap-1">
          <Text
            className="text-card-foreground font-semibold"
            numberOfLines={1}
          >
            {product.title}
          </Text>
          <Text className="text-muted-foreground text-sm" numberOfLines={2}>
            {product.description}
          </Text>
          <Text className="text-primary font-bold">${product.price}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
