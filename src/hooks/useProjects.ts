"use client";
import { IProjectInterface } from "@/app/projects/page";
import imageToBase64 from "@/utils/functions/imageToBase64";
import { ProjectData } from "@/validations/project.scheme";
import { useMemo, useState } from "react";

function useProjects() {
  const [projects, setProjects] = useState<IProjectInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [activeButton, setActiveButton] = useState<number>(0);
  const [filter, setFilter] = useState<string>("Todos");

  async function createProject(data: ProjectData, image: File) {
    const base64 = await imageToBase64(image);

    const res = await fetch("/api/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, imageURL: base64 }),
    });

    if (!res.ok) {
      throw new Error("Erro ao adicionar o projeto. Tente novamente.");
    }

    return await res.json();
  }

  const fetchProjects = async (url: string) => {
    try {
      setError(null);
      const response = await fetch(url);
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.log("[fetchProjects] error to get projects", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      setProjects((prev) => prev.filter((project) => project.id !== id));
      const response = await fetch(`/api/project?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.success) {
        return await fetchProjects("/api/project/get-project/user-projects");
      }
    } catch (error) {
      console.error("[fetchProjects] error to get projects", error);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProjects = useMemo(() => {
    if (filter === "Todos") return projects;
    const filterProjects = projects.filter(
      (project) => project.type.toLowerCase() === filter.toLowerCase()
    );
    return filterProjects;
  }, [projects, filter]);

  const handleFilter = (rule: string, index: number) => {
    setActiveButton(index);
    setFilter(rule);
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    handleDelete,
    deletingId,
    createProject,
    handleFilter,
    filteredProjects,
    activeButton,
  };
}

export default useProjects;
