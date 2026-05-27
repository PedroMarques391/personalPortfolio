"use client";
import Skeleton from "@/components/Motions/Skeleton";
import { Button } from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectsNotFound from "@/components/ui/ProjectsNotFound";
import SectionHeader from "@/components/ui/SectionHeader";
import { useDebounce } from "@/hooks/useDebounce";
import { TProjectType } from "@/model/ProjectModel";
import { useProjects } from "@/services/projects/queries";
import { Requests } from "@/services/requests";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
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

const validFilters = ["all", "web", "mobile", "api", "automações"];

const ProjectsPage = (): React.JSX.Element => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;
  const rawViewMode = searchParams.get("view") as ViewMode;
  const rawFilter = searchParams.get("type") as TProjectType;
  const rawSearch = searchParams.get("search") || "";
  const filter = !validFilters.includes(rawFilter?.toLowerCase())
    ? "all"
    : (rawFilter as TProjectType);
  const view: ViewMode =
    rawViewMode === "grid" || rawViewMode === "list" ? rawViewMode : "grid";
  const [activeButton, setActiveButton] = useState<number>(0);
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState(rawSearch);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading: loading } = useProjects(
    "all",
    currentPage,
    filter,
    debouncedSearchTerm,
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentSearch = params.get("search") || "";

    if (debouncedSearchTerm === currentSearch) return;

    if (debouncedSearchTerm.trim()) {
      params.set("search", debouncedSearchTerm.trim());
      params.set("type", "all");
      setActiveButton(0);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearchTerm, pathname, router, searchParams]);

  const projects = data?.projects || [];
  const total = data?.total || 1;
  const totalPages = Math.ceil(total / 8);

  useEffect(() => {
    const nextPage = currentPage + 1;
    const nextQuery = ["projects", "all", nextPage, filter, ""];

    if (nextPage > totalPages) return;

    if (queryClient.getQueryData(nextQuery)) return;
    queryClient.prefetchQuery({
      queryKey: nextQuery,
      staleTime: 1000 * 60 * 5,
      queryFn: async () => {
        return await Requests.getProject(
          `/api/project?role=all&page=${nextPage}&type=${filter}`,
        );
      },
    });
  }, [currentPage, queryClient, totalPages, filter]);

  const toggleView = () => {
    const nextView = view === "grid" ? "list" : "grid";
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", nextView);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleFilter = (rule: string, index: number) => {
    setActiveButton(index);
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");
    params.set("type", rule.toLowerCase());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const prefetchFilter = (filterType: string) => {
    const type = filterType === "Todos" ? "all" : filterType.toLowerCase();
    const queryKey = ["projects", "all", 1, type, ""];

    if (!queryClient.getQueryData(queryKey)) {
      queryClient.prefetchQuery({
        queryKey,
        staleTime: 1000 * 60 * 5,
        queryFn: async () => {
          return await Requests.getProject(
            `/api/project?role=all&page=1&type=${type}`,
          );
        },
      });
    }
  };

  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString());
    const currentSearch = params.get("search") || "";

    if (debouncedSearchTerm === currentSearch) return;

    if (debouncedSearchTerm.trim()) {
      params.set("search", debouncedSearchTerm.trim());
    } else {
      params.delete("search");
    }
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="w-full h-full text-gray-soft flex flex-col justify-center items-center mt-10 mx-auto">
      <SectionHeader title="Projetos" subtitle="Um pouco do meu trabalho" />
      <div className="flex flex-wrap justify-center gap-3 md:gap-5 mt-10 w-[90%] mx-auto">
        {validFilters.map((filter, index) => (
          <Button
            key={index}
            onClick={() => handleFilter(filter, index)}
            onMouseEnter={() => prefetchFilter(filter)}
            onTouchStart={() => prefetchFilter(filter)}
            styles={`uppercase bg-gray-light rounded-md w-auto border text-[12px] md:text-sm
                    ${
                      activeButton === index
                        ? "scale-110 font-bold text-white"
                        : "border-transparent text-gray-dark"
                    } 
                    py-2 transition duration-300`}
            duration={index * 0.2}
          >
            {filter === "all" ? "Todos" : filter}
          </Button>
        ))}
      </div>

      <div className="my-6 w-[90%] mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
        <div className="flex justify-start space-x-2 order-2 md:order-1 col-span-1">
          {total > 0 ? (
            [...Array(totalPages)].map((_, index) => (
              <Link
                prefetch
                title={`Página ${index + 1}`}
                about={`pagination-link-${index + 1}`}
                href={{
                  pathname: "/projects",
                  query: {
                    page: index + 1,
                    type: filter,
                    view,
                    ...(rawSearch && { search: rawSearch }),
                  },
                }}
                key={index}
                className={`bg-gray-light flex items-center justify-center h-10 px-4 rounded-xl text-sm md:text-xl transition-colors ${
                  currentPage === index + 1
                    ? "border-2 border-orange-500 text-orange-500"
                    : " hover:text-orange-500"
                }`}
                onClick={(e) => {
                  e.currentTarget.blur();
                  setActiveButton(0);
                }}
              >
                {index + 1}
              </Link>
            ))
          ) : (
            <Link
              href={{
                pathname: "/projects",
                query: {
                  page: 1,
                  type: filter,
                  view,
                  ...(rawSearch && { search: rawSearch }),
                },
              }}
              className="bg-gray-light flex items-center justify-center h-10 px-4 rounded-xl text-sm md:text-xl transition-colors hover:bg-gray-200"
              onClick={() => {
                setActiveButton(0);
              }}
            >
              {loading ? "..." : "1"}
            </Link>
          )}
        </div>

        <div className="flex justify-center items-center bg-gray-light p-2 rounded-xl order-1 md:order-2 col-span-2 md:col-span-1 shadow-sm gap-1">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="h-10 rounded-l-lg border border-gray-400 focus:border-orange-600 active:border-orange-600 focus:outline-orange-600 focus:ring-0 focus:outline bg-transparent text-sm md:text-base w-full px-3"
            type="text"
            placeholder="Buscar projeto..."
          />
          <button
            disabled={!searchTerm.trim()}
            type="button"
            className={`h-10 w-12 bg-orange-600 rounded-r-lg flex justify-center items-center transition-opacity duration-300 ${!searchTerm.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-700"}`}
            onClick={handleSearch}
          >
            <CgSearch size={20} color="#FFF" />
          </button>
        </div>

        <div className="flex justify-end order-3 md:order-3 col-span-1">
          <button
            onClick={toggleView}
            className="bg-gray-light h-10 px-4 rounded-xl flex items-center justify-center transition-colors hover:text-orange-500 shadow-sm border-2 border-transparent hover:border-orange-500 duration-300"
            aria-label="Toggle view"
            title={`Visualização em ${view === "grid" ? "lista" : "grade"}`}
          >
            {view === "grid" ? <CiGrid2H size={24} /> : <CiGrid41 size={24} />}
          </button>
        </div>
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
            {projects.map((project: IProjectInterface) => (
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
        {!loading && projects.length === 0 && <ProjectsNotFound />}
      </div>
    </div>
  );
};

export default ProjectsPage;
