"use client";

import * as motion from "motion/react-client";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface IServicesCardsProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

const ServicesCards = ({
    icon,
    children,
    title,
}: IServicesCardsProps): React.JSX.Element => {
    const constraintsRef = useRef<HTMLDivElement>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0 }}
            animate={
                isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0 }
            }
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            className="bg-gray-light flex flex-col items-center justify-start p-5 rounded-xl w-full gap-3 md:w-[30%]"
        >
            <motion.div
                ref={constraintsRef}

                className="w-full rounded-lg bg-gray-light/10 hover:cursor-pointer"
            >
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isInView ? 360 : 0, x: isInView ? [-10, 10, -10] : 0 }}

                    transition={{
                        rotate: { duration: 1, ease: "easeInOut" },
                        x: { duration: 2, yoyo: 1, ease: "easeInOut" },
                    }}
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    className="text-gray-dark flex justify-center items-center"
                >
                    {icon}
                </motion.div>
            </motion.div>
            <h1 className="text-gray-soft tracking-wider  text-xl">{title}</h1>
            <p className="text-justify hyphens-auto break-words">{children}</p>
        </motion.div>
    );
};

export default ServicesCards;
