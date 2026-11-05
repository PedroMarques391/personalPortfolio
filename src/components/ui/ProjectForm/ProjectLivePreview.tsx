"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import ViewModeToggle, { ViewMode } from "@/components/ui/ViewModeToggle";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface ProjectLivePreviewProps {
  previewSrc: string | null;
  title: string;
  content: string;
  type: string;
  tags: string;
  url: string;
}

const ProjectLivePreview = ({
  previewSrc,
  title,
  content,
  type,
  tags,
  url,
}: ProjectLivePreviewProps): React.JSX.Element => {
  const t = useTranslations("admin.addProject");
  const [previewView, setPreviewView] = useState<ViewMode>("grid");

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

export default ProjectLivePreview;
