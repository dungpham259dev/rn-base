import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { ApiProvider } from "@rnbase/api";

import { queryClient, services } from "./services";
import { useLanguageSync } from "./use-language-sync";
import { useThemeSync } from "./use-theme-sync";

export function AppProviders({ children }: { children: ReactNode }) {
  useThemeSync();
  useLanguageSync();

  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider services={services}>{children}</ApiProvider>
    </QueryClientProvider>
  );
}
