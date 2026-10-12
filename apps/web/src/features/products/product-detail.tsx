"use client";

import Image from "next/image";

import { useProduct } from "@rnbase/api";

import { ErrorView, LoadingView } from "~/components/state-views";

export function ProductDetail({ id }: { id: number }) {
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
    <article className="grid max-w-5xl gap-8 md:grid-cols-2">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={600}
        height={600}
        className="bg-muted aspect-square w-full rounded-xl object-cover"
      />
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-primary text-2xl font-semibold">${product.price}</p>
        <p className="text-muted-foreground leading-7">{product.description}</p>
      </div>
    </article>
  );
}
