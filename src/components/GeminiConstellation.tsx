"use client";

import { motion } from "framer-motion";

export default function GeminiConstellation() {
  // Star coordinates (relative to SVG viewBox 100x100)
  // Based on the new Gemini constellation reference image
  const stars = [
    { id: 'alpha', x: 25, y: 15, size: 4.5, delay: 0 },
    { id: 'theta', x: 55, y: 10, size: 3, delay: 0.2 },
    { id: 'tau', x: 40, y: 26, size: 3, delay: 0.4 },
    { id: 'beta', x: 12, y: 30, size: 5, delay: 0.1 },
    { id: 'upsilon', x: 20, y: 35, size: 3, delay: 0.3 },
    { id: 'iota', x: 28, y: 32, size: 2.5, delay: 0.5 },
    { id: 'kappa', x: 12, y: 45, size: 3, delay: 0.7 },
    { id: 'delta', x: 33, y: 55, size: 3, delay: 0.9 },
    { id: 'lambda', x: 32, y: 75, size: 3, delay: 0.2 },
    { id: 'xi', x: 58, y: 95, size: 4.5, delay: 0.4 },
    { id: 'zeta', x: 52, y: 63, size: 3, delay: 0.6 },
    { id: 'gamma', x: 67, y: 78, size: 4.5, delay: 0.8 },
    { id: 'epsilon', x: 60, y: 48, size: 3.5, delay: 1.0 },
    { id: 'nu', x: 72, y: 66, size: 2.5, delay: 1.2 },
    { id: 'mu', x: 77, y: 58, size: 3, delay: 1.4 },
    { id: 'eta', x: 85, y: 56, size: 3, delay: 1.6 },
    { id: 'unlabeled', x: 94, y: 52, size: 2.5, delay: 1.8 },
  ];

  // Connecting lines
  const lines = [
    { from: stars[0], to: stars[2] },   // alpha - tau
    { from: stars[1], to: stars[2] },   // theta - tau
    { from: stars[3], to: stars[4] },   // beta - upsilon
    { from: stars[4], to: stars[6] },   // upsilon - kappa
    { from: stars[4], to: stars[5] },   // upsilon - iota
    { from: stars[5], to: stars[2] },   // iota - tau
    { from: stars[4], to: stars[7] },   // upsilon - delta
    { from: stars[7], to: stars[8] },   // delta - lambda
    { from: stars[8], to: stars[9] },   // lambda - xi
    { from: stars[7], to: stars[10] },  // delta - zeta
    { from: stars[10], to: stars[11] }, // zeta - gamma
    { from: stars[2], to: stars[12] },  // tau - epsilon
    { from: stars[12], to: stars[13] }, // epsilon - nu
    { from: stars[12], to: stars[14] }, // epsilon - mu
    { from: stars[14], to: stars[15] }, // mu - eta
    { from: stars[15], to: stars[16] }, // eta - unlabeled
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="inline-flex items-center justify-center pointer-events-none relative"
    >
      <svg width="190" height="190" viewBox="-15 -10 130 130" className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
        {/* Connection Lines with silver gradient */}
        {lines.map((line, i) => (
          <motion.line
            key={`line-${i}`}
            x1={line.from.x}
            y1={line.from.y}
            x2={line.to.x}
            y2={line.to.y}
            stroke="url(#lineGradient2)"
            strokeWidth="0.7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 0.5 + i * 0.15 }} // faster stagger
          />
        ))}

        {/* Gradients */}
        <defs>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
          <radialGradient id="starGlow2">
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
            fill="url(#starGlow2)"
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
