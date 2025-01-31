"use client";
import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

interface IMarqueeProps {
    children: React.ReactNode;
}

interface MarqueeSettings {
    speed: number;
    size: number;
}


const MarqueeEffect = ({ children }: IMarqueeProps): React.JSX.Element => {
    const [marqueeSettings, setMarqueeSettings] = useState<MarqueeSettings>({
        speed: 30,
        size: 1400,
    });

    useEffect(() => {
        const updateSettings = () => {
            setMarqueeSettings(
                window.innerWidth > 720
                    ? { speed: 30, size: 1300 }
                    : { speed: 20, size: 1200 }
            );
        };

        updateSettings();

        window.addEventListener("resize", updateSettings);

        return () => window.removeEventListener("resize", updateSettings);
    }, []);

    const marqueeVariants = {
        animate: {
            x: [marqueeSettings.size, -marqueeSettings.size],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: marqueeSettings.speed,
                    ease: "linear",
                },
            },
        },
    };
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
