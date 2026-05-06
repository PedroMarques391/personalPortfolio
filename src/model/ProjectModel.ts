import { ResultSetHeader, RowDataPacket } from "mysql2";

export type TProjectType = "all" | "web" | "mobile" | "automações" | "api";

export interface IProjectRepository {
  getProjects(
    page: number,
    type: TProjectType,
  ): Promise<{ rows: TProjectRow[]; total: number }>;
  getProjectsByUserId(userId: string): Promise<TProjectRow[]>;
  addProject(data: IProject): Promise<ResultSetHeader>;
  deleteProject(id: string): Promise<ResultSetHeader>;
}

export interface IProject {
  id?: string;
  imageURL: string;
  title: string;
  type: string;
  content: string;
  tags: string;
  url: string;
  user_id: string;
  total?: number;
}

export type TProjectRow = IProject & RowDataPacket;
