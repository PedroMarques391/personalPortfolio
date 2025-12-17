import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Requests } from "../requests";

export function useProjects(filter: "all" | "user-projects", page: number = 1) {
  return useQuery({
    queryKey: ["projects", filter, page],
    queryFn: async () => {
      return await Requests.getProject(
        `/api/project?role=${filter}&page=${page}`
      );
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}
