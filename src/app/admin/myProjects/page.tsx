"use client";
import Skeleton from "@/components/Motions/Skeleton";
import ProjectCard from "@/components/UI/ProjectCard";
import ProjectsNotFound from "@/components/UI/ProjectsNotFound";
import SectionHeader from "@/components/UI/SectionHeader";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export interface IProjectInterface {
  id: number;
  imageURL: string;
  title: string;
  type: string;
  content: React.ReactNode;
  tags: string;
  url: string;
}

const ProjectsPage = (): React.JSX.Element => {
  const [projects, setProjects] = useState<IProjectInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/project/get-project");
      const data = await response.json();
      if (!data.success) return setProjects([] as IProjectInterface[]);
      setProjects(data.projects);
    } catch (error) {
      console.error("[fetchProjects] error to get projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      const response = await fetch(`/api/project/delete-project?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.success) {
        return await fetchProjects();
      }
    } catch (error) {
      console.error("[fetchProjects] error to get projects", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full h-full text-gray-soft flex flex-col justify-center items-center mt-10 mx-auto">
      <SectionHeader title="Projetos Cadastrados" subtitle="" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 mt-10 w-full">
        <AnimatePresence>
          {loading && (
            <>
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} index={i} />
              ))}
            </>
          )}
          {!loading && projects.length === 0 && <ProjectsNotFound />}
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              id={project.id}
              src={project.imageURL}
              tags={project.tags}
              type={project.type}
              title={project.title}
              url={project.url}
              onDelete={() => handleDelete(project.id)}
              isDeleting={deletingId === project.id}
            >
              {project.content}
            </ProjectCard>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsPage;
