import VideoGrid from "@/components/VideoGrid";
import DocumentGrid from "@/components/DocumentGrid";
import ActivityGrid from "@/components/ActivityGrid";
import TechStack from "@/components/TechStack";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";
import LibraConstellation from "@/components/LibraConstellation";

export default function Home() {
  return (
    <main className="min-h-screen text-white pt-12 p-4 sm:p-8 md:p-12 lg:p-24 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto space-y-20">
        <header className="flex flex-wrap items-center gap-6 pt-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-outfit">
            Yang's{" "}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#7baaf7,#ea4335,#fbbc05,#34a853)] tracking-tighter pr-2">
              Space
            </span>
          </h1>
          <div className="flex-shrink-0 -mt-4">
            <LibraConstellation />
          </div>
        </header>

        <section id="videos" className="space-y-8 scroll-mt-12">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-2xl md:text-3xl uppercase text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#e8e8e8_0%,#ffffff_20%,#888888_40%,#cccccc_55%,#aaaaaa_70%,#ffffff_85%,#999999_100%)]">
              Videos
            </h2>
          </div>
          <VideoGrid />
        </section>

        <section id="projects" className="space-y-8 scroll-mt-12">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-2xl md:text-3xl uppercase text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#e8e8e8_0%,#ffffff_20%,#888888_40%,#cccccc_55%,#aaaaaa_70%,#ffffff_85%,#999999_100%)]">
              Projects
            </h2>
          </div>
          <DocumentGrid />
        </section>

        
        <section id="activities" className="space-y-8 scroll-mt-12">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-2xl md:text-3xl uppercase text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#e8e8e8_0%,#ffffff_20%,#888888_40%,#cccccc_55%,#aaaaaa_70%,#ffffff_85%,#999999_100%)]">
              Activities
            </h2>
          </div>
          <ActivityGrid />
        </section>

        <section id="certifications" className="space-y-8 scroll-mt-12">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-2xl md:text-3xl uppercase text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#e8e8e8_0%,#ffffff_20%,#888888_40%,#cccccc_55%,#aaaaaa_70%,#ffffff_85%,#999999_100%)]">
              Certifications
            </h2>
          </div>
          <Certifications />
        </section>

        <section id="tech" className="space-y-8 scroll-mt-12">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-2xl md:text-3xl uppercase text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#e8e8e8_0%,#ffffff_20%,#888888_40%,#cccccc_55%,#aaaaaa_70%,#ffffff_85%,#999999_100%)]">
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
