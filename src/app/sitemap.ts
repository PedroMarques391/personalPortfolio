import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://pedromarques.dev.br/",
            lastModified: "2025-08-12T21:56:13+01:00",
            changeFrequency: 'yearly',
            priority: 1
        },
        {
            url: "https://pedromarques.dev.br/projects",
            lastModified: "2025-08-12T21:56:13+01:00",
            changeFrequency: 'yearly',
            priority: 0.8
        },
        {
            url: "https://pedromarques.dev.br/about",
            lastModified: "2025-08-12T21:56:13+01:00",
            changeFrequency: 'yearly',
            priority: 0.6
        },
        {
            url: "https://pedromarques.dev.br/contact",
            lastModified: "2025-08-12T21:56:13+01:00",
            priority: 0.5,
            changeFrequency: 'yearly',
        }
    ];
}
