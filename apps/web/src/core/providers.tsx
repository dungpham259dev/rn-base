"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { ApiProvider } from "@rnbase/api";
import { changeLanguage, initI18n, resolveLanguage } from "@rnbase/i18n";
import { configureStorage, useSettingsStore } from "@rnbase/store";

import { queryClient, services } from "./services";

initI18n();

const useLanguageSync = () => {
  const language = useSettingsStore((s) => s.language);

  useEffect(() => {
    const target = resolveLanguage(language ?? navigator.language);
    void changeLanguage(target);
    document.documentElement.lang = target;
  }, [language]);
};

export function AppProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    void configureStorage(window.localStorage);
  }, []);
  useLanguageSync();

  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider services={services}>{children}</ApiProvider>
    </QueryClientProvider>
  );
}
