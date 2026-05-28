"use client";

import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";
import { NavItems } from "./NavItems";

const Desktop = (): React.JSX.Element => {
  const t = useTranslations("components.navbar");
  const { locale } = useParams();

  return (
    <ul className="hidden md:flex justify-center items-center gap-x-3">
      <NavItems href={`/${locale}/`}>{t("homeLink")}</NavItems>
      <NavItems href={`/${locale}/projects`}>{t("projectsLink")}</NavItems>
      <NavItems href={`/${locale}/about`}>{t("aboutLink")}</NavItems>
      <NavItems href={`/${locale}/contact`}>{t("contactLink")}</NavItems>
      <LanguageToggle />
    </ul>
  );
};

export default Desktop;
