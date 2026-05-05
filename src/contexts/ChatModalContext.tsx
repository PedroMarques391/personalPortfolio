"use client";

import React, { createContext, useState } from "react";

interface IChatModalContext {
  isModalChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

export const ChatModalContext = createContext<IChatModalContext | undefined>(
  undefined,
);

export const ChatModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isModalChatOpen, setIsModalChatOpen] = useState(false);

  const openChat = () => setIsModalChatOpen(true);
  const closeChat = () => setIsModalChatOpen(false);

  return (
    <ChatModalContext.Provider
      value={{
        isModalChatOpen,
        openChat,
        closeChat,
      }}
    >
      {children}
    </ChatModalContext.Provider>
  );
};
