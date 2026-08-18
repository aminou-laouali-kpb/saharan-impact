import type { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  theme?: "dark" | "light" | "transparent";
  children: ReactNode;
}

export default function SectionWrapper({
  id,
  className = "",
  theme = "transparent",
  children,
}: SectionWrapperProps) {
  const themeClasses = {
    dark: "bg-nuit-sahara text-pierre-froide",
    light: "bg-pierre-froide text-terre",
    transparent: "",
  };

  return (
    <section
      id={id}
      className={`relative scroll-mt-20 py-20 md:py-28 overflow-hidden transition-colors duration-300 ${themeClasses[theme]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {children}
      </div>
    </section>
  );
}
