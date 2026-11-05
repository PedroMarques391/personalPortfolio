import imageToBase64 from "@/utils/imageToBase64";
import { ProjectData } from "@/validations/project.scheme";

export class Requests {
  private static readonly _urlBase: string = "/api/project";

  static async getProject(url: string) {
    try {
      const resolvedUrl =
        typeof window === "undefined" && url.startsWith("/")
          ? `${process.env.NEXT_PUBLIC_URL_BASE || "http://localhost:3000"}${url}`
          : url;

      const response = await fetch(resolvedUrl);
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      return data;
    } catch {
      return {
        success: false,
        message: "Erro ao buscar os projetos. Tente novamente.",
        projects: [],
      };
    }
  }

  static async createProject(data: ProjectData, image: File) {
    const base64 = await imageToBase64(image);

    const response = await fetch(this._urlBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, imageURL: base64 }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  }

  static async updateProject(
    id: number,
    data: ProjectData,
    image?: File | null,
    currentImageURL?: string,
  ) {
    const imageURL = image ? await imageToBase64(image) : currentImageURL;

    const response = await fetch(`${this._urlBase}?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, imageURL }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  }

  static async deleteProject(id: number) {
    const response = await fetch(`${this._urlBase}?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  }
}
