import { isRecord } from "@/lib/diagnostic";

export const CAPTURE_KINDS = ["pme", "academy", "contact", "newsletter"] as const;
export type CaptureKind = (typeof CAPTURE_KINDS)[number];

export function isCaptureKind(value: unknown): value is CaptureKind {
  return CAPTURE_KINDS.some((kind) => kind === value);
}

export function isSuccessResponse(value: unknown): value is { success: true } {
  return isRecord(value) && value.success === true;
}
