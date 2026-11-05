"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import { Input } from "@/components/ui/Input";
import { ProjectData, createProjectScheme } from "@/validations/project.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";
import {
  LuCheck,
  LuCpu,
  LuGlobe,
  LuImagePlus,
  LuPlus,
  LuRefreshCw,
  LuServer,
  LuSmartphone,
  LuTrash2,
  LuX,
} from "react-icons/lu";

export interface InitialProjectValues {
  id: number;
  title: string;
  content: string;
  type: "web" | "mobile" | "automações" | "api";
  tags: string;
  url: string;
  imageURL: string;
}

interface ProjectFormProps {
  mode: "create" | "edit";
  initialValues?: InitialProjectValues;
  showLivePreview?: boolean;
  onSubmitProject: (payload: {
    data: ProjectData;
    image: File | null;
    currentImageURL?: string;
  }) => Promise<void>;
  onCancel?: () => void;
  onRequireImageError?: () => void;
}

const SUGGESTED_TAGS = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "TailwindCSS",
  "Flutter",
  "React Native",
  "Docker",
  "MySQL",
  "Redis",
];

const ProjectForm = ({
  mode,
  initialValues,
  showLivePreview = false,
  onSubmitProject,
  onCancel,
  onRequireImageError,
}: ProjectFormProps): React.JSX.Element => {
  const t = useTranslations("admin.addProject");
  const validationT = useTranslations("validations.project");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initialValues?.imageURL ?? null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewView, setPreviewView] = useState<"grid" | "list">("grid");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const schema = useMemo(() => createProjectScheme(validationT), [validationT]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProjectData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title ?? "",
      content: initialValues?.content ?? "",
      type: initialValues?.type ?? "web",
      tags: initialValues?.tags ?? "",
      url: initialValues?.url ?? "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        title: initialValues.title,
        content: initialValues.content,
        type: initialValues.type,
        tags: initialValues.tags,
        url: initialValues.url,
      });
      setPreview(initialValues.imageURL);
      setImage(null);
    }
  }, [initialValues, reset]);

  useEffect(() => {
    if (!image) {
      if (mode === "create") {
        setPreview(null);
      }
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image, mode]);

  const watchedTitle = watch("title");
  const watchedContent = watch("content");
  const watchedType = watch("type");
  const watchedTags = watch("tags");
  const watchedUrl = watch("url");

  const currentTagList = useMemo(() => {
    if (!watchedTags) return [];
    return watchedTags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }, [watchedTags]);

  const toggleSuggestedTag = (tag: string) => {
    const exists = currentTagList.some(
      (item) => item.toLowerCase() === tag.toLowerCase(),
    );
    const updated = exists
      ? currentTagList.filter(
          (item) => item.toLowerCase() !== tag.toLowerCase(),
        )
      : [...currentTagList, tag];

    setValue("tags", updated.join(", "), { shouldValidate: true });
  };

  const removeTagAt = (tagToRemove: string) => {
    const updated = currentTagList.filter((item) => item !== tagToRemove);
    setValue("tags", updated.join(", "), { shouldValidate: true });
  };

  const categories = [
    { value: "web" as const, label: t("typeWeb"), icon: LuGlobe },
    { value: "mobile" as const, label: t("typeMobile"), icon: LuSmartphone },
    { value: "api" as const, label: t("typeApi"), icon: LuServer },
    {
      value: "automações" as const,
      label: t("typeAutomation"),
      icon: LuCpu,
    },
  ];

  const handleFileSubmit = async (data: ProjectData) => {
    if (mode === "create" && !image) {
      onRequireImageError?.();
      return;
    }
    if (mode === "edit" && !image && !preview) {
      onRequireImageError?.();
      return;
    }

    try {
      setLoading(true);
      await onSubmitProject({
        data,
        image,
        currentImageURL: initialValues?.imageURL,
      });

      if (mode === "create") {
        reset({
          title: "",
          content: "",
          type: "web",
          tags: "",
          url: "",
        });
        setImage(null);
        setPreview(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        showLivePreview
          ? "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6"
          : "w-full"
      }
    >
      <form
        onSubmit={handleSubmit(handleFileSubmit)}
        className={`flex flex-col gap-4 bg-gray-light border border-white/[0.07] rounded-xl p-5 sm:p-7 shadow-lg ${
          showLivePreview ? "lg:col-span-7" : "w-full"
        }`}
      >
        <div className="w-full">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setImage(e.dataTransfer.files[0]);
              }
            }}
            className={`relative w-full aspect-[16/9] max-h-64 rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden flex flex-col items-center justify-center ${
              isDragging
                ? "border-orange-500 bg-orange-500/10"
                : preview
                  ? "border-white/10 bg-black/50"
                  : "border-white/15 hover:border-orange-500/60 bg-black/40 hover:bg-black/60"
            }`}
          >
            {preview ? (
              <>
                <Image
                  fill
                  src={preview}
                  alt="Preview"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-end justify-between p-4 z-20">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-gray-light/90 hover:bg-gray-800 text-gray-soft hover:text-white text-xs font-medium flex items-center gap-1.5 border border-white/10 transition-colors"
                  >
                    <LuRefreshCw size={14} className="text-orange-400" />
                    <span>{t("changeImage")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                      setPreview(null);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <LuTrash2 size={14} />
                    <span>{t("removeImage")}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center px-4 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-orange-400 mb-3">
                  <LuImagePlus size={22} />
                </div>
                <span className="text-sm font-medium text-gray-soft">
                  {t("imageUploadLabel")}
                </span>
                <span className="text-xs text-gray-dark mt-1">
                  {t("imageUploadHint")}
                </span>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              aria-label={t("imageUploadLabel")}
              className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${
                preview ? "pointer-events-none" : "z-10"
              }`}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-dark">
            {t("typeLabel")}
          </span>
          <input type="hidden" {...register("type")} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = watchedType === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() =>
                    setValue("type", cat.value, { shouldValidate: true })
                  }
                  className={`py-2.5 px-3 rounded-lg border text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                    isSelected
                      ? "bg-gray-800 border-orange-500 text-white"
                      : "bg-black/30 border-white/10 text-gray-dark hover:text-gray-soft hover:border-white/20"
                  }`}
                >
                  <Icon
                    size={16}
                    className={isSelected ? "text-orange-400" : "text-gray-dark"}
                  />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
          {errors.type?.message && (
            <span className="text-red-500 text-xs">{errors.type.message}</span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <Input
            duration={0.4}
            containerClassName="w-full"
            labelBgClassName="bg-gray-light peer-focus:bg-gray-light peer-valid:bg-gray-light"
            {...register("title")}
            error={errors.title?.message}
            label={t("titleLabel")}
          />
          <Input
            duration={0.4}
            containerClassName="w-full"
            labelBgClassName="bg-gray-light peer-focus:bg-gray-light peer-valid:bg-gray-light"
            {...register("url")}
            error={errors.url?.message}
            label={t("urlLabel")}
          />
        </div>

        <Input.TextArea
          duration={0.4}
          containerClassName="w-full"
          labelBgClassName="bg-gray-light peer-focus:bg-gray-light peer-valid:bg-gray-light"
          {...register("content")}
          error={errors.content?.message}
          label={t("descriptionLabel")}
        />

        <div className="flex flex-col gap-2">
          <Input
            duration={0.4}
            containerClassName="w-full"
            labelBgClassName="bg-gray-light peer-focus:bg-gray-light peer-valid:bg-gray-light"
            {...register("tags")}
            error={errors.tags?.message}
            label={t("tagsLabel")}
          />

          {currentTagList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pb-1">
              {currentTagList.map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="inline-flex items-center gap-1.5 text-xs bg-gray-800 border border-orange-500/40 text-gray-soft py-1 px-2.5 rounded-full"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTagAt(tag)}
                    aria-label={`Remover ${tag}`}
                    className="text-gray-dark hover:text-red-400 transition-colors"
                  >
                    <LuX size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-gray-dark mr-1">
              {t("tagsQuickAdd")}
            </span>
            {SUGGESTED_TAGS.map((tag) => {
              const isSelected = currentTagList.some(
                (item) => item.toLowerCase() === tag.toLowerCase(),
              );
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleSuggestedTag(tag)}
                  className={`text-[11px] py-1 px-2.5 rounded-full border flex items-center gap-1 transition-colors ${
                    isSelected
                      ? "bg-orange-500/15 border-orange-500/50 text-orange-400"
                      : "bg-black/30 border-white/10 text-gray-dark hover:text-gray-soft hover:border-white/20"
                  }`}
                >
                  {isSelected ? <LuCheck size={11} /> : <LuPlus size={11} />}
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 mt-2 border-t border-white/[0.06]">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-soft text-sm font-medium transition-colors"
            >
              {t("cancelButton")}
            </button>
          )}
          <button
            title={t("submitTitle")}
            disabled={loading}
            className="px-6 py-2.5 bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200 text-sm font-semibold disabled:bg-orange-500/60 disabled:cursor-not-allowed rounded-xl flex items-center justify-center gap-2 min-w-[160px]"
            type="submit"
          >
            {loading ? (
              <FiLoader className="animate-spin text-white text-lg" />
            ) : mode === "edit" ? (
              t("saveChangesButton")
            ) : (
              t("submitButton")
            )}
          </button>
        </div>
      </form>

      {showLivePreview && (
        <aside className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-24">
          <div className="flex items-center justify-between bg-gray-light border border-white/[0.07] rounded-xl px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-soft">
              {t("previewTitle")}
            </span>
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setPreviewView("grid")}
                className={`p-1.5 rounded-md transition-colors ${
                  previewView === "grid"
                    ? "bg-gray-800 text-orange-400"
                    : "text-gray-dark hover:text-gray-soft"
                }`}
                title="Grid"
              >
                <CiGrid41 size={18} />
              </button>
              <button
                type="button"
                onClick={() => setPreviewView("list")}
                className={`p-1.5 rounded-md transition-colors ${
                  previewView === "list"
                    ? "bg-gray-800 text-orange-400"
                    : "text-gray-dark hover:text-gray-soft"
                }`}
                title="List"
              >
                <CiGrid2H size={18} />
              </button>
            </div>
          </div>

          <ProjectCard
            id={0}
            src={preview || ""}
            title={watchedTitle || t("previewEmptyTitle")}
            type={watchedType || "web"}
            tags={watchedTags || "Next.js, TypeScript"}
            url={watchedUrl || "https://github.com"}
            view={previewView}
          >
            {watchedContent || t("previewEmptyDescription")}
          </ProjectCard>
        </aside>
      )}
    </div>
  );
};

export default ProjectForm;
