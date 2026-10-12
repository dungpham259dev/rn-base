import type { KyInstance } from "ky";
import type { z } from "zod/v4";
import ky, { HTTPError, TimeoutError } from "ky";

import { ApiError, kindFromStatus } from "./errors";

export interface ApiClientOptions {
  baseUrl: string;
  getToken: () => string | null;
  onUnauthorized?: () => void;
  timeoutMs?: number;
}

export interface ApiClient {
  get: <T>(
    path: string,
    schema: z.ZodType<T>,
    searchParams?: SearchParams,
  ) => Promise<T>;
  post: <T>(path: string, schema: z.ZodType<T>, body?: unknown) => Promise<T>;
}

type SearchParams = Record<string, string | number | boolean>;

const DEFAULT_TIMEOUT_MS = 15_000;

const readMessage = async (error: HTTPError): Promise<string> => {
  try {
    const data: unknown = await error.response.clone().json();
    if (data && typeof data === "object" && "message" in data) {
      return String(data.message);
    }
  } catch {
    // Body is not JSON; fall back to the status text.
  }
  return error.response.statusText || error.message;
};

const toApiError = async (
  error: unknown,
  onUnauthorized?: () => void,
): Promise<ApiError> => {
  if (error instanceof ApiError) return error;
  if (error instanceof HTTPError) {
    const status = error.response.status;
    const kind = kindFromStatus(status);
    if (kind === "unauthorized") onUnauthorized?.();
    return new ApiError(kind, await readMessage(error), status);
  }
  if (error instanceof TimeoutError || error instanceof TypeError) {
    return new ApiError("network", error.message);
  }
  return new ApiError("unknown", String(error));
};

const parse = <T>(schema: z.ZodType<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ApiError(
      "validation",
      `Unexpected response: ${result.error.message}`,
    );
  }
  return result.data;
};

export const createApiClient = (options: ApiClientOptions): ApiClient => {
  const http: KyInstance = ky.create({
    prefixUrl: options.baseUrl,
    timeout: options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    retry: { limit: 1, methods: ["get"] },
    hooks: {
      beforeRequest: [
        (request) => {
          const token = options.getToken();
          if (token) request.headers.set("Authorization", `Bearer ${token}`);
        },
      ],
    },
  });

  const run = async <T>(schema: z.ZodType<T>, call: () => Promise<unknown>) => {
    try {
      return parse(schema, await call());
    } catch (error) {
      throw await toApiError(error, options.onUnauthorized);
    }
  };

  return {
    get: (path, schema, searchParams) =>
      run(schema, () => http.get(path, { searchParams }).json()),
    post: (path, schema, body) =>
      run(schema, () => http.post(path, { json: body }).json()),
  };
};
