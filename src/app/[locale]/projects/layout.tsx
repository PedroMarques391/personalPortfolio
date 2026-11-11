import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.projects" });
  const canonicalPath = locale === "pt" ? "/pt/projetos" : "/en/projects";

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: `${t("title")} | Pedro Marques`,
      description: t("description"),
      url: `https://pedromarques.dev.br${canonicalPath}`,
      siteName: "Pedro Marques Portfolio",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
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
        pt: "/pt/projetos",
        en: "/en/projects",
        "x-default": "/pt/projetos",
      },
    },
  };
}

export default async function ProjectsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.projects" });
  const canonicalPath = locale === "pt" ? "/pt/projetos" : "/en/projects";
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

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `https://pedromarques.dev.br${canonicalPath}#collectionpage`,
    url: `https://pedromarques.dev.br${canonicalPath}`,
    name: `${t("title")} | Pedro Marques`,
    description: t("description"),
    inLanguage: locale === "pt" ? "pt-BR" : "en-US",
    isPartOf: {
      "@id": "https://pedromarques.dev.br/#website",
    },
  };

  return (
    <>
      <script
        id="projects-breadcrumbs-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsSchema),
        }}
      />
      <script
        id="projects-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      {children}
    </>
  );
}
