import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Body from "@/components/Layout/Body";
import ScrollLinked from "@/components/Motions/ScrollLinked";
import { LoadingPage } from "@/components/UI/LoadingPage";


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
  description: "Portifolio Web ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollLinked />
        <Header />
        <Suspense fallback={<LoadingPage />} >
          <Body>
            {children}
          </Body>
        </Suspense>
        <Footer />

      </body>
    </html>
  );
}
