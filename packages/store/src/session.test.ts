import { beforeEach, describe, expect, it } from "vitest";

import { getAccessToken, useSessionStore } from "./session";

const user = {
  id: 1,
  username: "emilys",
  firstName: "Emily",
  lastName: "Johnson",
};

describe("session store", () => {
  beforeEach(() => useSessionStore.getState().signOut());

  it("stores token and user on sign in", () => {
    useSessionStore.getState().signIn("token-1", user);

    expect(getAccessToken()).toBe("token-1");
    expect(useSessionStore.getState().user).toEqual(user);
  });

  it("clears everything on sign out", () => {
    useSessionStore.getState().signIn("token-1", user);
    useSessionStore.getState().signOut();

    expect(getAccessToken()).toBeNull();
    expect(useSessionStore.getState().user).toBeNull();
  });
});

describe("configureStorage", () => {
  it("rehydrates the session from the provided storage", async () => {
    const { configureStorage } = await import("./setup");
    const saved = JSON.stringify({
      state: { token: "persisted", user },
      version: 0,
    });
    await configureStorage({
      getItem: (key) => (key === "session" ? saved : null),
      setItem: () => undefined,
      removeItem: () => undefined,
    });

    expect(getAccessToken()).toBe("persisted");
    expect(useSessionStore.getState().hydrated).toBe(true);
  });
});
