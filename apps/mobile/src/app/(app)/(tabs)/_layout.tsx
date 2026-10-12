import { Tabs } from "expo-router";

import { useTranslation } from "@rnbase/i18n";

export default function TabsLayout() {
  const { t } = useTranslation();
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: t("home.title") }} />
      <Tabs.Screen name="settings" options={{ title: t("settings.title") }} />
    </Tabs>
  );
}
