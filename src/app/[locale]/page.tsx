"use client";
import MarqueeEffect from "@/components/Motions/Marquee";
import MotionPath from "@/components/Motions/MotionPath";
import ServicesCards from "@/components/Motions/ServicesCards";
import { Button } from "@/components/ui/Button";
import HardSkillsCard from "@/components/ui/HardSkillsCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Typewriter from "@/components/ui/Typewriter";
import AdaCallButton from "@/components/ui/chat/AdaCallButton";
import { Requests } from "@/services/requests";
import { skills } from "@/utils";
import Handler from "@/utils/handler";
import { usePrefetchQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub, FaRobot } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { ImLinkedin } from "react-icons/im";
import { IoIosPhonePortrait } from "react-icons/io";
import {
  MdFileDownload,
  MdOutlineKeyboardDoubleArrowDown,
} from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";

export default function Home() {
  const stacks: string[] = ["FullStack", "Mobile"];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const t = useTranslations("pages.home");
  const svc = useTranslations("sections.services");

  const ref = useRef<HTMLDivElement>(null);

  usePrefetchQuery({
    queryKey: ["projects", "all", 1, "all", ""],
    queryFn: async () => {
      return await Requests.getProject(
        `${process.env.NEXT_PUBLIC_URL_BASE}/api/project?role=all&page=1&type=all`,
      );
    },
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevState) => (prevState + 1) % stacks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="text-gray-soft flex h-full flex-col">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-6 h-full">
        <div className="flex flex-col justify-center items-center md:items-start  gap-6 order-2 md:order-1 mt-10 md:mt-0 p-2 flex-1 pt-0 md:pt-20">
          <div>
            <h1 className="sr-only">
              {t("srOnlyTitle")}
            </h1>
            <div
              className="text-lg sm:text-xl lg:text-3xl font-bold w-full text-center md:text-start flex gap-2 flex-wrap"
              aria-hidden="true"
            >
              {t("title")}
              <Typewriter
                writing="Pedro"
                hiddenCursor
                color="text-orange-500"
              />
            </div>
            <h2 className="text-xl lg:text-2xl text-white text-center md:text-left flex gap-2 justify-center md:justify-start h-10 items-center">
              {t("developerLabel")}{" "}
              <Typewriter
                key={currentIndex}
                writing={stacks[currentIndex]}
                color="text-orange-500"
              />
            </h2>
          </div>
          <motion.p
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "linear" }}
            className="opacity-0 text-justify text-lg leading-relaxed break-words w-full lg:w-4/5"
          >
            {t.rich("heroDescription", {
              highlight: (chunks) => <span className="text-orange-500">{chunks}</span>,
            })}
          </motion.p>
          <div className="flex w-full lg:mx-4 justify-center items-center md:justify-start gap-x-5 flex-wrap">
            <Link
              className="flex items-center gap-3 p-3 md:gap-4 transition"
              href="/contact"
              prefetch
              aria-label={t("contactAriaLabel")}
            >
              <Button
                aria-label={t("contactButtonAriaLabel")}
                styles="flex items-center gap-2 text-white"
              >
                <FiMessageCircle size={20} />
                <p>{t("contactButtonText")}</p>
              </Button>
            </Link>
            <Button
              aria-label={t("downloadCvAriaLabel")}
              styles="flex items-center gap-2 w-auto p-3 text-white focus:ring focus:ring-gray-light"
              onClick={Handler.download}
            >
              <MdFileDownload size={20} />
              <p>{t("downloadCvText")}</p>
            </Button>
            <AdaCallButton />
          </div>

          <div className="w-full flex-1 flex justify-center items-center relative overflow-hidden">
            <MotionPath />
          </div>
        </div>
        <div className="flex flex-col md:justify-start items-center  pt-20 p-3 w-full order-1 md:order-2 gap-5 ">
          <motion.div
            ref={ref}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="opacity-0 w-64 h-64 rounded-full flex items-center justify-center bg-gray-light overflow-hidden"
          >
            <Image
              src="/assets/profile.webp"
              alt={t("profileImageAlt")}
              width={600}
              height={600}
              priority
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex gap-3 justify-center lg:mx-3 w-full">
            <Link
              className="mx-3"
              prefetch
              aria-label={t("githubAriaLabel")}
              target="_blank"
              rel="noopener noreferrer"
              href={"https://github.com/PedroMarques391"}
            >
              <Button
                aria-label={t("githubLinkAriaLabel")}
                styles={"w-auto p-3 rounded-full"}
              >
                <FaGithub size={25} />
              </Button>
            </Link>
            <Link
              className="mx-3"
              prefetch
              aria-label={t("twitterAriaLabel")}
              target="_blank"
              rel="noopener noreferrer"
              href={"https://x.com/PedroMarques391"}
            >
              <Button
                aria-label={t("twitterLinkAriaLabel")}
                styles={"w-auto p-3 rounded-full"}
              >
                <BsTwitterX size={25} />
              </Button>
            </Link>
            <Link
              className="mx-3"
              prefetch
              aria-label={t("linkedinAriaLabel")}
              target="_blank"
              rel="noopener noreferrer"
              href={"https://www.linkedin.com/in/pedromarques391/"}
            >
              <Button
                aria-label={t("linkedinLinkAriaLabel")}
                styles={"w-auto p-3 rounded-full"}
              >
                <ImLinkedin size={25} />
              </Button>
            </Link>
          </div>

          <div className="w-full md:w-4/5 bg-gray-light rounded-lg py-2">
            <h1
              className="text-left ml-2 p-2 
            text-gray-dark 
            font-semibold 
            tracking-wider w-full l
          "
            >
              {t("technologiesTitle")}
            </h1>
            <div className="w-full py-2">
              <MarqueeEffect>
                {skills.map((skill, index) => (
                  <HardSkillsCard
                    key={index}
                    icon={skill.icon}
                    technology={skill.technology}
                  />
                ))}
              </MarqueeEffect>
            </div>
          </div>
        </div>
      </section>

      <section className=" w-full flex flex-col gap-y-2">
        <button
          aria-label={t("scrollToServicesAriaLabel")}
          onClick={() => Handler.scroll("service")}
          className="mx-auto text-center p-6 animate-bounce "
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
              highlight: (chunks) => <span className="text-orange-500">{chunks}</span>,
            })}
          </ServicesCards>

          <ServicesCards icon={<FaRobot size={50} />} title={svc("botsTitle")}>
            {svc.rich("botsDescription", {
              highlight: (chunks) => <span className="text-orange-500">{chunks}</span>,
            })}
          </ServicesCards>
        </div>
        <Link
          className="my-10 mx-auto flex flex-row justify-center items-center w-fitp-4 gap-4 group"
          href={"/projects"}
        >
          <h1 className="text-gray-soft tracking-wider text-xl font-semibold group-hover:text-orange-500 duration-1000 transition-colors">
            {t("seeMyProjects")}
          </h1>
          <motion.svg
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
    </div>
  );
}
