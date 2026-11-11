import { WithContext, ProfilePage, WebSite, Person } from "schema-dts";

interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": [WebSite, Person, ProfilePage];
}

const generateJsonLD = (
  t: (key: string) => string,
  locale: string = "pt",
): JsonLdGraph => {
  const baseUrl = "https://pedromarques.dev.br";
  const inLanguage = locale === "pt" ? "pt-BR" : "en-US";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Pedro Marques | Portfolio",
        description: t("description"),
        inLanguage: ["pt-BR", "en-US"],
        publisher: {
          "@id": `${baseUrl}/#person`,
        },
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: "Pedro Marques",
        jobTitle: t("jobTitle"),
        url: baseUrl,
        image: `${baseUrl}/assets/profile.webp`,
        sameAs: [
          "https://linkedin.com/in/pedromarques391",
          "https://github.com/PedroMarques391",
          "https://x.com/opeedrodev",
          "https://www.instagram.com/pedromarques.dev/",
        ],
        knowsAbout: [
          "Fullstack Development",
          "Web Development",
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Node.js",
          "Mobile Development",
          "React Native",
          "Tailwind CSS",
          "PostgreSQL",
          "MySQL",
          "Redis",
          "Docker",
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": `${baseUrl}/#profilepage`,
        url: `${baseUrl}/${locale}`,
        headline: t("headline"),
        description: t("description"),
        inLanguage,
        mainEntity: {
          "@id": `${baseUrl}/#person`,
        },
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        datePublished: "2025-01-01",
        dateModified: new Date().toISOString().split("T")[0],
      },
    ],
  };
};

export { generateJsonLD };
