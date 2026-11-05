"use client";

import HeroSection from "@/components/Home/HeroSection";
import ServicesSection from "@/components/Home/ServicesSection";
import { Requests } from "@/services/requests";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const queryClient = useQueryClient();
  const { locale } = useParams();
  const resolvedLocale = typeof locale === "string" ? locale : "pt";

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["projects", "all", 1, "all", ""],
      queryFn: async () => {
        return await Requests.getProject(
          `/api/project?role=all&page=1&type=all`,
        );
      },
      staleTime: 1000 * 60 * 60,
    });
  }, [queryClient]);

  return (
    <div className="text-gray-soft flex h-full flex-col">
      <HeroSection locale={resolvedLocale} />
      <ServicesSection locale={resolvedLocale} />
    </div>
  );
}
