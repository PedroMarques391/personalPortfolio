import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { LoadingPage } from "@/components/UI/LoadingPage";
import Main from "@/components/Layout/Main";


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
      <link rel="shortcut icon" href="/assets/icon.webp" type="image/x-icon" sizes="40x40" />
      <body
        className={`${roboto.className} antialiased`}
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
