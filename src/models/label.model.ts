class Label {
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  constructor(title: string, color: string) {
    this.title = title;
    this.color = color;
    this.updatedAt = new Date().toISOString();
    this.createdAt = new Date().toISOString();
    this.deletedAt = null;
  }

  asObject() {
    return {
      ...this,
    };
  }
}

export default Label;
