import Image from "next/image";

interface BrandLogoProps {
  priority?: boolean;
}

export default function BrandLogo({ priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/saharan-impact-logo.svg"
      alt="Saharan Impact"
      width={232}
      height={64}
      priority={priority}
      className="h-11 w-auto object-contain md:h-12"
    />
  );
}
