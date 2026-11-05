"use client";

import { Input } from "@/components/ui/Input";
import { SUGGESTED_PROJECT_TAGS } from "@/utils/skills";
import { ProjectData } from "@/validations/project.scheme";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { UseFormRegister } from "react-hook-form";
import { LuCheck, LuPlus, LuX } from "react-icons/lu";

interface ProjectTagsFieldProps {
  register: UseFormRegister<ProjectData>;
  tagsValue: string;
  error?: string;
  onChangeTags: (updatedTags: string) => void;
}

const ProjectTagsField = ({
  register,
  tagsValue,
  error,
  onChangeTags,
}: ProjectTagsFieldProps): React.JSX.Element => {
  const t = useTranslations("admin.addProject");

  const currentTagList = useMemo(() => {
    if (!tagsValue) return [];
    return tagsValue
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }, [tagsValue]);

  const toggleSuggestedTag = (tag: string) => {
    const exists = currentTagList.some(
      (item) => item.toLowerCase() === tag.toLowerCase(),
    );
    const updated = exists
      ? currentTagList.filter(
          (item) => item.toLowerCase() !== tag.toLowerCase(),
        )
      : [...currentTagList, tag];

    onChangeTags(updated.join(", "));
  };

  const removeTagAt = (tagToRemove: string) => {
    const updated = currentTagList.filter((item) => item !== tagToRemove);
    onChangeTags(updated.join(", "));
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        duration={0.4}
        containerClassName="w-full"
        labelBgClassName="bg-gray-light peer-focus:bg-gray-light peer-valid:bg-gray-light"
        {...register("tags")}
        error={error}
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
        {SUGGESTED_PROJECT_TAGS.map((tag) => {
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
  );
};

export default ProjectTagsField;
