import type { Metadata } from "next";
import Link from "next/link";
import { Check, Globe2, Megaphone, MessageCircle, RefreshCw, Search, Smartphone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";
import InterestForm from "@/components/InterestForm";
import { getWhatsAppHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Saharan Site Pro — Sites web et marketing pour PME",
  description: "Une offre accessible pour mettre les PME ouest-africaines en ligne, améliorer leur visibilité et développer leur autonomie commerciale.",
  alternates: { canonical: "/pme" },
  openGraph: { url: "/pme" },
};

const valueStack = [
  [Globe2, "Site professionnel", "Une présence rapide, claire et adaptée au mobile."],
  [Search, "Référencement de base", "Des fondations propres pour être compris par Google."],
  [MessageCircle, "WhatsApp intégré", "Un parcours direct entre la découverte et la conversation."],
  [Smartphone, "Prise en main", "Une formation courte pour modifier les informations essentielles."],
  [Megaphone, "Kit de lancement", "Des conseils concrets pour annoncer et utiliser le nouveau site."],
  [RefreshCw, "Continuité", "Maintenance et accompagnement disponibles après la mise en ligne."],
] as const;

// Décision commerciale volontairement centralisée : remplacer ces libellés après validation des prix FCFA.
const offers = [
  { name: "Essentiel", audience: "Activité ou service local", price: "Tarif FCFA à confirmer", features: ["Site vitrine ciblé", "Contact WhatsApp", "Référencement de base"] },
  { name: "Croissance", audience: "PME avec plusieurs offres", price: "Tarif FCFA à confirmer", features: ["Site multi-pages", "Catalogue simple", "Formation visibilité"] },
  { name: "Commerce", audience: "Vente et prise de commande", price: "Tarif FCFA à confirmer", features: ["Catalogue structuré", "Parcours de commande", "Accompagnement continu"] },
] as const;

const training = [
  ["Google & présence locale", "Structurer sa fiche, ses informations et ses preuves de confiance."],
  ["WhatsApp Business", "Organiser les demandes, le catalogue et les relances commerciales."],
  ["Réseaux sociaux utiles", "Choisir les bons formats et construire une cadence réaliste."],
  ["Publicité locale", "Tester un budget, mesurer les demandes et éviter les dépenses invisibles."],
] as const;

const faq = [
  ["Quel délai prévoir ?", "L'objectif de l'offre standard est une mise en ligne en une semaine après réception des contenus et validation du périmètre."],
  ["Qu'est-ce qui est inclus ?", "Le cadrage, la création, l'adaptation mobile, le référencement de base et une prise en main sont inclus selon le palier choisi."],
  ["Peut-on payer par mobile money ?", "Les modalités de paiement, dont le mobile money lorsqu'il est disponible, sont confirmées dans le devis avant démarrage."],
  ["Que se passe-t-il après le lancement ?", "Une maintenance en abonnement et un accompagnement marketing peuvent prolonger l'offre sans être imposés."],
] as const;

export default function PmePage() {
  const whatsappHref = getWhatsAppHref("Bonjour Saharan Impact, je souhaite discuter de mon projet Saharan Site Pro.");
  const whatsappExternal = whatsappHref.startsWith("https://");

  return (
    <div className="min-h-screen bg-pierre-froide text-terre">
      <Header />
      <main id="contenu-principal">
        <PageHero
          eyebrow="PME · Saharan Site Pro"
          title="Mettre chaque PME ouest-africaine en ligne en une semaine, avec un site professionnel et un prix qui n'est plus un obstacle."
          description="Une offre d'acquisition claire pour lancer votre présence numérique, puis développer votre visibilité et votre autonomie commerciale."
          tone="light"
        >
          <Link href={whatsappHref} target={whatsappExternal ? "_blank" : undefined} rel={whatsappExternal ? "noreferrer" : undefined} className="inline-flex items-center justify-center gap-2 rounded-lg bg-or-de-l-aube px-6 py-3 text-xs font-bold uppercase tracking-wider text-nuit-sahara">
            <MessageCircle size={15} aria-hidden="true" /> Discuter de mon projet sur WhatsApp →
          </Link>
          <Link href="#offres-pme" className="rounded-lg border border-terre/15 px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-terre">Voir ce qui est inclus</Link>
        </PageHero>

        <SectionWrapper theme="light">
          <div className="space-y-12">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-bleu-horizon">Une pile de valeur complète</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-terre md:text-4xl">Regrouper site, référencement de base, formation et accompagnement dans une seule offre pensée pour les réalités du terrain.</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {valueStack.map(([Icon, title, description]) => (
                <article key={title} className="rounded-xl border border-black/5 bg-white/50 p-6">
                  <Icon size={20} className="text-bleu-horizon" aria-hidden="true" />
                  <h3 className="mt-4 font-bold text-terre">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-terre/70">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <section id="offres-pme" className="scroll-mt-20 bg-or-de-l-aube/15 py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-bleu-horizon">Paliers Saharan Site Pro</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-terre md:text-4xl">Choisir le niveau utile aujourd&apos;hui, garder la possibilité d&apos;évoluer.</h2>
              <p className="mt-4 text-sm text-terre/70">La grille est prête ; les montants FCFA seront publiés après validation commerciale.</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {offers.map((offer, index) => (
                <article key={offer.name} className={`rounded-2xl border p-7 ${index === 1 ? "border-or-de-l-aube bg-terre text-pierre-froide shadow-xl" : "border-black/5 bg-pierre-froide text-terre"}`}>
                  <p className={`font-mono text-[10px] font-bold uppercase tracking-wider ${index === 1 ? "text-or-de-l-aube" : "text-bleu-horizon"}`}>{offer.audience}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold">{offer.name}</h3>
                  <p className={`mt-3 text-sm font-semibold ${index === 1 ? "text-or-de-l-aube" : "text-terre"}`}>{offer.price}</p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {offer.features.map((feature) => <li key={feature} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-or-de-l-aube" aria-hidden="true" /> {feature}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <SectionWrapper theme="light">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-terre p-8 text-pierre-froide">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-sable-attenue">Avant</p>
              <h2 className="mt-3 font-display text-2xl font-bold">Une activité difficile à vérifier en ligne.</h2>
              <ul className="mt-6 space-y-3 text-sm text-sable-attenue"><li>Informations dispersées</li><li>Demandes perdues dans les messages</li><li>Aucune base durable pour être trouvé</li></ul>
            </div>
            <div className="rounded-2xl bg-or-de-l-aube p-8 text-nuit-sahara">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider">Après</p>
              <h2 className="mt-3 font-display text-2xl font-bold">Une présence claire qui oriente vers l&apos;action.</h2>
              <ul className="mt-6 space-y-3 text-sm"><li>Offre et coordonnées immédiatement compréhensibles</li><li>Parcours direct vers WhatsApp</li><li>Fondations pour Google et les futures campagnes</li></ul>
            </div>
          </div>
        </SectionWrapper>

        <section id="formations-marketing" className="scroll-mt-20 bg-terre py-20 text-pierre-froide">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-or-de-l-aube">Formations marketing digital</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold md:text-4xl">Apprendre à transformer la présence en ligne en demandes réelles.</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {training.map(([title, description]) => <article key={title} className="rounded-xl border border-white/5 bg-white/3 p-6"><h3 className="font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-sable-attenue">{description}</p></article>)}
            </div>
          </div>
        </section>

        <SectionWrapper theme="light">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold text-terre">Questions fréquentes</h2>
            <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
              {faq.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none font-semibold text-terre">{question}<span className="float-right text-or-de-l-aube">+</span></summary><p className="mt-3 pr-8 text-sm leading-relaxed text-terre/70">{answer}</p></details>)}
            </div>
          </div>
        </SectionWrapper>

        <section id="demande-pme" className="scroll-mt-20 bg-nuit-sahara py-20">
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <InterestForm kind="pme" title="Présenter votre projet PME" description="Dites-nous où en est votre activité et ce que vous voulez rendre plus simple ou plus visible." interests={["Création de site", "Formation marketing", "Maintenance et accompagnement"]} submitLabel="Envoyer ma demande" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
