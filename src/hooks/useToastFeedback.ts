"use client";

import { useCallback, useEffect, useState } from "react";

export interface IToastMessage {
  title: string;
  subtitle: string;
  content?: string;
  success: boolean;
}

export function useToastFeedback(durationMs: number = 3000) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<IToastMessage | null>(null);

  const triggerToast = useCallback((nextMessage: IToastMessage) => {
    setMessage(nextMessage);
    setOpen(true);
  }, []);

  const closeToast = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      setOpen(false);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [open, durationMs]);

  return {
    open,
    message,
    triggerToast,
    closeToast,
  };
}
