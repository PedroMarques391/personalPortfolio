import Tilt3DCard from "@/components/Motions/Tilt3DCard";
import { spring } from "@/utils/motion";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";

interface IProjectCardProps {
  id: number;
  src: string;
  title: string;
  type: string;
  children: React.ReactNode;
  tags: string;
  url: string;
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
  onDelete,
  view = "list",
  priority = false,
}: IProjectCardProps): React.JSX.Element => {
  const ref = useRef<HTMLElement>(null);
  const t = useTranslations("components.projectCard");

  return (
    <motion.article
      title={title}
      ref={ref}
      layout="position"
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
        maxTilt={view === "grid" ? 5 : 2}
        glareOpacity={0.04}
        className={`flex w-full bg-gray-light rounded-lg shadow-lg overflow-hidden transition-colors group ${
          view === "list" ? "flex-row" : "flex-col"
        }`}
      >
        <div
          className={`relative cursor-pointer shrink-0 overflow-hidden ${
            view === "list"
              ? "w-24 h-auto md:w-[30%] md:h-auto md:min-h-full"
              : "w-full h-64"
          }`}
        >
          <Image
            src={src}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="rounded-t-lg group-hover:scale-105 transform transition duration-500 ease-out bg-cover object-cover"
          />
          <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-white/10 text-gray-soft text-xs font-semibold py-1 px-3 rounded-md shadow-md">
            {type}
          </span>

          {onDelete && (
            <button
              type="button"
              aria-label={t("deleteTitle")}
              title={t("deleteTitle")}
              onClick={async (e) => {
                e.stopPropagation();
                await onDelete();
              }}
              className="absolute top-3 right-3 bg-red-600 text-gray-soft text-xs font-semibold py-1 px-3 rounded-md shadow-md z-10"
            >
              <MdDeleteOutline color="white" size={18} />
            </button>
          )}
          <Link
            href={url}
            prefetch={false}
            aria-label={title}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500"
          />
        </div>

        <div className="p-6 flex flex-col gap-2 justify-start flex-1">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-orange-400 transition duration-200">
            {title}
          </h2>

          <p className="text-gray-soft/90 text-sm leading-relaxed shrink-0">
            {children}
          </p>

          <div className="hidden md:flex flex-wrap gap-2 mt-auto pt-3">
            {tags.split(",").map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-white/[0.06] border border-white/10 text-gray-soft py-1 px-3 rounded-full shadow-sm"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        </div>
      </Tilt3DCard>
    </motion.article>
  );
};

export default ProjectCard;
