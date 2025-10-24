import projectRepository from "@/core/repository/ProjectRepository";
import { AuthTokenService } from "@/core/services/AuthTokenService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const payload = await AuthTokenService.verifyToken(req);

    const rows = await projectRepository.getProjectsByUserId(
      payload.id as string
    );

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
