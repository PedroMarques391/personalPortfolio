"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import ViewModeToggle, { ViewMode } from "@/components/ui/ViewModeToggle";
import { ProjectData } from "@/validations/project.scheme";
import { useTranslations } from "next-intl";
import React, { memo, useState } from "react";
import { Control, useWatch } from "react-hook-form";

interface ProjectLivePreviewProps {
  control: Control<ProjectData>;
  previewSrc: string | null;
}

const ProjectLivePreview = ({
  control,
  previewSrc,
}: ProjectLivePreviewProps): React.JSX.Element => {
  const t = useTranslations("admin.addProject");
  const [previewView, setPreviewView] = useState<ViewMode>("grid");

  const { title, content, type, tags, url } = useWatch({ control });

  return (
    <aside className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-24">
      <div className="flex items-center justify-between bg-gray-light border border-white/[0.07] rounded-xl px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-soft">
          {t("previewTitle")}
        </span>
        <ViewModeToggle view={previewView} onChange={setPreviewView} />
      </div>

      <ProjectCard
        id={0}
        src={previewSrc || ""}
        title={title || t("previewEmptyTitle")}
        type={type || "web"}
        tags={tags || "Next.js, TypeScript"}
        url={url || "https://github.com"}
        view={previewView}
      >
        {content || t("previewEmptyDescription")}
      </ProjectCard>
    </aside>
  );
};

export default memo(ProjectLivePreview);
