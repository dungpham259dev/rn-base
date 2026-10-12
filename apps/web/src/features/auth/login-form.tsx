"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError, useLogin } from "@rnbase/api";
import { useTranslation } from "@rnbase/i18n";
import { useSessionStore } from "@rnbase/store";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const signIn = useSessionStore((s) => s.signIn);
  const signedIn = useSessionStore((s) => s.token !== null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = useLogin(({ accessToken, ...user }) =>
    signIn(accessToken, user),
  );

  useEffect(() => {
    if (signedIn) router.replace("/products");
  }, [signedIn, router]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    login.mutate({ username, password });
  };

  const errorMessage =
    login.error instanceof ApiError && login.error.kind !== "network"
      ? t("auth.invalid")
      : login.error && t("common.error");

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={onSubmit}
        className="bg-card w-full max-w-sm space-y-6 rounded-xl border p-8 shadow-sm"
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{t("auth.title")}</h1>
          <p className="text-muted-foreground text-sm">{t("auth.subtitle")}</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">{t("auth.username")}</Label>
          <Input
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t("auth.password")}</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && (
          <p className="text-destructive text-sm">{errorMessage}</p>
        )}
        <Button type="submit" className="w-full" disabled={login.isPending}>
          {t("auth.submit")}
        </Button>
        <p className="text-muted-foreground text-center text-xs">
          {t("auth.demoHint")}
        </p>
      </form>
    </main>
  );
}
