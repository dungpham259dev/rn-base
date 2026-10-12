import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { platformStorage } from "./storage";

export interface SessionUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  image?: string;
}

interface SessionState {
  token: string | null;
  user: SessionUser | null;
  hydrated: boolean;
  signIn: (token: string, user: SessionUser) => void;
  signOut: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      hydrated: false,
      signIn: (token, user) => set({ token, user }),
      signOut: () => set({ token: null, user: null }),
    }),
    {
      name: "session",
      storage: createJSONStorage(() => platformStorage),
      skipHydration: true,
      partialize: ({ token, user }) => ({ token, user }),
      onRehydrateStorage: () => () =>
        useSessionStore.setState({ hydrated: true }),
    },
  ),
);

export const getAccessToken = () => useSessionStore.getState().token;
