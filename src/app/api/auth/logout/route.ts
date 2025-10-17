import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("token");

    return NextResponse.json(
      { success: true, message: "Logout realizado com sucesso." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[logout] Error to logout", error.message);
    return NextResponse.json(
      { success: false, message: "Erro ao fazer logout." },
      { status: 500 }
    );
  }
}
