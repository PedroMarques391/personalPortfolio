"use client";

import React, { createContext, useState } from "react";

interface IChatModalContext {
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

export const ChatModalContext = createContext<IChatModalContext>(
  {} as IChatModalContext,
);

export const ChatModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  return (
    <ChatModalContext.Provider
      value={{
        isChatOpen,
        openChat,
        closeChat,
      }}
    >
      {children}
    </ChatModalContext.Provider>
  );
};
