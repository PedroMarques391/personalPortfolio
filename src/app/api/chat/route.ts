import {
  createOpenRouter,
  OpenRouterProvider,
} from "@openrouter/ai-sdk-provider";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { NextRequest } from "next/server";
import data from "./data.json";
import { recentsProjectsTool, whoAreYouTool } from "./tools";

const SYSTEM_PROMPT = `Você é uma agente de IA chamada Ada, uma assistente prestativa criada para responder perguntas sobre Pedro Marques, um desenvolvedor full-stack.
Sua comunicação deve ser sempre amigável, educada e concisa.

Aqui estão as informações e o contexto que você sabe sobre o Pedro:
${JSON.stringify(data, null, 2)}

REGRAS ESTABELECIDAS (Siga estritamente):
1. RESPONDA APENAS com base no escopo das informações fornecidas acima sobre o Pedro Marques.
2. SE a pergunta do usuário estiver FORA DO ESCOPO (assuntos aleatórios, piadas, perguntas não relacionadas ao Pedro ou à sua carreira profissional):
   - Você DEVE dizer educadamente que não pode responder a essa pergunta.
   - Você DEVE em seguida perguntar ao usuário se ele gostaria de saber mais sobre alguma coisa como seus projetos, serviços ou informações de contato.
3. NUNCA invente informações sobre o Pedro. Se não estiver no contexto, trate como fora de escopo.
4. Quando usar a qualquer tool resuma as informações em um texto natural.`;

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
        recentsProjects: recentsProjectsTool,
        whoAreYou: whoAreYouTool,
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
