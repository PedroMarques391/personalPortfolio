import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pedromarques.dev.br";
  const lastModified = "2026-11-10T00:00:00.000Z";

  const routes = [
    {
      ptPath: "/pt",
      enPath: "/en",
      priority: 1.0,
      changeFrequency: "monthly" as const,
    },
    {
      ptPath: "/pt/projetos",
      enPath: "/en/projects",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      ptPath: "/pt/sobre",
      enPath: "/en/about",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      ptPath: "/pt/contato",
      enPath: "/en/contact",
      priority: 0.6,
      changeFrequency: "monthly" as const,
    },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    const alternates = {
      languages: {
        pt: `${baseUrl}${route.ptPath}`,
        en: `${baseUrl}${route.enPath}`,
        "x-default": `${baseUrl}${route.ptPath}`,
      },
    };

    entries.push({
      url: `${baseUrl}${route.ptPath}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates,
    });

    entries.push({
      url: `${baseUrl}${route.enPath}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates,
    });
  }

  return entries;
}
