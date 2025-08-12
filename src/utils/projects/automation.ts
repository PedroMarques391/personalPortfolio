import { IProjectInterface, Project } from "../model/projectModel";

export const automation: IProjectInterface[] = [
    new Project(17, "/assets/thumbnail/whatsbot.webp", "AdaBot", "automações", "Bot para WhatsApp com funcionalidades para gerenciamento de grupos, como moderação e envio  mensagens automáticas.", ["TypeScript", "Puppeteer", "whatsapp-web.js", "Bot", "IA", "Gemini"], "https://github.com/PedroMarques391/whatsbot"
    ),
    new Project(16, "/assets/thumbnail/LR.webp", "LastReleases", "automações", "Aplicação de web scraping que coleta os últimos lançamentos de filmes em exibição nos cinemas e envia essas informações por email.", ["TypeScript", "Puppeteer", "Nodemailer", "Nodemon"],
        "https://github.com/PedroMarques391/lastReleases"
    ),
];