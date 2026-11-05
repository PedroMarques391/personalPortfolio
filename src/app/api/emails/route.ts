import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "./utils/mail.utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, name, phone, message } = body;

    await sendEmail(email, name, phone, message);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao enviar email." },
      { status: 500 },
    );
  }
}
