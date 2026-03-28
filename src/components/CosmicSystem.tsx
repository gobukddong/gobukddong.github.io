"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { documents } from "@/data/documents";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CosmicSystem({ isBlackHoleActive = false }: { isBlackHoleActive?: boolean }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mountTime, setMountTime] = useState(0);

  useEffect(() => {
    setMountTime(Date.now() / 1000);
  }, []);

  const planets = [
    {
      id: "1",
      radius: 250,
      size: 56,
      duration: 35,
      className: "bg-slate-800 border-2 border-slate-600 shadow-[0_0_15px_rgba(30,64,175,0.8)]",
      name: "React2Shell vuln scanner"
    },
    {
      id: "2",
      radius: 180,
      size: 40,
      duration: 25,
      className: "bg-gradient-to-br from-red-900 to-neutral-900 border border-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.5)]",
      name: "Linux Vuln scanner"
    },
    {
      id: "3",
      radius: 120,
      size: 32,
      duration: 10,
      className: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-teal-600 to-yellow-700 shadow-[0_0_25px_rgba(13,148,136,0.6)] overflow-hidden",
      name: "Ocean Cleanup"
    },
    {
      id: "4",
      radius: 320,
      size: 36,
      duration: 45,
      className: "bg-stone-600 border border-stone-400 shadow-[0_0_15px_rgba(168,162,158,0.4)]",
      name: "Air Drum",
      hasRing: true,
      ringColor: "border-orange-200/40"
    },
    {
      id: "5",
      radius: 390,
      size: 48,
      duration: 60,
      className: "bg-indigo-900 border border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.7)]",
      name: "meetplz"
    }
  ];

  return (
    <div className={`relative w-full h-[750px] md:h-[1000px] lg:h-[1100px] bg-transparent rounded-3xl overflow-hidden flex items-center justify-center transition-opacity duration-500 ${isBlackHoleActive ? 'opacity-80' : 'opacity-100'}`}>
      
      {/* Viewport Scale */}
      <div className="relative w-[1100px] h-[1100px] scale-[0.55] sm:scale-[0.75] md:scale-100 flex items-center justify-center overflow-visible">
        
        {/* Central Star (Sun) */}
        <motion.div 
            animate={isBlackHoleActive ? { y: 1500, scale: 0, opacity: 0, rotate: 720 } : { y: 0, scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 3, ease: "anticipate" }}
            className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 via-orange-400 to-red-600 shadow-[0_0_80px_60px_rgba(249,115,22,0.15),0_0_30px_10px_rgba(253,224,71,0.4)] z-10 flex items-center justify-center"
        >
           <div className="w-full h-full rounded-full animate-pulse opacity-50 bg-white blur-sm"></div>
        </motion.div>

        {/* Orbit paths and Planets */}
        {planets.map((planet, index) => {
          const timeOffset = -(mountTime % planet.duration);
          const isHovered = hoveredId === planet.id;
          const isAnotherHovered = hoveredId !== null && hoveredId !== planet.id;

          return (
            <div key={planet.id} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Orbit Ring */}
              <motion.div 
                animate={isBlackHoleActive ? { y: 1500, scale: 0, opacity: 0, rotate: index * 90 } : { y: 0, scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 2.5 + (index * 0.2), ease: "anticipate" }}
                className="absolute rounded-full border border-neutral-700/40"
                style={{ 
                  width: planet.radius * 2, 
                  height: planet.radius * 2,
                  boxShadow: isHovered ? '0 0 20px rgba(255,255,255,0.1) inset' : 'none',
                }}
              />
              
              {/* Rotating Container */}
              <motion.div 
                animate={isBlackHoleActive ? { y: 1500, scale: 0, opacity: 0, rotate: 720 } : { y: 0 }}
                transition={{ duration: 3, ease: "anticipate", delay: index * 0.1 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  animation: !isBlackHoleActive ? `spin ${planet.duration}s linear infinite` : 'none',
                  animationDelay: `${timeOffset}s`,
                  animationPlayState: hoveredId ? 'paused' : 'running',
                  opacity: isAnotherHovered ? 0.3 : 1,
                }}
              >
                <div 
                  className="absolute"
                  style={{ transform: `translateY(-${planet.radius}px)` }}
                >
                  <div
                    style={{ 
                      animation: !isBlackHoleActive ? `spin-reverse ${planet.duration}s linear infinite` : 'none',
                      animationDelay: `${timeOffset}s`,
                      animationPlayState: hoveredId ? 'paused' : 'running'
                    }}
                    className="relative flex items-center justify-center group/planet pointer-events-auto"
                    onMouseEnter={() => !isBlackHoleActive && setHoveredId(planet.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <Link href={`/projects/${planet.id}`} className="relative flex items-center justify-center">
                      <div 
                        className="relative cursor-pointer hover:scale-110 flex items-center justify-center select-none z-10"
                        style={{ width: planet.size, height: planet.size, transition: 'transform 0.3s' }}
                      >
                         {planet.hasRing && (
                           <div className={`absolute top-1/2 left-1/2 w-[240%] h-[50%] rounded-[50%] border-[4px] border-b-[1px] ${planet.ringColor} shadow-[0_0_10px_rgba(253,186,116,0.3)] z-0`} style={{ transform: 'translate(-50%, -50%) rotate(25deg)', clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }} />
                         )}
                         <div className={`absolute inset-0 rounded-full ${planet.className || ''} z-10`} />
                         {planet.hasRing && (
                           <div className={`absolute top-1/2 left-1/2 w-[240%] h-[50%] rounded-[50%] border-[4px] border-t-[1px] ${planet.ringColor} shadow-[0_0_10px_rgba(253,186,116,0.5)] z-20 backdrop-blur-[1px]`} style={{ transform: 'translate(-50%, -50%) rotate(25deg)', clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }} />
                         )}
                      </div>
                      <div className={`absolute pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center font-medium z-40 w-max text-neutral-100 text-base md:text-lg font-outfit tracking-wider`}>
                        {planet.name}
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
      `}} />
    </div>
  );
}
