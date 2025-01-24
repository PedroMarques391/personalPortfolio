"use client";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
    styles?: string;
    duration?: number
}

interface IButtonFooterProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
    href: string
    duration?: number
}

function Button({ children, styles, duration = 0.5, ...props }: IButtonProps): React.JSX.Element {
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
};

function Footer({ children, duration, href }: IButtonFooterProps): React.JSX.Element {
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
            className="block py-2 text-base md:text-xl font-mono  text-gray-dark hover:text-gray-soft text-center px-2 hover:-translate-x-10 transition-transform duration-200"
            aria-label={`Abrir link ${children} em uma nova aba`}
        >
            <motion.p
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={itemVariant}
                transition={{ duration: duration, }}
            >{children}</motion.p>
        </Link>
    );
}

Button.Footer = Footer;

export { Button };
