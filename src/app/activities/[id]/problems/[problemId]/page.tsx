import { problems } from "@/data/problems";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";

import Problem1 from "./Problem1";
import Problem2 from "./Problem2";
import Problem3 from "./Problem3";
import Problem4 from "./Problem4";

export default async function ProblemDetail({
  params,
}: {
  params: Promise<{ id: string; problemId: string }>;
}) {
  const { problemId } = await params;
  const problem = problems.find((p) => p.id === problemId);

  if (!problem) {
    notFound();
  }

  let ContentComponent;
  switch (problemId) {
    case "1": ContentComponent = Problem1; break;
    case "2": ContentComponent = Problem2; break;
    case "3": ContentComponent = Problem3; break;
    case "4": ContentComponent = Problem4; break;
    default: ContentComponent = () => <p className="text-neutral-400">내용을 찾을 수 없습니다.</p>;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 sm:p-8 md:p-12 lg:p-24 selection:bg-emerald-500/30">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-6 pt-10">
          <BackButton />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-500/20">
                {problem.category}
              </span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-orbitron text-emerald-400 text-lg tracking-widest">
                {problem.keyword}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              {problem.title}
            </h1>
          </div>
        </header>

        <section className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 md:p-12 shadow-xl">
          <ContentComponent />
        </section>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return problems.map((p) => ({
    id: "1",
    problemId: p.id,
  }));
}
