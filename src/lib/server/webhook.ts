const WEBHOOK_TIMEOUT_MS = 12_000;

export class WebhookConfigurationError extends Error {
  constructor() {
    super("N8N_LEAD_WEBHOOK is missing or invalid.");
    this.name = "WebhookConfigurationError";
  }
}

export class WebhookDeliveryError extends Error {
  constructor(readonly status: number) {
    super(`Lead webhook failed with status ${status}.`);
    this.name = "WebhookDeliveryError";
  }
}

export async function sendToLeadWebhook(payload: unknown) {
  const webhookUrl = getWebhookUrl();
  if (!webhookUrl) throw new WebhookConfigurationError();

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
  });

  if (!response.ok) throw new WebhookDeliveryError(response.status);
}

function getWebhookUrl(): string | null {
  const value = process.env.N8N_LEAD_WEBHOOK?.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    const isSecure = url.protocol === "https:";
    const isLocalDevelopment =
      process.env.NODE_ENV !== "production" &&
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(url.hostname);

    return isSecure || isLocalDevelopment ? url.toString() : null;
  } catch {
    return null;
  }
}
