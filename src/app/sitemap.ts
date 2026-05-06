import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date().toISOString();

    return [
        {
            url: "https://pedromarques.dev.br/",
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 1
        },
        {
            url: "https://pedromarques.dev.br/projects",
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: "https://pedromarques.dev.br/about",
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6
        },
        {
            url: "https://pedromarques.dev.br/contact",
            lastModified: currentDate,
            priority: 0.5,
            changeFrequency: 'monthly',
        }
    ];
}
