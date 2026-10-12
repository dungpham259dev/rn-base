"use client";

import { useTranslation } from "@rnbase/i18n";
import { Button } from "@rnbase/ui/button";

export function LoadingView() {
  const { t } = useTranslation();
  return (
    <p className="text-muted-foreground p-8 text-center">
      {t("common.loading")}
    </p>
  );
}

export function ErrorView({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <p>{message ?? t("common.error")}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          {t("common.retry")}
        </Button>
      )}
    </div>
  );
}
