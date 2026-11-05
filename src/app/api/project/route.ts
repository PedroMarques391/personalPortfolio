import ProjectRepository from "@/app/api/repository/ProjectRepository";
import { AuthTokenService } from "@/app/api/services/AuthTokenService";
import { IProject, TProjectType } from "@/model/ProjectModel";
import { NextRequest, NextResponse } from "next/server";
import ProjectService from "../services/ProjectService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const role = searchParams.get("role");
    let page = Number(searchParams.get("page")) || 1;
    if (page < 1) page = 1;
    const rawType = searchParams.get("type");
    const rawSearch = searchParams.get("search");

    const type = (rawType ? rawType.toLowerCase() : "all") as TProjectType;
    const search = rawSearch ? rawSearch.trim() : "";

    const projectRepository = new ProjectRepository();
    const projectService = new ProjectService(projectRepository);

    if (!role || role === "all") {
      const { rows, total } = await projectService.getProjects(
        page,
        type,
        search,
      );

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
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[get-projects] Error to get projects:", errorMessage);

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

    const message = await projectService.addProject(data);

    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao adicionar projeto.";
    console.error("[add-project] Error to add project", error);
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  const projectRepository = new ProjectRepository();
  const projectService = new ProjectService(projectRepository);
  try {
    const payload = await AuthTokenService.verifyToken(req);

    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required query parameter: id.",
        },
        { status: 400 },
      );
    }

    const body: IProject = await req.json();
    const data = {
      ...body,
      user_id: payload.id as string,
    };

    const message = await projectService.updateProject(id, data);

    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao atualizar projeto.";
    console.error("[update-project] Error to update project", errorMessage);
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 400 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const projectRepository = new ProjectRepository();
  const projectService = new ProjectService(projectRepository);
  try {
    await AuthTokenService.verifyToken(req);

    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required query parameter: id.",
        },
        { status: 400 },
      );
    }

    await projectService.deleteProject(id);

    return NextResponse.json(
      { success: true, message: "Projeto deletado com sucesso." },
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro ao deletar projeto, tente novamente.";
    console.error("[delete-project] Error to delete project", errorMessage);
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 400 },
    );
  }
}
