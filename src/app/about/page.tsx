"use client";

import { Button } from "@/components/ui/Button";
import AdaCallButton from "@/components/ui/chat/AdaCallButton";
import TechList from "@/components/ui/TechList";
import Handler from "@/utils/handler";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";
import { BiDownload } from "react-icons/bi";
import cat from "../../../public/assets/profile2.webp";

const About = (): React.JSX.Element => {
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
    { title: "Linguagens", skills: languages },
    { title: "Front-End", skills: frontend },
    { title: "Back-End", skills: backend },
    { title: "Mobile", skills: mobile },
    { title: "Banco de Dados", skills: database },
    { title: "Ferramentas", skills: tools },
    { title: "Bibliotecas & UI", skills: libraries },
  ];

  return (
    <div className="w-full flex flex-col mb-10">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10">
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="lg:col-span-2 order-2 md:order-1 "
        >
          <div className="p-0 md:p-4 text-gray-soft w-full lg:w-[90%] text-center  mx-auto md:mx-0">
            <h1 className="text-xl lg:text-2xl font-bold font-serif w-full  md:text-left">
              Olá, me chamo Pedro Marques
            </h1>

            <p className="text-sm md:text-base lg:text-lg mt-10 mb-4 text-left lg:text-justify leading-relaxed hyphens-none break-words">
              Sou um desenvolvedor Full-Stack apaixonado por criar soluções
              eficientes e inovadoras. Minha jornada profissional começou na
              área de Logística, formado pela Universidade Paulista (UNIP), onde
              desenvolvi uma forte capacidade analítica e de resolução de
              problemas. No entanto, foi na tecnologia que encontrei minha
              verdadeira vocação. Atualmente, estou cursando Análise e
              Desenvolvimento de Sistemas na UniCesumar, consolidando minha base
              teórica enquanto atuo ativamente no mercado.
            </p>

            <p className="text-sm md:text-base lg:text-lg mb-4 text-left lg:text-justify leading-relaxed hyphens-none break-words">
              Tenho sólida experiência no desenvolvimento web e mobile,
              utilizando tecnologias como React, Next.js, React Native,
              TypeScript e TailwindCSS no Front-End, e Node.js (NestJS, Express,
              Fastify) no Back-End. Trabalho com bancos de dados relacionais e
              não relacionais, além de ferramentas modernas do ecossistema de
              desenvolvimento.
            </p>

            <p className="text-sm md:text-base lg:text-lg mb-4 text-left lg:text-justify leading-relaxed hyphens-none break-words">
              Neste momento, meu foco principal está em aprofundar meus
              conhecimentos no Back-End e em arquitetura de software, estudando
              Java, mensageria e orquestração de containers com Docker e
              Kubernetes. Também tenho explorado ativamente o universo da
              Inteligência Artificial. Meu grande objetivo é construir projetos
              que gerem valor real para os usuários, mantendo-me em constante
              evolução técnica e profissional.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-8 ml-3">
            <Button
              onClick={Handler.download}
              styles={
                "bg-gray-800 w-auto px-6 py-3 rounded-md hover:scale-105 transition-transform duration-300 hover:border hover:border-white hover:text-white text-gray-300"
              }
            >
              <p>
                <BiDownload size={20} />
              </p>
              <p className=" font-medium">Download CV</p>
            </Button>
            <AdaCallButton />
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="lg:col-span-1 flex justify-center items-center order-1 md:order-2"
        >
          <div className="w-[90%] h-auto mx-auto">
            <Image
              src={cat}
              alt="Perfil"
              width={"300"}
              height={"300"}
              priority
              className="object-cover mx-auto w-auto h-auto"
              placeholder="blur"
            />
          </div>
        </motion.section>
      </div>
      <div className="w-[90%] md:w-full  flex flex-col justify-center items-center mx-auto">
        <h1 className="text-gray-dark text-2xl font-mono py-10 text-center md:text-left w-full">
          Tecnologias
        </h1>
        <div className="w-full flex flex-col gap-6">
          {techCategories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center gap-4"
            >
              <h2 className="text-gray-soft text md:text-2xl font-semibold w-48 text-left shrink-0">
                {category.title}
              </h2>
              <ul className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <TechList key={i}>{skill}</TechList>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
