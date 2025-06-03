import {
  CollectionReference,
  DocumentData,
  Firestore,
  QueryConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";

import { COLLECTIONS } from "@/constants/firestore.constants";
import { User, Task, Project } from "@/models";
import { db } from "@/shared/firebase/client";

class FirestoreService {
  db: Firestore;
  collectionName: keyof typeof COLLECTIONS;
  collection: CollectionReference;
  model: typeof User | typeof Task | typeof Project;

  constructor(
    collectionName: string,
    model: typeof User | typeof Task | typeof Project,
  ) {
    this.db = db;
    this.collectionName = collectionName as keyof typeof COLLECTIONS;
    this.collection = collection(this.db, collectionName);
    this.model = model;
  }

  /**
   *   GET method -> if id provided -> get single document
   *              -> if no id -> get all documents
   * */

  async get<T>(id?: string): Promise<T | T[] | null> {
    try {
      if (id) {
        const docRef = doc(this.db, this.collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data() as T;
        } else {
          return null;
        }
      } else {
        const querySnap = await getDocs(this.collection);
        const data = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        return data;
      }
    } catch (error) {
      console.error("error =", error);
      return null;
    }
  }

  /**
   *   CREATE method -> create new document depending on collection
   * */

  async create<T extends DocumentData>(payload: T) {
    try {
      const add = await addDoc(this.collection, payload);
      return add;
    } catch (error) {
      console.error("error =", error);
      return null;
    }
  }

  /**
   *   UPDATE method -> if id provided -> get single document
   *              -> if no id -> get all documents
   * */

  async update<T>(id: string, payload: Partial<T>) {
    try {
      const docRef = doc(this.db, this.collectionName, id);

      await updateDoc(docRef, payload as DocumentData);
      return true;
    } catch (error) {
      console.error("error =", error);
      return false;
    }
  }

  /**
   * DELETE -> requires document id
   */
  async delete(id: string): Promise<boolean> {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error("error =", error);
      return false;
    }
  }

  /**
   *   Query method -> used to query data per service
   * */
  async queryDocs<T>(constraints: QueryConstraint[]): Promise<T[]> {
    try {
      const q = query(this.collection, ...constraints);
      const querySnap = await getDocs(q);
      return querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
    } catch (error) {
      console.error("error = ", error);
      return [];
    }
  }
}

export default FirestoreService;
