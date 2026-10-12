import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import vi from "./locales/vi.json";

export const SUPPORTED_LANGUAGES = ["vi", "en"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = "vi";

export const LANGUAGE_LABELS: Record<Language, string> = {
  vi: "Tiếng Việt",
  en: "English",
};

export const resources = {
  vi: { translation: vi },
  en: { translation: en },
} as const;

export const resolveLanguage = (candidate?: string | null): Language => {
  const base = candidate?.toLowerCase().split(/[-_]/)[0];
  return SUPPORTED_LANGUAGES.find((lang) => lang === base) ?? DEFAULT_LANGUAGE;
};

export const initI18n = (language?: string | null) => {
  if (!i18next.isInitialized) {
    void i18next.use(initReactI18next).init({
      resources,
      lng: resolveLanguage(language),
      fallbackLng: "en",
      interpolation: { escapeValue: false },
      returnNull: false,
    });
  }
  return i18next;
};

export const changeLanguage = (language: Language) =>
  i18next.changeLanguage(language);

export { useTranslation } from "react-i18next";
export { i18next };
