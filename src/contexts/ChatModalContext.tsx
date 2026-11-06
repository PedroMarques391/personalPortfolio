"use client";

import React, { createContext, useCallback, useMemo, useState } from "react";

interface IChatModalContext {
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

export const ChatModalContext = createContext<IChatModalContext | null>(null);

export const ChatModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = useCallback(() => setIsChatOpen(true), []);
  const closeChat = useCallback(() => setIsChatOpen(false), []);

  const value = useMemo(
    () => ({
      isChatOpen,
      openChat,
      closeChat,
    }),
    [isChatOpen, openChat, closeChat],
  );

  return (
    <ChatModalContext.Provider value={value}>
      {children}
    </ChatModalContext.Provider>
  );
};
