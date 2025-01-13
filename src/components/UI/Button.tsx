"use client"
import { motion } from "framer-motion";

interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
    styles?: string;
    duration?: number
}

const Button = ({ children, styles, duration = 0.5, ...props }: IButtonProps): React.JSX.Element => {
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

export default Button;
