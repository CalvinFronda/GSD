import { db } from "@/main";
import {
  CollectionReference,
  Firestore,
  collection,
  addDoc,
} from "firebase/firestore";
import type { Payload } from "@/types/payloads.types";
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

  async create<T>(payload: Payload<Promise<T>>) {
    try {
      const add = await addDoc(this.collection, payload.data);
      return add;
    } catch (error) {
      console.error("error =", error);
      return null;
    }
  }
}

export default FirestoreService;
