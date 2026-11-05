"use client";

import Tilt3DCard from "@/components/Motions/Tilt3DCard";
import { Button } from "@/components/ui/Button";
import AdaCallButton from "@/components/ui/chat/AdaCallButton";
import TechList from "@/components/ui/TechList";
import Handler from "@/utils/handler";
import {
  fadeUpBlur,
  staggerContainer,
  staggerFastContainer,
} from "@/utils/motion";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { BiDownload } from "react-icons/bi";
import cat from "../../../../public/assets/aboutImage.jpeg";

const About = (): React.JSX.Element => {
  const t = useTranslations("pages.about");

  const languages: string[] = [
    "JavaScript",
    "TypeScript",
    "Java",
    "HTML",
    "CSS",
    "SQL",
  ];
  const frontend: string[] = [
    "React.js",
    "Next.js",
    "Astro",
    "SvelteKit",
    "Vue.js",
    "TailwindCSS",
    "Bootstrap",
  ];
  const backend: string[] = [
    "Node.js",
    "NestJS",
    "Express.js",
    "Fastify",
    "Spring Boot",
  ];
  const database: string[] = [
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "SQLite",
    "Prisma ORM",
  ];
  const mobile: string[] = ["React Native", "Expo Go", "Flutter"];
  const tools: string[] = [
    "Git",
    "Docker",
    "Kubernetes",
    "AWS",
    "Firebase",
    "Linux",
    "Postman",
    "Insomnia",
    "Swagger",
  ];
  const libraries: string[] = [
    "React Query",
    "Material UI",
    "Chakra UI",
    "DaisyUI",
    "Shadcn UI",
    "React Native Paper",
  ];

  const techCategories = [
    { titleKey: "techLanguages", skills: languages },
    { titleKey: "techFrontend", skills: frontend },
    { titleKey: "techBackend", skills: backend },
    { titleKey: "techMobile", skills: mobile },
    { titleKey: "techDatabase", skills: database },
    { titleKey: "techTools", skills: tools },
    { titleKey: "techLibraries", skills: libraries },
  ];

  return (
    <div className="w-full flex flex-col mb-10">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="lg:col-span-2 order-2 md:order-1"
        >
          <div className="p-0 md:p-4 text-gray-soft w-full lg:w-[90%] text-center mx-auto md:mx-0">
            <motion.h1
              variants={fadeUpBlur}
              className="text-2xl lg:text-3xl font-bold text-white w-full md:text-left tracking-tight"
            >
              {t("greeting")}
            </motion.h1>

            <motion.p
              variants={fadeUpBlur}
              className="text-sm md:text-base lg:text-lg mt-8 mb-4 text-left leading-relaxed break-words max-w-prose"
            >
              {t("bioParagraph1")}
            </motion.p>

            <motion.p
              variants={fadeUpBlur}
              className="text-sm md:text-base lg:text-lg mb-4 text-left leading-relaxed break-words max-w-prose"
            >
              {t("bioParagraph2")}
            </motion.p>

            <motion.p
              variants={fadeUpBlur}
              className="text-sm md:text-base lg:text-lg mb-4 text-left leading-relaxed break-words max-w-prose"
            >
              {t("bioParagraph3")}
            </motion.p>
          </div>

          <motion.div
            variants={fadeUpBlur}
            className="flex flex-wrap items-center gap-4 mt-8 md:ml-4"
          >
            <Button
              type="button"
              onClick={Handler.download}
              styles="bg-gray-800 w-auto px-6 py-3 rounded-md hover:scale-105 transition-transform duration-300 hover:border hover:border-white hover:text-white text-gray-300"
            >
              <BiDownload size={20} />
              <span className="font-medium">{t("downloadCvText")}</span>
            </Button>
            <AdaCallButton />
          </motion.div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, x: 20, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-1 flex justify-center items-center order-1 md:order-2"
        >
          <div className="w-[90%] max-w-[320px] h-auto mx-auto">
            <Tilt3DCard
              maxTilt={10}
              glareOpacity={0.2}
              perspective={900}
              className="relative p-3 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <div
                aria-hidden="true"
                style={{ transform: "translateZ(-15px)" }}
                className="absolute inset-3 rounded-xl border border-orange-500/30 pointer-events-none"
              />
              <div style={{ transform: "translateZ(20px)" }}>
                <Image
                  src={cat}
                  alt={t("profileImageAlt")}
                  width={300}
                  height={300}
                  priority
                  className="object-cover mx-auto w-full h-auto rounded-xl shadow-lg"
                  placeholder="blur"
                />
              </div>
            </Tilt3DCard>
          </div>
        </motion.section>
      </div>
      <div className="w-[90%] md:w-full flex flex-col justify-center items-center mx-auto">
        <h2 className="text-gray-dark text-2xl font-mono py-10 text-center md:text-left w-full">
          {t("technologiesTitle")}
        </h2>
        <div className="w-full flex flex-col gap-6">
          {techCategories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center gap-4"
            >
              <h3 className="text-gray-soft text-lg md:text-xl font-semibold w-48 text-left shrink-0">
                {t(category.titleKey as any)}
              </h3>
              <motion.ul
                variants={staggerFastContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-wrap gap-3"
              >
                {category.skills.map((skill, i) => (
                  <TechList key={i}>{skill}</TechList>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
