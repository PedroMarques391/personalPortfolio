"use client";

import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useTranslations } from "next-intl";
import React from "react";
import { NavItems } from "./NavItems";

const Desktop = (): React.JSX.Element => {
  const t = useTranslations("components.navbar");

  return (
    <ul className="hidden md:flex justify-center items-center gap-x-3">
      <NavItems href="/">{t("homeLink")}</NavItems>
      <NavItems href="/projects">{t("projectsLink")}</NavItems>
      <NavItems href="/about">{t("aboutLink")}</NavItems>
      <NavItems href="/contact">{t("contactLink")}</NavItems>
      <LanguageToggle />
    </ul>
  );
};

export default Desktop;
