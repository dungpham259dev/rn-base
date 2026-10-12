import { useEffect } from "react";
import { getLocales } from "expo-localization";

import { changeLanguage, initI18n, resolveLanguage } from "@rnbase/i18n";
import { useSettingsStore } from "@rnbase/store";

initI18n(getLocales()[0]?.languageCode);

export const useLanguageSync = () => {
  const language = useSettingsStore((s) => s.language);

  useEffect(() => {
    if (language) void changeLanguage(resolveLanguage(language));
  }, [language]);
};
