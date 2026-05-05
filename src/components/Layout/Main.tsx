"use client";

import { useChatModal } from "@/hooks/useChatModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import { LuBot } from "react-icons/lu";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import ScrollLinked from "../Motions/ScrollLinked";
import { Button } from "../ui/Button";
import Chat from "../ui/chat/Chat";
import { LoadingPage } from "../ui/LoadingPage";
import Footer from "./Footer";
import Header from "./Header";

interface IBodyProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const Main = ({ children }: IBodyProps): React.JSX.Element => {
  const [scrollY, setScrollY] = useState<boolean>(false);
  const { isChatOpen, closeChat, openChat } = useChatModal();

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="w-full min-h-screen bg-black relative">
      <ScrollLinked />
      <Suspense fallback={<LoadingPage />}>
        <Header />
        <div className="flex flex-col items-start w-full md:max-w-7xl mx-auto p-5 ">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </div>

        <Button.Float
          show={scrollY}
          side="left"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          icon={MdKeyboardDoubleArrowUp}
        />

        <button
          onClick={openChat}
          className="fixed bottom-10 right-5 md:right-10 w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110 active:scale-95 shadow-xl group"
        >
          <LuBot
            className="text-white/70 group-hover:text-white transition-colors"
            size={28}
          />
        </button>
        <Chat showChatModal={isChatOpen} handleCloseModal={closeChat} />

        <Footer />
      </Suspense>
    </main>
  );
};

export default Main;
