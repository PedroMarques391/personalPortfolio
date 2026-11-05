import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.projects" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === "pt" ? "/pt/projetos" : "/en/projects",
      languages: {
        pt: "/pt/projetos",
        en: "/en/projects",
      },
    },
  };
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
