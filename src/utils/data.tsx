
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
import { IProjectInterface, Project } from "./model/projectModel";

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


export const projects: IProjectInterface[] = [
    new Project(31, "/assets/thumbnail/sweetShop.webp", "SweetShopLP", "web", "Modelo de landing page desenvolvido para confeitaria, com foco em um design elegante e cores suaves que refletem delicadeza.", ["TypeScript", "React.js", "Next 15", "TailwindCSS", "AOS Animation"], "https://sweet-shoplp.vercel.app/"),
    new Project(30, "/assets/thumbnail/myMoney.webp", "MyMoneyLP", "web", "Landing Page moderna e responsiva para o aplicativo MyMoney, focada em apresentação clara e interativa das funcionalidades financeiras.", ["TypeScript", "Svelte", "TailwindCSS", "AOS Animation"], "https://mymoneylp.vercel.app/"),
    new Project(29, "/assets/thumbnail/carStore.webp", "CarStore", "web", "Modelo de site avançado para revendedoras de veículos, inspirado no design da WebMotors, com funcionalidades de busca e apresentação de carros otimizadas.", ["React.js", "Next.js 14", "TypeScript", "TailwindCSS", "Firebase", "React Hook Form", "Zod", "Swiper.js", "React Toastify"], "https://carstorepa.vercel.app/"),
    new Project(28, "/assets/thumbnail/dranabeatrizmendes.webp", "DR. Ana Beatriz LP", "web", "Landing Page elegante e minimalista criada para psicólogos, com foco em atração e retenção de pacientes.", ["React.js", "Next.js 14", "TypeScript", "TailwindCSS", "AOS Animation"], "https://dranabeatrizmendes.vercel.app/"),
    new Project(27, "/assets/thumbnail/pacificus.webp", "Pacificus & Associados", "web", "Site profissional para escritórios de advocacia, destacando serviços e a experiência da equipe.", ["React.js", "Next.js 14", "TypeScript", "TailwindCSS", "Firebase"], "https://pacificus.vercel.app/"),
    new Project(26, "/assets/thumbnail/template.webp", "Template Administrativo", "web", "Template administrativo moderno com sistema de autenticação integrado para gerenciar operações internas.", ["React.js", "Next.js 14", "TypeScript", "TailwindCSS", "Firebase"], "https://modeltemplate.vercel.app/"),
    new Project(25, "/assets/thumbnail/YS.webp", "YourStore", "web", "E-commerce moderno e funcional focado na venda de roupas, com design responsivo e navegação intuitiva.", ["React.js", "Vite", "JavaScript", "TailwindCSS"], "https://pedromarques391.github.io/yourStore/"),
    new Project(24, "/assets/thumbnail/scooters.webp", "Scooters", "web", "Landing Page atraente para exibição de diversos modelos de motos, com animações interativas para maior engajamento.", ["React.js", "Next.js 14", "JavaScript", "TailwindCSS", "Framer Motion"], "https://scooters-psi.vercel.app"),
    new Project(23, "/assets/thumbnail/mm.webp", "Magazine", "web", "Landing Page e e-commerce para exibição e venda de produtos, com interface acessível e fácil de usar.", ["HTML", "JavaScript", "Vite", "TailwindCSS"], "https://pedromarques391.github.io/e-commerce/"),
    new Project(22, "/assets/thumbnail/finans.webp", "Finans Bank", "web", "Landing Page promocional para um banco digital, com design limpo e foco em conversões.", ["HTML", "CSS", "Bootstrap", "JavaScript"], "https://finansbank.netlify.app/"),
    new Project(21, "/assets/thumbnail/myMoneyApp.webp", "MyMoney APP", "mobile", "Aplicativo móvel para registro e gerenciamento de finanças pessoais.", ["React Native", "Styled Components", "TypeScript", "Expo Go", "Expo Router"]
    ),
    new Project(20, "/assets/thumbnail/usersList.webp", "Users", "mobile", "Aplicativo para cadastro e gerenciamento de usuários.", ["Dart", "Flutter"]
    ),
    new Project(19, "/assets/thumbnail/pomodoro.webp", "Pomodoro APP", "mobile", "Aplicativo móvel para gerenciamento de atividades utilizando a técnica Pomodoro.", ["Dart", "Flutter", "Drift", "Flutter Riverpod"]
    ),
    new Project(18, "/assets/thumbnail/smartSearch.webp", "Smart Search", "mobile", "Aplicativo para buscas rápidas e eficientes de informações.", ["React Native", "Expo Go", "TypeScript", "Stylesheets"]
    ),
    new Project(17, "/assets/thumbnail/whatsbot.webp", "HasturBot", "automações", "Bot para WhatsApp com funcionalidades para gerenciamento de grupos, como moderação e envio  mensagens automáticas.", ["JavaScript", "Puppeteer", "whatsapp-web.js", "Bot"], "https://github.com/PedroMarques391/whatsbot"
    ),
    new Project(16, "/assets/thumbnail/LR.webp", "LastReleases", "automações", "Aplicação de web scraping que coleta os últimos lançamentos de filmes em exibição nos cinemas e envia essas informações por email.", ["TypeScript", "Puppeteer", "Nodemailer", "Nodemon"],
        "https://github.com/PedroMarques391/lastReleases"
    ),
    new Project(15, "/assets/thumbnail/imc.webp", "IMC Calculator", "Web", "Aplicação web interativa e moderna para calcular o Índice de Massa Corporal (IMC), com design responsivo e foco na experiência mobile.", ["HTML", "CSS", "JavaScript", "Mobile First"], "https://myimc2025.netlify.app/"
    ),
];