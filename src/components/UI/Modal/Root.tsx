import { AnimatePresence, motion } from "motion/react";

interface RootProps {
  children: React.ReactNode;
  type?: "success" | "error" | "neutral";
  open: boolean;
}

export function Root({ children, type = "neutral", open }: RootProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 500 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 30,
          }}
          className={`fixed top-24 right-5 z-50 rounded-md shadow-lg p-5 w-fit h-fit max-w-[400px] ${
            type === "success"
              ? "bg-green-100 text-green-800"
              : type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
