import { IProjectInterface } from "@/app/api/project/route";
import MySQL from "@/database/connection";

class ProjectRepository {
  async getProjects() {
    const query = `SELECT * FROM projects ORDER BY title ASC;`;
    const [rows]: any[] = await MySQL.execute(query);

    return rows;
  }

  async getProjectsByUserId(userId: string) {
    const query = "SELECT * FROM projects WHERE user_id = ? ORDER BY title ASC";
    const [rows]: any[] = await MySQL.execute(query, [userId]);

    if (rows.length === 0) {
      throw new Error("Nenhum projeto encontrado para este usuário");
    }
    return rows;
  }

  async addProject(data: IProjectInterface) {
    const query = `INSERT INTO projects (title, content, type, tags, url, imageURL, user_id) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const [rows]: any[] = await MySQL.execute(query, [
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

  async deleteProject(id: string | null) {
    if (!id) {
      throw new Error("id is required");
    }
    const query = "DELETE FROM projects WHERE id = ?";

    const [rows]: any[] = await MySQL.execute(query, [id]);

    if (!rows.affectedRows) {
      throw new Error(`Não existe um projeto com o id ${id}.`);
    }

    return rows;
  }
}

const projectRepository = new ProjectRepository();

export default projectRepository;
