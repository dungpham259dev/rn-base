import { z } from "zod/v4";

const EnvSchema = z.object({
  NEXT_PUBLIC_APP_ENV: z.enum(["development", "staging", "production"]),
  NEXT_PUBLIC_API_URL: z.url(),
});

// Next only inlines NEXT_PUBLIC_* when accessed by full name.
const parsed = EnvSchema.safeParse({
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
if (!parsed.success) {
  throw new Error(
    `Invalid web env, check apps/web/.env.*: ${parsed.error.message}`,
  );
}

export const env = {
  appEnv: parsed.data.NEXT_PUBLIC_APP_ENV,
  apiUrl: parsed.data.NEXT_PUBLIC_API_URL,
};
