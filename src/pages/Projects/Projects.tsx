import { useTaskStore } from "@/store/useTaskStore";
import { useFetchTasks } from "@/hooks/useFetchTasks";
import ProjectCard from "./children/ProjectCard";

import { Button } from "@/components/ui/button";
/**
 
 */

function Projects() {
  const tasks = useTaskStore((s) => s.tasks);
  useFetchTasks();
  // Client side pagination

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button> Create Project</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
}

export default Projects;
