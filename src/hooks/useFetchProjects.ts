import { useEffect } from "react";

import { onSnapshot, orderBy, query, where } from "firebase/firestore";

import { useAuth } from "@/features/auth/authContext";

import ProjectsFirestoreService from "@/services/db/projects.firestore.service";

import { ProjectType, useProjectStore } from "@/store/useProjectStore";

// Real time task event listener
export const useFetchProjects = () => {
  const { user } = useAuth();
  const { setProject } = useProjectStore();

  useEffect(() => {
    if (!user) return;
    const collectionRef = new ProjectsFirestoreService().collection;

    const q = query(
      collectionRef,
      where("owner", "==", user.uid),
      where("deletedAt", "==", null),
      orderBy("createdAt", "desc"),
    );
    // Set up real-time listener
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const projects = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ProjectType[];

        setProject(projects);
      },
      (error) => {
        console.error("Error listening to tasks:", error);
      },
    );

    // Cleanup
    return () => {
      unsubscribe();
    };
  }, [user, setProject]);
};
