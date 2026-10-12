import { QueryClient } from "@tanstack/react-query";

import { ApiError } from "./errors";

const STALE_TIME_MS = 30_000;
const MAX_RETRIES = 2;

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME_MS,
        retry: (count, error) =>
          !(error instanceof ApiError && error.kind === "unauthorized") &&
          count < MAX_RETRIES,
      },
    },
  });
