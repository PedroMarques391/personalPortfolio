import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Explore o portfólio de projetos desenvolvidos por Pedro Marques. Soluções Fullstack, Mobile e Automações.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
