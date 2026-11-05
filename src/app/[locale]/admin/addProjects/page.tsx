"use client";

import { IMessageInterface } from "@/app/[locale]/contact/page";
import AdminLayout from "@/components/Layout/AdminLayout";
import ProjectForm from "@/components/ui/ProjectForm";
import SectionHeader from "@/components/ui/SectionHeader";
import { Toast } from "@/components/ui/Toast";
import { useMutationProjects } from "@/services/projects/mutations";
import { ProjectData } from "@/validations/project.scheme";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const Page = (): React.JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<IMessageInterface>({
    title: "",
    subtitle: "",
    content: "",
    success: false,
  });
  const { createProject } = useMutationProjects();
  const t = useTranslations("admin.addProject");

  function handleRequireImageError() {
    setShowModal(true);
    setMessage({
      title: t("noImageTitle"),
      subtitle: t("noImageSubtitle"),
      content: t("noImageContent"),
      success: false,
    });

    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  }

  async function handleNewProject({
    data,
    image,
  }: {
    data: ProjectData;
    image: File | null;
  }) {
    if (!image) {
      handleRequireImageError();
      return;
    }

    try {
      await createProject.mutateAsync({ data, image });

      setShowModal(true);
      setMessage({
        title: t("successTitle"),
        subtitle: t("successSubtitle"),
        content: t("successContent"),
        success: true,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : t("errorTitle");
      setShowModal(true);
      setMessage({
        title: t("errorTitle"),
        subtitle: errorMessage,
        content: t("errorContent"),
        success: false,
      });
      throw error;
    } finally {
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  }

  return (
    <AdminLayout>
      <SectionHeader
        title={t("sectionTitle")}
        subtitle={t("sectionSubtitle")}
        id="newProject"
      />

      <Toast.Root type={message.success ? "success" : "error"} open={showModal}>
        <Toast.ActionButton onClick={() => setShowModal(false)}>
          <Toast.Icon icon={IoClose} color="red" size={20} />
        </Toast.ActionButton>
        <Toast.Title>{message.title}</Toast.Title>
        <Toast.Subtitle>{message.subtitle}</Toast.Subtitle>
        <Toast.Content>
          <p>{message.content}</p>
        </Toast.Content>
      </Toast.Root>

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
