export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "창의적공학설계-비트킬러",
    category: "2025.12.10",
    description: "영상, 프로젝트",
    youtubeId: "Amy3N0Wv7T0",
    // hqdefault.jpg is used as it is 100% guaranteed to exist for all videos, preventing 404 Next.js crash errors.
    thumbnail: "https://img.youtube.com/vi/Amy3N0Wv7T0/hqdefault.jpg",
  },
  {
    id: "2",
    title: "27기 기수곡",
    category: "2026.01.03",
    description: "영상, 공연",
    youtubeId: "wMJUFnZeuYk",
    thumbnail: "https://img.youtube.com/vi/wMJUFnZeuYk/hqdefault.jpg?v=new",
  },
  {
    id: "3",
    title: "브레이킹 정기공연",
    category: "2026.01.03",
    description: "영상, 공연",
    youtubeId: "EbcXJz660Cg",
    thumbnail: "https://img.youtube.com/vi/EbcXJz660Cg/hqdefault.jpg",
  }
];
