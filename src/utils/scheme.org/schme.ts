import { WithContext, WebPage } from "schema-dts";

const jsonLD: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    headline: "Pedro Marque - Desenvolvedor",
    description:
        "Desenvolvedor de software focado em soluções inovadoras e aprendizado constante.",
    author: {
        "@type": "Person",
        name: "Pedro Marques",
        url: "https://pedromarques.dev.br",
        sameAs: [
            "https://linkedin.com/in/pedromarques391",
            "https://github.com/PedroMarques391",
            "https://x.com/opeedrodev",

        ],
    },
    datePublished: "2025-01-01",
    dateModified: "2025-08-12",
    mainEntityOfPage: "https://pedromarques.dev.br",
};


export {
    jsonLD
};
