import type { Metadata } from "next";
import { Fira_Code, Montserrat } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { LoadingPage } from "@/components/UI/LoadingPage";
import Main from "@/components/Layout/Main";


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-montserrat'
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-fira-code'
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
      <link rel="shortcut icon" href="/assets/icon.webp" type="image/x-icon" sizes="40x40" />
      <body
        className={`${firaCode.variable} ${montserrat.variable} antialiased`}
      >
        <Suspense fallback={<LoadingPage />} >
          <Main>
            {children}
          </Main>
        </Suspense>

      </body>
    </html>
  );
}
