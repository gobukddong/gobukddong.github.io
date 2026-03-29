import { documents } from "@/data/documents";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import BackButton from "@/components/BackButton";

import Project1 from "./Project1";
import Project2 from "./Project2";
import Project3 from "./Project3";
import Project4 from "./Project4";
import Project5 from "./Project5";

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = documents.find((doc) => doc.id === id);

  if (!project) {
    notFound();
  }

  const projectThemes: Record<string, { gradient: string; selection: string }> = {
    "1": { gradient: "from-indigo-400 to-purple-500", selection: "selection:bg-indigo-500/30" },
    "2": { gradient: "from-emerald-400 to-cyan-500", selection: "selection:bg-emerald-500/30" },
    "3": { gradient: "from-blue-400 to-sky-500", selection: "selection:bg-blue-500/30" },
    "4": { gradient: "from-orange-400 to-red-500", selection: "selection:bg-orange-500/30" },
    "5": { gradient: "from-rose-400 to-indigo-500", selection: "selection:bg-rose-500/30" },
  };

  const theme = projectThemes[id] || { gradient: "from-blue-400 to-indigo-500", selection: "selection:bg-blue-500/30" };

  // Handle external project links (only if explicitly set as direct links)
  if (project.externalUrl) {
    return (
      <main className={`min-h-screen bg-[#050505] text-white p-4 sm:p-8 md:p-12 lg:p-24 ${theme.selection} text-center`}>
        <div className="max-w-4xl mx-auto space-y-8 pt-20">
          <h1 className={`text-3xl md:text-4xl font-bold tracking-tighter font-outfit text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>
            {project.title} 외부 링크
          </h1>
          <p className="text-xl text-neutral-400">이 프로젝트는 외부 사이트에서 확인하실 수 있습니다.</p>
          <a 
            href={project.externalUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            프로젝트 보러가기
          </a>
          <div className="pt-8">
            <BackButton />
          </div>
        </div>
      </main>
    );
  }

  let ContentComponent;
  switch (id) {
    case "1": ContentComponent = Project1; break;
    case "2": ContentComponent = Project2; break;
    case "3": ContentComponent = Project3; break;
    case "4": ContentComponent = Project4; break;
    case "5": ContentComponent = Project5; break;
    default: ContentComponent = () => <p>기록된 프로젝트 내용이 없습니다.</p>;
  }

  return (
    <main className={`min-h-screen bg-[#050505] text-white p-4 sm:p-8 md:p-12 lg:p-24 ${theme.selection}`}>
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-6 pt-10">
          <BackButton />
          
          <div className="space-y-6">
            <h1 className={`text-4xl md:text-5xl font-bold tracking-tighter font-outfit text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>
              {project.title}
            </h1>
            <p className="text-xl text-neutral-400 font-sans leading-relaxed max-w-2xl">
              {project.summary}
            </p>
          </div>
        </header>

        <section className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 md:p-12 shadow-xl prose prose-invert max-w-none">
          <ContentComponent />
        </section>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return documents.map((doc) => ({
    id: doc.id,
  }));
}
