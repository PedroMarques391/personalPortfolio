import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/pt/admin/", "/en/admin/", "/api/"],
      },
      {
        userAgent: [
          "OAI-SearchBot",
          "Claude-SearchBot",
          "PerplexityBot",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: ["/admin/", "/pt/admin/", "/en/admin/", "/api/"],
      },
    ],
    sitemap: "https://pedromarques.dev.br/sitemap.xml",
  };
}
