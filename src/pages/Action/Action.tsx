import { useEffect, useState } from "react";

import { useTaskStore } from "@/store/useTaskStore";
import { useAuth } from "@/features/auth/authContext";
import TaskCard from "../Dashboard/children/taskcard";
import { Task } from "@/models";

const ActionPage = () => {
  const { tasks, fetchTasks } = useTaskStore();
  const [actions, setActions] = useState<Task[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTasks(user.uid);

      // Filter tasks that need action
      const filteredTasks = tasks.filter((task) => {
        // Destructure task properties to check
        const {
          dueDate,
          difficulty,
          weight,
          content: { title, description },
        } = task;

        // Exclude completed or deleted tasks
        if (task.completedAt || task.deletedAt) {
          return false;
        }

        // Check for missing required fields
        return !dueDate || !difficulty || !weight || !title || !description;
      });

      setActions(filteredTasks);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6 py-28">
      <h1>Action Page</h1>

      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Tasks</h2>
        </div>

        <div className="w-full"></div>
      </main>
    </div>
  );
};

export default ActionPage;
