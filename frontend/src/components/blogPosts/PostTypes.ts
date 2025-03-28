interface BlogPostDataType {
  imageSrc: string;
  title: string;
  id: string;
  createdAt: Date;
  author: string;
  category: string;
  content?: string;
  subtitle: string;
  _id?: string;
  likes: string[];
}

export type { BlogPostDataType };
