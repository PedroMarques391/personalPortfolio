import { MySQL } from "@/utils/database/connection";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const mysql = await MySQL();

    const token = req.cookies.get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    const query = "DELETE FROM projects WHERE id = ?";

    const [rows]: any[] = await mysql.execute(query, [id]);

    if (!rows.affectedRows) {
      throw new Error(`Não existe um projeto com o id ${id}.`);
    }

    await mysql.end();

    return NextResponse.json(
      { success: true, message: "Projeto deletado com sucesso." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[delete-project] Error to delete project", error.message);
    return NextResponse.json(
      {
        success: false,
        message: error.message
          ? error.message
          : "Erro ao deletar projeto, tente novemente.",
      },
      { status: 500 }
    );
  }
}
