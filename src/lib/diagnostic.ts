export const DIAGNOSTIC_MAX_CHARS = 400;

export const SECTORS = [
  { value: "administration", label: "Administration publique" },
  { value: "santé", label: "Santé & dispensaires" },
  { value: "éducation", label: "Éducation & formation" },
  { value: "énergie", label: "Énergie & eau" },
  { value: "pme-commerce", label: "PME / commerce" },
  { value: "autre", label: "Autre secteur" },
] as const;

export type Sector = (typeof SECTORS)[number]["value"];

export interface DiagnosticResult {
  besoin_reformule: string;
  opportunite: string;
  gain_estime: string;
  approche_recommandee: [string, string, string];
  niveau_complexite: "faible" | "moyen" | "élevé";
  prochaine_action: string;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isSector(value: unknown): value is Sector {
  return SECTORS.some((sector) => sector.value === value);
}

export function isDiagnosticResult(value: unknown): value is DiagnosticResult {
  if (!isRecord(value)) return false;

  const steps = value.approche_recommandee;
  const complexity = value.niveau_complexite;
  const strings = [
    value.besoin_reformule,
    value.opportunite,
    value.gain_estime,
    value.prochaine_action,
  ];

  return (
    strings.every(isReasonableString) &&
    Array.isArray(steps) &&
    steps.length === 3 &&
    steps.every(isReasonableString) &&
    (complexity === "faible" || complexity === "moyen" || complexity === "élevé")
  );
}

function isReasonableString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= 2_000;
}
