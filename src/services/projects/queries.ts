import { useQuery } from "@tanstack/react-query";
import { Requests } from "../requests";

export function useAllProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      return await Requests.getProject("/api/project?role=all");
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}

export function useUserProjects() {
  return useQuery({
    queryKey: ["userProjects"],
    queryFn: async () => {
      return await Requests.getProject("/api/project?role=user-projects");
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}
