import { activities } from "@/data/activities";
import { notFound } from "next/navigation";
import { Activity } from "lucide-react";
import BackButton from "@/components/BackButton";

import Activity1 from "./Activity1";
import Activity2 from "./Activity2";

export default async function ActivityDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const activity = activities.find((act) => act.id === id);

  if (!activity) {
    notFound();
  }

  // Redirect to external URL if it exists (for server-side navigation)
  if (activity.externalUrl) {
    // Note: In a real app, you might use redirect(activity.externalUrl) here.
    // But for this portfolio, we'll show a message with a link just in case.
    return (
      <main className="min-h-screen bg-[#050505] text-white p-4 sm:p-8 md:p-12 lg:p-24 selection:bg-emerald-500/30 text-center">
        <h1 className="text-2xl font-bold mb-4">{activity.title} 외부 링크</h1>
        <p className="mb-8 text-neutral-400">이 활동은 외부 사이트에서 확인하실 수 있습니다.</p>
        <a 
          href={activity.externalUrl} 
          className="px-6 py-3 bg-emerald-500 text-neutral-900 rounded-full font-bold hover:bg-emerald-400 transition-colors"
        >
          외부 링크로 이동하기
        </a>
      </main>
    );
  }

  let ContentComponent;
  switch (id) {
    case "1": ContentComponent = Activity1; break;
    case "2": ContentComponent = Activity2; break;
    default: ContentComponent = () => <p>기록된 활동 내용이 없습니다.</p>;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 sm:p-8 md:p-12 lg:p-24 selection:bg-emerald-500/30">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-6 pt-10">
          <BackButton />
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-500/20">
                {activity.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-outfit text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              {activity.title}
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">
              {activity.summary}
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
  return activities.map((act) => ({
    id: act.id,
  }));
}
