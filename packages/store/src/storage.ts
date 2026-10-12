import type { StateStorage } from "zustand/middleware";

const memory = new Map<string, string>();

const memoryStorage: StateStorage = {
  getItem: (key) => memory.get(key) ?? null,
  setItem: (key, value) => void memory.set(key, value),
  removeItem: (key) => void memory.delete(key),
};

let current: StateStorage = memoryStorage;

export const setStorageBackend = (storage: StateStorage) => {
  current = storage;
};

export const platformStorage: StateStorage = {
  getItem: (key) => current.getItem(key),
  setItem: (key, value) => current.setItem(key, value),
  removeItem: (key) => current.removeItem(key),
};
