"use client";
import { IProjectInterface } from "@/app/projects/page";
import { useState } from "react";

function useProjects() {
  const [projects, setProjects] = useState<IProjectInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchProjects = async (url: string) => {
    try {
      setError(null);
      const response = await fetch(url);
      const data = await response.json();

      setProjects(data.projects);
    } catch (error) {
      console.error("[fetchProjects] error to get projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      setProjects((prev) => prev.filter((project) => project.id !== id));
      const response = await fetch(`/api/project/delete-project?id=${id}`, {
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

  return { projects, loading, error, fetchProjects, handleDelete, deletingId };
}

export default useProjects;
