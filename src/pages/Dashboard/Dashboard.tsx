import { useState } from "react";
import { AddTaskDialog } from "@/pages/Dashboard/children/addtaskdialog";
import TaskCard from "@/pages/Dashboard/children/taskcard";
import { db } from "@/main";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";
import { Task } from "@/models";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, "tasks");
        const q = query(tasksCollection);
        const querySnapshot = await getDocs(q);
        const tasksData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        // TODO
        setTasks(tasksData);
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
        <AddTaskDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {tasks.map((task, i) => (
          <TaskCard key={i} task={task} />
        ))}
      </div>
    </div>
  );
}
