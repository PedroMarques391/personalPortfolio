import Main from "@/components/Layout/Main";
import { LoadingPage } from "@/components/UI/LoadingPage";
import { jsonLD } from "@/utils/scheme.org/scheme";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
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
        <Suspense fallback={<LoadingPage />}>
          <Main>{children}</Main>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
