import MySQL from "@/database/connection";
import {
  IProject,
  IProjectRepository,
  TProjectRow,
  TProjectType,
} from "@/model/ProjectModel";
import { ResultSetHeader } from "mysql2";

class ProjectRepository implements IProjectRepository {
  async getProjects(
    page: number,
    type: TProjectType,
  ): Promise<{ rows: TProjectRow[]; total: number }> {
    const offset = (page - 1) * 8;
    const query = `SELECT *, COUNT(*) OVER() AS total FROM projects WHERE (? = 'all' OR type = ?) ORDER BY title ASC 
    LIMIT 8 OFFSET ${offset}`;

    const [rows] = await MySQL.execute<TProjectRow[]>(query, [type, type]);
    const total = rows.length > 0 ? (rows[0].total ?? 0) : 0;
    console.log(
      "Total projects:",
      rows.map((row) => row.title),
    );
    return { rows, total };
  }

  async getProjectsByUserId(userId: string): Promise<TProjectRow[]> {
    const query = "SELECT * FROM projects WHERE user_id = ? ORDER BY title ASC";
    const [rows] = await MySQL.execute<TProjectRow[]>(query, [userId]);

    return rows;
  }

  async addProject(data: IProject): Promise<ResultSetHeader> {
    const query = `INSERT INTO projects (title, content, type, tags, url, imageURL, user_id) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const [rows] = await MySQL.execute<ResultSetHeader>(query, [
      data.title,
      data.content,
      data.type,
      data.tags,
      data.url,
      data.imageURL,
      data.user_id,
    ]);

    return rows;
  }

  async deleteProject(id: string): Promise<ResultSetHeader> {
    const query = "DELETE FROM projects WHERE id = ?";

    const [rows] = await MySQL.execute<ResultSetHeader>(query, [id]);

    return rows;
  }
}

export default ProjectRepository;
