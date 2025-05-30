import { useTaskStore } from "@/store/useTaskStore";

import { useFetchTasks } from "@/hooks/useFetchTasks";
import { TaskDialog } from "@/pages/Dashboard/children/addtaskdialog";
import TaskCard from "@/pages/Dashboard/children/taskcard";

export default function Dashboard() {
  const tasks = useTaskStore((s) => s.tasks);

  useFetchTasks();

  return (
    <div className="flex flex-col gap-4">
      <div className="w-1/4">
        <TaskDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-4">
        {tasks.map((task, i) => (
          <TaskCard key={i} task={task} />
        ))}
      </div>
    </div>
  );
}
