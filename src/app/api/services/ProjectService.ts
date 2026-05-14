import {
  IProject,
  IProjectRepository,
  TProjectRow,
  TProjectType,
} from "@/model/ProjectModel";

class ProjectService {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async getProjects(
    page: number = 1,
    type: TProjectType = "all",
    searchTerm: string = "",
  ): Promise<{ rows: TProjectRow[]; total: number }> {
    return this.projectRepository.getProjects(page, type, searchTerm);
  }

  async getProjectsByUserId(userId: string): Promise<TProjectRow[]> {
    if (!userId) {
      throw new Error("userId is required");
    }
    const results = await this.projectRepository.getProjectsByUserId(userId);

    if (results.length === 0) {
      throw new Error("Nenhum projeto encontrado para este usuário");
    }
    return results;
  }

  async addProject(data: IProject): Promise<string> {
    if (!data) {
      throw new Error("Project data is required");
    }
    const project = await this.projectRepository.addProject(data);
    return `Project added successfully with id ${project.insertId}.`;
  }

  async deleteProject(id: string): Promise<string> {
    if (!id) {
      throw new Error("id is required");
    }
    const deletedProject = await this.projectRepository.deleteProject(id);

    if (!deletedProject.affectedRows) {
      throw new Error(`Project with id ${id} not exists.`);
    }

    return `Project with id ${id} deleted successfully.`;
  }
}

export default ProjectService;
