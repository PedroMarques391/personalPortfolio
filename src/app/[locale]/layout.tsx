import Main from "@/components/Layout/Main";
import { ChatModalProvider } from "@/contexts/ChatModalContext";
import { routing } from "@/i18n/routing";
import { jsonLD } from "@/utils/scheme";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import NotFound from "./not-found";

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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return <NotFound />;
  }

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
