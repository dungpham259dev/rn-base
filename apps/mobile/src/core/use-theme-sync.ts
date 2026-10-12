import { useEffect } from "react";
import { Appearance } from "react-native";

import { useSettingsStore } from "@rnbase/store";

export const useThemeSync = () => {
  const themeMode = useSettingsStore((s) => s.themeMode);

  useEffect(() => {
    Appearance.setColorScheme(themeMode === "system" ? null : themeMode);
  }, [themeMode]);
};
