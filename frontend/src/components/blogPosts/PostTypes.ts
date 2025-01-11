interface BlogPostDataType {
  imgSrc: string;
  title: string;
  desc: string;
  id: string;
  date: Date;
  author: string;
  subject: string;
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
