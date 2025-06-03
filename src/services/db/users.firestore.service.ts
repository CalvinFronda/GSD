import { COLLECTIONS } from "@/constants/firestore.constants";
import { User } from "@/models";

import FirestoreService from "./firestore.service";

//TODO
class UsersFirestoreService extends FirestoreService {
  constructor() {
    super(COLLECTIONS.USERS, User);
  }
}

export default new UsersFirestoreService();
