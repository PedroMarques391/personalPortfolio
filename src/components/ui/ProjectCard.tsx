import Tilt3DCard from "@/components/Motions/Tilt3DCard";
import { spring } from "@/utils/motion";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useRef } from "react";
import { LuExternalLink, LuImage, LuPencil, LuTrash2 } from "react-icons/lu";

interface IProjectCardProps {
  id: number;
  src: string;
  title: string;
  type: string;
  children: React.ReactNode;
  tags: string;
  url: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
  view?: "grid" | "list";
  priority?: boolean;
}

const ProjectCard = ({
  src,
  title,
  children,
  tags,
  url,
  type,
  onEdit,
  onDelete,
  view = "grid",
  priority = false,
}: IProjectCardProps): React.JSX.Element => {
  const ref = useRef<HTMLElement>(null);
  const t = useTranslations("components.projectCard");
  const isAdminCard = Boolean(onEdit || onDelete);
  const isDataOrBlob =
    Boolean(src) && (src.startsWith("data:") || src.startsWith("blob:"));
  const parsedTags = tags
    ? tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  return (
    <motion.article
      title={title}
      ref={ref}
      style={{ borderRadius: 12 }}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: spring.smooth,
      }}
      exit={{
        opacity: 0,
        y: 12,
        scale: 0.96,
        transition: { duration: 0.18 },
      }}
      className="w-full flex"
    >
      <Tilt3DCard
        maxTilt={view === "grid" ? 4 : 2}
        glareOpacity={0.04}
        className={`flex w-full bg-gray-light border border-white/[0.06] hover:border-white/[0.14] rounded-xl shadow-md overflow-hidden transition-colors group ${
          view === "list" ? "flex-col sm:flex-row" : "flex-col"
        }`}
      >
        <div
          className={`relative shrink-0 overflow-hidden bg-black/40 ${
            view === "list"
              ? "w-full h-48 sm:w-64 md:w-72 sm:h-auto sm:min-h-[200px]"
              : "w-full aspect-[16/10]"
          }`}
        >
          {src ? (
            <Image
              src={src}
              alt={title || "Project cover"}
              fill
              unoptimized={isDataOrBlob}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="group-hover:scale-105 transform transition duration-500 ease-out object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-dark gap-2">
              <LuImage size={32} className="text-gray-dark/60" />
            </div>
          )}

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"
          />

          {type && (
            <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-white/10 text-gray-soft text-[11px] uppercase tracking-wider font-semibold py-1 px-2.5 rounded-md shadow-sm z-10">
              {type}
            </span>
          )}

          {isAdminCard && (
            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-white/10 p-1 rounded-lg flex items-center gap-1 z-20 shadow-md">
              {onEdit && (
                <button
                  type="button"
                  aria-label={t("editTitle")}
                  title={t("editTitle")}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  className="text-gray-soft hover:text-orange-400 hover:bg-white/10 p-1.5 rounded-md transition-colors"
                >
                  <LuPencil size={15} />
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  aria-label={t("deleteTitle")}
                  title={t("deleteTitle")}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="text-gray-soft hover:text-red-400 hover:bg-red-500/15 p-1.5 rounded-md transition-colors"
                >
                  <LuTrash2 size={15} />
                </button>
              )}
            </div>
          )}

          {url && (
            <Link
              href={url}
              prefetch={false}
              aria-label={title}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500"
            />
          )}
        </div>

        <div className="p-5 flex flex-col gap-2.5 justify-start flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-white group-hover:text-orange-400 transition duration-200 line-clamp-1">
              {title}
            </h2>
            {url && (
              <Link
                href={url}
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
                title={t("visitTitle")}
                aria-label={t("visitTitle")}
                className="text-gray-dark hover:text-orange-400 transition-colors shrink-0 mt-0.5"
              >
                <LuExternalLink size={16} />
              </Link>
            )}
          </div>

          <p className="text-gray-dark text-sm leading-relaxed line-clamp-3">
            {children}
          </p>

          {parsedTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
              {parsedTags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="text-xs bg-gray-800 text-gray-soft py-1 px-2.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {isAdminCard && (
            <div className="flex items-center justify-end gap-2 pt-3 mt-2 border-t border-white/[0.06]">
              {onEdit && (
                <button
                  type="button"
                  onClick={onEdit}
                  className="flex-1 py-2 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-soft hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LuPencil size={14} className="text-orange-400" />
                  <span>{t("editTitle")}</span>
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="py-2 px-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LuTrash2 size={14} />
                  <span>{t("deleteTitle")}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </Tilt3DCard>
    </motion.article>
  );
};

export default memo(ProjectCard);

