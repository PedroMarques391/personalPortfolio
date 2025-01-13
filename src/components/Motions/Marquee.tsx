"use client";
import { motion } from 'framer-motion';
import React from 'react';

interface IMarqueeProps {
    children: React.ReactNode;
}

const marqueeVariants = {
    animate: {
        x: [1500, -1500],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
            },
        },
    },
};

const MarqueeEffect = ({ children }: IMarqueeProps): React.JSX.Element => {
    return (
        <div className="relative overflow-hidden text-white h-8 w-full flex items-center justify-center">
            <motion.div
                className="absolute whitespace-nowrap flex gap-x-3"
                variants={marqueeVariants}
                animate={"animate"}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default MarqueeEffect;
