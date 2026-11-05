"use client";

import ServicesCards from "@/components/Motions/ServicesCards";
import SectionHeader from "@/components/ui/SectionHeader";
import Handler from "@/utils/handler";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { FaRobot } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";

interface ServicesSectionProps {
  locale: string;
}

const ServicesSection = ({
  locale,
}: ServicesSectionProps): React.JSX.Element => {
  const t = useTranslations("pages.home");
  const svc = useTranslations("sections.services");

  return (
    <section className="w-full flex flex-col gap-y-2">
      <button
        type="button"
        aria-label={t("scrollToServicesAriaLabel")}
        onClick={() => Handler.scroll("service")}
        className="mx-auto text-center p-6 animate-bounce focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-full"
      >
        <MdOutlineKeyboardDoubleArrowDown size={60} color="#d1d1d1" />
      </button>

      <SectionHeader
        title={svc("title")}
        subtitle={svc("subtitle")}
        id="service"
      />

      <div className="flex gap-6 mt-10 flex-wrap justify-center overflow-hidden md:overflow-visible">
        <ServicesCards
          icon={<TbWorldWww size={50} />}
          title={svc("webDevTitle")}
        >
          {svc.rich("webDevDescription", {
            code: (chunks) => <code className="text-orange-500">{chunks}</code>,
          })}
        </ServicesCards>

        <ServicesCards
          icon={<IoIosPhonePortrait size={50} />}
          title={svc("mobileDevTitle")}
        >
          {svc.rich("mobileDevDescription", {
            highlight: (chunks) => (
              <span className="text-orange-500">{chunks}</span>
            ),
          })}
        </ServicesCards>

        <ServicesCards icon={<FaRobot size={50} />} title={svc("botsTitle")}>
          {svc.rich("botsDescription", {
            highlight: (chunks) => (
              <span className="text-orange-500">{chunks}</span>
            ),
          })}
        </ServicesCards>
      </div>

      <Link
        className="my-10 mx-auto flex flex-row justify-center items-center w-fit p-4 gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg"
        href={`/${locale}/projects`}
      >
        <span className="text-gray-soft tracking-wider text-xl font-semibold group-hover:text-orange-500 duration-300 transition-colors">
          {t("seeMyProjects")}
        </span>
        <motion.svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 50"
          width="80"
          height="50"
          fill="none"
          stroke="#f97316"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M10 25 L80 25 M60 10 L80 25 L60 40"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.svg>
      </Link>
    </section>
  );
};

export default ServicesSection;
