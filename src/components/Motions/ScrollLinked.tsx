"use client";
import { useSpring, useScroll, motion } from "framer-motion";

const ScrollLinked = (): React.JSX.Element => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 z-30 bg-gray-soft transform origin-left"
            style={{ scaleX }}
        />
    );
};

export default ScrollLinked;