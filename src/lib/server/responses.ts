import { NextResponse } from "next/server";

export function jsonResponse(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function readJsonObject(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    throw new RequestValidationError("Le corps de la requête doit être au format JSON.", 415);
  }

  const body: unknown = await request.json().catch(() => {
    throw new RequestValidationError("Le corps JSON est invalide.");
  });

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new RequestValidationError("Le corps JSON doit être un objet.");
  }

  return body as Record<string, unknown>;
}

export class RequestValidationError extends Error {
  constructor(
    message: string,
    readonly status = 400,
  ) {
    super(message);
    this.name = "RequestValidationError";
  }
}
