export interface Problem {
  id: string;
  keyword: string;
  category: string;
  title: string;
}

export const problems: Problem[] = [
  {
    id: "1",
    keyword: "XSS",
    category: "Web Security",
    title: "Reflected XSS",
  },
  {
    id: "2",
    keyword: "Base Injection",
    category: "Web Security",
    title: "CSP Bypass",
  },
  {
    id: "3",
    keyword: "SSRF",
    category: "Web Security",
    title: "Server-Side Request Forgery",
  },
  {
    id: "4",
    keyword: "Blind SQLi",
    category: "Web Security",
    title: "Blind SQL Injection",
  },
];
