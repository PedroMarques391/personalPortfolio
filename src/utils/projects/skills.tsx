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
