export const SITE_NAME = "Saharan Impact";
export const SITE_DESCRIPTION =
  "Saharan Impact transforme les investissements numériques en usages concrets pour les institutions, les PME et les talents d'Afrique de l'Ouest.";

export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://saharanimpact.com",
);

export function getWhatsAppHref(message: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  if (!number) return "/contact?service=pme";

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
