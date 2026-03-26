export default function StickyNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800/60 bg-[#050505]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-24 flex justify-between text-sm text-neutral-400 h-12 items-center">
        <a href="#videos" className="hover:text-white transition-colors">Videos</a>
        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        <a href="#activities" className="hover:text-white transition-colors">Activities</a>
        <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
        <a href="#tech" className="hover:text-white transition-colors">I Use</a>
      </div>
    </nav>
  );
}
