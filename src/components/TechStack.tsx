"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const skills = [
  "Next.js", "React", "TypeScript", "Tailwind CSS","Node.js", "Python", "Github", "C", "Javascript", "Linux", "Supabase", "Excel", "Antigravity", "Cursor", "stitch"
];

// Helper to generate a random crack path once per component instance
function Cracks({ clicks }: { clicks: number }) {
  if (clicks === 0) return null;
  
  const allPaths = [
    "M10,12 L25,35",           // Crack 1
    "M30,45 L45,15",           // Crack 2
    "M60,10 L50,40",           // Crack 3
    "M20,80 L35,55",           // Crack 4
    "M40,50 L75,85",           // Crack 5
    "M80,20 L65,45",           // Crack 6
    "M15,50 L40,40",           // Crack 7
    "M70,10 L85,40",           // Crack 8
    "M50,75 L55,95",           // Crack 9
  ];

  // Show more paths as clicks increase
  const visiblePaths = allPaths.slice(0, clicks);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300">
      {visiblePaths.map((path, i) => (
        <motion.path 
          key={`crack-${i}`}
          d={path} 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          stroke="rgba(0,0,0,0.8)" 
          strokeWidth="1.2" 
          fill="transparent" 
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function SkillBrick({ skill, index }: { skill: string; index: number }) {
  const [clicks, setClicks] = useState(0);
  const [isBroken, setIsBroken] = useState(false);

  const handleClick = () => {
    if (isBroken) return;
    const newCount = clicks + 1;
    setClicks(newCount);
    if (newCount >= 10) {
      setIsBroken(true);
    }
  };

  useEffect(() => {
    if (isBroken) {
      const timer = setTimeout(() => {
        setIsBroken(false);
        setClicks(0);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isBroken]);

  // Shake intensity increases as clicks approach 10
  const shakeX = clicks > 0 && !isBroken ? [0, -2 * (clicks / 5), 2 * (clicks / 5), 0] : 0;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isBroken ? (
          <motion.div
            key={`${skill}-active`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ x: shakeX, opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.05
            }}
            whileHover={{ y: -4 }}
            onClick={handleClick}
            className="
              relative flex items-center justify-center px-6 py-3 
              bg-neutral-800 text-neutral-300 font-orbitron font-medium text-xs md:text-sm tracking-wide
              rounded-lg border border-neutral-800 overflow-hidden
              shadow-[0_5px_0_0_#262626] hover:shadow-[0_6px_0_0_#262626] hover:bg-neutral-700 hover:text-white
              active:translate-y-[5px] active:shadow-[0_0px_0_0_#262626]
              transition-colors cursor-pointer select-none
            "
          >
            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10 rounded-t-lg" />
            
            {/* Crack Overlay */}
            <Cracks clicks={clicks} />
            
            <span className="relative z-10">{skill}</span>
          </motion.div>
        ) : (
          /* Explosion Particles only visible briefly when broken */
          <div key="broken-space" className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`p-${i}`}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ 
                  x: (Math.random() - 0.5) * 160, 
                  y: (Math.random() - 0.5) * 160, 
                  opacity: 0, 
                  scale: 0.1,
                  rotate: Math.random() * 720
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute w-2 h-2 bg-neutral-700 rounded-sm"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TechStack() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 pt-20">
      <div className="relative pb-12 flex flex-wrap justify-center gap-4">
        {/* 바닥 라인 */}
        <div className="absolute bottom-6 inset-x-4 h-1 bg-neutral-800/30 rounded-full" />
        
        {skills.map((skill, index) => (
          <SkillBrick key={skill} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}
