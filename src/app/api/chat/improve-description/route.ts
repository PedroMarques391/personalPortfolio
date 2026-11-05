import { AuthTokenService } from "@/app/api/services/AuthTokenService";
import {
  createOpenRouter,
  OpenRouterProvider,
} from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

interface ImproveDescriptionPayload {
  content: string;
  title?: string;
  type?: string;
  tags?: string;
  locale?: string;
}

export async function POST(req: NextRequest) {
  try {
    await AuthTokenService.verifyToken(req);

    const body: ImproveDescriptionPayload = await req.json();
    const draft = body.content?.trim();

    if (!draft) {
      return NextResponse.json(
        {
          success: false,
          message: "Digite um rascunho na descrição antes de melhorar.",
        },
        { status: 400 },
      );
    }

    const openrouter: OpenRouterProvider = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
      appName: "portifolio",
      appUrl: "https://pedromarques.dev.br",
    });

    const isEnglish = body.locale === "en";

    const { text } = await generateText({
      model: openrouter("openai/gpt-4o-mini"),
      temperature: 0.6,
      maxOutputTokens: 320,
      system: isEnglish
        ? "You are Ada.ai, the AI assistant for Pedro Marques's full-stack developer portfolio. Rewrite and improve the provided project description so it reads clearly, professionally, and concisely (2 to 3 impactful sentences, up to ~280 characters). Do NOT use markdown formatting, quotes, bullet points, or emojis. Output ONLY the improved description text in the same language as the input (or English if requested)."
        : "Você é a Ada.ai, a assistente de IA do portfólio do desenvolvedor full-stack Pedro Marques. Reescreva e aprimore a descrição de projeto enviada para que fique profissional, clara, fluida e objetiva (2 a 3 frases impactantes, até ~280 caracteres). NÃO use formatação markdown, aspas, listas ou emojis. Retorne APENAS o texto final aprimorado no mesmo idioma do rascunho.",
      prompt: `Título do projeto: ${body.title || "Não informado"}
Categoria: ${body.type || "web"}
Tecnologias: ${body.tags || "Não informadas"}
Rascunho atual da descrição:
${draft}`,
    });

    return NextResponse.json(
      {
        success: true,
        content: text.trim().replace(/^["']|["']$/g, ""),
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("[improve-description] Error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Não foi possível aprimorar a descrição no momento.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
