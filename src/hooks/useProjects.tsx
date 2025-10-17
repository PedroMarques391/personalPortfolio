"use client";
import { IProjectInterface } from "@/app/projects/page";
import { useState } from "react";

function useProjects() {
  const [projects, setProjects] = useState<IProjectInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchProjects = async () => {
    try {
      setError(null);
      const response = await fetch("/api/project/get-project");
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
      console.log(projects);
      const response = await fetch(`/api/project/delete-project?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        return await fetchProjects();
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
