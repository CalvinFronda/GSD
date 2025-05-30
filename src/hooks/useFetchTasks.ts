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
      orderBy("createdAt", "desc"),
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
      },
    );

    // Cleanup
    return () => {
      unsubscribe();
    };
  }, [user, setTasks]);
};

class Solution {
  /**
   * @param {string[]} strs
   * @returns {string}
   */
  encode(strs) {
    // result
    let result = "";
    // for every word in strs
    for (let i = 0; i < strs.length; i++) {
      // set the work + the length of str + # + the string
      result += strs[i].length + "#" + strs[i];
    }
    return result;
  }

  /**
   * @param {string} str
   * @returns {string[]}
   */
  decode(str) {
    const result = [];
    let i = 0;

    while (i < str.length) {
      let j = i;
      while (str[j] !== "#") {
        j++;
      }

      const length = parseInt(str.slice(i, j), 10);
      const s = str.slice(j + 1, j + 1 + length);
      result.push(s);
      i = j + 1 + length;
    }

    return result;
  }
}
