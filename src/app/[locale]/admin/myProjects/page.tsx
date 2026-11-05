"use client";

import { IMessageInterface } from "@/app/[locale]/contact/page";
import AdminLayout from "@/components/Layout/AdminLayout";
import Skeleton from "@/components/Motions/Skeleton";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectForm, {
  InitialProjectValues,
} from "@/components/ui/ProjectForm";
import ProjectsNotFound from "@/components/ui/ProjectsNotFound";
import SectionHeader from "@/components/ui/SectionHeader";
import { Toast } from "@/components/ui/Toast";
import { useMutationProjects } from "@/services/projects/mutations";
import { useProjects } from "@/services/projects/queries";
import { ProjectData } from "@/validations/project.scheme";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { FiAlertTriangle, FiLoader } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { LuPlus, LuX } from "react-icons/lu";

export interface IProjectInterface {
  id: number;
  imageURL: string;
  title: string;
  type: "web" | "mobile" | "automações" | "api";
  content: string;
  tags: string;
  url: string;
}

const FILTER_OPTIONS = ["all", "web", "mobile", "api", "automações"] as const;

const ProjectsPage = (): React.JSX.Element => {
  const { deleteProject, updateProject } = useMutationProjects();
  const { data, isLoading: loading } = useProjects("user-projects");
  const t = useTranslations("admin.myProjects");
  const addT = useTranslations("admin.addProject");

  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [editingProject, setEditingProject] =
    useState<InitialProjectValues | null>(null);
  const [deletingProject, setDeletingProject] =
    useState<IProjectInterface | null>(null);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<IMessageInterface>({
    title: "",
    subtitle: "",
    content: "",
    success: false,
  });

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEditingProject(null);
        setDeletingProject(null);
      }
    };
    if (editingProject || deletingProject) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editingProject, deletingProject]);

  function triggerToast(msg: IMessageInterface) {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

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
        content: "",
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

      <Toast.Root
        type={toastMessage.success ? "success" : "error"}
        open={showToast}
      >
        <Toast.ActionButton onClick={() => setShowToast(false)}>
          <Toast.Icon icon={IoClose} color="red" size={20} />
        </Toast.ActionButton>
        <Toast.Title>{toastMessage.title}</Toast.Title>
        <Toast.Subtitle>{toastMessage.subtitle}</Toast.Subtitle>
        {toastMessage.content && (
          <Toast.Content>
            <p>{toastMessage.content}</p>
          </Toast.Content>
        )}
      </Toast.Root>

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

            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`p-1.5 rounded-md transition-colors ${
                  view === "grid"
                    ? "bg-gray-800 text-orange-400"
                    : "text-gray-dark hover:text-gray-soft"
                }`}
                title="Grid"
                aria-label="Grid view"
              >
                <CiGrid41 size={20} />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={`p-1.5 rounded-md transition-colors ${
                  view === "list"
                    ? "bg-gray-800 text-orange-400"
                    : "text-gray-dark hover:text-gray-soft"
                }`}
                title="List"
                aria-label="List view"
              >
                <CiGrid2H size={20} />
              </button>
            </div>

            <Link
              href="/admin/addProjects"
              className="h-10 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <LuPlus size={16} />
              <span className="hidden md:inline">{t("newProjectButton")}</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06]">
          {FILTER_OPTIONS.map((option) => {
            const isActive = selectedType === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedType(option)}
                className={`relative uppercase rounded-lg px-3.5 py-1.5 text-xs tracking-wider font-medium transition-colors ${
                  isActive
                    ? "text-white"
                    : "bg-black/30 text-gray-dark hover:text-gray-soft"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="admin-projects-filter"
                    transition={{
                      type: "spring",
                      visualDuration: 0.25,
                      bounce: 0.15,
                    }}
                    className="absolute inset-0 rounded-lg bg-gray-800 border border-orange-500/60"
                  />
                )}
                <span className="relative z-10">
                  {option === "all" ? t("filterAll") : option}
                </span>
              </button>
            );
          })}
        </div>
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

      <AnimatePresence>
        {editingProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditingProject(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-project-modal-title"
              className="w-full max-w-2xl my-8 bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07] bg-gray-light">
                <div>
                  <h2
                    id="edit-project-modal-title"
                    className="text-lg font-semibold text-white"
                  >
                    {t("editModalTitle")}
                  </h2>
                  <p className="text-xs text-gray-dark mt-0.5">
                    {t("editModalSubtitle")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  aria-label="Close"
                  className="p-2 rounded-lg text-gray-dark hover:text-white hover:bg-white/10 transition-colors"
                >
                  <LuX size={18} />
                </button>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto">
                <ProjectForm
                  mode="edit"
                  initialValues={editingProject}
                  onSubmitProject={handleUpdateProject}
                  onCancel={() => setEditingProject(null)}
                  onRequireImageError={() =>
                    triggerToast({
                      title: addT("noImageTitle"),
                      subtitle: addT("noImageSubtitle"),
                      content: addT("noImageContent"),
                      success: false,
                    })
                  }
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletingProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeletingProject(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-project-title"
              className="w-full max-w-md bg-gray-light border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                  <FiAlertTriangle size={22} />
                </div>
                <div className="flex-1">
                  <h2
                    id="delete-project-title"
                    className="text-base font-semibold text-white"
                  >
                    {t("deleteConfirmTitle")}
                  </h2>
                  <p className="text-sm text-gray-dark mt-1 leading-relaxed">
                    {t("deleteConfirmDescription", {
                      title: deletingProject.title,
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/[0.06]">
                <button
                  type="button"
                  disabled={deleteProject.isPending}
                  onClick={() => setDeletingProject(null)}
                  className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-soft text-sm font-medium transition-colors"
                >
                  {t("cancelDeleteButton")}
                </button>
                <button
                  type="button"
                  disabled={deleteProject.isPending}
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-60"
                >
                  {deleteProject.isPending ? (
                    <FiLoader className="animate-spin text-white text-base" />
                  ) : (
                    t("confirmDeleteButton")
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default ProjectsPage;
