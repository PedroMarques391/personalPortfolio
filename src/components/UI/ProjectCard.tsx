import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface IProjectCardProps {
  index: number;
  src: string;
  title: string;
  type: string;
  children: React.ReactNode;
  tags: string;
  url: string;
}

const ProjectCard = ({
  src,
  title,
  children,
  tags,
  url,
  type,
  index,
}: IProjectCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <motion.section
      title={title}
      ref={ref}
      initial={{ opacity: 0.2, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.2, x: -30 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: index * 0.1,
      }}
      className="flex flex-col w-full bg-gray-light rounded-lg shadow-lg overflow-hidden group  duration-700 cursor-pointer"
    >
      <Link
        href={url}
        prefetch
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        <section className="relative w-full h-64">
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
                #{tag}
              </span>
            ))}
          </div>
        </section>
      </Link>
    </motion.section>
  );
};

export default ProjectCard;
