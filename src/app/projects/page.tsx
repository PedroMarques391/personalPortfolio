"use client";
import { Button } from "@/components/UI/Button";
import ProjectCard from "@/components/UI/ProjectCard";
import SectionHeader from "@/components/UI/SectionHeader";
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
  const [active, setActive] = useState<number>(0);
  const [getProjects, setGetProjects] = useState<IProjectInterface[]>([]);
  const [allProjects] = useState<IProjectInterface[]>(
    getProjects as IProjectInterface[]
  );

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch("/api/project/get-project");
      const data = await response.json();
      setGetProjects(data.projects);
    }

    fetchProjects();
  }, []);

  const buttonsValues = [
    { duration: 0.5, title: "Todos" },
    { duration: 1.0, title: "Web" },
    { duration: 1.5, title: "Mobile" },
    { duration: 2.0, title: "Automações" },
  ];

  function handleFilter(rule: string, index: number) {
    setActive(index);
    if (rule === "Todos") {
      setGetProjects(allProjects);
    } else {
      const filter = allProjects.filter(
        (project) => project.type.toLowerCase() === rule.toLowerCase()
      );
      setGetProjects(filter);
    }
  }

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
                      active === index
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
        {getProjects.map((project, index) => (
          <ProjectCard
            key={index}
            src={project.imageURL}
            tags={project.tags}
            type={project.type}
            title={project.title}
            url={project.url}
            index={index}
          >
            {project.content}
          </ProjectCard>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
