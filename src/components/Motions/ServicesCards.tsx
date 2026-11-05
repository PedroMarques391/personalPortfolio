"use client";

import { ease } from "@/utils/motion";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Tilt3DCard from "./Tilt3DCard";

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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.25, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 24, scale: 0.96 }
      }
      transition={{
        duration: 0.55,
        ease: ease.out,
      }}
      className="w-full md:w-[30%] flex"
    >
      <Tilt3DCard
        maxTilt={8}
        glareOpacity={0.04}
        className="bg-gray-light flex flex-col items-center justify-start p-6 rounded-xl w-full gap-3"
      >
        <motion.div
          ref={constraintsRef}
          style={{ transform: "translateZ(28px)" }}
          className="w-full rounded-lg bg-gray-light/10 hover:cursor-grab active:cursor-grabbing py-2"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: isInView ? 360 : 0 }}
            transition={{
              rotate: { duration: 0.85, ease: ease.out },
            }}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            className="text-orange-500/90 flex justify-center items-center"
          >
            {icon}
          </motion.div>
        </motion.div>
        <h3
          style={{ transform: "translateZ(18px)" }}
          className="text-white font-semibold tracking-wide text-xl text-center"
        >
          {title}
        </h3>
        <p
          style={{ transform: "translateZ(10px)" }}
          className="text-left text-gray-soft/90 leading-relaxed break-words"
        >
          {children}
        </p>
      </Tilt3DCard>
    </motion.div>
  );
};

export default ServicesCards;
