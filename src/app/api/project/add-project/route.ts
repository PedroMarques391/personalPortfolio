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
