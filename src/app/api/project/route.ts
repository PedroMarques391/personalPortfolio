import projectRepository from "@/core/repository/ProjectRepository";
import { AuthTokenService } from "@/core/services/AuthTokenService";
import { NextRequest, NextResponse } from "next/server";

export interface IProjectInterface {
  imageURL: string;
  title: string;
  type: string;
  content: React.ReactNode;
  tags: string;
  url: string;
  user_id: string;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const role = searchParams.get("role");

    let rows;

    if (role === "all") {
      rows = await projectRepository.getProjects();
    }

    if (role === "user-projects") {
      const payload = await AuthTokenService.verifyToken(req);
      rows = await projectRepository.getProjectsByUserId(payload.id as string);
    }
    return NextResponse.json(
      { success: true, projects: rows },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
        },
      }
    );
  } catch (error: any) {
    console.error("[get-projects] Error to get projects", error.message);

    return NextResponse.json(
      { success: false, projects: [], message: "Erro ao carregar projetos." },
      {
        status: 500,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
        },
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await AuthTokenService.verifyToken(req);
    const body: IProjectInterface = await req.json();
    const data = {
      ...body,
      user_id: payload.id as string,
    };

    const rows = await projectRepository.addProject(data);

    return NextResponse.json({ success: true, rows }, { status: 200 });
  } catch (error) {
    console.error("[add-project] Error to add project", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

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
