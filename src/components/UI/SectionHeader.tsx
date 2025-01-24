import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface ISectionHeaderProps {
    title: string
    subtitle: string
    styles?: string
}
const SectionHeader = ({ title, subtitle, styles }: ISectionHeaderProps): React.JSX.Element => {
    const ref = useRef(null);
    const isInView = useInView(ref);
    return (
        <>
            <motion.h2
                ref={ref}
                initial={{ x: '-100%' }}
                animate={{ x: isInView ? 0 : "-100%" }}
                transition={{ type: 'spring', stiffness: 100, damping: 10, duration: 1 }}
                className={`mx-auto w-full 
                font-mono tracking-wider text-gray-dark font-medium text-base md:text-lg lg:text-xl text-center ${styles}`}>{subtitle}</motion.h2>
            <motion.h1
                ref={ref}
                initial={{ x: '-100%' }}
                animate={{ x: isInView ? 0 : "-100%" }}
                transition={{ type: 'spring', stiffness: 100, damping: 25, duration: 2 }}
                className="mx-auto font-bold text-2xl md:text-3xl lg:text-4xl font-mono tracking-wider text-gray-soft">{title}</motion.h1>
        </>
    );
};

export default SectionHeader;