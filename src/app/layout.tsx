import Main from "@/components/Layout/Main";
import { ChatModalProvider } from "@/contexts/ChatModalContext";
import { jsonLD } from "@/utils/scheme";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Pedro Marques",
    default: "Pedro Marques | Desenvolvedor Fullstack",
  },
  description:
    "Portfólio Web de Pedro Marques, Desenvolvedor Fullstack e Mobile especializado em aplicações modernas, responsivas e de alta performance.",
  robots: "index, follow",
  keywords:
    "Pedro Marques, Desenvolvedor Fullstack, Web Developer, portfólio web, React, Next.js, Node.js, TypeScript, Mobile",
  creator: "Pedro Marques",
  openGraph: {
    title: "Pedro Marques | Desenvolvedor Fullstack",
    description:
      "Conheça meu trabalho como Desenvolvedor Fullstack, construindo soluções modernas e eficientes.",
    url: "https://pedromarques.dev.br",
    siteName: "Pedro Marques Portfolio",
    locale: "pt_BR",
    type: "website",
  },
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
        <ChatModalProvider>
          <NextIntlClientProvider>
            <Main>{children}</Main>
          </NextIntlClientProvider>
        </ChatModalProvider>
        <Analytics />
      </body>
    </html>
  );
}
