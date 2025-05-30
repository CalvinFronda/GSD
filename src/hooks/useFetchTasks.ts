import { useEffect } from "react";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";

import { TaskType, useTaskStore } from "@/store/useTaskStore";
import { useAuth } from "@/features/auth/authContext";
import TasksFirestoreService from "@/services/db/tasks.firestore.service";

// Real time task event listener
export const useFetchTasks = () => {
  const { user } = useAuth();
  const { setTasks } = useTaskStore();

  useEffect(() => {
    if (!user) return;
    const collectionRef = new TasksFirestoreService().collection;

    const q = query(
      collectionRef,
      where("owner", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    // Set up real-time listener
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TaskType[];

        setTasks(tasks);
      },
      (error) => {
        console.error("Error listening to tasks:", error);
      }
    );

    // Cleanup
    return () => {
      unsubscribe();
    };
  }, [user, setTasks]);
};
