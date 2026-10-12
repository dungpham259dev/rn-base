"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSessionStore } from "@rnbase/store";

import { LoadingView } from "~/components/state-views";

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const hydrated = useSessionStore((s) => s.hydrated);
  const signedIn = useSessionStore((s) => s.token !== null);

  useEffect(() => {
    if (hydrated && !signedIn) router.replace("/login");
  }, [hydrated, signedIn, router]);

  if (!hydrated || !signedIn) return <LoadingView />;
  return children;
}
