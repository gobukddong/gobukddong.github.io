"use client";

import { Award, ShieldCheck, Hash, Calendar, CheckCircle2, User, Globe, Database, Milestone } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, memo } from "react";

// Technical Mock Data based on Meta-Prompt
const certs = [
  { 
    id: "1", 
    name: "정보처리기능사", 
    issuer: "한국산업인력공단", 
    category: "자격증", 
    date: "2025.12",
    backInfo: {
        issuerEn: "Human Resources Development Service of Korea",
    }
  },
  { 
    id: "2", 
    name: "SQLD", 
    issuer: "한국데이터산업진흥원", 
    category: "자격증", 
    date: "2026.03",
    backInfo: {
        issuerEn: "Korea Data Industry Promotion Agency",
        
    }
  },
  { 
    id: "3", 
    name: "MOS Excel 2016 Expert", 
    issuer: "Microsoft", 
    category: "자격증", 
    date: "2025.12",
    backInfo: {
        issuerEn: "Microsoft Corporation",
      
    }
  },
  { 
    id: "4", 
    name: "TOEIC 720", 
    issuer: "ETS", 
    category: "어학", 
    date: "2025.07",
    backInfo: {
        issuerEn: "Educational Testing Service",
        status: "Score: 720"
    }
  },
];

const LicenseCard = memo(({ 
    item, 
    isFocused, 
    isAnyFocused, 
    onToggleFocus 
}: { 
    item: typeof certs[0], 
    isFocused: boolean, 
    isAnyFocused: boolean,
    onToggleFocus: (e: React.MouseEvent) => void 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const tiltX = useTransform(ySpring, [-0.5, 0.5], ["18deg", "-18deg"]);
  const tiltY = useTransform(xSpring, [-0.5, 0.5], ["-18deg", "18deg"]);

  // Reset tilt when focused
  useEffect(() => {
    if (isFocused) {
      x.set(0);
      y.set(0);
    }
  }, [isFocused, x, y]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFocused) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className={`relative w-full h-[240px] perspective-1200 transition-opacity duration-500 ${isAnyFocused && !isFocused ? 'opacity-20 grayscale scale-90 pointer-events-none' : ''}`}
      style={{ 
        zIndex: isFocused ? 110 : 10,
        willChange: "opacity, transform"
      }}
    >
      <motion.div
        ref={cardRef}
        className="w-full h-full relative preserve-3d cursor-pointer"
        style={{ 
          transformStyle: "preserve-3d",
          willChange: "transform"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onToggleFocus}
        animate={{ 
            rotateY: isFocused ? 180 : 0,
            scale: isFocused ? 1.1 : 1,
            y: isFocused ? -20 : 0
        }}
        transition={{ 
            duration: 0.5, // Faster transition
            ease: [0.16, 1, 0.3, 1] // Quad/Cubic out for smoother start
        }}
      >
        {/* FRONT FACE */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden overflow-visible"
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitBackfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
            transform: "translateZ(1px)"
          }}
        >
          <motion.div 
            className="w-full h-full rounded-[2rem] border-2 border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] flex flex-col p-7 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden group text-left"
            style={{ 
              rotateX: isFocused ? 0 : tiltX,
              rotateY: isFocused ? 0 : tiltY,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Holographic front overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#ff00ff08_0%,#00ffff08_30%,#ffff0008_60%,#00ff0008_100%)] animate-hologram-slow opacity-30 group-hover:opacity-60 transition-opacity" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono font-black tracking-[0.4em] text-emerald-500 uppercase mb-1">Credential</span>
                <div className="w-10 h-1 bg-[rgba(16,185,129,0.3)] rounded-full" />
              </div>
            </div>

            <div className="flex flex-col flex-1 relative z-10 justify-center">
              <span className="text-[11px] font-sans font-black uppercase tracking-[0.2em] text-[rgba(255,255,255,0.3)] block mb-2">{item.category}</span>
              <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight leading-none mb-4">{item.name}</h3>
              <p className="text-[rgba(255,255,255,0.5)] text-sm font-bold truncate">{item.issuer}</p>
            </div>

            <div className="mt-auto flex justify-between items-end relative z-10 pt-4 border-t border-[rgba(255,255,255,0.05)]">
               <div className="text-xs font-mono font-black text-[rgba(255,255,255,0.7)]">{item.date}</div>
            </div>
          </motion.div>
        </div>

        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-[2rem] border-2 border-[rgba(255,255,255,0.6)] bg-neutral-950 overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.1)]"
          style={{ 
            transform: "rotateY(180deg) translateZ(1px)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Iridescent background */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#4facfeaa,#00f2feaa,#70b2ffaa)] animate-hologram opacity-30" />
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Digital Data Stream Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(0deg,transparent_49%,rgba(255,255,255,0.1)_50%,transparent_51%)] bg-[length:100%_4px] animate-scan" />
          
          <div className="absolute inset-0 flex flex-col p-8 z-10 text-left">
            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center gap-2">
                <span className="text-[11px] font-mono font-black uppercase tracking-[0.5em] text-[rgba(255,255,255,0.4)]">Credential Issuer</span>
                <h3 className="text-white font-black text-2xl leading-none tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                  {item.issuer}
                </h3>
                <p className="text-[rgba(255,255,255,0.4)] text-[11px] font-bold italic mb-6">{item.backInfo.issuerEn}</p>
            </div>

            {/* Footer HUD */}
            <div className="mt-8 flex justify-between items-end border-t border-[rgba(255,255,255,0.05)] pt-5">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono font-bold text-[rgba(255,255,255,0.4)] uppercase tracking-tighter">{item.backInfo.status}</span>
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-[rgba(16,185,129,0.2)] rounded-sm" />
                        <div className="w-2 h-2 bg-[rgba(16,185,129,0.4)] rounded-sm" />
                        <div className="w-2 h-2 bg-[rgba(16,185,129,0.6)] rounded-sm" />
                    </div>
                </div>
                <div className="text-[10px] font-mono font-black text-[rgba(255,255,255,0.2)] select-none">SCAN_COMPLETE: 100%</div>
            </div>
          </div>

          {/* HUD Corner Guides */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/10 rounded-tl-2xl" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-2xl" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl-2xl" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/10 rounded-br-2xl" />
        </div>
      </motion.div>
    </div>
  );
});

export default function Certifications() {
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close focus on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocusedId(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className={`max-w-7xl mx-auto px-6 md:px-12 py-32 relative transition-all duration-500 ${focusedId ? 'z-[200]' : 'z-10'}`} ref={containerRef}>
      {/* Background Interactive Layer (Swirl/Glow) */}
      <AnimatePresence>
        {focusedId && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
            >
                <div className="absolute inset-0 bg-black/40" />
                {/* Swirl Stars Particles */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250vw] h-[250vw] border-[1px] border-[rgba(16,185,129,0.08)] rounded-full dashed opacity-40"
                    style={{ borderStyle: "dashed", borderWidth: "1px" }}
                />
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] border-[1px] border-[rgba(59,130,246,0.08)] rounded-full dashed opacity-30"
                    style={{ borderStyle: "dashed", borderWidth: "1px" }}
                />
                {/* Central Soft Glow behind the grid */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(255,255,255,0.08)] blur-[100px] rounded-full" 
                  style={{ willChange: "opacity" }}
                />
            </motion.div>
        )}
      </AnimatePresence>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto">
        {certs.map((item) => (
          <LicenseCard 
            key={item.id} 
            item={item} 
            isFocused={focusedId === item.id}
            isAnyFocused={focusedId !== null}
            onToggleFocus={(e) => {
                e.stopPropagation();
                setFocusedId(focusedId === item.id ? null : item.id);
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        .perspective-1200 { perspective: 1200px; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; transform-style: preserve-3d; }
        .preserve-3d { transform-style: preserve-3d; }
        
        @keyframes hologram {
          0% { background-position: 0% 0%; filter: hue-rotate(0deg); }
          50% { background-position: 100% 100%; filter: hue-rotate(180deg); }
          100% { background-position: 0% 0%; filter: hue-rotate(360deg); }
        }
        @keyframes scan {
          from { background-position: 0 0; }
          to { background-position: 0 100%; }
        }
        .animate-hologram {
          background-size: 200% 200%;
          animation: hologram 10s ease-in-out infinite;
        }
        .animate-hologram-slow {
          background-size: 200% 200%;
          animation: hologram 15s linear infinite;
        }
        .animate-scan {
          animation: scan 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
