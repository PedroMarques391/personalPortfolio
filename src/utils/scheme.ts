import { WithContext, ProfilePage } from "schema-dts";

const generateJsonLD = (t: (key: string) => string): WithContext<ProfilePage> => {
    return {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        headline: t("headline"),
        description: t("description"),
        mainEntity: {
            "@type": "Person",
            name: "Pedro Marques",
            jobTitle: t("jobTitle"),
            url: "https://pedromarques.dev.br",
            sameAs: [
                "https://linkedin.com/in/pedromarques391",
                "https://github.com/PedroMarques391",
                "https://x.com/opeedrodev",
            ],
        },
        datePublished: "2025-01-01",
        dateModified: new Date().toISOString().split('T')[0],
    };
};

export {
    generateJsonLD
};
