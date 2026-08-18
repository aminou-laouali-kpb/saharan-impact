interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

interface ClientWindow {
  timestamps: number[];
  lastSeen: number;
}

const MAX_TRACKED_CLIENTS = 10_000;

export class InMemoryRateLimiter {
  private readonly clients = new Map<string, ClientWindow>();
  private requestsSinceCleanup = 0;

  constructor(private readonly options: RateLimitOptions) {}

  consume(clientId: string): boolean {
    const now = Date.now();
    this.requestsSinceCleanup += 1;

    if (this.requestsSinceCleanup >= 100 || this.clients.size > MAX_TRACKED_CLIENTS) {
      this.cleanup(now);
    }

    const existing = this.clients.get(clientId);
    const timestamps = existing?.timestamps.filter(
      (timestamp) => now - timestamp < this.options.windowMs,
    ) ?? [];

    if (timestamps.length >= this.options.limit) return false;

    timestamps.push(now);
    this.clients.set(clientId, { timestamps, lastSeen: now });
    return true;
  }

  private cleanup(now: number) {
    for (const [clientId, window] of this.clients) {
      if (now - window.lastSeen >= this.options.windowMs) {
        this.clients.delete(clientId);
      }
    }

    this.requestsSinceCleanup = 0;
  }
}

export function getClientId(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    forwardedFor ||
    "unknown-client"
  );
}
