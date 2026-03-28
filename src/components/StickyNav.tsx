"use client";

export default function StickyNav() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800/60 bg-[#050505]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-24 flex justify-between text-sm text-neutral-400 h-12 items-center">
        <a href="#videos" onClick={(e) => scrollToSection(e, "videos")} className="hover:text-white transition-colors">Videos</a>
        <a href="#projects" onClick={(e) => scrollToSection(e, "projects")} className="hover:text-white transition-colors">Projects</a>
        <a href="#activities" onClick={(e) => scrollToSection(e, "activities")} className="hover:text-white transition-colors">Activities</a>
        <a href="#certifications" onClick={(e) => scrollToSection(e, "certifications")} className="hover:text-white transition-colors">Certifications</a>
        <a href="#tech" onClick={(e) => scrollToSection(e, "tech")} className="hover:text-white transition-colors">I Use</a>
      </div>
    </nav>
  );
}
