"use client";
import AdminLayout from "@/components/Layout/AdminLayout";
import Skeleton from "@/components/Motions/Skeleton";
import ProjectCard from "@/components/UI/ProjectCard";
import ProjectsNotFound from "@/components/UI/ProjectsNotFound";
import SectionHeader from "@/components/UI/SectionHeader";
import { useMutationProjects } from "@/services/projects/mutations";
import { useProjects } from "@/services/projects/queries";
import { AnimatePresence } from "motion/react";

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
  const { deleteProject } = useMutationProjects();
  const { data, isLoading: loading } = useProjects("user-projects");

  const projects = data?.projects;

  return (
    <AdminLayout>
      <SectionHeader title="Cadastros" subtitle="" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 mt-10 w-full">
        {loading ? (
          <AnimatePresence>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} index={i} />
            ))}
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            {projects.map((project: IProjectInterface) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                src={project.imageURL}
                tags={project.tags}
                type={project.type}
                title={project.title}
                url={project.url}
                onDelete={() => deleteProject.mutate(project.id)}
              >
                {project.content}
              </ProjectCard>
            ))}
          </AnimatePresence>
        )}
        {!loading && projects.length === 0 && <ProjectsNotFound />}
      </div>
    </AdminLayout>
  );
};

export default ProjectsPage;
