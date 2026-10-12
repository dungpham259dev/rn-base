"use client";

import type { Language } from "@rnbase/i18n";
import type { ThemeMode } from "@rnbase/ui/theme";
import {
  LANGUAGE_LABELS,
  resolveLanguage,
  SUPPORTED_LANGUAGES,
  useTranslation,
} from "@rnbase/i18n";
import { useSessionStore, useSettingsStore } from "@rnbase/store";
import { Button } from "@rnbase/ui/button";
import { useTheme } from "@rnbase/ui/theme";

import { queryClient } from "~/core/services";
import { env } from "~/env";

function Segmented<T extends string>(props: {
  title: string;
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-muted-foreground text-sm font-medium uppercase">
        {props.title}
      </legend>
      <div className="flex flex-wrap gap-2">
        {props.options.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={option.value === props.selected ? "default" : "outline"}
            aria-pressed={option.value === props.selected}
            onClick={() => props.onSelect(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </fieldset>
  );
}

export function SettingsPanel() {
  const { t, i18n } = useTranslation();
  const { themeMode, setTheme } = useTheme();
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const signOut = useSessionStore((s) => s.signOut);

  const themeOptions: { value: ThemeMode; label: string }[] = [
    { value: "auto", label: t("settings.themeSystem") },
    { value: "light", label: t("settings.themeLight") },
    { value: "dark", label: t("settings.themeDark") },
  ];

  return (
    <section className="max-w-xl space-y-8">
      <h1 className="text-2xl font-bold">{t("settings.title")}</h1>
      <Segmented
        title={t("settings.theme")}
        options={themeOptions}
        selected={themeMode}
        onSelect={setTheme}
      />
      <Segmented<Language>
        title={t("settings.language")}
        options={SUPPORTED_LANGUAGES.map((value) => ({
          value,
          label: LANGUAGE_LABELS[value],
        }))}
        selected={resolveLanguage(i18n.language)}
        onSelect={setLanguage}
      />
      <Button
        variant="destructive"
        onClick={() => {
          signOut();
          queryClient.clear();
        }}
      >
        {t("settings.signOut")}
      </Button>
      <p className="text-muted-foreground text-xs">
        {t("settings.environment")}: {env.appEnv}
      </p>
    </section>
  );
}
