import { spring, techBadgeVariant } from "@/utils/motion";
import { motion } from "motion/react";

interface ITechListProps {
  children: React.ReactNode;
}

const TechList = ({ children }: ITechListProps): React.JSX.Element => {
  return (
    <motion.li
      variants={techBadgeVariant}
      whileHover={{ y: -3, scale: 1.05 }}
      transition={spring.snappy}
      className="text-sm md:text-base bg-gray-light border border-white/5 hover:border-orange-500/40 hover:text-white px-3.5 py-2 text-gray-soft rounded-lg text-center shadow-sm transition-colors cursor-default"
    >
      {children}
    </motion.li>
  );
};

export default TechList;
