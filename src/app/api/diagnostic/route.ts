import {
  DIAGNOSTIC_MAX_CHARS,
  isDiagnosticResult,
  isSector,
} from "@/lib/diagnostic";
import { InMemoryRateLimiter, getClientId } from "@/lib/server/rate-limit";
import {
  jsonResponse,
  readJsonObject,
  RequestValidationError,
} from "@/lib/server/responses";

const rateLimiter = new InMemoryRateLimiter({ limit: 5, windowMs: 60_000 });
const GEMINI_TIMEOUT_MS = 20_000;

const SYSTEM_PROMPT = `Tu es consultant senior en transformation numérique et IA pour des institutions publiques et des organisations du Sahel (Niger et région).
Tu produis un diagnostic court, concret et crédible à partir d'un besoin décrit par un décideur institutionnel.

RÈGLES ABSOLUES :
1. Réponds UNIQUEMENT par un objet JSON valide conforme au schéma fourni. Aucun texte explicatif ou markdown avant ou après.
2. N'invente JAMAIS de statistique ou de pourcentage précis. Pour le gain estimé, reste qualitatif ou donne une fourchette prudente présentée comme une estimation.
3. Si le besoin est trop vague, formule l'hypothèse la plus raisonnable et signale-la dans "besoin_reformule".
4. Le ton doit être institutionnel, français clair et soutenu, sans jargon inutile, sans survente.
5. "approche_recommandee" doit contenir exactement 3 étapes actionnables.
6. Ancre les recommandations dans des leviers réalistes pour le contexte sahélien (contraintes de connectivité locales, capacités informatiques internes, souveraineté des données).`;

const RESPONSE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    besoin_reformule: { type: "string" },
    opportunite: { type: "string" },
    gain_estime: { type: "string" },
    approche_recommandee: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 3,
    },
    niveau_complexite: {
      type: "string",
      enum: ["faible", "moyen", "élevé"],
    },
    prochaine_action: { type: "string" },
  },
  required: [
    "besoin_reformule",
    "opportunite",
    "gain_estime",
    "approche_recommandee",
    "niveau_complexite",
    "prochaine_action",
  ],
};

export async function POST(request: Request) {
  try {
    if (!rateLimiter.consume(getClientId(request))) {
      return jsonResponse(
        { error: "Trop de requêtes. Veuillez patienter une minute avant de réessayer." },
        429,
      );
    }

    const { besoin, secteur } = await readJsonObject(request);

    if (typeof besoin !== "string" || besoin.trim().length < 10) {
      throw new RequestValidationError(
        "Veuillez décrire votre besoin plus précisément (minimum 10 caractères).",
      );
    }
    if (besoin.length > DIAGNOSTIC_MAX_CHARS) {
      throw new RequestValidationError(
        `La description dépasse la limite de ${DIAGNOSTIC_MAX_CHARS} caractères.`,
      );
    }
    if (!isSector(secteur)) {
      throw new RequestValidationError("Le secteur sélectionné est invalide.");
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Diagnostic configuration error: GEMINI_API_KEY is missing.");
      return jsonResponse(
        { error: "Le service de diagnostic n'est pas configuré. Veuillez nous contacter directement." },
        503,
      );
    }

    const model = process.env.GEMINI_MODEL?.trim() || "gemini-3.5-flash";
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Secteur: ${secteur}\nBesoin utilisateur: ${besoin.trim()}` }] }],
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: RESPONSE_SCHEMA,
          temperature: 0.2,
        },
      }),
      signal: AbortSignal.timeout(GEMINI_TIMEOUT_MS),
    });

    if (!geminiResponse.ok) {
      console.error("Gemini request failed with status:", geminiResponse.status);
      return jsonResponse(
        { error: "Le service d'analyse IA est momentanément indisponible." },
        502,
      );
    }

    const geminiData: unknown = await geminiResponse.json();
    const rawText = extractGeminiText(geminiData);
    if (!rawText) {
      return jsonResponse(
        { error: "L'analyse n'a pas pu être formulée. Veuillez reformuler votre besoin." },
        502,
      );
    }

    let parsedDiagnostic: unknown;
    try {
      parsedDiagnostic = JSON.parse(rawText);
    } catch {
      console.error("Gemini returned malformed JSON.");
      return jsonResponse(
        { error: "L'analyse a renvoyé un format inattendu. Veuillez réessayer." },
        502,
      );
    }

    if (!isDiagnosticResult(parsedDiagnostic)) {
      console.error("Gemini returned a diagnostic that failed runtime validation.");
      return jsonResponse(
        { error: "L'analyse a renvoyé un format inattendu. Veuillez réessayer." },
        502,
      );
    }

    return jsonResponse(parsedDiagnostic);
  } catch (error: unknown) {
    if (error instanceof RequestValidationError) {
      return jsonResponse({ error: error.message }, error.status);
    }
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return jsonResponse({ error: "Le service d'analyse a mis trop de temps à répondre." }, 504);
    }

    console.error("Diagnostic API error:", error);
    return jsonResponse({ error: "Une erreur interne s'est produite lors de l'analyse." }, 500);
  }
}

function extractGeminiText(value: unknown): string | null {
  if (typeof value !== "object" || value === null) return null;
  const candidates = Reflect.get(value, "candidates");
  if (!Array.isArray(candidates) || candidates.length === 0) return null;
  const content = candidates[0]?.content;
  const parts = content?.parts;
  const text = Array.isArray(parts) ? parts[0]?.text : null;
  return typeof text === "string" ? text : null;
}
