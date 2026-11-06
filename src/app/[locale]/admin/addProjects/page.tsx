"use client";

import AdminLayout from "@/components/Layout/AdminLayout";
import ProjectForm from "@/components/ui/ProjectForm";
import SectionHeader from "@/components/ui/SectionHeader";
import { FeedbackToast } from "@/components/ui/Toast";
import { useToastFeedback } from "@/hooks/useToastFeedback";
import { useMutationProjects } from "@/services/projects/mutations";
import { ProjectData } from "@/validations/project.scheme";
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";

const Page = (): React.JSX.Element => {
  const { open, message, triggerToast, closeToast } = useToastFeedback();
  const { createProject } = useMutationProjects();
  const t = useTranslations("admin.addProject");

  const handleRequireImageError = useCallback(() => {
    triggerToast({
      title: t("noImageTitle"),
      subtitle: t("noImageSubtitle"),
      content: t("noImageContent"),
      success: false,
    });
  }, [t, triggerToast]);

  const handleNewProject = useCallback(
    async ({
      data,
      image,
    }: {
      data: ProjectData;
      image: File | null;
    }) => {
      if (!image) {
        handleRequireImageError();
        return;
      }

      try {
        await createProject.mutateAsync({ data, image });

        triggerToast({
          title: t("successTitle"),
          subtitle: t("successSubtitle"),
          content: t("successContent"),
          success: true,
        });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : t("errorTitle");
        triggerToast({
          title: t("errorTitle"),
          subtitle: errorMessage,
          content: t("errorContent"),
          success: false,
        });
        throw error;
      }
    },
    [createProject, handleRequireImageError, t, triggerToast],
  );

  return (
    <AdminLayout>
      <SectionHeader
        title={t("sectionTitle")}
        subtitle={t("sectionSubtitle")}
        id="newProject"
      />

      <FeedbackToast open={open} message={message} onClose={closeToast} />

      <ProjectForm
        mode="create"
        showLivePreview
        onSubmitProject={handleNewProject}
        onRequireImageError={handleRequireImageError}
      />
    </AdminLayout>
  );
};

export default Page;
