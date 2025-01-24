"use client";

import { Button } from '@/components/UI/Button';
import TechList from '@/components/UI/TechList';
import { handleDownload } from '@/utils/functions/handleDownload';
import Image from 'next/image';
import React from 'react';
import { BiDownload } from 'react-icons/bi';
import { motion } from "motion/react";

const About = (): React.JSX.Element => {

    const frontend: string[] = ["HTML", "CSS", "Bootstrap", "TypeScript", "TailwindCSS", "Bootstrap", "React.js", "Next.js"];
    const backend: string[] = ["Node.js", "Nest.js", "Express.js", "Java"];
    const database: string[] = ["Postgres", "MongoDB", "Firebase"];
    const mobile: string[] = ["React Native", "Flutter"];

    return (
        <div className='w-full flex flex-col mb-10'>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10'>
                <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, type: "spring" }}
                    className='lg:col-span-2 order-2 md:order-1 '>
                    <div className="p-0 md:p-4 text-gray-soft w-full lg:w-[90%] font-mono text-center  mx-auto md:mx-0">
                        <h1 className="text-xl lg:text-2xl font-bold font-serif w-full  md:text-left">
                            Olá, me chamo Pedro Marques
                        </h1>

                        <p className="text-sm md:text-base lg:text-lg mt-10 mb-3 text-left lg:text-justify leading-relaxed hyphens-none break-words">
                            Sou desenvolvedor Front-End, com experiência em React, React Native,
                            Next.js, TailwindCSS, Firebase, TypeScript e Svelte. Tenho formação em
                            Logística pela Universidade Paulista (UNIP), mas encontrei minha verdadeira
                            paixão no mundo da tecnologia e desenvolvimento de software.
                        </p>
                        <p className="text-sm md:text-base lg:text-lg text-left lg:text-justify leading-relaxed hyphens-none  break-words">
                            Atualmente, estou focado no desenvolvimento mobile, criando soluções
                            modernas e otimizadas, utilizando Flutter e React Native. Também desenvolvo
                            aplicações web, buscando sempre melhorar a experiência do usuário.
                        </p>

                        <p className='text-sm md:text-base lg:text-lg text-left lg:text-justify leading-relaxed hyphens-none  break-words'>
                            Minha meta é desenvolver projetos inovadores que entreguem valor real, ao
                            mesmo tempo em que aprimoro minhas habilidades para me tornar um
                            desenvolvedor cada vez mais completo.
                        </p>

                    </div>

                    <Button
                        onClick={handleDownload}
                        styles={
                            "bg-gray-800 w-auto  px-6 py-3 rounded-md mt-8 hover:scale-105 transition-transform duration-300 hover:border hover:border-white hover:text-white text-gray-300 ml-3"
                        }
                    >
                        <p>
                            <BiDownload size={20} />
                        </p>
                        <p className=" font-medium">Download CV</p>
                    </Button>

                </motion.section >
                <motion.section
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, type: "spring" }}
                    className='lg:col-span-1 flex justify-center items-center order-1 md:order-2'>
                    <div className='w-[90%] h-auto mx-auto'>
                        <Image
                            src="/assets/profile2.webp"
                            alt="Perfil"
                            width={"300"}
                            height={"300"}
                            priority
                            className="object-cover mx-auto w-auto h-auto"
                        />
                    </div>
                </motion.section>

            </div >
            <div className='w-[90%] md:w-full  flex flex-col justify-center items-center mx-auto'>
                <h1 className='text-gray-dark text-2xl font-mono py-10 text-center md:text-left w-full'>Tecnologias</h1>
                <div className='w-full flex flex-col gap-6'>
                    <div className='flex flex-col md:flex-row md:items-center gap-4'>
                        <h1 className='text-gray-soft text-xl md:text-2xl font-semibold w-32 text-left'>FrontEnd</h1>
                        <ul className='flex flex-wrap gap-3'>
                            {frontend.map((skills, i) => (
                                <TechList key={i}>{skills}</TechList>
                            ))}
                        </ul>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center gap-4'>
                        <h1 className='text-gray-soft text-xl md:text-2xl font-semibold w-32 text-left'>BackEnd</h1>
                        <ul className='flex flex-wrap gap-3'>
                            {backend.map((skills, i) => (
                                <TechList key={i}>{skills}</TechList>
                            ))}
                        </ul>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center gap-4'>
                        <h1 className='text-gray-soft text-xl md:text-2xl font-semibold w-32 text-left'>DataBase</h1>
                        <ul className='flex flex-wrap gap-3'>
                            {database.map((skills, i) => (
                                <TechList key={i}>{skills}</TechList>
                            ))}
                        </ul>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center gap-4'>
                        <h1 className='text-gray-soft text-xl md:text-2xl font-semibold w-32 text-left'>Mobile</h1>
                        <ul className='flex flex-wrap gap-3'>
                            {mobile.map((skills, i) => (
                                <TechList key={i}>{skills}</TechList>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default About;