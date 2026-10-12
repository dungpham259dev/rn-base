import { Image, ScrollView, Text, View } from "react-native";
import { Stack } from "expo-router";

import { useProduct } from "@rnbase/api";

import { ErrorView, LoadingView } from "~/components/state-views";

export function ProductDetailScreen({ id }: { id: number }) {
  const query = useProduct(id);

  if (query.isPending) return <LoadingView />;
  if (query.isError)
    return (
      <ErrorView
        message={query.error.message}
        onRetry={() => void query.refetch()}
      />
    );

  const product = query.data;
  return (
    <ScrollView className="bg-background" contentContainerClassName="gap-4 p-4">
      <Stack.Screen options={{ title: product.title }} />
      <Image
        source={{ uri: product.thumbnail }}
        className="bg-muted aspect-square w-full rounded-xl"
      />
      <View className="gap-2">
        <Text className="text-foreground text-2xl font-bold">
          {product.title}
        </Text>
        <Text className="text-primary text-xl font-semibold">
          ${product.price}
        </Text>
        <Text className="text-muted-foreground leading-6">
          {product.description}
        </Text>
      </View>
    </ScrollView>
  );
}
