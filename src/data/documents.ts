export interface DocumentProject {
  id: string;
  title: string;
  category: string;
  summary: string;
  content?: string;
  externalUrl?: string;
}

export const documents: DocumentProject[] = [
  {
    id: "1",
    title: "React2Shell Vuln Scanner",
    category: "2026.01~2026.02",
    summary: "Security",
  },
  {
    id: "2",
    title: "Linux Vuln Scanner",
    category: "2025.10~2026.01",
    summary: "Security",
  },
  {
    id: "3",
    title: "Ocean Cleanup",
    category: "2025.10",
    summary: "Creative",
  },
  {
    id: "4",
    title: "Air Drum",
    category: "2025.10~2025.12",
    summary: "Engineering",

  },
  {
    id: "5",
    title: "Meetplz",
    category: "2026.02",
    summary: "Web Development",
  }
];
