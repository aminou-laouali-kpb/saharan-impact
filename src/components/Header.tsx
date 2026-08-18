"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const navigation = [
  { href: "/institutions", label: "Institutions" },
  { href: "/pme", label: "PME" },
  { href: "/academy", label: "Academy" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "À propos" },
] as const;

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-nuit-sahara/95 backdrop-blur-md"
      onKeyDown={(event) => {
        if (event.key === "Escape") setMenuOpen(false);
      }}
    >
      <a href="#contenu-principal" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-or-de-l-aube focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-nuit-sahara">
        Aller au contenu principal
      </a>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        <Link href="/" aria-label="Saharan Impact — accueil" className="group flex items-center" onClick={() => setMenuOpen(false)}>
          <BrandLogo priority />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {navigation.map((item) => {
            const current = isCurrentPath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-or-de-l-aube after:transition-transform ${
                  current
                    ? "text-pierre-froide after:scale-x-100"
                    : "text-sable-attenue hover:text-pierre-froide after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={`hidden min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition sm:inline-flex ${
              pathname === "/contact"
                ? "bg-pierre-froide text-nuit-sahara"
                : "bg-or-de-l-aube text-nuit-sahara hover:bg-pierre-froide"
            }`}
          >
            Contact
          </Link>

          <div className="relative lg:hidden">
            <button
              type="button"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              aria-controls="navigation-mobile"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex size-11 items-center justify-center rounded-full border border-white/15 text-pierre-froide transition hover:border-or-de-l-aube/60 hover:text-or-de-l-aube"
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>

            {menuOpen && (
              <nav id="navigation-mobile" aria-label="Navigation mobile" className="absolute right-0 top-14 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-white/10 bg-terre p-3 shadow-2xl">
                {navigation.map((item) => {
                  const current = isCurrentPath(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={`flex min-h-11 items-center rounded-lg px-4 py-3 text-sm font-medium transition ${
                        current
                          ? "bg-or-de-l-aube/12 text-or-de-l-aube"
                          : "text-pierre-froide hover:bg-white/5 hover:text-or-de-l-aube"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 flex min-h-11 items-center justify-center rounded-lg bg-or-de-l-aube px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-nuit-sahara"
                >
                  Nous contacter
                </Link>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
