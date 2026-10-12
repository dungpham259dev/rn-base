import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { ConfigContext, ExpoConfig } from "expo/config";

type AppEnv = "development" | "staging" | "production";

const BASE_BUNDLE_ID = "com.dungpham.rnbase";
const BASE_NAME = "RN Base";

const VARIANTS: Record<AppEnv, { suffix: string; nameSuffix: string }> = {
  development: { suffix: ".dev", nameSuffix: " Dev" },
  staging: { suffix: ".stg", nameSuffix: " Stg" },
  production: { suffix: "", nameSuffix: "" },
};

const readAppEnv = (): AppEnv => {
  const value = process.env.APP_ENV ?? "development";
  if (value in VARIANTS) return value as AppEnv;
  throw new Error(
    `Invalid APP_ENV "${value}". Use development, staging or production.`,
  );
};

// Expo only auto-loads .env.<NODE_ENV>, so flavor files are read here and exposed via `extra`.
const readEnvFile = (env: AppEnv): Record<string, string> => {
  const file = path.join(__dirname, `.env.${env}`);
  if (!existsSync(file)) throw new Error(`Missing ${file}`);
  return Object.fromEntries(
    readFileSync(file, "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const index = line.indexOf("=");
        return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
      }),
  );
};

const appEnv = readAppEnv();
const variant = VARIANTS[appEnv];
const bundleId = `${BASE_BUNDLE_ID}${variant.suffix}`;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: `${BASE_NAME}${variant.nameSuffix}`,
  slug: "rn-base",
  scheme: appEnv === "production" ? "rnbase" : `rnbase-${appEnv}`,
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/icon-light.png",
  userInterfaceStyle: "automatic",
  updates: {
    fallbackToCacheTimeout: 0,
  },
  newArchEnabled: true,
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: bundleId,
    supportsTablet: true,
    icon: {
      light: "./assets/icon-light.png",
      dark: "./assets/icon-dark.png",
    },
  },
  android: {
    package: bundleId,
    adaptiveIcon: {
      foregroundImage: "./assets/icon-light.png",
      backgroundColor: "#1F104A",
    },
    edgeToEdgeEnabled: true,
  },
  extra: {
    appEnv,
    ...readEnvFile(appEnv),
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
    reactCanary: true,
    reactCompiler: true,
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    "expo-localization",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#E4E4E7",
        image: "./assets/icon-light.png",
        dark: {
          backgroundColor: "#18181B",
          image: "./assets/icon-dark.png",
        },
      },
    ],
  ],
});
