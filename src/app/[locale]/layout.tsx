import Main from "@/components/Layout/Main";
import { ChatModalProvider } from "@/contexts/ChatModalContext";
import { routing } from "@/i18n/routing";
import { generateJsonLD } from "@/utils/scheme";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Roboto } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.root" });

  return {
    title: {
      template: t("titleTemplate"),
      default: t("title"),
    },
    description: t("description"),
    robots: "index, follow",
    keywords: t("keywords"),
    creator: "Pedro Marques",
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://pedromarques.dev.br",
      siteName: "Pedro Marques Portfolio",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    alternates: {
      languages: {
        pt: "/pt",
        en: "/en",
      },
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const tSeo = await getTranslations({ locale, namespace: "seo.jsonLd" });
  const schema = generateJsonLD(tSeo);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${roboto.className} antialiased`}>
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
        <ChatModalProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Main>{children}</Main>
          </NextIntlClientProvider>
        </ChatModalProvider>
        <Analytics />
      </body>
    </html>
  );
}
