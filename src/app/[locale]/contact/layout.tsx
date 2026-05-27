import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com Pedro Marques, Desenvolvedor Fullstack. Vamos conversar sobre tecnologia e construir soluções inovadoras.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
