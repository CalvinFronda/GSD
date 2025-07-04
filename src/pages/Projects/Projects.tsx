import { useProjectStore } from "@/store/useProjectStore";

import { useFetchProjects } from "@/hooks/useFetchProjects";

import ProjectCard from "./children/ProjectCard";
import { ProjectDialog } from "./children/ProjectDialog";

/**
    Projects page 
 */

function Projects() {
  const projects = useProjectStore((s) => s.projects);
  useFetchProjects();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <ProjectDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <ProjectCard project={p} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
