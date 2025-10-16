import { MySQL } from "@/utils/database/connection";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const mysql = await MySQL();

    const query = `SELECT * FROM projects ORDER BY title ASC;`;
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
