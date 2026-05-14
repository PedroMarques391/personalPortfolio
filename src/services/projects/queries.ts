import { TProjectType } from "@/model/ProjectModel";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Requests } from "../requests";

export function useProjects(
  role: "all" | "user-projects",
  page: number = 1,
  type: TProjectType = "all",
  searchTerm?: string,
) {
  return useQuery({
    queryKey: ["projects", role, page, type, searchTerm],
    queryFn: async () => {
      return await Requests.getProject(
        `/api/project?role=${role}&page=${page}&type=${type}${searchTerm ? `&search=${searchTerm}` : ""}`,
      );
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}
