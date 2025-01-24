import { motion } from "motion/react";

interface ITechListProps {
    children: React.ReactNode
}
const TechList = ({ children }: ITechListProps): React.JSX.Element => {
    return (
        <motion.li
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-gray-light p-2 text-gray-soft rounded-lg text-center font-sans"
        >
            {children}
        </motion.li>
    );
};

export default TechList;