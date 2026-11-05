"use client";
import MarqueeEffect from "@/components/Motions/Marquee";
import MotionPath from "@/components/Motions/MotionPath";
import ServicesCards from "@/components/Motions/ServicesCards";
import Tilt3DCard from "@/components/Motions/Tilt3DCard";
import { Button } from "@/components/ui/Button";
import HardSkillsCard from "@/components/ui/HardSkillsCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Typewriter from "@/components/ui/Typewriter";
import AdaCallButton from "@/components/ui/chat/AdaCallButton";
import { Requests } from "@/services/requests";
import { skills } from "@/utils";
import Handler from "@/utils/handler";
import { fadeUpBlur, staggerContainer } from "@/utils/motion";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  const queryClient = useQueryClient();

  const { locale } = useParams();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["projects", "all", 1, "all", ""],
      queryFn: async () => {
        return await Requests.getProject(
          `/api/project?role=all&page=1&type=all`,
        );
      },
      staleTime: 1000 * 60 * 60,
    });
  }, [queryClient]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevState) => (prevState + 1) % stacks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stacks.length]);

  return (
    <div className="text-gray-soft flex h-full flex-col">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-6 h-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center items-center md:items-start gap-6 order-2 md:order-1 mt-10 md:mt-0 p-2 flex-1 pt-0 md:pt-20"
        >
          <motion.div variants={fadeUpBlur}>
            <h1 className="sr-only">{t("srOnlyTitle")}</h1>
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
          </motion.div>
          <motion.p
            variants={fadeUpBlur}
            className="text-left text-lg leading-relaxed break-words w-full lg:w-4/5 max-w-prose"
          >
            {t.rich("heroDescription", {
              highlight: (chunks) => (
                <span className="text-orange-500 font-medium">{chunks}</span>
              ),
            })}
          </motion.p>
          <motion.div
            variants={fadeUpBlur}
            className="flex w-full justify-center items-center md:justify-start gap-4 flex-wrap"
          >
            <Button.Link
              href={`/${locale}/contact`}
              prefetch
              aria-label={t("contactButtonAriaLabel")}
              styles="flex items-center gap-2 text-white"
            >
              <FiMessageCircle size={20} />
              <span>{t("contactButtonText")}</span>
            </Button.Link>
            <Button
              type="button"
              aria-label={t("downloadCvAriaLabel")}
              styles="flex items-center gap-2 w-auto px-6 py-4 text-white"
              onClick={Handler.download}
            >
              <MdFileDownload size={20} />
              <span>{t("downloadCvText")}</span>
            </Button>
            <AdaCallButton />
          </motion.div>

          <motion.div
            variants={fadeUpBlur}
            className="w-full flex-1 flex justify-center md:justify-start items-center relative"
          >
            <MotionPath />
          </motion.div>
        </motion.div>
        <div className="flex flex-col md:justify-start items-center pt-12 md:pt-20 p-3 w-full order-1 md:order-2 gap-5">
          <motion.div
            initial={{ y: -24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Tilt3DCard
              maxTilt={10}
              glareOpacity={0.05}
              perspective={800}
              className="w-64 h-64 rounded-full flex items-center justify-center bg-gray-light overflow-hidden"
            >
              <Image
                src="/assets/profile.webp"
                alt={t("profileImageAlt")}
                width={600}
                height={600}
                priority
                className="w-full h-full object-cover"
              />
            </Tilt3DCard>
          </motion.div>

          <div className="flex gap-4 justify-center w-full">
            <Button.Link
              prefetch={false}
              aria-label={t("githubLinkAriaLabel")}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/PedroMarques391"
              styles="w-auto p-3 rounded-full"
            >
              <FaGithub size={25} />
            </Button.Link>
            <Button.Link
              prefetch={false}
              aria-label={t("twitterLinkAriaLabel")}
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/opeedrodev"
              styles="w-auto p-3 rounded-full"
            >
              <BsTwitterX size={25} />
            </Button.Link>
            <Button.Link
              prefetch={false}
              aria-label={t("linkedinLinkAriaLabel")}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/pedromarques391/"
              styles="w-auto p-3 rounded-full"
            >
              <ImLinkedin size={25} />
            </Button.Link>
          </div>

          <div className="w-full md:w-4/5 bg-gray-light rounded-lg py-2">
            <h2 className="text-left ml-2 p-2 text-gray-dark font-semibold tracking-wider w-full">
              {t("technologiesTitle")}
            </h2>
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
              code: (chunks) => (
                <code className="text-orange-500">{chunks}</code>
              ),
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
    </div>
  );
}
