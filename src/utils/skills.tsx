import { FaBootstrap, FaNodeJs, FaReact } from "react-icons/fa";
import {
    SiFirebase,
    SiTypescript,
    SiNextdotjs,
    SiDart,
    SiNestjs,
    SiExpress,
    SiPostgresql,
    SiMongodb,
    SiInsomnia,
    SiPrisma,
    SiReacthookform,
    SiZod,
    SiChakraui,
} from "react-icons/si";

interface ISkillsInterface {
    icon: React.ReactNode,
    technology: string
}


export const skills: ISkillsInterface[] = [
    { icon: <FaReact className="text-blue-500" />, technology: "React" },
    { icon: <FaNodeJs className="text-green-500" />, technology: "Node.js" },
    { icon: <SiFirebase className="text-orange-500" />, technology: "Firebase" },
    { icon: <SiTypescript className="text-blue-600" />, technology: "TypeScript" },
    { icon: <SiNextdotjs className="text-black" />, technology: "Next.js" },
    { icon: <SiDart className="text-blue-400" />, technology: "Dart" },
    { icon: <FaReact className="text-cyan-500" />, technology: "React Native" },
    { icon: <FaBootstrap className="text-purple-600" />, technology: "Bootstrap" },
    { icon: <SiNestjs className="text-red-500" />, technology: "Nest.js" },
    { icon: <SiExpress className="text-gray-500" />, technology: "Express.js" },
    { icon: <SiPostgresql className="text-blue-500" />, technology: "PostgreSQL" },
    { icon: <SiMongodb className="text-green-500" />, technology: "MongoDB" },
    { icon: <SiInsomnia className="text-purple-700" />, technology: "Insomnia" },
    { icon: <SiPrisma className="text-blue-500" />, technology: "Prisma" },
    { icon: <SiChakraui className="text-teal-400" />, technology: "Chakra UI" },
    { icon: <SiReacthookform className="text-pink-500" />, technology: "React Hook Form" },
    { icon: <SiZod className="text-green-400" />, technology: "Zod" },
];

export interface ITechCategory {
    titleKey: string;
    skills: string[];
}

export const techCategories: ITechCategory[] = [
    {
        titleKey: "techLanguages",
        skills: ["JavaScript", "TypeScript", "Java", "HTML", "CSS", "SQL"],
    },
    {
        titleKey: "techFrontend",
        skills: [
            "React.js",
            "Next.js",
            "Astro",
            "SvelteKit",
            "Vue.js",
            "TailwindCSS",
            "Bootstrap",
        ],
    },
    {
        titleKey: "techBackend",
        skills: ["Node.js", "NestJS", "Express.js", "Fastify", "Spring Boot"],
    },
    {
        titleKey: "techMobile",
        skills: ["React Native", "Expo Go", "Flutter"],
    },
    {
        titleKey: "techDatabase",
        skills: [
            "PostgreSQL",
            "MySQL",
            "MongoDB",
            "Redis",
            "SQLite",
            "Prisma ORM",
        ],
    },
    {
        titleKey: "techTools",
        skills: [
            "Git",
            "Docker",
            "Kubernetes",
            "AWS",
            "Firebase",
            "Linux",
            "Postman",
            "Insomnia",
            "Swagger",
        ],
    },
    {
        titleKey: "techLibraries",
        skills: [
            "React Query",
            "Material UI",
            "Chakra UI",
            "DaisyUI",
            "Shadcn UI",
            "React Native Paper",
        ],
    },
];

export const SUGGESTED_PROJECT_TAGS: readonly string[] = [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "TailwindCSS",
    "Flutter",
    "React Native",
    "Docker",
    "MySQL",
    "Redis",
] as const;

