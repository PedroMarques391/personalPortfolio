import { MySQL } from "@/utils/database/connection";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      throw new Error("Erro ao carregar projetos, usuário não autenticado.", {
        cause: 401,
      });
    }

    const { payload } = await jwtVerify(token, secret);

    const mysql = await MySQL();

    const query = `SELECT * FROM projects WHERE user_id = '${payload.id}' ORDER BY title ASC;`;

    const [rows]: any[] = await mysql.execute(query);

    await mysql.end();

    return NextResponse.json(
      { success: true, projects: rows },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[get-projects] Error to get projects", error.message);

    return NextResponse.json(
      { success: false, projects: [], message: "Erro ao carregar projetos." },
      { status: 500 }
    );
  }
}
