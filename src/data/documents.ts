export interface DocumentProject {
  id: string;
  title: string;
  category: string;
  summary: string;
}

export const documents: DocumentProject[] = [
  {
    id: "1",
    title: "react2shell vulnerability scanner",
    category: "2026.01~2026.02",
    summary: "Security",
  },
  {
    id: "2",
    title: "Linux vulnerability scanner",
    category: "2025.10~2026.01",
    summary: "Security",
  },
  {
    id: "3",
    title: "해양중금속 수거 설계",
    category: "2025.10",
    summary: "Creative",
  },
  {
    id: "4",
    title: "에어드럼",
    category: "2026.10~2026.12",
    summary: "Engineering",

  },
  {
    id: "5",
    title: "meetplz 웹 개발",
    category: "2026.02",
    summary: "Web Development",
  }
];
