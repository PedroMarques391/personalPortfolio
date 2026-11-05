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

  const updateProject = useMutation({
    mutationFn: async ({
      id,
      data,
      image,
      currentImageURL,
    }: {
      id: number;
      data: ProjectData;
      image?: File | null;
      currentImageURL?: string;
    }) => {
      await Requests.updateProject(id, data, image, currentImageURL);
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

  return { deleteProject, createProject, updateProject };
}
