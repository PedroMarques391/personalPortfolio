import { WithContext, ProfilePage } from "schema-dts";

const jsonLD: WithContext<ProfilePage> = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    headline: "Pedro Marques - Desenvolvedor Fullstack",
    description:
        "Desenvolvedor Fullstack e Mobile focado em criar aplicações modernas, eficientes e de alta performance.",
    mainEntity: {
        "@type": "Person",
        name: "Pedro Marques",
        jobTitle: "Desenvolvedor Fullstack",
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


export {
    jsonLD
};
