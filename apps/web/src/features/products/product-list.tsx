"use client";

import Image from "next/image";
import Link from "next/link";

import { useProducts } from "@rnbase/api";
import { useTranslation } from "@rnbase/i18n";
import { useSessionStore } from "@rnbase/store";
import { Button } from "@rnbase/ui/button";

import { ErrorView, LoadingView } from "~/components/state-views";

export function ProductList() {
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
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">
        {t("home.greeting", { name: firstName })}
      </h1>
      {products.length === 0 && (
        <p className="text-muted-foreground">{t("home.empty")}</p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="bg-card hover:border-primary rounded-xl border p-4 transition-colors"
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={300}
              height={300}
              className="bg-muted aspect-square w-full rounded-lg object-cover"
            />
            <h2 className="mt-3 truncate font-semibold">{product.title}</h2>
            <p className="text-primary font-bold">${product.price}</p>
          </Link>
        ))}
      </div>
      {query.hasNextPage && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            disabled={query.isFetchingNextPage}
            onClick={() => void query.fetchNextPage()}
          >
            {t("home.loadMore")}
          </Button>
        </div>
      )}
    </section>
  );
}
