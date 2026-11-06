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
      maxOutputTokens: 120,
      system: isEnglish
        ? "You are Ada.ai, the AI assistant for Pedro Marques's full-stack developer portfolio. Rewrite and enhance the provided project description so it reads clearly, professionally, and impactfully. CRITICAL CONSTRAINT: The database column is TINYTEXT (absolute maximum 255 characters). Your output MUST NOT exceed 250 characters (target between 160 and 230 characters). Do NOT use markdown, quotes, bullet points, or emojis. Return ONLY the final improved text in the requested language."
        : "Você é a Ada.ai, a assistente de IA do portfólio do desenvolvedor full-stack Pedro Marques. Reescreva e aprimore a descrição de projeto enviada para que fique profissional, clara, fluida e impactante. RESTRIÇÃO CRÍTICA: A coluna do banco de dados é TINYTEXT (limite absoluto de 255 caracteres). Sua resposta NÃO PODE ultrapassar 250 caracteres (mire entre 160 e 230 caracteres). NÃO use formatação markdown, aspas, listas ou emojis. Retorne APENAS o texto final aprimorado no mesmo idioma do rascunho.",
      prompt: `Título do projeto: ${body.title || "Não informado"}
Categoria: ${body.type || "web"}
Tecnologias: ${body.tags || "Não informadas"}
Rascunho atual da descrição:
${draft}`,
    });

    let cleaned = text.trim().replace(/^["']|["']$/g, "").trim();
    if (cleaned.length > 255) {
      const sub = cleaned.slice(0, 255);
      const lastSpace = sub.lastIndexOf(" ");
      cleaned = lastSpace > 200 ? sub.slice(0, lastSpace) + "." : sub;
    }

    return NextResponse.json(
      {
        success: true,
        content: cleaned,
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
