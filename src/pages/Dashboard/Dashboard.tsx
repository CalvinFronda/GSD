import { useState } from "react";
import { TaskDialog } from "@/pages/Dashboard/children/addtaskdialog";
import TaskCard from "@/pages/Dashboard/children/taskcard";
import { useEffect } from "react";
import { Task } from "@/models";
import { useAuth } from "@/features/auth/authContext";

import TasksFirestoreService from "@/services/db/tasks.firestore.service";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { user } = useAuth();
  const tasksFirestoreService = new TasksFirestoreService();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!user) return;

        const taskData = await tasksFirestoreService.getTasksByOwner(user.uid);

        setTasks(taskData as Task[]);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

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
