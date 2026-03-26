"use client";

import { motion } from "framer-motion";

export default function LibraConstellation() {
  // Star coordinates (relative to SVG viewBox 100x100)
  // Based on the user-provided reference image
  const stars = [
    { x: 40, y: 10, size: 4, delay: 0 },    // Top
    { x: 20, y: 35, size: 3.5, delay: 0.2 }, // Left Mid
    { x: 65, y: 28, size: 3.5, delay: 0.4 }, // Right Mid
    { x: 62, y: 55, size: 3, delay: 0.6 },   // Hanging Right
    { x: 45, y: 70, size: 2.5, delay: 0.8 }, // Hanging Left 1
    { x: 44, y: 80, size: 2.5, delay: 1.0 }, // Hanging Left 2
  ];

  // Connecting lines
  const lines = [
    { from: stars[0], to: stars[1] },
    { from: stars[0], to: stars[2] },
    { from: stars[1], to: stars[2] },
    { from: stars[2], to: stars[3] },
    { from: stars[1], to: stars[4] },
    { from: stars[4], to: stars[5] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="inline-flex items-center justify-center pointer-events-none relative"
    >
      <svg width="150" height="150" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
        {/* Connection Lines with silver gradient */}
        {lines.map((line, i) => (
          <motion.line
            key={`line-${i}`}
            x1={line.from.x}
            y1={line.from.y}
            x2={line.to.x}
            y2={line.to.y}
            stroke="url(#lineGradient)"
            strokeWidth="0.7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 0.5 + i * 0.3 }}
          />
        ))}

        {/* Gradients */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
          <radialGradient id="starGlow">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Star Glows */}
        {stars.map((star, i) => (
          <motion.circle
            key={`glow-${i}`}
            cx={star.x}
            cy={star.y}
            r={star.size * 2.5}
            fill="url(#starGlow)"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              delay: star.delay,
            }}
          />
        ))}

        {/* Stars core */}
        {stars.map((star, i) => (
          <motion.circle
            key={`star-${i}`}
            cx={star.x}
            cy={star.y}
            r={star.size / 2}
            fill="white"
            initial={{ opacity: 0.7 }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.3, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + Math.random() * 2,
              delay: star.delay,
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
