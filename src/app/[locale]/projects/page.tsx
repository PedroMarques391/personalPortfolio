"use client";
import Skeleton from "@/components/Motions/Skeleton";
import CategoryFilterPills from "@/components/ui/CategoryFilterPills";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectsNotFound from "@/components/ui/ProjectsNotFound";
import SectionHeader from "@/components/ui/SectionHeader";
import ViewModeToggle, { ViewMode } from "@/components/ui/ViewModeToggle";
import { useDebounce } from "@/hooks/useDebounce";
import {
  IProjectInterface,
  PROJECT_FILTER_OPTIONS,
  TProjectType,
} from "@/model/ProjectModel";
import { useProjects } from "@/services/projects/queries";
import { Requests } from "@/services/requests";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";

const ProjectsPage = (): React.JSX.Element => {
  const t = useTranslations("pages.projects");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;
  const rawViewMode = searchParams.get("view") as ViewMode;
  const rawFilter = searchParams.get("type") as TProjectType;
  const rawSearch = searchParams.get("search") || "";
  const filter = !PROJECT_FILTER_OPTIONS.includes(
    rawFilter?.toLowerCase() as TProjectType,
  )
    ? "all"
    : (rawFilter as TProjectType);
  const view: ViewMode =
    rawViewMode === "grid" || rawViewMode === "list" ? rawViewMode : "grid";
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

  const handleViewChange = useCallback(
    (nextView: ViewMode) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("view", nextView);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const handleFilter = useCallback(
    (rule: TProjectType) => {
      setSearchTerm("");
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      params.set("page", "1");
      params.set("type", rule.toLowerCase());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const prefetchFilter = useCallback(
    (filterType: TProjectType) => {
      const type = filterType === "all" ? "all" : filterType.toLowerCase();
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
    },
    [queryClient],
  );

  const handleSearch = useCallback(() => {
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
  }, [debouncedSearchTerm, pathname, router, searchParams]);

  return (
    <div className="w-full h-full text-gray-soft flex flex-col justify-center items-center mt-10 mx-auto">
      <SectionHeader as="h1" title={t("title")} subtitle={t("subtitle")} />

      <CategoryFilterPills
        activeFilter={filter}
        onSelectFilter={handleFilter}
        onPrefetchFilter={prefetchFilter}
        allLabel={t("filterAll")}
        layoutId="projects-filter-pill"
        className="justify-center md:gap-4 mt-10 w-[90%] mx-auto"
      />

      <div className="my-6 w-[90%] mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
        <div className="flex justify-start space-x-2 order-2 md:order-1 col-span-1">
          {total > 0 ? (
            [...Array(totalPages)].map((_, index) => (
              <Link
                prefetch
                aria-current={currentPage === index + 1 ? "page" : undefined}
                title={t("paginationTitle", { page: index + 1 })}
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
            >
              {loading ? "..." : "1"}
            </Link>
          )}
        </div>

        <div className="flex justify-center items-center bg-gray-light p-2 rounded-xl order-1 md:order-2 col-span-2 md:col-span-1 shadow-sm gap-1">
          <input
            aria-label={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="h-10 rounded-l-lg border border-gray-400 focus:border-orange-600 active:border-orange-600 focus:outline-orange-600 focus:ring-0 focus:outline bg-transparent text-sm md:text-base w-full px-3"
            type="search"
            placeholder={t("searchPlaceholder")}
          />
          <button
            disabled={!searchTerm.trim()}
            type="button"
            aria-label={t("searchPlaceholder")}
            className={`h-10 w-12 bg-orange-600 rounded-r-lg flex justify-center items-center transition-opacity duration-300 ${!searchTerm.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-700"}`}
            onClick={handleSearch}
          >
            <CgSearch size={20} color="#FFF" />
          </button>
        </div>

        <div className="flex justify-end order-3 md:order-3 col-span-1">
          <ViewModeToggle
            view={view}
            onChange={handleViewChange}
            variant="single"
            ariaLabel={t("toggleViewAriaLabel")}
            gridLabel={t("viewModeGrid")}
            listLabel={t("viewModeList")}
          />
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
            {projects.map((project: IProjectInterface, index: number) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                src={project.imageURL}
                tags={project.tags}
                type={project.type}
                title={project.title}
                url={project.url}
                view={view}
                priority={index < 2}
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
