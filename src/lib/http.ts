import { isRecord } from "@/lib/diagnostic";

const REQUEST_TIMEOUT_MS = 20_000;

export async function postJson<T>(
  url: string,
  body: unknown,
  validate: (value: unknown) => value is T,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const data: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      const message = isRecord(data) && typeof data.error === "string"
        ? data.error
        : "Le service est momentanément indisponible.";
      throw new Error(message);
    }

    if (!validate(data)) {
      throw new Error("Le serveur a renvoyé une réponse inattendue.");
    }

    return data;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("La requête a expiré. Veuillez réessayer.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
