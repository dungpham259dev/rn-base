import Constants from "expo-constants";
import { z } from "zod/v4";

const EnvSchema = z.object({
  appEnv: z.enum(["development", "staging", "production"]),
  API_URL: z.url(),
});

const parsed = EnvSchema.safeParse(Constants.expoConfig?.extra);
if (!parsed.success) {
  throw new Error(
    `Invalid app env, check apps/mobile/.env.*: ${parsed.error.message}`,
  );
}

export const env = {
  appEnv: parsed.data.appEnv,
  apiUrl: parsed.data.API_URL,
};
