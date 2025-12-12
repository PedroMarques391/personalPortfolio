import imageToBase64 from "@/utils/functions/imageToBase64";
import { ProjectData } from "@/validations/project.scheme";

export class Requests {
  private static readonly _urlBase: string = "/api/project";

  static async getProject(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("[fetchProjects] error to get projects", error);
    }
  }

  static async createProject(data: ProjectData, image: File) {
    const base64 = await imageToBase64(image);

    const response = await fetch(this._urlBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, imageURL: base64 }),
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar o projeto. Tente novamente.");
    }

    return await response.json();
  }

  static async deleteProject(id: number) {
    try {
      const response = await fetch(`${this._urlBase}?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("[fetchProjects] error to get projects", error);
    }
  }
}
