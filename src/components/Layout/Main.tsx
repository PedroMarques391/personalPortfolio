"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import { BiBot } from "react-icons/bi";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import ScrollLinked from "../Motions/ScrollLinked";
import { Button } from "../UI/Button";
import Chat from "../UI/chat/Chat";
import { LoadingPage } from "../UI/LoadingPage";
import Footer from "./Footer";
import Header from "./Header";

interface IBodyProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const Main = ({ children }: IBodyProps): React.JSX.Element => {
  const [scrollY, setScrollY] = useState<boolean>(false);
  const [isModalChatOpen, setIsModalChatOpen] = useState<boolean>(false);

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

        <Button.Float
          show={true}
          side="right"
          onClick={() => setIsModalChatOpen(true)}
          icon={BiBot}
        />
        <Chat
          showChatModal={isModalChatOpen}
          handleCloseModal={() => setIsModalChatOpen(false)}
        />

        <Footer />
      </Suspense>
    </main>
  );
};

export default Main;
