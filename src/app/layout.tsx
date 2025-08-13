import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { LoadingPage } from "@/components/UI/LoadingPage";
import Main from "@/components/Layout/Main";
import Script from "next/script";
import { jsonLD } from "@/utils/scheme.org/schme";


const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic',],
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Pedro Marques | Front-End",
  description: "Portfólio Web de Pedro Marques, desenvolvedor Front-End. Conheça meus projetos e habilidades.",
  robots: "index, follow",
  keywords: "Pedro Marques, Front-End, desenvolvedor, portfólio web, projetos front-end, HTML, CSS, JavaScript, React, Next.js, desenvolvimento web",
  creator: "Pedro Marques",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.className} antialiased`}
      >
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLD),
          }}
        />
        <Suspense fallback={<LoadingPage />} >
          <Main>
            {children}
          </Main>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
