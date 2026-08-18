import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  aside?: ReactNode;
  compact?: boolean;
  tone?: "dark" | "light" | "academy";
}

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  aside,
  compact = false,
  tone = "dark",
}: PageHeroProps) {
  const light = tone === "light";
  const spacing = compact ? "py-12 md:py-16" : "py-16 md:py-24";

  return (
    <section className={`relative overflow-hidden border-b ${light ? "border-black/5 bg-pierre-froide text-terre" : "border-white/5 bg-nuit-sahara text-pierre-froide"}`}>
      <div className={`mx-auto max-w-7xl px-6 md:px-12 ${spacing}`}>
        <div className={aside ? "grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16" : "max-w-4xl"}>
          <div className="space-y-6">
          <p className={`text-xs font-semibold uppercase tracking-wider ${tone === "academy" ? "text-bleu-horizon" : "text-or-de-l-aube"}`}>
            {eyebrow}
          </p>
          <h1 className={`font-display font-extrabold leading-tight tracking-tight ${compact ? "text-4xl md:text-5xl" : "text-4xl md:text-6xl"}`}>
            {title}
          </h1>
          <p className={`max-w-2xl text-base leading-relaxed md:text-lg ${light ? "text-terre/75" : "text-sable-attenue"}`}>
            {description}
          </p>
          {children && <div className="flex flex-col gap-3 pt-2 sm:flex-row [&>*]:inline-flex [&>*]:min-h-11 [&>*]:items-center [&>*]:justify-center">{children}</div>}
          </div>
          {aside && <div className="lg:justify-self-end">{aside}</div>}
        </div>
      </div>
      <div className="horizon-gradient-line" aria-hidden="true" />
    </section>
  );
}
