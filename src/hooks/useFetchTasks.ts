import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";

import { TaskType, useTaskStore } from "@/store/useTaskStore";
import { useAuth } from "@/features/auth/authContext";
import TasksFirestoreService from "@/services/db/tasks.firestore.service";

// Real time task event listener
export const useFetchTasks = () => {
  const { user } = useAuth();
  const { setTasks } = useTaskStore();

  useEffect(() => {
    if (!user) return;

    console.log("Setting up real-time listener for tasks");

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      new TasksFirestoreService().collection,

      (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as TaskType[];

        setTasks(tasks);
      },
      (error) => {
        console.error("Error listening to tasks:", error);
      },
    );

    // Cleanup
    return () => {
      console.log("Cleaning up tasks listener");
      unsubscribe();
    };
  }, [user, setTasks]);
};
