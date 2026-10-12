import type { ApiClient } from "../client";
import type { LoginInput } from "../schemas/auth";
import {
  LoginInputSchema,
  LoginResponseSchema,
  UserSchema,
} from "../schemas/auth";

const TOKEN_TTL_MINUTES = 60;

export const authEndpoints = (client: ApiClient) => ({
  login: (input: LoginInput) =>
    client.post("auth/login", LoginResponseSchema, {
      ...LoginInputSchema.parse(input),
      expiresInMins: TOKEN_TTL_MINUTES,
    }),
  me: () => client.get("auth/me", UserSchema),
});
