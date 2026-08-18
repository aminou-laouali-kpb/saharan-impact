import { isDiagnosticResult, isRecord, isSector } from "@/lib/diagnostic";
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

const rateLimiter = new InMemoryRateLimiter({ limit: 5, windowMs: 10 * 60_000 });

export async function POST(request: Request) {
  try {
    if (!rateLimiter.consume(getClientId(request))) {
      return jsonResponse(
        { error: "Trop de tentatives. Veuillez patienter avant de réessayer." },
        429,
      );
    }

    const { name, institution, contact, diagnostic, contexte } = await readJsonObject(request);
    const lead = validateLead({ name, institution, contact, diagnostic, contexte });

    await sendToLeadWebhook({
      source: "Saharan Impact Website",
      type: "diagnostic_lead",
      timestamp: new Date().toISOString(),
      lead: {
        name: lead.name,
        institution: lead.institution,
        contact: lead.contact,
      },
      diagnostic: lead.diagnostic,
      contexte: lead.contexte,
    });

    return jsonResponse({ success: true });
  } catch (error: unknown) {
    if (error instanceof RequestValidationError) {
      return jsonResponse({ error: error.message }, error.status);
    }
    if (error instanceof WebhookConfigurationError) {
      console.error("Lead configuration error:", error.message);
      return jsonResponse(
        { error: "Le formulaire de contact n'est pas configuré. Écrivez-nous directement par email." },
        503,
      );
    }
    if (error instanceof WebhookDeliveryError) {
      console.error(error.message);
      return jsonResponse({ error: "Le contact n'a pas pu être transmis." }, 502);
    }
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return jsonResponse({ error: "Le service de contact a mis trop de temps à répondre." }, 504);
    }

    console.error("Lead API error:", error);
    return jsonResponse(
      { error: "Une erreur interne s'est produite lors de l'enregistrement." },
      500,
    );
  }
}

function validateLead(input: Record<string, unknown>) {
  const { name, institution, contact, diagnostic, contexte } = input;

  if (typeof name !== "string" || name.trim().length < 2 || name.length > 120) {
    throw new RequestValidationError("Nom invalide.");
  }
  if (typeof institution !== "string" || institution.trim().length < 2 || institution.length > 180) {
    throw new RequestValidationError("Institution invalide.");
  }
  if (typeof contact !== "string" || contact.trim().length < 5 || contact.length > 160) {
    throw new RequestValidationError("Contact invalide (email ou WhatsApp).");
  }
  if (!isDiagnosticResult(diagnostic)) {
    throw new RequestValidationError("Diagnostic invalide.");
  }
  if (
    !isRecord(contexte) ||
    typeof contexte.besoin !== "string" ||
    contexte.besoin.trim().length < 10 ||
    contexte.besoin.length > 400 ||
    !isSector(contexte.secteur)
  ) {
    throw new RequestValidationError("Contexte du diagnostic invalide.");
  }

  return {
    name: name.trim(),
    institution: institution.trim(),
    contact: contact.trim(),
    diagnostic,
    contexte: { besoin: contexte.besoin.trim(), secteur: contexte.secteur },
  };
}
