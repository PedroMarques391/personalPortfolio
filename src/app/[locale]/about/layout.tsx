import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  const canonicalPath = locale === "pt" ? "/pt/sobre" : "/en/about";

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: `${t("title")} | Pedro Marques`,
      description: t("description"),
      url: `https://pedromarques.dev.br${canonicalPath}`,
      siteName: "Pedro Marques Portfolio",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "profile",
      images: [
        {
          url: "/assets/og-banner.jpeg",
          width: 1200,
          height: 630,
          alt: `${t("title")} | Pedro Marques`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("title")} | Pedro Marques`,
      description: t("description"),
      images: ["/assets/og-banner.jpeg"],
      creator: "@opeedrodev",
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        pt: "/pt/sobre",
        en: "/en/about",
        "x-default": "/pt/sobre",
      },
    },
  };
}

export default async function AboutLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  const canonicalPath = locale === "pt" ? "/pt/sobre" : "/en/about";
  const homeName = locale === "pt" ? "Início" : "Home";

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeName,
        item: `https://pedromarques.dev.br/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("title"),
        item: `https://pedromarques.dev.br${canonicalPath}`,
      },
    ],
  };

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `https://pedromarques.dev.br${canonicalPath}#aboutpage`,
    url: `https://pedromarques.dev.br${canonicalPath}`,
    name: `${t("title")} | Pedro Marques`,
    description: t("description"),
    inLanguage: locale === "pt" ? "pt-BR" : "en-US",
    isPartOf: {
      "@id": "https://pedromarques.dev.br/#website",
    },
    mainEntity: {
      "@id": "https://pedromarques.dev.br/#person",
    },
  };

  return (
    <>
      <script
        id="about-breadcrumbs-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsSchema),
        }}
      />
      <script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema),
        }}
      />
      {children}
    </>
  );
}
