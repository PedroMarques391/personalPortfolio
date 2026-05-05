"use client";
import Skeleton from "@/components/Motions/Skeleton";
import { Button } from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectsNotFound from "@/components/ui/ProjectsNotFound";
import SectionHeader from "@/components/ui/SectionHeader";
import { useProjects } from "@/services/projects/queries";
import { Requests } from "@/services/requests";
import { buttonsValues } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";

export interface IProjectInterface {
  id: number;
  imageURL: string;
  title: string;
  type: string;
  content: React.ReactNode;
  tags: string;
  url: string;
}

type ViewMode = "grid" | "list";

const ProjectsPage = (): React.JSX.Element => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;
  const rawViewMode = searchParams.get("view") as ViewMode;
  const view: ViewMode =
    rawViewMode === "grid" || rawViewMode === "list" ? rawViewMode : "grid";
  const [activeButton, setActiveButton] = useState<number>(0);
  const [filter, setFilter] = useState<string>("Todos");
  const queryClient = useQueryClient();

  const { data, isLoading: loading } = useProjects("all", currentPage);

  const projects = data?.projects || [];
  const total = data?.total || 1;
  const totalPages = Math.ceil(total / 8);

  const filteredProjects = useMemo(() => {
    if (filter === "Todos") return projects;
    const filterProjects = projects.filter(
      (project: IProjectInterface) =>
        project.type.toLowerCase() === filter.toLowerCase(),
    );
    return filterProjects;
  }, [projects, filter]);

  const handleFilter = (rule: string, index: number) => {
    setActiveButton(index);
    setFilter(rule);
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
          `/api/project?role=all&page=${nextPage}`,
        );
      },
    });
  }, [currentPage, queryClient, totalPages]);

  const toggleView = () => {
    const nextView = view === "grid" ? "list" : "grid";
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", nextView);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full h-full text-gray-soft flex flex-col justify-center items-center mt-10 mx-auto">
      <SectionHeader title="Projetos" subtitle="Um pouco do meu trabalho" />
      <div className="flex flex-wrap justify-center gap-5 mt-10 w-[90%] mx-auto ">
        {buttonsValues.map((button, index) => (
          <Button
            key={index}
            onClick={() => handleFilter(button.title, index)}
            styles={`uppercase bg-gray-light rounded-md w-auto border text-[12px] md:text-sm
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

      <div className="my-6 p-5 space-x-2 w-full flex justify-around items-center">
        <div className="space-x-2">
          {total > 0 ? (
            [...Array(totalPages)].map((_, index) => (
              <Link
                prefetch
                title={`Página ${index + 1}`}
                about={`pagination-link-${index + 1}`}
                href={{
                  pathname: "/projects",
                  query: { page: index + 1, view },
                }}
                key={index}
                className={`bg-gray-light py-2 px-4 rounded-xl text-sm md:text-xl ${
                  currentPage === index + 1
                    ? " border-2 border-orange-500 text-orange-500"
                    : ""
                }`}
                onClick={(e) => {
                  e.currentTarget.blur();
                  setFilter("Todos");
                  setActiveButton(0);
                }}
              >
                {index + 1}
              </Link>
            ))
          ) : (
            <Link
              href={{ pathname: "/projects", query: { page: 1, view } }}
              className={
                "bg-gray-light py-2 px-4 rounded-xl text-sm md:text-xl"
              }
              onClick={() => {
                setFilter("Todos");
                setActiveButton(0);
              }}
            >
              {loading ? "..." : "1"}
            </Link>
          )}
        </div>

        <button
          onClick={toggleView}
          className={`bg-gray-light py-2 px-4 rounded-xl  `}
          aria-label="Toggle view"
          title={`Visualização em ${view === "grid" ? "lista" : "grade"}`}
        >
          {view === "grid" ? <CiGrid2H size={24} /> : <CiGrid41 size={24} />}
        </button>
      </div>

      <div
        className={`grid ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1"} gap-x-4 gap-y-6 mb-10 w-full `}
      >
        {loading ? (
          <AnimatePresence mode="popLayout">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} index={i} view={view} />
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
                view={view}
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
