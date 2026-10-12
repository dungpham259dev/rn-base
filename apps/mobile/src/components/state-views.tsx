import { ActivityIndicator, Text, View } from "react-native";

import { useTranslation } from "@rnbase/i18n";

import { Button } from "./button";

export function LoadingView() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
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
    <View className="flex-1 items-center justify-center gap-4 p-6">
      <Text className="text-foreground text-center">
        {message ?? t("common.error")}
      </Text>
      {onRetry && (
        <Button label={t("common.retry")} variant="outline" onPress={onRetry} />
      )}
    </View>
  );
}
