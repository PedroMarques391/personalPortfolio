"use client";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { IconType } from "react-icons";

interface IButtonProps extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  children: React.ReactNode;
  styles?: string;
  duration?: number;
}

interface IButtonFooterProps extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  children: React.ReactNode;
  href: string;
  duration?: number;
}

function Button({
  children,
  styles,
  duration = 0.5,
  ...props
}: IButtonProps): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration, ease: "easeInOut" }}
    >
      <button
        {...props}
        className={`p-4 border border-transparent flex gap-2 text-sm items-center justify-center rounded-3xl bg-gray-light w-40 
                hover:border-orange-400 hover:scale-110 hover:text-orange-400 transform origin-center z-10 duration-300 ease-in-out ${styles}`}
      >
        {children}
      </button>
    </motion.div>
  );
}

function Footer({
  children,
  duration,
  href,
}: IButtonFooterProps): React.JSX.Element {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { amount: 0.1 });

  const itemVariant = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Link
      href={href}
      prefetch
      target="_blank"
      rel="noopener noreferrer"
      className="block py-2 text-base md:text-xl tracking-wider text-gray-dark text-center px-2 duration-200"
      aria-label={`Abrir link ${children} em uma nova aba`}
    >
      <motion.p
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={itemVariant}
        transition={{ duration: duration }}
        whileHover={{
          scale: 1.12,
          color: "#f97316",
          textShadow: "0px 2px 12px rgba(255, 102, 0, 0.3)",
          rotate: 2,
        }}
      >
        {children}
      </motion.p>
    </Link>
  );
}

function Float({
  show,
  side,
  onClick,
  icon,
}: {
  show: boolean;
  side: "left" | "right";
  onClick: () => void;
  icon: IconType;
}): React.JSX.Element {
  const Icon = icon;

  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 sm:h-12 sm:w-12 bg-white/30 justify-center items-center flex fixed bottom-10 right-5 md:right-10 rounded-xl duration-500 transition-opacity ${
        show ? "opacity-1" : "opacity-0"
      } ${side === "left" ? "left-5 md:left-10" : "right-5 md:right-10"}`}
    >
      <Icon
        aria-label="Scroll To Top"
        className="text-4xl md:text-6xl"
        color="#1c1c1c"
      />
    </button>
  );
}

Button.Footer = Footer;

Button.Float = Float;

export { Button };
