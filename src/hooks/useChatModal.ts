import { ChatModalContext } from "@/contexts/ChatModalContext";
import { useContext } from "react";

export const useChatModal = () => {
  const context = useContext(ChatModalContext);
  if (!context) {
    throw new Error("useChatModal must be used within a ChatModalProvider");
  }
  return context;
};
