export type ApiErrorKind =
  "network" | "unauthorized" | "validation" | "server" | "unknown";

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;

  constructor(kind: ApiErrorKind, message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.kind = kind;
    this.status = status;
  }
}

export const kindFromStatus = (status: number): ApiErrorKind => {
  if (status === 401 || status === 403) return "unauthorized";
  if (status >= 400 && status < 500) return "validation";
  if (status >= 500) return "server";
  return "unknown";
};
