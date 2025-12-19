"use client";
import Skeleton from "@/components/Motions/Skeleton";
import { Button } from "@/components/UI/Button";
import ProjectCard from "@/components/UI/ProjectCard";
import ProjectsNotFound from "@/components/UI/ProjectsNotFound";
import SectionHeader from "@/components/UI/SectionHeader";
import { useProjects } from "@/services/projects/queries";
import { Requests } from "@/services/requests";
import { buttonsValues } from "@/utils/projects";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export interface IProjectInterface {
  id: number;
  imageURL: string;
  title: string;
  type: string;
  content: React.ReactNode;
  tags: string;
  url: string;
}

const ProjectsPage = (): React.JSX.Element => {
  const params = Number(useSearchParams().get("page")) || 1;
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(params);
  const [filter, setFilter] = useState<string>("Todos");
  const queryClient = useQueryClient();

  const { data, isLoading: loading } = useProjects("all", currentPage);

  const projects = data?.projects || [];
  const total = data?.total;
  const totalPages = Math.ceil(total / 8);

  const filteredProjects = useMemo(() => {
    if (filter === "Todos") return projects;
    const filterProjects = projects.filter(
      (project: IProjectInterface) =>
        project.type.toLowerCase() === filter.toLowerCase()
    );
    return filterProjects;
  }, [projects, filter]);

  const handleFilter = (rule: string, index: number) => {
    setActiveButton(index);
    setFilter(rule);
  };

  const handlePage = (page: number) => {
    setFilter("Todos");
    setActiveButton(0);

    if (page === currentPage) return;
    router.push(`/projects?page=${page}`, { scroll: false });
    setCurrentPage(page);
  };

  useEffect(() => {
    const nextPage = currentPage + 1;
    const nextQuery = ["projects", "all", nextPage];
    if (nextPage > totalPages) return;
    if (queryClient.getQueryData(nextQuery)) return;
    queryClient.prefetchQuery({
      queryKey: nextQuery,
      staleTime: 1000 * 60 * 5,
      queryFn: async () => {
        return await Requests.getProject(
          `/api/project?role=all&page=${nextPage}`
        );
      },
    });
  }, [currentPage, queryClient]);

  return (
    <div className="w-full h-full text-gray-soft flex flex-col justify-center items-center mt-10 mx-auto">
      <SectionHeader title="Projetos" subtitle="Um pouco do meu trabalho" />
      <div className="flex flex-wrap justify-center gap-5 mt-10 w-[90%] mx-auto ">
        {buttonsValues.map((button, index) => (
          <Button
            key={index}
            onClick={() => handleFilter(button.title, index)}
            styles={`uppercase bg-gray-light rounded-md w-auto border 
                    ${
                      activeButton === index
                        ? "scale-110 font-bold text-white"
                        : "border-transparent text-gray-dark"
                    } 
                    py-2 transition duration-300`}
            duration={button.duration}
          >
            {button.title}
          </Button>
        ))}
      </div>

      <div className="my-6 p-5 space-x-2">
        {total > 0 ? (
          [...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`bg-gray-light py-2 px-4 rounded-xl text-xl ${
                currentPage === index + 1
                  ? "border border-orange-500 text-orange-500"
                  : ""
              }`}
              onClick={(e) => {
                e.currentTarget.blur();
                handlePage(index + 1);
              }}
            >
              {index + 1}
            </button>
          ))
        ) : (
          <button
            className={"bg-gray-light py-2 px-4 rounded-xl text-xl"}
            onClick={() => handlePage(1)}
          >
            {loading ? "..." : "1"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 mb-10 w-full ">
        {loading ? (
          <AnimatePresence mode="popLayout">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} index={i} />
            ))}
          </AnimatePresence>
        ) : (
          <>
            {filteredProjects.map((project: IProjectInterface) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                src={project.imageURL}
                tags={project.tags}
                type={project.type}
                title={project.title}
                url={project.url}
              >
                {project.content}
              </ProjectCard>
            ))}
          </>
        )}
        {!loading &&
          (projects.length === 0 || filteredProjects.length === 0) && (
            <ProjectsNotFound />
          )}
      </div>
    </div>
  );
};

export default ProjectsPage;
