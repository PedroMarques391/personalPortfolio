import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();
  const baseUrl = "https://pedromarques.dev.br";

  const routes = [
    {
      ptPath: "/pt",
      enPath: "/en",
      priority: 1,
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
      priority: 0.6,
      changeFrequency: "monthly" as const,
    },
    {
      ptPath: "/pt/contato",
      enPath: "/en/contact",
      priority: 0.5,
      changeFrequency: "monthly" as const,
    },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.ptPath}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: {
        pt: `${baseUrl}${route.ptPath}`,
        en: `${baseUrl}${route.enPath}`,
      },
    },
  }));
}
