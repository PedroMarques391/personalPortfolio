import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { LoadingPage } from "@/components/UI/LoadingPage";
import Main from "@/components/Layout/Main";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <link rel="shortcut icon" href="/assets/icon.png" type="image/x-icon" sizes="40x40" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
