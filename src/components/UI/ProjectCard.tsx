import { motion } from "motion/react";
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
}

const ProjectCard = ({
  src,
  title,
  children,
  tags,
  url,
  type,
  onDelete,
}: IProjectCardProps) => {
  const ref = useRef(null);

  return (
    <motion.section
      title={title}
      ref={ref}
      layout
      initial={{ opacity: 0.9, y: 12, scale: 0.97 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 22,
        },
      }}
      exit={{
        opacity: 0,
        y: 16,
        scale: 0.96,
        transition: { duration: 0.2 },
      }}
      className={`flex flex-col w-full bg-gray-light rounded-lg shadow-lg overflow-hidden transition-all  ease-in-out group duration-700 `}
    >
      <section className="relative w-full h-64 cursor-pointer">
        <Image
          src={src}
          alt={title}
          fill
          sizes="auto"
          priority
          className="rounded-t-lg group-hover:scale-105 transform transition duration-300 bg-cover object-cover"
        />
        <span className="absolute top-3 left-3 bg-gray-light text-gray-soft text-xs font-semibold py-1 px-3 rounded-md shadow-md">
          {type}
        </span>

        {onDelete && (
          <button
            title="Deletar Projeto"
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
          prefetch
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
        />
      </section>

      <section className="p-6 flex flex-col gap-2 justify-start">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-dark group-hover:text-gray-500 transition duration-200">
          {title}
        </h2>

        <p className="text-gray-soft text-sm leading-relaxed">{children}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.split(",").map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-soft text-gray-light py-1 px-3 rounded-full shadow-sm"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      </section>
    </motion.section>
  );
};

export default ProjectCard;
