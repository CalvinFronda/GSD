class User {
  email: string;
  firstName: string | null;
  lastName: string | null;
  photo: string | null;
  points: number;
  createdAt: string; // isostring
  updatedAt: string; // isostring
  deletedAt: string | null; // starts off at null

  constructor(email: string, firstName: string, lastName: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.photo = null;
    this.points = 0;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.deletedAt = null;
  }

  asObject() {
    return {
      ...this,
    };
  }
}

export default User;
