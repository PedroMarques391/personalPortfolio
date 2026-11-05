"use client";

import { AnimatePresence, motion } from "motion/react";
import React, { useEffect } from "react";
import { FiAlertTriangle, FiLoader } from "react-icons/fi";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps): React.JSX.Element => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) {
        onCancel();
      }
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, isLoading, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isLoading && onCancel()}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            className="w-full max-w-md bg-gray-light border border-white/10 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                <FiAlertTriangle size={22} />
              </div>
              <div className="flex-1">
                <h2
                  id="confirm-dialog-title"
                  className="text-base font-semibold text-white"
                >
                  {title}
                </h2>
                <p className="text-sm text-gray-dark mt-1 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/[0.06]">
              <button
                type="button"
                disabled={isLoading}
                onClick={onCancel}
                className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-soft text-sm font-medium transition-colors"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={onConfirm}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-60"
              >
                {isLoading ? (
                  <FiLoader className="animate-spin text-white text-base" />
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
