import { ProjectData } from "@/validations/project.scheme";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Requests } from "../requests";

export function useMutationProjects() {
  const queryClient = useQueryClient();

  const deleteProject = useMutation({
    mutationFn: async (id: number) => await Requests.deleteProject(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["userProjects"],
      });
    },
  });

  const createProject = useMutation({
    mutationFn: async ({ data, image }: { data: ProjectData; image: File }) => {
      const res = await Requests.createProject(data, image);
      console.log(res);
      return res.rows;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["userProjects"] }),
        queryClient.invalidateQueries({ queryKey: ["projects"] }),
      ]);
    },
  });

  return { deleteProject, createProject };
}
