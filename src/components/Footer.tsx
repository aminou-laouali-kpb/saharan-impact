import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

const footerLinks = [
  { href: "/institutions", label: "Institutions" },
  { href: "/pme", label: "PME" },
  { href: "/academy", label: "Saharan Academy" },
  { href: "/blog", label: "Blog" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-nuit-sahara py-12 text-sm text-sable-attenue md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" aria-label="Saharan Impact — accueil" className="inline-flex">
              <BrandLogo />
            </Link>
            <p className="max-w-md text-xs leading-relaxed text-sable-attenue/80">
              IA appliquée, solutions numériques et compétences pour transformer les investissements technologiques en usages concrets en Afrique de l&apos;Ouest.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-pierre-froide">Explorer</h2>
            <ul className="space-y-2 text-xs">
              {footerLinks.map((item) => <li key={item.href}><Link href={item.href} className="hover:text-or-de-l-aube">{item.label}</Link></li>)}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-pierre-froide">Contact</h2>
            <ul className="space-y-2 text-xs">
              <li><a href="mailto:contact@saharanimpact.com" className="hover:text-or-de-l-aube">contact@saharanimpact.com</a></li>
              <li><Link href="/contact" className="hover:text-or-de-l-aube">Prendre rendez-vous</Link></li>
              <li className="text-sable-attenue/70">Niamey · Dubaï</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/5 pt-8 text-xs text-sable-attenue/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Saharan Impact. Tous droits réservés.</p>
          <Link href="/a-propos" className="hover:text-pierre-froide">Notre histoire</Link>
        </div>
      </div>
    </footer>
  );
}
