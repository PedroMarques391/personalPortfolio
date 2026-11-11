import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pedro Marques | Desenvolvedor Fullstack & Mobile",
    short_name: "Pedro Marques",
    description:
      "Portfólio Web de Pedro Marques, Desenvolvedor Fullstack e Mobile especializado em aplicações modernas, responsivas e de alta performance.",
    start_url: "/pt",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#f97316",
    icons: [
      {
        src: "/assets/profile.webp",
        sizes: "400x400",
        type: "image/webp",
      },
    ],
  };
}
