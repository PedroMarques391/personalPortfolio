"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import ScrollLinked from "../Motions/ScrollLinked";
import { LoadingPage } from "../UI/LoadingPage";
import Footer from "./Footer";
import Header from "./Header";

interface IBodyProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const Main = ({ children }: IBodyProps): React.JSX.Element => {
  const [scrollY, setScrollY] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <main className="w-full min-h-screen bg-black relative">
          <ScrollLinked />
          <Header />
          <div className="flex flex-col items-start w-full md:max-w-7xl mx-auto p-5 ">
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </div>
          <button
            className={`w-10 h-10 sm:h-12 sm:w-12 bg-white/30 justify-center items-center flex fixed bottom-10 right-5 md:right-10 rounded-xl duration-500 transition-opacity ${
              scrollY ? "opacity-1" : "opacity-0"
            }`}
          >
            <MdKeyboardDoubleArrowUp
              aria-label="Scroll To Top"
              className="text-4xl md:text-6xl"
              color="#1c1c1c"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </button>
          <Footer />
        </main>
      )}
    </>
  );
};

export default Main;
