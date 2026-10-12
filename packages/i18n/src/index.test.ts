import { describe, expect, it } from "vitest";

import { resolveLanguage } from "./index";
import en from "./locales/en.json";
import vi from "./locales/vi.json";

const keysOf = (obj: object, prefix = ""): string[] =>
  Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "object" && value !== null
      ? keysOf(value as object, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );

describe("i18n", () => {
  it("keeps vi and en in sync", () => {
    expect(keysOf(en).sort()).toEqual(keysOf(vi).sort());
  });

  it("resolves device locales to a supported language", () => {
    expect(resolveLanguage("en-US")).toBe("en");
    expect(resolveLanguage("vi_VN")).toBe("vi");
    expect(resolveLanguage("fr")).toBe("vi");
    expect(resolveLanguage(null)).toBe("vi");
  });
});
