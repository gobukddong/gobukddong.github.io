"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";

const skills = [
  "Next.js", "React", "TypeScript", "Tailwind CSS","Node.js", "Python", "Github", "C", "Javascript", "Linux", "Supabase", "Excel", "Antigravity", "Cursor", "Stitch", "Mermaid"
];

// Helper to generate a random crack path once per component instance
function Cracks({ clicks }: { clicks: number }) {
  if (clicks === 0) return null;
  
  const allPaths = [
    "M10,12 L25,35", "M30,45 L45,15", "M60,10 L50,40", "M20,80 L35,55",
    "M40,50 L75,85", "M80,20 L65,45", "M15,50 L40,40", "M70,10 L85,40", "M50,75 L55,95",
  ];

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

function SkillBrick({ 
    skill, 
    index, 
    isGlobalBroken, 
    onBreak, 
    isBrokenAll,
    containerRef
}: { 
    skill: string; 
    index: number; 
    isGlobalBroken: boolean; 
    onBreak: () => void;
    isBrokenAll: boolean;
    containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [clicks, setClicks] = useState(0);
  const [popups, setPopups] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const brickRef = useRef<HTMLDivElement>(null);
  const [pullOffset, setPullOffset] = useState({ x: 0, y: 0 });

  const REACTIONS = ["Ouch", "Hey!", "Don't press me", "Stop it", "Ooh", "바보", "What?","Oops", "Rude!"];

  useEffect(() => {
    // ... rest of useEffect
    if (isBrokenAll && brickRef.current && containerRef.current) {
      const brickRect = brickRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const brickCenter = {
        x: brickRect.left + brickRect.width / 2,
        y: brickRect.top + brickRect.height / 2
      };
      
      const containerCenter = {
        x: containerRect.left + containerRect.width / 2,
        y: containerRect.top + containerRect.height / 2
      };

      setPullOffset({
        x: containerCenter.x - brickCenter.x,
        y: containerCenter.y - brickCenter.y
      });
    } else {
      setPullOffset({ x: 0, y: 0 });
    }
  }, [isBrokenAll, containerRef]);

  const playSound = (freq: number, duration: number, type: OscillatorType = "sine") => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + duration);
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context might be blocked or not supported
    }
  };

  const handleClick = () => {
    if (isGlobalBroken || isBrokenAll) return;
    
    // Play sound based on progress
    if (clicks < 4) {
      playSound(150 + Math.random() * 50, 0.1, "sine");
    } else {
      playSound(100, 0.3, "sawtooth");
    }

    // Add random popup
    const randomText = REACTIONS[Math.floor(Math.random() * REACTIONS.length)];
    const id = Date.now();
    const newPopup = {
      id,
      text: randomText,
      x: (Math.random() - 0.5) * 60, // Random horizontal offset
      y: -20
    };
    
    setPopups(prev => [...prev, newPopup]);
    setTimeout(() => {
      setPopups(prev => prev.filter(p => p.id !== id));
    }, 1000);

    const newCount = clicks + 1;
    setClicks(newCount);
    if (newCount >= 5) {
      onBreak();
    }
  };

  useEffect(() => {
    if (!isGlobalBroken) {
        setClicks(0);
        setPopups([]);
    }
  }, [isGlobalBroken]);

  const shakeX = clicks > 0 && !isGlobalBroken ? [0, -2 * (clicks / 5), 2 * (clicks / 5), 0] : 0;

  return (
    <div className="relative" ref={brickRef}>
      {/* Click Popups */}
      <AnimatePresence>
        {popups.map(popup => (
          <motion.div
            key={popup.id}
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: -65, scale: 0.8 }}
            className="absolute z-50 pointer-events-none whitespace-nowrap text-[10px] font-outfit font-bold text-zinc-950 bg-white px-2.5 py-1 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            style={{ 
              left: "50%",
              transform: "translateX(-50%)",
              x: popup.x 
            }}
          >
            {popup.text}
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        animate={isBrokenAll ? { 
            x: pullOffset.x,
            y: pullOffset.y,
            opacity: 0, 
            scale: 0,
            rotate: 1080
        } : { 
            x: shakeX, 
            y: 0,
            opacity: 1, 
            scale: 1,
            rotate: 0
        }}
        transition={{
            duration: isBrokenAll ? 2.5 : 0.4,
            ease: isBrokenAll ? "anticipate" : "easeOut"
        }}
        className="relative z-10"
        style={{ willChange: "transform, opacity, scale, rotate" }}
      >
        <AnimatePresence mode="wait">
          {!isGlobalBroken ? (
            <motion.div
              key={`${skill}-active`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.85, filter: "brightness(0.6)" }}
              onClick={handleClick}
              transition={{ type: "spring", stiffness: 600, damping: 20 }}
              className="
                relative flex items-center justify-center px-6 py-2.5
                bg-[rgba(255,255,255,0.1)] text-neutral-200 font-outfit font-light text-xs md:text-sm tracking-[0.2em] uppercase
                rounded-full border border-[rgba(255,255,255,0.05)] overflow-hidden
                hover:bg-[rgba(255,255,255,0.15)] hover:text-white hover:border-[rgba(255,255,255,0.1)]
                shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_0_8px_rgba(255,255,255,0.05)]
                hover:shadow-[0_12px_44px_rgba(0,0,0,0.5),inset_0_0_12px_rgba(255,255,255,0.1)]
                cursor-pointer select-none group
                transition-[background,border,color,box-shadow] duration-500
              "
            >
              {/* Shimmer / Shine Effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent pointer-events-none" />
              
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Cracks clicks={clicks} />
              <span className="relative z-10 drop-shadow-sm">{skill}</span>
            </motion.div>
          ) : (
            <div key="broken-space" className="h-[42px] flex items-center justify-center pointer-events-none">
              {!isBrokenAll && [...Array(6)].map((_, i) => (
                <motion.div
                  key={`p-${i}`}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 100, 
                    y: (Math.random() - 0.5) * 100, 
                    opacity: 0, 
                    scale: 0.1,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-2 h-2 bg-neutral-100 rounded-sm"
                  style={{ willChange: "transform, opacity" }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function TechStack() {
  const [brokenIndices, setBrokenIndices] = useState<Set<number>>(new Set());
  const [isBrokenAll, setIsBrokenAll] = useState(false);
  const isResetting = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBreak = (index: number) => {
    setBrokenIndices(prev => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const handleReset = async () => {
    if (!isBrokenAll || isResetting.current) return;
    isResetting.current = true;
    setIsBrokenAll(false);
    
    const indices = Array.from(brokenIndices);
    for (let i = 0; i < indices.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 80)); 
        setBrokenIndices(prev => {
            const next = new Set(prev);
            next.delete(indices[i]);
            return next;
        });
    }
    isResetting.current = false;
  };

  useEffect(() => {
    if (brokenIndices.size === skills.length && !isBrokenAll && !isResetting.current) {
      setIsBrokenAll(true);
    }
  }, [brokenIndices.size, isBrokenAll]);

  useEffect(() => {
    if (!isBrokenAll && brokenIndices.size === 0) {
        // Just as a safety reset
    }
  }, [isBrokenAll]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 pt-8 relative min-h-[400px]" ref={containerRef}>
      <div className="relative pb-12 flex flex-wrap justify-center gap-4 transition-all duration-1000">
        {/* Floor Line */}
        <div className={`absolute bottom-6 inset-x-4 h-1 bg-[rgba(38,38,38,0.3)] rounded-full transition-all duration-1000 ${isBrokenAll ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`} />
        
        {skills.map((skill, index) => (
          <SkillBrick 
            key={skill} 
            skill={skill} 
            index={index} 
            isGlobalBroken={brokenIndices.has(index)}
            onBreak={() => handleBreak(index)}
            isBrokenAll={isBrokenAll}
            containerRef={containerRef}
          />
        ))}

        {/* Minimalist Restore Button */}
        <AnimatePresence>
          {isBrokenAll && (
            <motion.div 
               initial={{ scale: 0.8, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.8, opacity: 0, y: 10 }}
               className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center p-8"
            >
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-full text-white font-outfit font-medium text-sm tracking-[0.2em] uppercase shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-colors"
              >
                Restore Stack
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
