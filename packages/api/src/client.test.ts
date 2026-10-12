import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod/v4";

import { createApiClient } from "./client";
import { ApiError } from "./errors";

const Schema = z.object({ ok: z.boolean() });

const mockFetch = (status: number, body: unknown) =>
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  );

describe("createApiClient", () => {
  afterEach(() => vi.restoreAllMocks());

  it("attaches the bearer token and parses the response", async () => {
    const fetchSpy = mockFetch(200, { ok: true });
    const client = createApiClient({
      baseUrl: "https://api.test",
      getToken: () => "abc",
    });

    await expect(client.get("ping", Schema)).resolves.toEqual({ ok: true });
    const request = fetchSpy.mock.calls[0]?.[0] as Request;
    expect(request.headers.get("Authorization")).toBe("Bearer abc");
  });

  it("maps 401 to an unauthorized ApiError and notifies", async () => {
    mockFetch(401, { message: "Token expired" });
    const onUnauthorized = vi.fn();
    const client = createApiClient({
      baseUrl: "https://api.test",
      getToken: () => null,
      onUnauthorized,
    });

    const error = await client
      .post("auth/login", Schema)
      .catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({
      kind: "unauthorized",
      status: 401,
      message: "Token expired",
    });
    expect(onUnauthorized).toHaveBeenCalledOnce();
  });

  it("rejects responses that do not match the schema", async () => {
    mockFetch(200, { ok: "yes" });
    const client = createApiClient({
      baseUrl: "https://api.test",
      getToken: () => null,
    });

    await expect(client.get("ping", Schema)).rejects.toMatchObject({
      kind: "validation",
    });
  });
});
