import { useState } from "react";
import { AddTaskDialog } from "@/components/ui/addtaskdialog";
import TaskCard from "@/components/ui/taskcard";
import { DB } from "@/shared/firebase/client";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(DB, "tasks");
        const q = query(tasksCollection);
        const querySnapshot = await getDocs(q);
        const tasksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);
  console.log(tasks);
  return (
    <div className="flex flex-col gap-4  px-4 lg:px-6">
      <div>Section card </div>
      <div className="w-1/4">
        <AddTaskDialog />
      </div>
      <div className="flex flex-row gap-5 w-full">
        {tasks.map(({ title, description }, i) => (
          <TaskCard key={i} title={title} description={description} />
        ))}
      </div>
    </div>
  );
}
