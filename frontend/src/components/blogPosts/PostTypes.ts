interface BlogPostDataType {
  imageSrc: string;
  title: string;
  id: string;
  createdAt: Date;
  author: string;
  category: string;
  content?: string;
  subtitle: string;
}

interface PostFooterData {
  author: string;
  date: Date;
  subject: string;
  // For now, we dont use the below data
  subjectColorCode?: number;
  authorColorCode?: number;
}

export type { PostFooterData, BlogPostDataType };
