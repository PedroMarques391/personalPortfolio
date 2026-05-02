import { default as ProjectRepository } from "@/app/api/repository/ProjectRepository";
import { AuthTokenService } from "@/app/api/services/AuthTokenService";
import { IProject } from "@/model/ProjectModel";
import { NextRequest, NextResponse } from "next/server";
import ProjectService from "../services/ProjectService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const role = searchParams.get("role");
    const page = Number(searchParams.get("page")) || 1;

    const projectRepository = new ProjectRepository();
    const projectService = new ProjectService(projectRepository);

    if (!role || role === "all") {
      const { rows, total } = await projectRepository.getProjects(page);

      return NextResponse.json(
        { success: true, projects: rows, total },
        { status: 200 },
      );
    }

    if (role === "user-projects") {
      const payload = await AuthTokenService.verifyToken(req);

      const projects = await projectService.getProjectsByUserId(
        payload.id as string,
      );

      return NextResponse.json(
        {
          success: true,
          projects,
          total: projects.length,
        },
        { status: 200 },
      );
    }

    throw new Error("Invalid role parameter.");
  } catch (error: any) {
    console.error("[get-projects] Error to get projects:", error.message);

    return NextResponse.json(
      {
        success: false,
        projects: [],
        message: "Erro ao carregar projetos.",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const projectRepository = new ProjectRepository();
  const projectService = new ProjectService(projectRepository);
  try {
    const payload = await AuthTokenService.verifyToken(req);
    const body: IProject = await req.json();
    const data = {
      ...body,
      user_id: payload.id as string,
    };

    const rows = await projectService.addProject(data);

    return NextResponse.json({ success: true, rows }, { status: 200 });
  } catch (error: any) {
    console.error("[add-project] Error to add project", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const projectRepository = new ProjectRepository();
  const projectService = new ProjectService(projectRepository);
  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id")!;

    await projectService.deleteProject(id);

    return NextResponse.json(
      { success: true, message: "Projeto deletado com sucesso." },
      { status: 200 },
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
      { status: 400 },
    );
  }
}
