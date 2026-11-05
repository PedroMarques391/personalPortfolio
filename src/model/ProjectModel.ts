import { ResultSetHeader, RowDataPacket } from "mysql2";

export type TProjectCategory = "web" | "mobile" | "automações" | "api";

export type TProjectType = "all" | TProjectCategory;

export const PROJECT_FILTER_OPTIONS: readonly TProjectType[] = [
  "all",
  "web",
  "mobile",
  "api",
  "automações",
] as const;

export type GetProjectsResponse = { rows: TProjectRow[]; total: number };

export interface IProjectRepository {
  getProjects(
    page: number,
    type: TProjectType,
    searchTerm: string,
  ): Promise<GetProjectsResponse>;
  getProjectsByUserId(userId: string): Promise<TProjectRow[]>;
  addProject(data: IProject): Promise<ResultSetHeader>;
  updateProject(id: string, data: IProject): Promise<ResultSetHeader>;
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

export interface IProjectInterface {
  id: number;
  imageURL: string;
  title: string;
  type: TProjectCategory;
  content: string;
  tags: string;
  url: string;
}

export type TProjectRow = IProject & RowDataPacket;

