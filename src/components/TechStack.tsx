"use client";

import { motion } from "framer-motion";

const skills = [
  "Next.js", "React", "TypeScript", "Tailwind CSS","Node.js", "Python", "Github", "C", "Javascript", "Linux", "Supabase", "Excel", "Antigravity", "Cursor", "stitch"
];

export default function TechStack() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 pt-20">
      {/* 바닥 베이스 */}
      <div className="relative pb-6 flex flex-wrap-reverse justify-center gap-3">
        {/* 바닥 라인 (벽돌이 쌓이는 기반) */}
        <div className="absolute bottom-0 inset-x-4 h-1 bg-neutral-800 rounded-full" />
        
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              type: "spring", 
              stiffness: 250, 
              damping: 15, 
              delay: index * 0.05 
            }}
            whileHover={{ 
              y: -4, 
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            className="
              relative flex items-center justify-center px-6 py-3 
              bg-neutral-800 text-neutral-300 font-medium text-sm md:text-base 
              rounded-lg border border-neutral-700
              shadow-[0_5px_0_0_#262626] hover:shadow-[0_6px_0_0_#262626] hover:bg-neutral-700 hover:text-white
              active:translate-y-[5px] active:shadow-[0_0px_0_0_#262626]
              transition-colors cursor-default select-none
            "
          >
            {/* 상단 반사광 효과 (미세한 입체감) */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10 rounded-t-lg" />
            
            <span className="relative z-10">{skill}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
