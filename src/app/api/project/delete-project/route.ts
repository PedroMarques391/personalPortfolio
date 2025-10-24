import projectRepository from "@/core/repository/ProjectRepository";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    await projectRepository.deleteProject(id);

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
      { status: 400 }
    );
  }
}
