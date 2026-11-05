import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface ISectionHeaderProps {
  title: string;
  subtitle: string;
  styles?: string;
  id?: string;
  as?: "h1" | "h2";
}

const SectionHeader = ({
  title,
  subtitle,
  styles = "",
  id,
  as = "h2",
}: ISectionHeaderProps): React.JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const HeadingTag = as === "h1" ? motion.h1 : motion.h2;

  return (
    <div ref={ref} id={id} className="overflow-hidden lg:overflow-visible">
      {subtitle && (
        <motion.p
          initial={{ x: "-100%" }}
          animate={{ x: isInView ? 0 : "-100%" }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.8,
          }}
          className={`mx-auto w-full font-mono tracking-wider text-gray-dark font-medium text-base md:text-lg lg:text-xl text-center ${styles}`}
        >
          {subtitle}
        </motion.p>
      )}
      <HeadingTag
        initial={{ x: "-100%" }}
        animate={{ x: isInView ? 0 : "-100%" }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
          duration: 1.2,
        }}
        className="mx-auto font-bold text-2xl md:text-3xl lg:text-4xl font-mono tracking-wider text-gray-soft text-center"
      >
        {title}
      </HeadingTag>
    </div>
  );
};

export default SectionHeader;