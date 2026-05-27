import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Mim",
  description: "Conheça mais sobre a trajetória de Pedro Marques, Desenvolvedor Fullstack e Mobile, suas habilidades e experiências profissionais.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
