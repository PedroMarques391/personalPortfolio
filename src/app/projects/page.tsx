"use client";
import Skeleton from "@/components/Motions/Skeleton";
import { Button } from "@/components/UI/Button";
import ProjectCard from "@/components/UI/ProjectCard";
import ProjectsNotFound from "@/components/UI/ProjectsNotFound";
import SectionHeader from "@/components/UI/SectionHeader";
import useProjects from "@/hooks/useProjects";
import { AnimatePresence } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const { projects, loading, fetchProjects } = useProjects();
  const [activeButton, setActiveButton] = useState<number>(0);
  const [filter, setFilter] = useState<string>("Todos");

  const buttonsValues = [
    { duration: 0.5, title: "Todos" },
    { duration: 1.0, title: "Web" },
    { duration: 1.5, title: "Mobile" },
    { duration: 2.0, title: "Automações" },
  ];

  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchProjects("/api/project?role=all");
  }, []);

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

  return (
    <div className="w-full h-full text-gray-soft flex flex-col justify-center items-center mt-10 mx-auto">
      <SectionHeader title="Projetos" subtitle="Um pouco do meu trabalho" />
      <div className="flex flex-wrap justify-center gap-5 mt-10 w-[90%] mx-auto ">
        {buttonsValues.map((button, index) => (
          <Button
            key={index}
            onClick={() => handleFilter(button.title, index)}
            styles={`uppercase bg-gray-light rounded-md w-auto border 
                    ${
                      activeButton === index
                        ? "scale-110 font-bold text-white"
                        : "border-transparent text-gray-dark"
                    } 
                    py-2 transition duration-300`}
            duration={button.duration}
          >
            {button.title}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 mt-10 w-full">
        {loading ? (
          <AnimatePresence mode="wait">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} index={i} />
            ))}
          </AnimatePresence>
        ) : (
          <>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                src={project.imageURL}
                tags={project.tags}
                type={project.type}
                title={project.title}
                url={project.url}
              >
                {project.content}
              </ProjectCard>
            ))}
          </>
        )}
        {!loading && projects.length === 0 && <ProjectsNotFound />}
      </div>
    </div>
  );
};

export default ProjectsPage;
