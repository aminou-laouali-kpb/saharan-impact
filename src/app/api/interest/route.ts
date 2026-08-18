import { isCaptureKind } from "@/lib/capture";
import { InMemoryRateLimiter, getClientId } from "@/lib/server/rate-limit";
import {
  jsonResponse,
  readJsonObject,
  RequestValidationError,
} from "@/lib/server/responses";
import {
  sendToLeadWebhook,
  WebhookConfigurationError,
  WebhookDeliveryError,
} from "@/lib/server/webhook";

const rateLimiter = new InMemoryRateLimiter({ limit: 6, windowMs: 10 * 60_000 });

export async function POST(request: Request) {
  try {
    if (!rateLimiter.consume(getClientId(request))) {
      return jsonResponse(
        { error: "Trop de tentatives. Veuillez patienter avant de réessayer." },
        429,
      );
    }

    const body = await readJsonObject(request);
    const capture = validateCapture(body);

    await sendToLeadWebhook({
      source: "Saharan Impact Website",
      type: "interest_capture",
      timestamp: new Date().toISOString(),
      capture,
    });

    return jsonResponse({ success: true });
  } catch (error: unknown) {
    if (error instanceof RequestValidationError) {
      return jsonResponse({ error: error.message }, error.status);
    }
    if (error instanceof WebhookConfigurationError) {
      console.error("Interest capture configuration error:", error.message);
      return jsonResponse(
        { error: "Le formulaire n'est pas encore configuré. Écrivez-nous directement par email." },
        503,
      );
    }
    if (error instanceof WebhookDeliveryError) {
      console.error(error.message);
      return jsonResponse({ error: "La demande n'a pas pu être transmise." }, 502);
    }
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return jsonResponse({ error: "Le service a mis trop de temps à répondre." }, 504);
    }

    console.error("Interest capture API error:", error);
    return jsonResponse({ error: "Une erreur interne s'est produite." }, 500);
  }
}

function validateCapture(input: Record<string, unknown>) {
  const { kind, name, organization, contactMethod, contact, interest, message } = input;

  if (!isCaptureKind(kind)) {
    throw new RequestValidationError("Type de demande invalide.");
  }
  if (typeof contact !== "string" || contact.trim().length < 5 || contact.length > 160) {
    throw new RequestValidationError("Email ou contact WhatsApp invalide.");
  }
  if (contactMethod !== undefined && contactMethod !== "email" && contactMethod !== "whatsapp") {
    throw new RequestValidationError("Canal de réponse invalide.");
  }
  if (contactMethod === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim())) {
    throw new RequestValidationError("Adresse email invalide.");
  }
  if (contactMethod === "whatsapp" && contact.replace(/\D/g, "").length < 8) {
    throw new RequestValidationError("Numéro WhatsApp invalide.");
  }
  if (typeof interest !== "string" || interest.trim().length < 2 || interest.length > 180) {
    throw new RequestValidationError("Sujet invalide.");
  }

  if (kind !== "newsletter") {
    if (typeof name !== "string" || name.trim().length < 2 || name.length > 120) {
      throw new RequestValidationError("Nom invalide.");
    }
  }

  if (organization !== undefined && (typeof organization !== "string" || organization.length > 180)) {
    throw new RequestValidationError("Organisation invalide.");
  }
  if (message !== undefined && (typeof message !== "string" || message.length > 1_000)) {
    throw new RequestValidationError("Le message est trop long.");
  }

  const capture = {
    kind,
    contact: contact.trim(),
    interest: interest.trim(),
  } as Record<string, string>;

  if (typeof name === "string" && name.trim()) capture.name = name.trim();
  if (typeof organization === "string" && organization.trim()) capture.organization = organization.trim();
  if (typeof contactMethod === "string") capture.contactMethod = contactMethod;
  if (typeof message === "string" && message.trim()) capture.message = message.trim();

  return capture;
}
