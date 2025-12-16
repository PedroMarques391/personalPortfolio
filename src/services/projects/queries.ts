import { useQuery } from "@tanstack/react-query";
import { Requests } from "../requests";

export function useProjects(filter: "all" | "user-projects") {
  return useQuery({
    queryKey: ["projects", filter],

    queryFn: async () => {
      return await Requests.getProject(`/api/project?role=${filter}`);
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}
