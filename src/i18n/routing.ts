import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",

  pathnames: {
    "/": {
      en: "/",
      pt: "/",
    },
    "/about": {
      en: "/about",
      pt: "/sobre",
    },
    "/projects": {
      en: "/projects",
      pt: "/projetos",
    },
    "/contact": {
      en: "/contact",
      pt: "/contato",
    },
  },
});
