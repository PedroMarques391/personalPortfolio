import Main from "@/components/Layout/Main";
import { SnowFall } from "@/components/Motions/Snow";
import { jsonLD } from "@/utils/scheme.org/scheme";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pedro Marques | Full-Stack",
  description:
    "Portfólio Web de Pedro Marques, desenvolvedor Fullstack. Conheça meus projetos e habilidades.",
  robots: "index, follow",
  keywords:
    "Pedro Marques, Full-Stack, desenvolvedor, portfólio web, projetos Fullstack, HTML, CSS, JavaScript, React, Next.js, desenvolvimento web",
  creator: "Pedro Marques",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} antialiased`}>
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLD),
          }}
        />
        <SnowFall />
        <Main>{children}</Main>
        <Analytics />
      </body>
    </html>
  );
}
