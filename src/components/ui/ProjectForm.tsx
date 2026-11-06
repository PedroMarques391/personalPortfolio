"use client";

import { Input } from "@/components/ui/Input";
import ImageUploadDropzone from "@/components/ui/ProjectForm/ImageUploadDropzone";
import ProjectLivePreview from "@/components/ui/ProjectForm/ProjectLivePreview";
import ProjectTagsField from "@/components/ui/ProjectForm/ProjectTagsField";
import { TProjectCategory } from "@/model/ProjectModel";
import { ProjectData, createProjectScheme } from "@/validations/project.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Control, useForm, useWatch } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import {
  LuCpu,
  LuGlobe,
  LuServer,
  LuSmartphone,
  LuSparkles,
} from "react-icons/lu";

export interface InitialProjectValues {
  id: number;
  title: string;
  content: string;
  type: TProjectCategory;
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

const MAX_CONTENT_LENGTH = 255;

const DescriptionActionSlot = React.memo(function DescriptionActionSlot({
  control,
  isImproving,
  onImprove,
}: {
  control: Control<ProjectData>;
  isImproving: boolean;
  onImprove: () => void;
}) {
  const t = useTranslations("admin.addProject");
  const content = useWatch({ control, name: "content" }) || "";
  const remainingChars = MAX_CONTENT_LENGTH - content.length;
  const hasContent = content.trim().length > 0;

  return (
    <div className="flex items-center gap-3">
      <span
        className={`text-[11px] tabular-nums transition-colors ${
          remainingChars <= 20
            ? remainingChars <= 0
              ? "text-red-400 font-semibold"
              : "text-amber-400 font-medium"
            : "text-gray-dark"
        }`}
        aria-live="polite"
      >
        {remainingChars} {t("charactersRemaining")}
      </span>

      <button
        type="button"
        onClick={onImprove}
        disabled={!hasContent || isImproving}
        title={!hasContent ? t("improveWithAdaHint") : t("improveWithAda")}
        className="px-3 py-1 rounded-full bg-black/30 hover:bg-gray-800 border border-white/10 hover:border-white/20 text-[11px] font-medium text-gray-dark hover:text-gray-soft flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isImproving ? (
          <>
            <FiLoader size={12} className="animate-spin text-orange-400" />
            <span className="text-gray-soft">{t("improvingWithAda")}</span>
          </>
        ) : (
          <>
            <LuSparkles size={12} className="text-orange-400" />
            <span>{t("improveWithAda")}</span>
          </>
        )}
      </button>
    </div>
  );
});

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
  const locale = useLocale();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initialValues?.imageURL ?? null,
  );
  const [loading, setLoading] = useState(false);
  const [isImproving, setIsImproving] = useState(false);

  const schema = useMemo(() => createProjectScheme(validationT), [validationT]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
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

  const initialId = initialValues?.id;

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
  }, [initialId, reset]);

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

  const selectedType = useWatch({ control, name: "type" });

  const categories = useMemo(
    () => [
      { value: "web" as const, label: t("typeWeb"), icon: LuGlobe },
      { value: "mobile" as const, label: t("typeMobile"), icon: LuSmartphone },
      { value: "api" as const, label: t("typeApi"), icon: LuServer },
      {
        value: "automações" as const,
        label: t("typeAutomation"),
        icon: LuCpu,
      },
    ],
    [t],
  );

  const handleImproveDescription = useCallback(async () => {
    const currentContent = getValues("content")?.trim();
    if (!currentContent || isImproving) return;

    try {
      setIsImproving(true);
      const response = await fetch("/api/chat/improve-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: currentContent,
          title: getValues("title"),
          type: getValues("type"),
          tags: getValues("tags"),
          locale,
        }),
      });

      const result = await response.json();
      if (response.ok && result.content) {
        const safeContent =
          result.content.length > MAX_CONTENT_LENGTH
            ? result.content.slice(0, MAX_CONTENT_LENGTH)
            : result.content;
        setValue("content", safeContent, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    } catch (error) {
      console.error("[improve-description] Error:", error);
    } finally {
      setIsImproving(false);
    }
  }, [getValues, isImproving, locale, setValue]);

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

  const handleSelectImage = useCallback((file: File) => {
    setImage(file);
  }, []);

  const handleRemoveImage = useCallback(() => {
    setImage(null);
    setPreview(null);
  }, []);

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
        <ImageUploadDropzone
          preview={preview}
          onSelectImage={handleSelectImage}
          onRemoveImage={handleRemoveImage}
        />

        <div className="flex flex-col gap-2 pt-1">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-dark">
            {t("typeLabel")}
          </span>
          <input type="hidden" {...register("type")} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedType === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() =>
                    setValue("type", cat.value, { shouldValidate: true, shouldDirty: true })
                  }
                  className={`py-2.5 px-3 rounded-lg border text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
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
            containerClassName="w-full"
            labelBgClassName="bg-gray-light peer-focus:bg-gray-light peer-valid:bg-gray-light"
            {...register("title")}
            error={errors.title?.message}
            label={t("titleLabel")}
          />
          <Input
            containerClassName="w-full"
            labelBgClassName="bg-gray-light peer-focus:bg-gray-light peer-valid:bg-gray-light"
            {...register("url")}
            error={errors.url?.message}
            label={t("urlLabel")}
          />
        </div>

        <Input.TextArea
          containerClassName="w-full"
          labelBgClassName="bg-gray-light peer-focus:bg-gray-light peer-valid:bg-gray-light"
          {...register("content")}
          error={errors.content?.message}
          label={t("descriptionLabel")}
          maxLength={MAX_CONTENT_LENGTH}
          actionSlot={
            <DescriptionActionSlot
              control={control}
              isImproving={isImproving}
              onImprove={handleImproveDescription}
            />
          }
        />

        <ProjectTagsField
          register={register}
          control={control}
          setValue={setValue}
          error={errors.tags?.message}
        />

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
        <ProjectLivePreview control={control} previewSrc={preview} />
      )}
    </div>
  );
};

export default React.memo(ProjectForm);
