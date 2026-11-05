"use client";

import AdminLayout from "@/components/Layout/AdminLayout";
import Skeleton from "@/components/Motions/Skeleton";
import CategoryFilterPills from "@/components/ui/CategoryFilterPills";
import ConfirmDialog from "@/components/ui/Modal/ConfirmDialog";
import ProjectCard from "@/components/ui/ProjectCard";
import { InitialProjectValues } from "@/components/ui/ProjectForm";
import EditProjectModal from "@/components/ui/ProjectForm/EditProjectModal";
import ProjectsNotFound from "@/components/ui/ProjectsNotFound";
import SectionHeader from "@/components/ui/SectionHeader";
import { FeedbackToast } from "@/components/ui/Toast";
import ViewModeToggle, { ViewMode } from "@/components/ui/ViewModeToggle";
import { useToastFeedback } from "@/hooks/useToastFeedback";
import { IProjectInterface, TProjectType } from "@/model/ProjectModel";
import { useMutationProjects } from "@/services/projects/mutations";
import { useProjects } from "@/services/projects/queries";
import { ProjectData } from "@/validations/project.scheme";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { LuPlus } from "react-icons/lu";

const ProjectsPage = (): React.JSX.Element => {
  const { deleteProject, updateProject } = useMutationProjects();
  const { data, isLoading: loading } = useProjects("user-projects");
  const t = useTranslations("admin.myProjects");
  const addT = useTranslations("admin.addProject");
  const { open, message, triggerToast, closeToast } = useToastFeedback();

  const [view, setView] = useState<ViewMode>("grid");
  const [selectedType, setSelectedType] = useState<TProjectType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [editingProject, setEditingProject] =
    useState<InitialProjectValues | null>(null);
  const [deletingProject, setDeletingProject] =
    useState<IProjectInterface | null>(null);

  const projects: IProjectInterface[] = useMemo(
    () => data?.projects ?? [],
    [data?.projects],
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesType =
        selectedType === "all" ||
        project.type?.toLowerCase() === selectedType.toLowerCase();

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesType;

      const matchesSearch =
        project.title?.toLowerCase().includes(q) ||
        String(project.content ?? "")
          .toLowerCase()
          .includes(q) ||
        project.tags?.toLowerCase().includes(q);

      return matchesType && matchesSearch;
    });
  }, [projects, selectedType, searchQuery]);

  async function handleUpdateProject({
    data: formData,
    image,
    currentImageURL,
  }: {
    data: ProjectData;
    image: File | null;
    currentImageURL?: string;
  }) {
    if (!editingProject) return;

    try {
      await updateProject.mutateAsync({
        id: editingProject.id,
        data: formData,
        image,
        currentImageURL,
      });

      setEditingProject(null);
      triggerToast({
        title: addT("updateSuccessTitle"),
        subtitle: addT("updateSuccessSubtitle"),
        content: addT("updateSuccessContent"),
        success: true,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : addT("errorTitle");
      triggerToast({
        title: addT("errorTitle"),
        subtitle: errorMessage,
        content: addT("errorContent"),
        success: false,
      });
      throw error;
    }
  }

  async function handleConfirmDelete() {
    if (!deletingProject) return;

    try {
      await deleteProject.mutateAsync(deletingProject.id);
      setDeletingProject(null);
      triggerToast({
        title: t("deleteSuccessTitle"),
        subtitle: t("deleteSuccessSubtitle"),
        success: true,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : addT("errorTitle");
      triggerToast({
        title: addT("errorTitle"),
        subtitle: errorMessage,
        content: addT("errorContent"),
        success: false,
      });
    }
  }

  return (
    <AdminLayout>
      <SectionHeader title={t("sectionTitle")} subtitle={t("sectionSubtitle")} />

      <FeedbackToast open={open} message={message} onClose={closeToast} />

      <div className="mt-8 bg-gray-light border border-white/[0.07] rounded-xl p-4 flex flex-col gap-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-soft bg-black/40 border border-white/10 px-3.5 py-1.5 rounded-lg">
              {t("totalCount", { count: filteredProjects.length })}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 sm:w-64">
              <CgSearch
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-dark pointer-events-none"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchPlaceholder")}
                className="w-full h-10 pl-9 pr-3 rounded-lg bg-black/40 border border-white/10 focus:border-orange-500 outline-none text-sm text-white placeholder:text-gray-dark transition-colors"
              />
            </div>

            <ViewModeToggle view={view} onChange={setView} />

            <Link
              href="/admin/addProjects"
              className="h-10 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <LuPlus size={16} />
              <span className="hidden md:inline">{t("newProjectButton")}</span>
            </Link>
          </div>
        </div>

        <CategoryFilterPills
          activeFilter={selectedType}
          onSelectFilter={setSelectedType}
          allLabel={t("filterAll")}
          layoutId="admin-projects-filter"
          variant="compact"
          className="pt-3 border-t border-white/[0.06]"
        />
      </div>

      <div
        className={`grid ${
          view === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        } gap-6 mt-6 w-full`}
      >
        {loading ? (
          <AnimatePresence mode="popLayout">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} index={i} view={view} />
            ))}
          </AnimatePresence>
        ) : (
          <AnimatePresence mode="popLayout">
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
                onEdit={() =>
                  setEditingProject({
                    id: project.id,
                    title: project.title,
                    content: String(project.content ?? ""),
                    type:
                      (project.type?.toLowerCase() as InitialProjectValues["type"]) ||
                      "web",
                    tags: project.tags,
                    url: project.url,
                    imageURL: project.imageURL,
                  })
                }
                onDelete={() => setDeletingProject(project)}
              >
                {project.content}
              </ProjectCard>
            ))}
          </AnimatePresence>
        )}
      </div>

      {!loading && filteredProjects.length === 0 && (
        <div className="mt-8">
          <ProjectsNotFound />
        </div>
      )}

      <EditProjectModal
        project={editingProject}
        onClose={() => setEditingProject(null)}
        onSubmitProject={handleUpdateProject}
        onRequireImageError={() =>
          triggerToast({
            title: addT("noImageTitle"),
            subtitle: addT("noImageSubtitle"),
            content: addT("noImageContent"),
            success: false,
          })
        }
      />

      <ConfirmDialog
        open={Boolean(deletingProject)}
        title={t("deleteConfirmTitle")}
        description={t("deleteConfirmDescription", {
          title: deletingProject?.title ?? "",
        })}
        confirmLabel={t("confirmDeleteButton")}
        cancelLabel={t("cancelDeleteButton")}
        isLoading={deleteProject.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingProject(null)}
      />
    </AdminLayout>
  );
};

export default ProjectsPage;
