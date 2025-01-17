"use client";

import { motion, useTime, useTransform } from "motion/react";

export default function UseTime() {
    const time = useTime();
    const rotate = useTransform(
        time,
        [0, 4000],
        [0, 360],
        { clamp: false }
    );

    const tinyBox = {
        width: 40,
        height: 40,
        backgroundColor: "#a0a0a0",
        borderRadius: 5,
        rotate: useTransform(() => rotate.get() * 2),
    };

    const smallBox = {
        width: 80,
        height: 80,
        backgroundColor: "#a0a0a04e",
        borderRadius: 5,
        rotate: useTransform(() => rotate.get() * 1.5),
    };

    const box = {
        width: 100,
        height: 100,
        backgroundColor: "#a0a0a08c",
        borderRadius: 5,
        rotate,
    };

    return (
        <>
            <div
                className="absolute top-0 left-0 right-0 flex justify-center items-center overflow-hidden h-[150px] "
                style={{ filter: "blur(4px)" }}>
                <div className="flex justify-center items-center gap-12 flex-wrap">
                    <motion.div style={tinyBox} />
                    <motion.div style={tinyBox} />
                    <motion.div style={tinyBox} />
                    <motion.div style={tinyBox} />
                    <motion.div style={tinyBox} />
                    <motion.div style={tinyBox} />
                    <motion.div style={tinyBox} />
                    <motion.div style={tinyBox} />
                    <motion.div style={tinyBox} />
                    <motion.div style={tinyBox} />
                    <motion.div style={tinyBox} />
                    <motion.div style={tinyBox} />
                    <motion.div style={tinyBox} />
                    <motion.div style={tinyBox} />

                </div>
            </div>
            <div className="absolute top-0 left-0 right-0 flex justify-center items-center overflow-hidden h-[150px]"
                style={{ filter: "blur(2px)" }}>
                <div className="flex justify-center items-center gap-12 flex-wrap">
                    <motion.div style={smallBox} />
                    <motion.div style={smallBox} />
                    <motion.div style={smallBox} />
                    <motion.div style={smallBox} />
                </div>
            </div>
            <div
                className="absolute top-0 left-0 right-0 flex justify-center items-center overflow-hidden h-[150px]"
            >
                <div className="flex justify-center items-center gap-12 flex-wrap">
                    <motion.div style={box} />
                </div>
            </div>
        </>
    );
}

