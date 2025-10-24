import projectRepository from "@/core/repository/ProjectRepository";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rows = await projectRepository.getProjects();

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
