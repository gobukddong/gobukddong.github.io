"use client";

import CosmicSystem from "@/components/CosmicSystem";
import ActivityGrid from "@/components/ActivityGrid";
import Certifications from "@/components/Certifications";
import TechStack from "@/components/TechStack";
import Footer from "@/components/Footer";
import VideoGrid from "@/components/VideoGrid";
import LibraConstellation from "@/components/LibraConstellation";
import GeminiConstellation from "@/components/GeminiConstellation";

export default function Home() {
  return (
    <main className="min-h-screen text-white pt-12 p-4 sm:p-8 md:p-12 lg:p-24 selection:bg-blue-500/30 overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-12 relative">
        <header className="flex flex-col items-center gap-6 pt-10 relative text-center">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight font-outfit">
            Yang's{" "}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#7baaf7,#ea4335,#fbbc05,#34a853)] tracking-tighter pr-2">
              Space
            </span>
          </h1>
          <p className="text-neutral-300 text-sm line-clamp-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Soongsil Univ. School of AI Software
          </p>
         
          <div className="flex-shrink-0 flex items-center justify-center gap-4">
            <LibraConstellation />
            <GeminiConstellation />
          </div>
        </header>

        <section id="videos" className="space-y-4 scroll-mt-12 relative">
          <div className="border-b border-neutral-800 pb-2 flex justify-center">
            <h2 className="text-3xl md:text-5xl uppercase text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#e8e8e8_0%,#ffffff_20%,#888888_40%,#cccccc_55%,#aaaaaa_70%,#ffffff_85%,#999999_100%)] text-center font-bold tracking-widest">
              Videos
            </h2>
          </div>
          <VideoGrid />
        </section>

        <section id="projects" className="space-y-8 scroll-mt-12 relative">
          <div className="border-b border-neutral-800 pb-2 flex justify-center">
            <h2 className="text-3xl md:text-5xl uppercase text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#e8e8e8_0%,#ffffff_20%,#888888_40%,#cccccc_55%,#aaaaaa_70%,#ffffff_85%,#999999_100%)] text-center font-bold tracking-widest">
              Projects
            </h2>
          </div>
          <CosmicSystem />
        </section>
        
        <section id="activities" className="space-y-8 scroll-mt-12 relative">
          <div className="border-b border-neutral-800 pb-2 flex justify-center">
            <h2 className="text-3xl md:text-5xl uppercase text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#e8e8e8_0%,#ffffff_20%,#888888_40%,#cccccc_55%,#aaaaaa_70%,#ffffff_85%,#999999_100%)] text-center font-bold tracking-widest">
              Activities
            </h2>
          </div>
          <ActivityGrid />
        </section>

        <section id="certifications" className="space-y-8 scroll-mt-12 relative">
          <div className="border-b border-neutral-800 pb-2 flex justify-center">
            <h2 className="text-3xl md:text-5xl uppercase text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#e8e8e8_0%,#ffffff_20%,#888888_40%,#cccccc_55%,#aaaaaa_70%,#ffffff_85%,#999999_100%)] text-center font-bold tracking-widest">
              Certifications
            </h2>
          </div>
          <Certifications />
        </section>

        <section id="tech" className="space-y-8 scroll-mt-12 relative">
          <div className="border-b border-neutral-800 pb-2 flex justify-center">
            <h2 className="text-3xl md:text-5xl uppercase text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#e8e8e8_0%,#ffffff_20%,#888888_40%,#cccccc_55%,#aaaaaa_70%,#ffffff_85%,#999999_100%)] text-center font-bold tracking-widest">
              I Use these
            </h2>
          </div>
          <TechStack />
        </section>

        <Footer />
      </div>
    </main>
  );
}
