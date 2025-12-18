"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import ScrollLinked from "../Motions/ScrollLinked";
import { Button } from "../UI/Button";
import { LoadingPage } from "../UI/LoadingPage";
import Footer from "./Footer";
import Header from "./Header";

interface IBodyProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const Main = ({ children }: IBodyProps): React.JSX.Element => {
  const [scrollY, setScrollY] = useState<boolean>(false);
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
      <Header />
      <Suspense fallback={<LoadingPage />}>
        <div className="flex flex-col items-start w-full md:max-w-7xl mx-auto p-5 ">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </div>
        <Button.Float scrollY={scrollY} />
      </Suspense>
      <Footer />
    </main>
  );
};

export default Main;
