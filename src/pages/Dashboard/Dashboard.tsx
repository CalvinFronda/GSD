import { TaskDialog } from "@/pages/Dashboard/children/addtaskdialog";
import TaskCard from "@/pages/Dashboard/children/taskcard";
import { useEffect } from "react";
import { useAuth } from "@/features/auth/authContext";
import { useTaskStore } from "@/hooks/useTaskStore";

export default function Dashboard() {
  const { tasks, fetchTasks } = useTaskStore();
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchTasks(user.uid);
  }, [tasks]);

  return (
    <div className="flex flex-col gap-4  px-4 lg:px-6 py-28">
      <h1>Need to orginize</h1>
      <div className="w-1/4">
        <TaskDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {tasks.map((task, i) => (
          <TaskCard key={i} task={task} />
        ))}
      </div>
    </div>
  );
}
