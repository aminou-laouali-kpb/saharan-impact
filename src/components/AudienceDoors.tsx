import Link from "next/link";
import { ArrowRight, Building2, GraduationCap, Store } from "lucide-react";

const doors = [
  {
    href: "/institutions",
    label: "Institutions",
    title: "Vous dirigez une institution ou un programme",
    description: "IA appliquée, automatisation et plateformes de terrain.",
    icon: Building2,
  },
  {
    href: "/pme",
    label: "PME",
    title: "Vous développez une PME ou une activité",
    description: "Présence en ligne, acquisition et autonomie commerciale.",
    icon: Store,
  },
  {
    href: "/academy",
    label: "Academy",
    title: "Vous voulez monter en compétences",
    description: "Parcours IA, automatisation et compétences numériques.",
    icon: GraduationCap,
  },
] as const;

export default function AudienceDoors() {
  return (
    <div id="audiences" className="grid w-full scroll-mt-24 grid-cols-1 gap-2.5 lg:grid-cols-3 lg:gap-3" aria-label="Choisir votre espace">
      {doors.map(({ href, label, title, description, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="group flex min-h-[4.5rem] items-center gap-3 rounded-xl border border-white/10 bg-terre/70 p-3 text-left transition hover:-translate-y-0.5 hover:border-or-de-l-aube/50 hover:bg-terre focus-visible:outline-or-de-l-aube sm:min-h-[5.25rem] sm:p-3.5 lg:min-h-32 lg:items-start lg:gap-4 lg:p-4"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-or-de-l-aube/10 text-or-de-l-aube lg:mt-0.5">
            <Icon size={17} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-or-de-l-aube">
              {label} <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
            <span className="mt-1 block text-sm font-semibold leading-snug text-pierre-froide">{title}</span>
            <span className="mt-1 hidden text-xs leading-relaxed text-sable-attenue sm:block">{description}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
