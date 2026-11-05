import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";

interface IModalRootProps {
  open: boolean;
  children: React.ReactNode;
  size?: "default" | "expanded" | "fullscreen";
  position?: "center" | "bottom-right";
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export function Root({
  open,
  children,
  size = "default",
  position = "center",
  className = "",
  showCloseButton = true,
  onClose,
}: IModalRootProps): React.JSX.Element {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open && modalRef.current && !modalRef.current.open) {
      modalRef.current.showModal();
    }
  }, [open]);

  let sizeClasses = "w-[94vw] max-w-[42rem] h-[82vh] max-h-[34rem]";
  if (size === "expanded") sizeClasses = "w-[94vw] h-[90vh]";
  if (size === "fullscreen") sizeClasses = "w-screen h-screen";

  return (
    <AnimatePresence>
      {open && (
        <motion.dialog
          ref={modalRef}
          onCancel={(e) => {
            e.preventDefault();
            onClose?.();
          }}
          layout
          transition={{ duration: 0.3, ease: "easeOut" }}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`bg-[#111111] rounded-2xl text-white backdrop:bg-black/80 p-0 outline-none shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden fixed flex flex-col z-50 ${sizeClasses} ${position === "bottom-right" ? "ml-auto mt-auto mb-2 mr-2" : ""} ${className}`}
        >
          <div className="w-full h-full flex flex-col relative">
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-0 right-0 m-1 w-fit h-fit p-1 rounded-lg"
                aria-label="Close"
                title="Close"
              >
                <CgClose size={16} className="text-gray-200" />
              </button>
            )}
            {children}
          </div>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
}
