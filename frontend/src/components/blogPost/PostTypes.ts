interface PostFooterData {
  author: string;
  date: Date;
  subject: String;
  // For now, we dont use the below data
  subjectColorCode?: number;
  authorColorCode?: number;
}

export type { PostFooterData };
