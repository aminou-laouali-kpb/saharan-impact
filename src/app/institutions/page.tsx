import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Database, Network, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";

export const metadata: Metadata = {
  title: "Solutions numériques pour institutions et programmes",
  description: "IA appliquée, automatisation et plateformes de terrain pour les gouvernements, ONG et bailleurs au Sahel.",
  alternates: { canonical: "/institutions" },
  openGraph: { url: "/institutions" },
};

const capabilities = [
  { icon: Network, title: "Automatiser les flux", description: "Relier les outils existants, réduire les ressaisies et faire remonter les alertes au bon niveau." },
  { icon: Database, title: "Construire des plateformes de terrain", description: "Concevoir des interfaces légères, des registres et des tableaux de bord adaptés à la connectivité locale." },
  { icon: ShieldCheck, title: "Déployer une IA maîtrisée", description: "Appliquer l'IA à des tâches précises avec gouvernance des accès, validation humaine et transfert de compétence." },
] as const;

const references = [
  ["Flux de rapports bailleurs", "Automatisation de la collecte, du contrôle et de la consolidation des rapports et justificatifs destinés aux bailleurs."],
  ["Application mobile KPB Education", "Application mobile d'orientation et d'accompagnement éducatif pour aider les apprenants à structurer leur parcours."],
  ["Gestionnaire de comptabilité pour les ONG", "Outil de suivi des recettes, dépenses, budgets et justificatifs pour renforcer la gestion financière des ONG."],
  ["Application web de monitoring PEEJ / GWANI", "Application en développement pour centraliser les données, suivre les activités et faciliter le pilotage opérationnel."],
] as const;

export default function InstitutionsPage() {
  return (
    <div className="min-h-screen bg-nuit-sahara">
      <Header />
      <main id="contenu-principal">
        <PageHero
          eyebrow="Institutions · Programmes · ONG"
          title="Convertir l'infrastructure existante en capacité opérationnelle."
          description="Nous aidons les organisations publiques et les programmes de développement à connecter leurs outils, automatiser leurs flux et déployer des plateformes réellement utilisées sur le terrain."
          aside={
            <aside className="w-full max-w-md rounded-2xl border border-or-de-l-aube/25 bg-terre/75 p-6 shadow-2xl shadow-black/20">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-or-de-l-aube">Preuves de terrain</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-pierre-froide">Des systèmes confrontés aux réalités opérationnelles.</h2>
              <ul className="mt-6 space-y-4">
                {references.map(([title]) => (
                  <li key={title} className="flex items-start gap-3 text-sm leading-relaxed text-pierre-froide/90">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-or-de-l-aube" aria-hidden="true" />
                    {title}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-sable-attenue">Les contextes, architectures et enseignements de chaque réalisation sont détaillés dans la section suivante.</p>
            </aside>
          }
        >
          <Link href="/#diagnostic" className="flex min-h-11 items-center justify-center rounded-lg bg-or-de-l-aube px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-nuit-sahara">Lancer le Diagnostic Éclair</Link>
          <Link href="/contact?service=institutions" className="flex min-h-11 items-center justify-center rounded-lg border border-white/15 px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-pierre-froide">Cadrer une mission</Link>
        </PageHero>

        <SectionWrapper theme="dark" className="bg-terre">
          <div className="grid gap-6 md:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-xl border border-white/5 bg-white/3 p-7">
                <Icon className="text-or-de-l-aube" size={22} aria-hidden="true" />
                <h2 className="mt-5 text-lg font-bold text-pierre-froide">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-sable-attenue">{description}</p>
              </article>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper theme="light">
          <div className="space-y-12">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-bleu-horizon">Réalisations montrables</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-terre md:text-4xl">S&apos;appuyer sur des systèmes déjà confrontés au terrain.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {references.map(([title, description]) => (
                <article key={title} className="rounded-xl border border-black/5 bg-white/40 p-7">
                  <h3 className="text-lg font-bold text-terre">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-terre/70">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <section className="bg-nuit-sahara py-20">
          <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-or-de-l-aube">Méthode vérifiable</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-pierre-froide">Cadrage court, prototype, test d&apos;usage, transfert.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-sable-attenue">Nous avançons par modules indépendants afin que chaque phase produise un résultat mesurable avant le déploiement suivant.</p>
            <Link href="/contact?service=institutions" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-or-de-l-aube px-6 py-3 text-xs font-bold uppercase tracking-wider text-nuit-sahara">Présenter votre programme <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
