import type { Metadata } from "next";
import { CheckCircle2, Mail, MapPin, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import InterestForm from "@/components/InterestForm";
import { getWhatsAppHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact et prise de rendez-vous",
  description: "Présentez votre besoin institutionnel, votre projet PME ou votre objectif de formation à l'équipe Saharan Impact.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

const interests = [
  "Mission institutionnelle",
  "Projet PME",
  "Formation Saharan Academy",
  "Partenariat",
  "Autre demande",
] as const;

const serviceInterests: Record<string, (typeof interests)[number]> = {
  institutions: "Mission institutionnelle",
  pme: "Projet PME",
  academy: "Formation Saharan Academy",
  partenariat: "Partenariat",
};

interface ContactPageProps {
  searchParams: Promise<{ service?: string | string[] }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const service = Array.isArray(params.service) ? params.service[0] : params.service;
  const initialInterest = service ? serviceInterests[service] : undefined;
  const whatsappHref = getWhatsAppHref("Bonjour Saharan Impact, je souhaite vous présenter un besoin.");
  const whatsappAvailable = whatsappHref.startsWith("https://");

  return (
    <div className="min-h-screen bg-nuit-sahara">
      <Header />
      <main id="contenu-principal">
        <PageHero
          eyebrow="Contact · Niamey · Dubaï"
          title="Commencer par le besoin, pas par l'outil."
          description="Présentez votre contexte. Nous orienterons l'échange vers le bon pilier et la prochaine étape la plus utile."
          compact
        />
        <section className="py-12 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 md:px-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
            <aside className="space-y-7 lg:pt-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-or-de-l-aube">Ce qui se passe ensuite</p>
                <ol className="mt-4 space-y-4 text-sm leading-relaxed text-sable-attenue">
                  <li className="flex gap-3"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-or-de-l-aube" aria-hidden="true" /><span>Nous lisons votre contexte et identifions le bon pilier.</span></li>
                  <li className="flex gap-3"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-or-de-l-aube" aria-hidden="true" /><span>Nous revenons par le canal que vous avez choisi.</span></li>
                  <li className="flex gap-3"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-or-de-l-aube" aria-hidden="true" /><span>Vous recevez une prochaine étape claire, sans engagement.</span></li>
                </ol>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-6 text-sm">
                <a href="mailto:contact@saharanimpact.com" className="flex min-h-11 items-center gap-3 text-pierre-froide transition hover:text-or-de-l-aube">
                  <Mail size={17} className="text-or-de-l-aube" aria-hidden="true" /> contact@saharanimpact.com
                </a>
                {whatsappAvailable && (
                  <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-3 text-pierre-froide transition hover:text-or-de-l-aube">
                    <MessageCircle size={17} className="text-or-de-l-aube" aria-hidden="true" /> Écrire sur WhatsApp
                  </a>
                )}
                <p className="flex items-start gap-3 leading-relaxed text-sable-attenue"><MapPin size={17} className="mt-0.5 shrink-0 text-or-de-l-aube" aria-hidden="true" /><span>Niamey, Niger<br />Dubaï, Émirats arabes unis</span></p>
              </div>

              <p className="rounded-xl border border-white/10 bg-white/3 p-4 text-xs leading-relaxed text-sable-attenue">
                Vos coordonnées restent confidentielles. Elles sont transmises de manière sécurisée et utilisées uniquement pour répondre à votre demande.
              </p>
            </aside>

            <InterestForm
              kind="contact"
              title="Présenter votre demande"
              description="Choisissez le sujet le plus proche, puis indiquez votre canal de réponse préféré."
              interests={interests}
              initialInterest={initialInterest}
              submitLabel="Envoyer la demande"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
