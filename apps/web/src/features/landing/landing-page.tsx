"use client";

import Link from "next/link";

import { useTranslation } from "@rnbase/i18n";

import { Button } from "~/components/ui/button";

export function LandingPage() {
  const { t } = useTranslation();
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
        {t("landing.headline")}
      </h1>
      <p className="text-muted-foreground max-w-xl text-lg">
        {t("landing.description")}
      </p>
      <Button size="lg" asChild>
        <Link href="/products">{t("landing.cta")}</Link>
      </Button>
    </main>
  );
}
