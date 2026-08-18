import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";

export const metadata: Metadata = {
  title: "À propos — Le pont Niamey-Dubaï",
  description: "Le récit, la méthode et l'ambition de Saharan Impact entre ancrage opérationnel au Niger et ouverture technologique à Dubaï.",
  alternates: { canonical: "/a-propos" },
  openGraph: { url: "/a-propos" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pierre-froide text-terre">
      <Header />
      <main id="contenu-principal">
        <PageHero eyebrow="À propos · Notre identité" title="Le pont Niamey ↔ Dubaï." description="Réunir la connaissance fine du terrain sahélien, la rigueur de l'implémentation et l'accès à un réseau technologique international." />

        <SectionWrapper theme="light">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-bleu-horizon">Niamey · Ancrage opérationnel</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold">Concevoir au contact des utilisateurs.</h2>
              <p className="mt-5 text-sm leading-relaxed text-terre/75">Nos solutions partent des contraintes réelles : connectivité, capacités internes, circuits de validation et besoin d&apos;autonomie. Le terrain n&apos;est pas une phase finale du projet ; il structure la conception dès le départ.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-bleu-horizon">Dubaï · Ouverture technologique</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold">Accéder aux architectures et partenariats utiles.</h2>
              <p className="mt-5 text-sm leading-relaxed text-terre/75">Cette ouverture nourrit les choix techniques, les partenariats et les standards de livraison, tout en conservant une priorité : des solutions frugales, maintenables et appropriables par les équipes locales.</p>
            </div>
          </div>
        </SectionWrapper>

        <section className="bg-terre py-20 text-pierre-froide">
          <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-or-de-l-aube">Une seule marque, trois portes</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold md:text-4xl">Institutions, PME et Academy partagent la même exigence : rendre la technologie utile.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-sable-attenue">Le registre change selon le public, mais la méthode reste la même : comprendre, livrer, vérifier et transférer.</p>
            <Link href="/contact" className="mt-8 inline-flex rounded-lg bg-or-de-l-aube px-6 py-3 text-xs font-bold uppercase tracking-wider text-nuit-sahara">Rencontrer l&apos;équipe</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
