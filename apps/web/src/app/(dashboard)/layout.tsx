import type { ReactNode } from "react";

import { AuthGuard } from "~/features/auth/auth-guard";
import { DashboardShell } from "~/features/dashboard-shell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  );
}
