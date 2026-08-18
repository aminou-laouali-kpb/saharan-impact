# Saharan Impact

Plateforme Next.js de Saharan Impact organisée autour de trois piliers — Institutions, PME et Saharan Academy — avec Diagnostic Éclair, blog MDX et captures d'intérêt vers n8n.

## Démarrage local

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Renseignez `GEMINI_API_KEY` et `N8N_LEAD_WEBHOOK` dans `.env.local`. Le projet échoue explicitement avec un message utilisateur si l'un de ces services n'est pas configuré : aucun diagnostic ni prospect fictif n'est enregistré silencieusement.

## Vérifications

```bash
npm run lint
npm run typecheck
npm run build
```

## Variables d'environnement

- `GEMINI_API_KEY` : clé serveur utilisée par `/api/diagnostic`.
- `GEMINI_MODEL` : identifiant du modèle Gemini, avec `gemini-3.5-flash` comme valeur par défaut actuelle du projet.
- `N8N_LEAD_WEBHOOK` : URL HTTPS du webhook recevant les prospects. Une URL HTTP locale est acceptée uniquement hors production.
- `NEXT_PUBLIC_SITE_URL` : origine canonique utilisée par les métadonnées, le sitemap et les données structurées.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` : numéro public international utilisé par le CTA PME, uniquement en chiffres. Sans valeur, le CTA redirige vers `/contact`.

Les secrets restent côté serveur. Ne préfixez jamais `GEMINI_API_KEY` ou `N8N_LEAD_WEBHOOK` avec `NEXT_PUBLIC_`.

## Contenu et décisions commerciales

- Les articles MDX sont stockés dans `src/content/blog` et déclarés dans `src/lib/blog.ts`.
- Les paliers PME sont centralisés dans `src/app/pme/page.tsx`. Les montants FCFA restent volontairement à confirmer afin de ne pas publier un prix inventé.
- Les formulaires PME, Academy, contact et newsletter utilisent `/api/interest` et le même webhook n8n que le Diagnostic Éclair.
