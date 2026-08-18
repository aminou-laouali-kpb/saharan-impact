import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Laptop, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";
import InterestForm from "@/components/InterestForm";

export const metadata: Metadata = {
  title: "Saharan Academy — Formations IA, tech et numérique",
  description: "Des parcours pratiques en IA, automatisation et compétences numériques pour les professionnels et les organisations d'Afrique de l'Ouest.",
  alternates: { canonical: "/academy" },
  openGraph: { url: "/academy" },
};

const courses = [
  { theme: "IA au travail", title: "IA générative : de la curiosité à l'usage professionnel", format: "Présentiel ou en ligne", duration: "2 jours", level: "Débutant", session: "Liste d'attente ouverte" },
  { theme: "Automatisation", title: "Construire des workflows opérationnels avec n8n", format: "Présentiel", duration: "3 jours", level: "Intermédiaire", session: "Prochaine session à annoncer" },
  { theme: "Données", title: "Tableaux de bord et décisions fondées sur les données", format: "Sur mesure", duration: "2 à 4 jours", level: "Intermédiaire", session: "Pour équipes et programmes" },
  { theme: "Marketing numérique", title: "Visibilité locale, WhatsApp Business et acquisition", format: "Cohorte ouverte", duration: "2 jours", level: "Débutant", session: "Liste d'attente ouverte" },
] as const;

const formats = [
  { icon: Users, title: "Cohortes ouvertes", description: "Apprendre avec un groupe, pratiquer sur des cas concrets et construire un premier portefeuille de compétences." },
  { icon: Building2, title: "Sur mesure", description: "Travailler sur les processus, données et contraintes réelles d'une entreprise ou d'une institution." },
  { icon: Laptop, title: "En ligne", description: "Accéder aux parcours depuis plusieurs villes avec des supports adaptés aux contraintes de connexion." },
] as const;

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-pierre-froide text-terre">
      <Header />
      <main id="contenu-principal">
        <PageHero
          eyebrow="Saharan Academy · IA · Tech · Numérique"
          title="Construire les compétences qui mettent la technologie au travail."
          description="Objectif de long terme : devenir une référence en Afrique de l'Ouest pour la formation à l'IA, à la tech et au numérique. Ce cap est déjà amorcé par des formations livrées sur le terrain."
          tone="academy"
        >
          <Link href="#preinscription" className="rounded-lg bg-bleu-horizon px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-pierre-froide">Rejoindre la prochaine cohorte →</Link>
          <Link href="#catalogue" className="rounded-lg border border-white/15 px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-pierre-froide">Voir les parcours</Link>
        </PageHero>

        <section className="bg-bleu-horizon py-10 text-pierre-froide">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-[1.2fr_1fr] md:px-12">
            <h2 className="font-display text-2xl font-bold md:text-3xl">S&apos;appuyer sur le terrain : des formations déjà livrées avec Future Skills et pour les agences des Nations unies.</h2>
            <div className="space-y-3 text-sm leading-relaxed text-pierre-froide/85">
              <p>Future Skills : Niamey, Dosso, Maradi, Zinder et Agadez.</p>
              <p>Automatisation : agents des Nations unies, n8n et workflows opérationnels.</p>
              <p className="font-semibold text-or-de-l-aube">D&apos;autres formations arrivent.</p>
            </div>
          </div>
        </section>

        <SectionWrapper id="catalogue" theme="light">
          <div className="space-y-12">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-bleu-horizon">Catalogue</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-terre md:text-4xl">Choisir un parcours concret pour passer de la curiosité sur l&apos;IA à une compétence utilisable au travail.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {courses.map((course) => (
                <article key={course.title} className="rounded-2xl border border-black/5 bg-white/50 p-7">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-bleu-horizon">{course.theme}</p>
                  <h3 className="mt-3 font-display text-xl font-bold text-terre">{course.title}</h3>
                  <dl className="mt-6 grid grid-cols-2 gap-3 text-xs">
                    <div><dt className="text-terre/50">Format</dt><dd className="mt-1 font-medium">{course.format}</dd></div>
                    <div><dt className="text-terre/50">Durée</dt><dd className="mt-1 font-medium">{course.duration}</dd></div>
                    <div><dt className="text-terre/50">Niveau</dt><dd className="mt-1 font-medium">{course.level}</dd></div>
                    <div><dt className="text-terre/50">Session</dt><dd className="mt-1 font-medium text-bleu-horizon">{course.session}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <section className="bg-terre py-20 text-pierre-froide">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-wider text-or-de-l-aube">Formats d&apos;apprentissage</p><h2 className="mt-4 font-display text-3xl font-extrabold">Choisir le format qui correspond au contexte.</h2></div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {formats.map(({ icon: Icon, title, description }) => <article key={title} className="rounded-xl border border-white/5 bg-white/3 p-7"><Icon className="text-bleu-horizon" aria-hidden="true" /><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-sable-attenue">{description}</p></article>)}
            </div>
          </div>
        </section>

        <section id="preinscription" className="scroll-mt-20 bg-nuit-sahara py-20">
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <InterestForm kind="academy" title="Préinscription Saharan Academy" description="Indiquez le parcours qui vous intéresse. Nous vous informerons des prochaines sessions et formats disponibles." interests={courses.map((course) => course.title)} submitLabel="Rejoindre la liste" />
            <Link href="/blog/apprendre-ia-afrique-ouest" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-or-de-l-aube">Lire le guide pour construire son parcours IA <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
