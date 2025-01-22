"use client";
import { Button } from "@/components/UI/Button";
import { motion, useInView } from "motion/react";
import MarqueeEffect from "@/components/Motions/Marquee";
import ServicesCards from "@/components/Motions/ServicesCards";
import Link from "next/link";
import {

  FaGithub,
  FaRobot,
} from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdFileDownload, MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

import { TbWorldWww } from "react-icons/tb";
import HardSkillsCard from "@/components/UI/HardSkillsCard";
import MotionPath from "@/components/Motions/MotionPath";
import { skills } from "@/utils/data";
import Image from "next/image";
import Typewriter from "@/components/UI/Typewriter";
import { useEffect, useRef, useState } from "react";
import { handleDownload } from "@/utils/functions/handleDownload";
import { handleScroll } from "@/utils/functions/handleScroll";
import { ImLinkedin } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";
import SectionHeader from "@/components/UI/SectionHeader";
import { FiMessageCircle } from "react-icons/fi";



export default function Home() {

  const stacks: string[] = ["Front-end", "Mobile"];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevState) => (prevState + 1) % stacks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="text-gray-soft flex h-full flex-col">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-6 h-full">
        <div className="flex flex-col justify-center items-center md:items-start  gap-6 order-2 md:order-1 mt-10 md:mt-0 p-2 flex-1  pt-0 md:pt-20">
          <div>
            <h1 className="text-base sm:text-xl lg:text-3xl font-bold w-full text-center md:text-start flex gap-2 flex-wrap">
              Olá, meu nome é <Typewriter writing="Pedro Marques" hiddenCursor color="text-orange-500" />
            </h1>
            <h2 className="text-xl lg:text-2xl text-white text-center md:text-left flex gap-2 justify-center md:justify-start">
              Desenvolvedor
              <Typewriter key={currentIndex} writing={stacks[currentIndex]} color="text-orange-500" />
            </h2>
          </div>
          <motion.p
            ref={ref}
            initial={{ x: "-100%" }}
            animate={{ x: isInView ? 0 : "-100%" }}
            transition={{ type: 'spring', stiffness: 100, damping: 25 }}
            className="text-justify leading-relaxed hyphens-none shrink-0 break-words w-full lg:w-4/5">
            Nos últimos anos, fiquei imerso ao desenvolvimento de aplicações front-end, enquanto também encaro de forma proativa os desafios do desenvolvimento mobile.
          </motion.p>
          <div className="flex w-full lg:mx-4 justify-center md:justify-start gap-x-4">
            <Link className="flex gap-2" href={"/contact"} prefetch>
              <Button aria-label="Entrar em Contato" styles="m-2 md:m-4">
                <FiMessageCircle size={20} />
                <p>Contato</p>
              </Button>
            </Link>
            <Button
              aria-label="Baixar Curriculo"
              styles="w-auto m-2 md:m-4"
              onClick={handleDownload}>
              <MdFileDownload size={20} />
              <p>CV</p>
            </Button>
          </div>

          <div className="w-full flex-1 flex justify-center items-center relative overflow-hidden">
            <MotionPath />
          </div>

        </div>
        <div className="flex flex-col md:justify-start items-center  pt-20 h-full p-3 w-full order-1 md:order-2 gap-5">
          <motion.div
            animate={{
              scale: [0.8, 1.2, 1.2, 0.8, 1],
              rotate: [0, 0, 180, 180, 0],
              borderRadius: ["50%", "50%", "0%", "00%", " 50%"]
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
              times: [0, 0.2, 0.5, 0.8, 1]
            }}
            className=" w-64 h-64 rounded-full flex justify-center items-center overflow-hidden">
            <Image
              src="/assets/profile.jpeg"
              alt="Perfil"
              width={300}
              height={200}
              priority
              className="object-cover"
            />
          </motion.div>

          <div className="flex gap-3 justify-center lg:mx-3 w-full">
            <Link
              className="mx-3"
              prefetch
              aria-label="Perfil no GitHub"
              target="_blank"
              rel="noopener noreferrer"
              href={"https://github.com/PedroMarques391"}>
              <Button
                aria-label="Link para o GitHub"
                styles={"w-auto p-3 rounded-full"}>

                <FaGithub size={25} />
              </Button>
            </Link>
            <Link
              className="mx-3"
              prefetch
              aria-label="Perfil no Twitter"
              target="_black"
              rel="noopener noreferrer"
              href={"https://x.com/PedroMarques391"}>
              <Button
                aria-label="Link para o X - Antigo Twitter"
                styles={"w-auto p-3 rounded-full"}>
                <BsTwitterX size={25} />
              </Button>
            </Link>
            <Link
              className="mx-3"
              prefetch
              aria-label="Perfil no Instagram"
              target="_blank"
              rel="noopener noreferrer"
              href={"https://www.linkedin.com/in/pedromarques391/"}>
              <Button
                aria-label="Link para o Instagram"
                styles={"w-auto p-3 rounded-full"}>
                <ImLinkedin size={25} />
              </Button>
            </Link>
          </div>

          <div className="w-full md:w-4/5 bg-gray-light rounded-lg py-2">
            <h1 className="text-left ml-2 p-2 
            text-gray-dark 
            font-semibold 
            tracking-wider w-full l
          ">Tecnologias</h1>
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



      </section >

      <section className=" w-full flex flex-col gap-y-2">
        <button
          onClick={() => handleScroll(900)}
          className="mx-auto text-center p-6 animate-bounce "

        ><MdOutlineKeyboardDoubleArrowDown size={60} color="#d1d1d1" /></button>
        <SectionHeader title="Serviços" subtitle="Veja o que posso fazer por você..." />
        <div className="flex gap-6 mt-10 flex-wrap justify-center">
          <ServicesCards icon={<TbWorldWww size={50} />} title="Desenvolvimento Web">
            Construo sites modernos, responsivos e de alta performance, criados sob medida para atender às suas necessidades. Utilizo tecnologias como <code className="text-orange-500">Node.js, Next.js, React e Tailwind</code> para oferecer soluções eficientes e personalizadas.
          </ServicesCards>

          <ServicesCards icon={<IoIosPhonePortrait size={50} />} title="Desenvolvimento Mobile">
            Projeto aplicativos móveis personalizados, modernos e de alta performance, com suporte nativo para Android e soluções multiplataforma utilizando <span className="text-orange-500">React Native e Flutter</span>.
          </ServicesCards>

          <ServicesCards icon={<FaRobot size={50} />} title="Bots e automações">
            Desenvolvo automações web utilizando <span className="text-orange-500">Python e JavaScript</span>, com especialização na criação de bots personalizados para <span className="text-orange-500">WhatsApp e Telegram</span>.
          </ServicesCards>
        </div>
        <Link
          className="my-10 mx-auto flex flex-row justify-center items-center w-fitp-4 gap-4 group"
          href={"/projects"}
        >
          <h1 className="text-gray-soft tracking-wider text-xl font-semibold group-hover:text-orange-500 duration-1000 transition-colors">Veja Meus Projetos</h1>
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
    </div >

  );
}