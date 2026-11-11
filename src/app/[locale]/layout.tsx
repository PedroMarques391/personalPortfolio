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
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.root" });

  return {
    metadataBase: new URL("https://pedromarques.dev.br"),
    title: {
      template: t("titleTemplate"),
      default: t("title"),
    },
    description: t("description"),
    icons: {
      icon: "/favicon.ico",
      apple: "/assets/profile.webp",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    keywords: t("keywords"),
    creator: "Pedro Marques",
    authors: [{ name: "Pedro Marques", url: "https://pedromarques.dev.br" }],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `https://pedromarques.dev.br/${locale}`,
      siteName: "Pedro Marques Portfolio",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
      images: [
        {
          url: "/assets/og-banner.jpeg",
          width: 1200,
          height: 630,
          alt: t("ogTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/assets/og-banner.jpeg"],
      creator: "@opeedrodev",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        pt: "/pt",
        en: "/en",
        "x-default": "/pt",
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
  const schema = generateJsonLD(tSeo, locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${roboto.className} antialiased`}>
        <script
          id="profile-schema"
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
