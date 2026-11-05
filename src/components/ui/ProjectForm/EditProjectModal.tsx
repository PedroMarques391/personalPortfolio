"use client";

import ProjectForm, {
  InitialProjectValues,
} from "@/components/ui/ProjectForm";
import { ProjectData } from "@/validations/project.scheme";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { LuX } from "react-icons/lu";

interface EditProjectModalProps {
  project: InitialProjectValues | null;
  onClose: () => void;
  onSubmitProject: (payload: {
    data: ProjectData;
    image: File | null;
    currentImageURL?: string;
  }) => Promise<void>;
  onRequireImageError: () => void;
}

const EditProjectModal = ({
  project,
  onClose,
  onSubmitProject,
  onRequireImageError,
}: EditProjectModalProps): React.JSX.Element => {
  const t = useTranslations("admin.myProjects");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-lg text-gray-dark hover:text-white hover:bg-white/10 transition-colors"
              >
                <LuX size={18} />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto">
              <ProjectForm
                mode="edit"
                initialValues={project}
                onSubmitProject={onSubmitProject}
                onCancel={onClose}
                onRequireImageError={onRequireImageError}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProjectModal;
