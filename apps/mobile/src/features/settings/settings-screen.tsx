import { ScrollView, Text } from "react-native";

import type { Language } from "@rnbase/i18n";
import type { ThemeMode } from "@rnbase/store";
import {
  LANGUAGE_LABELS,
  resolveLanguage,
  SUPPORTED_LANGUAGES,
  useTranslation,
} from "@rnbase/i18n";
import { useSessionStore, useSettingsStore } from "@rnbase/store";

import { Button } from "~/components/button";
import { env } from "~/core/env";
import { queryClient } from "~/core/services";
import { OptionGroup } from "./option-group";

export function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const { themeMode, setThemeMode, setLanguage } = useSettingsStore();
  const signOut = useSessionStore((s) => s.signOut);

  const themeOptions: { value: ThemeMode; label: string }[] = [
    { value: "system", label: t("settings.themeSystem") },
    { value: "light", label: t("settings.themeLight") },
    { value: "dark", label: t("settings.themeDark") },
  ];
  const languageOptions = SUPPORTED_LANGUAGES.map((value) => ({
    value,
    label: LANGUAGE_LABELS[value],
  }));

  return (
    <ScrollView className="bg-background" contentContainerClassName="gap-6 p-4">
      <OptionGroup
        title={t("settings.theme")}
        options={themeOptions}
        selected={themeMode}
        onSelect={setThemeMode}
      />
      <OptionGroup<Language>
        title={t("settings.language")}
        options={languageOptions}
        selected={resolveLanguage(i18n.language)}
        onSelect={setLanguage}
      />
      <Button
        label={t("settings.signOut")}
        variant="destructive"
        onPress={() => {
          signOut();
          queryClient.clear();
        }}
      />
      <Text className="text-muted-foreground text-center text-xs">
        {t("settings.environment")}: {env.appEnv}
      </Text>
    </ScrollView>
  );
}
