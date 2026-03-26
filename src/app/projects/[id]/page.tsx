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

  let ContentComponent;
  switch (id) {
    case "1": ContentComponent = Project1; break;
    case "2": ContentComponent = Project2; break;
    case "3": ContentComponent = Project3; break;
    case "4": ContentComponent = Project4; break;
    case "5": ContentComponent = Project5; break;
    default: ContentComponent = () => <p>항목을 찾을 수 없습니다.</p>;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 sm:p-8 md:p-12 lg:p-24 selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-6 pt-10">
          <BackButton />
          
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
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
