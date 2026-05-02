import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface IProjectRepository {
  getProjects(page: number): Promise<{ rows: TProjectRow[]; total: number }>;
  getProjectsByUserId(userId: string): Promise<TProjectRow[]>;
  addProject(data: IProject): Promise<ResultSetHeader>;
  deleteProject(id: string | null): Promise<ResultSetHeader>;
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
