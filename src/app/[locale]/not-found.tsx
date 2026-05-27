"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() > 0.5 ? 8 : 14,
  delay: Math.random() * 3,
  duration: 2 + Math.random() * 3,
  isAccent: Math.random() > 0.6,
}));

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[calc(100vh-150px)] overflow-hidden rounded-2xl bg-[#0e0e0e]">
      <motion.div
        className="absolute left-0 right-0 h-[3px] bg-orange-500/15 pointer-events-none z-0"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-[2px] opacity-70 z-0 ${
            p.isAccent ? "bg-orange-500" : "bg-gray-soft"
          }`}
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent left-0 z-0"
        animate={{
          top: ["20%", "55%", "75%", "35%", "60%", "0%"],
          scaleX: [0.3, 0.7, 0.5, 0.4, 0.6, 0],
          x: ["-30%", "10%", "-15%", "20%", "-5%", "0%"],
          opacity: [1, 1, 1, 1, 1, 0, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          times: [0, 0.02, 0.04, 0.06, 0.08, 0.1, 1],
        }}
      />

      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        <p className="text-gray-400 font-bold uppercase mb-4 text-sm tracking-[0.6em]">
          ERROR
        </p>
        <div className="relative mb-6">
          <motion.div
            className="text-white font-black tracking-tighter relative z-10"
            style={{ fontSize: "clamp(6rem, 15vw, 12rem)", lineHeight: 1 }}
            animate={{
              textShadow: [
                "0 0 20px rgba(249, 115, 22, 0.4)",
                "0 0 40px rgba(249, 115, 22, 0.8)",
                "0 0 20px rgba(249, 115, 22, 0.4)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            4<span className="text-orange-500">0</span>4
          </motion.div>

          <motion.div
            className="text-orange-500 font-black tracking-tighter absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
            style={{ fontSize: "clamp(6rem, 15vw, 12rem)", lineHeight: 1 }}
            animate={{
              clipPath: [
                "inset(0 0 90% 0)",
                "inset(30% 0 50% 0)",
                "inset(60% 0 20% 0)",
                "inset(10% 0 70% 0)",
                "inset(80% 0 5% 0)",
                "inset(0 0 100% 0)",
                "inset(0 0 100% 0)",
              ],
              x: [-4, 4, -2, 3, -3, 0, 0],
              opacity: [1, 1, 1, 1, 1, 0, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              times: [0, 0.02, 0.04, 0.06, 0.08, 0.1, 1],
            }}
          >
            4<span className="text-orange-500">0</span>4
          </motion.div>

          <motion.div
            className="text-orange-400 font-black tracking-tighter absolute top-0 left-[2px] w-full h-full z-20 pointer-events-none"
            style={{ fontSize: "clamp(6rem, 15vw, 12rem)", lineHeight: 1 }}
            animate={{
              clipPath: [
                "inset(50% 0 30% 0)",
                "inset(0 0 80% 0)",
                "inset(70% 0 10% 0)",
                "inset(20% 0 60% 0)",
                "inset(0 0 100% 0)",
                "inset(0 0 100% 0)",
                "inset(0 0 100% 0)",
              ],
              x: [4, -4, 2, -3, 0, 0, 0],
              opacity: [1, 1, 1, 1, 0, 0, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              times: [0, 0.025, 0.05, 0.075, 0.1, 0.12, 1],
            }}
          >
            4<span className="text-orange-500">0</span>4
          </motion.div>
        </div>

        <p
          className="text-white font-bold tracking-[0.3em] uppercase mb-2"
          style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.4rem)" }}
        >
          PAGE NOT FOUND
        </p>

        <p className="mt-4 mb-10 max-w-md mx-auto text-gray-dark text-base leading-relaxed">
          Parece que esta página se perdeu no ciberespaço. Não se preocupe,
          vamos te colocar de volta nos trilhos.
        </p>

        <Link href="/">
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 font-bold uppercase tracking-[0.2em] text-white border-2 border-orange-500 hover:bg-orange-500 hover:text-black hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all duration-300 active:scale-95 text-[0.85rem]">
            <BsArrowLeft size={20} />
            Voltar ao início
          </button>
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-orange-500 opacity-60" />
      <div className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-orange-500 opacity-60" />
      <div className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-orange-500 opacity-60" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-orange-500 opacity-60" />
    </div>
  );
}
