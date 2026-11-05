import { ProjectData } from "@/validations/project.scheme";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Requests } from "../requests";

export function useMutationProjects() {
  const queryClient = useQueryClient();

  const deleteProject = useMutation({
    mutationFn: async (id: number) => await Requests.deleteProject(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      return;
    },
  });

  const createProject = useMutation({
    mutationFn: async ({ data, image }: { data: ProjectData; image: File }) => {
      await Requests.createProject(data, image);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      return;
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error(error.message);
      }
    },
  });

  return { deleteProject, createProject };
}
