"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ScrollProgressButton() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Use a spring transition for extra smoothness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Toggle visibility based on scroll position
  useEffect(() => {
    const handleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", handleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const size = 56;
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  
  // Directly transform scroll progress (0-1) to stroke dash offset
  const dashOffset = useTransform(smoothProgress, [0, 1], [circumference, 0]);

  return (
    <motion.button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: visible ? 1 : 0, 
        scale: visible ? 1 : 0.8,
        y: visible ? 0 : 20
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <svg width={size} height={size} className="-rotate-90 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="rgba(0,0,0,0.4)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />
        {/* Progress Circle (Motion) */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ pathLength: smoothProgress }}
        />
        <defs>
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7baaf7" />
            <stop offset="50%" stopColor="#ea4335" />
            <stop offset="100%" stopColor="#34a853" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Arrow Icon with subtle animation */}
      <span className="absolute inset-x-0 inset-y-0 flex items-center justify-center text-white/90 text-xl pointer-events-none">
        <motion.span
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ↑
        </motion.span>
      </span>
    </motion.button>
  );
}
