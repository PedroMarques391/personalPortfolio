import z from "zod";
import ProjectRepository from "../repository/ProjectRepository";
import ProjectService from "../services/ProjectService";

const whoAreYouTool = {
  description:
    "Get background information about who Ada is and send with summary.",
  inputSchema: z.object({
    response: z
      .string()
      .describe("The role or identity to provide information about"),
  }),

  execute: async ({ response }: { response: string }) => {
    return {
      response,
      name: "Ada",
      creator: "Pedro Marques",
      origin: "Inspirada em um bot de WhatsApp",
      role: "Assistente de IA",
    };
  },
};

const recentsProjectsTool = {
  description:
    "You must provide a summary of your main projects when requested.",
  inputSchema: z.object({
    answer: z
      .string()
      .describe(
        "message that needs to be answered with the projects information",
      ),
  }),
  execute: async ({ answer }: { answer: string }) => {
    const projectRepository = new ProjectRepository();
    const projectSercice = new ProjectService(projectRepository);
    const { rows } = await projectSercice.getProjects(1);
    const lastProjecs = rows
      .slice(0, 4)
      .map((project) => {
        const basicInfo =
          project.content.length > 120
            ? project.content.substring(0, 120) + "..."
            : project.content;
        return `🔹 **${project.title}**\n${basicInfo}\n🔗 URL: ${project.url}`;
      })
      .join("\n\n");

    return {
      answer,
      lastProjecs,
    };
  },
};

export { recentsProjectsTool, whoAreYouTool };
