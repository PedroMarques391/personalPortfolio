"use client";
import Skeleton from "@/components/Motions/Skeleton";
import ProjectCard from "@/components/UI/ProjectCard";
import ProjectsNotFound from "@/components/UI/ProjectsNotFound";
import SectionHeader from "@/components/UI/SectionHeader";
import useProjects from "@/hooks/useProjects";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";

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
  const { projects, loading, handleDelete, deletingId, fetchProjects } =
    useProjects();

  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchProjects();
  }, []);

  return (
    <div className="w-full h-full text-gray-soft flex flex-col justify-center items-center mt-10 mx-auto">
      <SectionHeader title="Projetos Cadastrados" subtitle="" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 mt-10 w-full">
        {loading ? (
          <AnimatePresence>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} index={i} />
            ))}
          </AnimatePresence>
        ) : (
          <AnimatePresence>
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
        )}
        {!loading && projects.length === 0 && <ProjectsNotFound />}
      </div>
    </div>
  );
};

export default ProjectsPage;
