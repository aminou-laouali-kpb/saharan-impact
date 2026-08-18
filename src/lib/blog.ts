import type { ComponentType } from "react";

export type BlogPillar = "PME" | "Institutions" | "Academy";

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  readTime: string;
  pillar: BlogPillar;
}

interface BlogPostEntry extends BlogPostMetadata {
  load: () => Promise<{ default: ComponentType }>;
}

const posts: BlogPostEntry[] = [
  {
    slug: "creer-site-web-pme-niger-cout-2026",
    title: "Créer un site web pour sa PME au Niger : combien ça coûte vraiment en 2026 ?",
    description: "Les postes de coût à anticiper, les pièges à éviter et la méthode pour choisir un site adapté à une PME nigérienne.",
    publishedAt: "2026-07-13",
    author: "Aminou — Saharan Impact",
    readTime: "7 min",
    pillar: "PME",
    load: () => import("@/content/blog/creer-site-web-pme-niger-cout-2026.mdx"),
  },
  {
    slug: "whatsapp-business-commercants-niamey",
    title: "WhatsApp Business pour les commerçants à Niamey : le guide pratique",
    description: "Configurer un profil crédible, organiser ses demandes et transformer WhatsApp en canal commercial sans complexité inutile.",
    publishedAt: "2026-07-10",
    author: "Équipe Saharan Impact",
    readTime: "6 min",
    pillar: "PME",
    load: () => import("@/content/blog/whatsapp-business-commercants-niamey.mdx"),
  },
  {
    slug: "automatiser-rapports-ong-n8n",
    title: "Automatiser les rapports de situation d'une ONG avec n8n : cas pratique",
    description: "Une architecture progressive pour réduire les ressaisies et accélérer la consolidation des rapports terrain.",
    publishedAt: "2026-07-07",
    author: "Équipe Saharan Impact",
    readTime: "8 min",
    pillar: "Institutions",
    load: () => import("@/content/blog/automatiser-rapports-ong-n8n.mdx"),
  },
  {
    slug: "apprendre-ia-afrique-ouest",
    title: "Apprendre l'IA en Afrique de l'Ouest : construire un parcours utile au travail",
    description: "Une feuille de route réaliste pour passer de la curiosité à une compétence IA directement mobilisable dans son métier.",
    publishedAt: "2026-07-03",
    author: "Aminou — Saharan Impact",
    readTime: "7 min",
    pillar: "Academy",
    load: () => import("@/content/blog/apprendre-ia-afrique-ouest.mdx"),
  },
];

export function getAllPosts(): BlogPostMetadata[] {
  return posts
    .map(({ slug, title, description, publishedAt, author, readTime, pillar }) => ({
      slug,
      title,
      description,
      publishedAt,
      author,
      readTime,
      pillar,
    }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPost(slug: string): BlogPostEntry | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPillarHref(pillar: BlogPillar) {
  if (pillar === "PME") return "/pme";
  if (pillar === "Academy") return "/academy";
  return "/institutions";
}
