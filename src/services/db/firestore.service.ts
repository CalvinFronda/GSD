import { db } from "@/main";
import {
  CollectionReference,
  Firestore,
  collection,
  addDoc,
  doc,
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

  // get should be able to get a single or get all
  // getAll
  async get<T>(collection: string, id?: string): Promise<T> {
    const docRef = doc(this.db, collection, id);
  }

  // update

  // delete

  // list
}

export default FirestoreService;
