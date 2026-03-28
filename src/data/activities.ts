export interface ActivityProject {
  id: string;
  title: string;
  category: string;
  summary: string;
  externalUrl?: string;
}

export const activities: ActivityProject[] = [
  {
    id: "1",
    title: "ASC",
    category: "2025.10 ~ ",
    summary: "Web Security",
  },
  {
    id: "2",
    title: "PROBLEM SOLVING",
    category: "2026.02 ~",
    summary: "anything",
  },
  {
    id: "3",
    title: "BLOG",
    category: "2026.01 ~",
    summary: "Posting",
    externalUrl: "https://yangsangyunblog.tistory.com/",
  },
  {
    id: "4",
    title: "BOJ",
    category: "2026.01 ~",
    summary: "Coding",
    externalUrl: "https://solved.ac/profile/gobukddang#",
  }
];
