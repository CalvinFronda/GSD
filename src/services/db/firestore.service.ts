import { db } from "@/main";
import {
  CollectionReference,
  Firestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  QueryConstraint,
  query,
} from "firebase/firestore";
import { COLLECTIONS } from "@/constants/firestore.constants";
import type { User, Task } from "@/models";

class FirestoreService {
  db: Firestore;
  collectionName: keyof typeof COLLECTIONS;
  collection: CollectionReference;
  model: typeof User | typeof Task;

  constructor(collectionName: string, model: typeof User | typeof Task) {
    this.db = db;
    this.collectionName = collectionName as keyof typeof COLLECTIONS;
    this.collection = collection(this.db, collectionName);
    this.model = model;
  }

  async create<T>(payload: Promise<T>) {
    try {
      const add = await addDoc(this.collection, payload);
      return add;
    } catch (error) {
      console.error("error =", error);
      return null;
    }
  }
  // TODO

  // To be able to query within other services
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

  // get a single or get all from a collection
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

  // update

  // delete

  // list
}

export default FirestoreService;
