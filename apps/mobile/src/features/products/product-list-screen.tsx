import { FlatList, Text, View } from "react-native";

import { useProducts } from "@rnbase/api";
import { useTranslation } from "@rnbase/i18n";
import { useSessionStore } from "@rnbase/store";

import { ErrorView, LoadingView } from "~/components/state-views";
import { ProductCard } from "./product-card";

export function ProductListScreen() {
  const { t } = useTranslation();
  const firstName = useSessionStore((s) => s.user?.firstName ?? "");
  const query = useProducts();

  if (query.isPending) return <LoadingView />;
  if (query.isError)
    return (
      <ErrorView
        message={query.error.message}
        onRetry={() => void query.refetch()}
      />
    );

  const products = query.data.pages.flatMap((page) => page.products);

  return (
    <FlatList
      className="bg-background"
      contentContainerClassName="gap-3 p-4"
      data={products}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <ProductCard product={item} />}
      ListHeaderComponent={
        <Text className="text-foreground mb-2 text-xl font-bold">
          {t("home.greeting", { name: firstName })}
        </Text>
      }
      ListEmptyComponent={
        <View className="items-center p-6">
          <Text className="text-muted-foreground">{t("home.empty")}</Text>
        </View>
      }
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (query.hasNextPage && !query.isFetchingNextPage)
          void query.fetchNextPage();
      }}
      refreshing={query.isRefetching}
      onRefresh={() => void query.refetch()}
    />
  );
}
