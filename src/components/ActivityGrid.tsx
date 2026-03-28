"use client";

import { activities } from "@/data/activities";
import { motion, AnimatePresence } from "framer-motion";
import ActivityCard from "./ActivityCard";

export default function ActivityGrid({ isBlackHoleActive = false }: { isBlackHoleActive?: boolean }) {
  return (
    <div className={`relative w-full aspect-[16/9] max-h-[600px] min-h-[400px] flex items-center justify-center overflow-visible transition-opacity duration-500 ${isBlackHoleActive ? 'opacity-80' : 'opacity-100'}`}>
      {/* Subtle Nebula Background Glows */}
      <div className={`absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none transition-opacity duration-1000 ${isBlackHoleActive ? 'opacity-0' : 'opacity-100'}`} />
      <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 blur-[120px] pointer-events-none transition-opacity duration-1000 ${isBlackHoleActive ? 'opacity-0' : 'opacity-100'}`} />

      {/* Constellation SVG Lines Layer */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-opacity duration-1000 ${isBlackHoleActive ? 'opacity-0' : 'opacity-100'}`}>
        <defs>
          <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(16,185,129,0.05)" />
            <stop offset="50%" stopColor="rgba(16,185,129,0.3)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.05)" />
          </linearGradient>
        </defs>

        <motion.path 
          d="M 25 30 L 70 20 L 75 65 L 30 70 Z" 
          fill="none" 
          stroke="url(#lineGlow)" 
          strokeWidth="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.line 
          x1="25" y1="30" x2="75" y2="65" 
          stroke="rgba(16,185,129,0.15)" 
          strokeWidth="0.15" 
          strokeDasharray="1 1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        />
      </svg>
      
      {/* Interactive Stars */}
      <div className="absolute inset-0">
        <ActivityCard activity={activities[0]} x="25%" y="30%" index={0} isBlackHoleActive={isBlackHoleActive} />
        <ActivityCard activity={activities[1]} x="70%" y="20%" index={1} isBlackHoleActive={isBlackHoleActive} />
        <ActivityCard activity={activities[2]} x="30%" y="70%" index={2} isBlackHoleActive={isBlackHoleActive} />
        <ActivityCard activity={activities[3]} x="75%" y="65%" index={3} isBlackHoleActive={isBlackHoleActive} />
      </div>
    </div>
  );
}
