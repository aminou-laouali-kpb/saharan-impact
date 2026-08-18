import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Gauge, Workflow } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import DiagnosticEclair from "@/components/DiagnosticEclair";
import AudienceDoors from "@/components/AudienceDoors";
import ArticleCard from "@/components/ArticleCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const proofs = [
  {
    label: "Automatisation",
    title: "Flux de rapports bailleurs",
    description: "Collecte, contrôle et consolidation des rapports et justificatifs destinés aux bailleurs.",
  },
  {
    label: "Éducation mobile",
    title: "Application mobile KPB Education",
    description: "Orientation et accompagnement éducatif pour aider les apprenants à structurer leur parcours.",
  },
  {
    label: "Gestion financière",
    title: "Gestionnaire de comptabilité pour les ONG",
    description: "Suivi des recettes, dépenses, budgets et justificatifs pour renforcer la gestion financière.",
  },
  {
    label: "En développement",
    title: "Application web de monitoring PEEJ / GWANI",
    description: "Centralisation des données et suivi des activités pour faciliter le pilotage opérationnel.",
  },
] as const;

const method = [
  ["01", "Cadrer", "Identifier un blocage précis, ses exceptions et une mesure de réussite."],
  ["02", "Prototyper", "Livrer un flux utilisable rapidement et le tester avec les équipes concernées."],
  ["03", "Transférer", "Sécuriser, documenter et rendre l'organisation autonome sur la solution."],
] as const;

const fieldProofs = [
  "Flux de rapports bailleurs",
  "Application mobile KPB Education",
  "Gestionnaire de comptabilité pour les ONG",
  "Monitoring PEEJ / GWANI — en développement",
] as const;

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-nuit-sahara">
      <Header />
      <main id="contenu-principal">
        <section className="relative overflow-hidden bg-nuit-sahara">
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pb-12 pt-8 text-center md:px-12 md:pb-24 md:pt-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-or-de-l-aube/25 bg-or-de-l-aube/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-or-de-l-aube">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-or-de-l-aube animate-pulse" />
              Sahel · Implémentation IA &amp; solutions numériques
            </span>

            <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-pierre-froide md:mt-8 md:text-6xl">
              « L&apos;équipement est arrivé.<br />
              <span className="text-or-de-l-aube">L&apos;usage, non. »</span>
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-sable-attenue md:mt-6 md:text-lg">
              Saharan Impact transforme les investissements numériques en usages concrets — par l&apos;IA appliquée, l&apos;automatisation et des plateformes conçues pour le terrain. Institutions, PME et talents accèdent ensuite à un espace adapté à leur objectif.
            </p>

            <div className="mt-6 grid w-full grid-cols-2 justify-center gap-2 sm:flex sm:w-auto sm:gap-3 md:mt-8">
              <Link href="#diagnostic" className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-or-de-l-aube px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-nuit-sahara transition hover:bg-pierre-froide sm:gap-2 sm:px-6 sm:text-xs">
                Décrire mon besoin <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link href="#audiences" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/15 px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-pierre-froide transition hover:border-or-de-l-aube/60 hover:text-or-de-l-aube sm:px-6 sm:text-xs">
                Choisir mon espace
              </Link>
            </div>

            <div className="mt-4 w-full md:mt-10">
              <p className="mb-2 text-left font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-sable-attenue md:mb-3 md:text-center">
                Trois portes, une même exigence de résultats
              </p>
              <AudienceDoors />
            </div>

            <div className="mt-6 flex max-w-4xl flex-wrap justify-center gap-x-5 gap-y-2 text-left text-[11px] text-sable-attenue md:text-xs">
              {fieldProofs.map((proof) => (
                <span key={proof} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="shrink-0 text-or-de-l-aube" aria-hidden="true" />
                  {proof}
                </span>
              ))}
            </div>
          </div>

          <div className="horizon-gradient-line" aria-hidden="true" />
          <div className="horizon-glow pointer-events-none absolute inset-x-0 bottom-0 h-72" aria-hidden="true" />
        </section>

        <section id="diagnostic" className="scroll-mt-20 bg-nuit-sahara py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-or-de-l-aube">Commencer par un processus réel</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-pierre-froide md:text-4xl">Décrire un blocage. Obtenir une première piste.</h2>
              <p className="mt-4 text-sm leading-relaxed text-sable-attenue">Le Diagnostic Éclair reformule votre besoin et propose trois étapes adaptées à votre contexte.</p>
            </div>
            <DiagnosticEclair />
          </div>
        </section>

        <SectionWrapper id="preuves" theme="light">
          <div className="space-y-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-bleu-horizon">Preuves de capacité</p>
                <h2 className="mt-4 font-display text-3xl font-extrabold text-terre md:text-4xl">Des solutions déjà mises au travail au Sahel.</h2>
              </div>
              <Link href="/institutions" className="inline-flex items-center gap-2 text-xs font-semibold text-bleu-horizon">Voir l&apos;offre Institutions <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {proofs.map((proof) => (
                <article key={proof.title} className="rounded-xl border border-black/5 bg-white/40 p-6">
                  <Award size={18} className="text-bleu-horizon" aria-hidden="true" />
                  <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-wider text-bleu-horizon">{proof.label}</p>
                  <h3 className="mt-2 text-lg font-bold text-terre">{proof.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-terre/70">{proof.description}</p>
                </article>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="methode" theme="dark" className="bg-terre">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-or-de-l-aube">Notre méthode</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-pierre-froide md:text-4xl">Livrer en phases courtes et vérifiables.</h2>
              <p className="mt-5 text-sm leading-relaxed text-sable-attenue">Chaque étape produit un résultat observable avant d&apos;ajouter de la complexité.</p>
            </div>
            <div className="grid gap-4">
              {method.map(([number, title, description]) => (
                <div key={number} className="flex gap-4 rounded-xl border border-white/5 bg-white/3 p-5">
                  <span className="font-mono text-xs font-bold text-or-de-l-aube">{number}</span>
                  <div>
                    <h3 className="font-semibold text-pierre-froide">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-sable-attenue">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="ressources" theme="light">
          <div className="space-y-12">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-bleu-horizon">Guides récents</p>
                <h2 className="mt-4 font-display text-3xl font-extrabold text-terre md:text-4xl">Partager ce que le terrain nous apprend.</h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-bleu-horizon">Tous les articles <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => <ArticleCard key={post.slug} post={post} />)}
            </div>
          </div>
        </SectionWrapper>

        <section className="relative overflow-hidden border-t border-white/5 bg-nuit-sahara py-24">
          <div className="relative z-10 mx-auto max-w-4xl space-y-7 px-6 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-or-de-l-aube/10 text-or-de-l-aube"><Gauge aria-hidden="true" /></div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-pierre-froide md:text-5xl">Choisir la porte adaptée à votre objectif.</h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-sable-attenue">Institution, PME ou parcours de compétences : chaque espace conserve son ton, ses preuves et sa prochaine action.</p>
            <div className="flex flex-col justify-center gap-3 pt-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-or-de-l-aube px-6 py-3 text-xs font-bold uppercase tracking-wider text-nuit-sahara"><CheckCircle2 size={14} aria-hidden="true" /> Parler à l&apos;équipe</Link>
              <Link href="/#diagnostic" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-wider text-pierre-froide"><Workflow size={14} aria-hidden="true" /> Lancer un diagnostic</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
