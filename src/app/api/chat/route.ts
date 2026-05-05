import {
  createOpenRouter,
  OpenRouterProvider,
} from "@openrouter/ai-sdk-provider";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { NextRequest } from "next/server";
import z from "zod";
import ProjectRepository from "../repository/ProjectRepository";
import ProjectService from "../services/ProjectService";
import data from "./data.json";

const SYSTEM_PROMPT = `Você é uma agente de IA chamada Ada, uma assistente prestativa criada para responder perguntas sobre Pedro Marques, um desenvolvedor full-stack.
Sua comunicação deve ser sempre amigável, educada e concisa.

Aqui estão as informações e o contexto que você sabe sobre o Pedro:
${JSON.stringify(data, null, 2)}

REGRAS ESTABELECIDAS (Siga estritamente):
1. RESPONDA APENAS com base no escopo das informações fornecidas acima sobre o Pedro Marques.
2. SE a pergunta do usuário estiver FORA DO ESCOPO (assuntos aleatórios, piadas, perguntas não relacionadas ao Pedro ou à sua carreira profissional):
   - Você DEVE dizer educadamente que não pode responder a essa pergunta.
   - Você DEVE em seguida perguntar ao usuário se ele gostaria de saber mais sobre alguma coisa como seus projetos, serviços ou informações de contato.
3. NUNCA invente informações sobre o Pedro. Se não estiver no contexto, trate como fora de escopo.`;

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const openrouter: OpenRouterProvider = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
      appName: "portifolio",
      appUrl: "https://pedromarques.dev.br",
    });

    const result = streamText({
      model: openrouter("openai/gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      temperature: 0.7,
      maxOutputTokens: 1024,
      tools: {
        recentsProjects: {
          description: "Obtém os projetos mais recentes do usuário",
          inputSchema: z.object({
            answer: z.string().describe("The answer to the question"),
          }),
          execute: async ({ answer }: { answer: string }) => {
            const projectRepository = new ProjectRepository();
            const projectSercice = new ProjectService(projectRepository);
            const { rows } = await projectSercice.getProjects(1);
            const lastProjecs = rows
              .slice(0, 4)
              .map((project) => {
                const basicInfo =
                  project.content.length > 120
                    ? project.content.substring(0, 120) + "..."
                    : project.content;
                return `🔹 **${project.title}**\n${basicInfo}\n🔗 URL: ${project.url}`;
              })
              .join("\n\n");

            console.log(lastProjecs);

            return {
              answer,
              lastProjecs,
            };
          },
        },
        whoAreYou: {
          description: "Get background information about who Ada is.",
          inputSchema: z.object({}),
          execute: async () => {
            return {
              name: "Ada",
              creator: "Pedro Marques",
              origin:
                "Inspirada em um bot de WhatsApp homônimo criado pelo Pedro",
              role: "Assistente de IA do portfólio",
            };
          },
        },
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (e: any) {
    console.error("Error in /api/chat:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: e.status ?? 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
