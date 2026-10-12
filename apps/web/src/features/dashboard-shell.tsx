"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTranslation } from "@rnbase/i18n";

import { cn } from "~/components/ui/utils";

const NAV_ITEMS = [
  { href: "/products", labelKey: "home.title" },
  { href: "/settings", labelKey: "settings.title" },
] as const;

export function DashboardShell({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <nav className="bg-sidebar text-sidebar-foreground flex gap-1 border-b p-3 md:w-60 md:flex-col md:border-r md:border-b-0 md:p-4">
        <Link href="/" className="mr-4 px-3 py-2 font-bold md:mr-0 md:mb-4">
          {t("common.appName")}
        </Link>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "hover:bg-sidebar-accent rounded-md px-3 py-2 text-sm font-medium",
              pathname.startsWith(item.href) &&
                "bg-sidebar-accent text-sidebar-accent-foreground",
            )}
          >
            {t(item.labelKey)}
          </Link>
        ))}
      </nav>
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
