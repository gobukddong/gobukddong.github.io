"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ActivityProject } from "@/data/activities";
import Link from "next/link";

interface ActivityCardProps {
  activity: ActivityProject;
  index: number;
  x: string;
  y: string;
  isBlackHoleActive?: boolean;
}

export default function ActivityCard({ activity, index, x, y, isBlackHoleActive = false }: ActivityCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
      style={{ left: x, top: y }}
    >
      <Link 
        href={activity.externalUrl || `/activities/${activity.id}`}
        {...(activity.externalUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="relative block"
        onMouseEnter={() => !isBlackHoleActive && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Original Star: Hides during event */}
        <div className={`transition-opacity duration-500 ${isBlackHoleActive ? 'opacity-0' : 'opacity-100'}`}>
            {/* Outer Glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.8, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3 + Math.random() * 2,
                delay: index * 0.5
              }}
              className="absolute inset-[-20px] rounded-full bg-[rgba(16,185,129,0.2)] blur-md pointer-events-none"
            />
            
            {/* Star Core */}
            <motion.div 
              className={`w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#10b981] cursor-pointer transition-all duration-500 ${isHovered ? 'scale-150 shadow-[0_0_25px_#10b981]' : ''}`}
            />

            {/* Floating Info Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                scale: isHovered ? 1 : 0.8, 
                y: isHovered ? -20 : 10,
                pointerEvents: isHovered ? 'auto' : 'none'
              }}
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-6 w-56 md:w-64 p-5 rounded-2xl bg-[rgba(0,0,0,0.8)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 text-left"
            >
              <div className="relative">
                <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase mb-1 block opacity-80">
                  {activity.category}
                </span>
                <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                  {activity.title}
                </h3>
                <div className="h-px w-8 bg-[rgba(16,185,129,0.3)] mb-3" />
                <p className="text-neutral-300 text-xs leading-relaxed font-sans">
                  {activity.summary}
                </p>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[rgba(0,0,0,0.8)] rotate-45 z-[-1]" />
            </motion.div>
        </div>

        {/* Sucking Copy */}
        <AnimatePresence>
            {isBlackHoleActive && (
                <motion.div
                    initial={{ scale: 1, opacity: 1, x: 0, y: 0, rotate: 0 }}
                    animate={{ 
                        scale: 0, 
                        opacity: 0, 
                        x: (Math.random() - 0.5) * 100, 
                        y: 1200 + (index * 100), // Pull to tech stack
                        rotate: 720 
                    }}
                    transition={{ duration: 3, ease: "anticipate", delay: index * 0.1 }}
                    className="absolute inset-x-0 top-0 flex items-center justify-center pointer-events-none"
                >
                    <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#10b981]" />
                </motion.div>
            )}
        </AnimatePresence>
      </Link>
    </div>
  );
}
