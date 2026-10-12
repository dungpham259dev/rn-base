import type { StateStorage } from "zustand/middleware";

import { useSessionStore } from "./session";
import { useSettingsStore } from "./settings";
import { setStorageBackend } from "./storage";

// Stores skip auto-hydration so each app can plug in its platform storage first.
export const configureStorage = async (storage: StateStorage) => {
  setStorageBackend(storage);
  await Promise.all([
    useSessionStore.persist.rehydrate(),
    useSettingsStore.persist.rehydrate(),
  ]);
};
