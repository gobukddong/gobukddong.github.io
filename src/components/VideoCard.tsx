"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";

interface VideoCardProps {
  project: Project;
  onClick: (project: Project) => void;
  priority?: boolean;
  isBlackHoleActive?: boolean;
  index: number;
}

export default function VideoCard({ project, onClick, priority = false, isBlackHoleActive = false, index }: VideoCardProps) {
  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-video overflow-visible">
      {/* Original Card: Hides during event */}
      <motion.div
        className={`group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-900 w-full h-full shadow-lg transition-opacity duration-500 ${isBlackHoleActive ? 'opacity-0' : 'opacity-100'}`}
        whileHover={!isBlackHoleActive ? "hover" : ""}
        onClick={() => !isBlackHoleActive && onClick(project)}
      >
        <motion.div
          variants={{
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority={priority}
            className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-50"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            variants={{
              hover: { opacity: 1, scale: 1 },
              initial: { opacity: 0, scale: 0.8 },
            }}
            initial="initial"
            transition={{ duration: 0.2 }}
            className="bg-red-600/90 text-white rounded-full p-4 backdrop-blur-sm shadow-xl"
          >
            <Play fill="currentColor" size={32} />
          </motion.div>
        </div>
        <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end text-left">
          <h3 className="text-white font-bold text-lg leading-tight mb-1">{project.title}</h3>
          <span className="text-red-400 text-xs font-bold uppercase tracking-wider mb-2">{project.category}</span>
          <p className="text-neutral-300 text-sm line-clamp-2">{project.description}</p>
        </div>
      </motion.div>

      {/* Sucking Copy */}
      <AnimatePresence>
        {isBlackHoleActive && (
          <motion.div 
            initial={{ scale: 1, opacity: 1, x: 0, y: 0, rotate: 0 }}
            animate={{ 
                scale: 0, 
                opacity: 0, 
                x: (Math.random() - 0.5) * 300, 
                y: 1500 + (index * 100), // Target depth
                rotate: 1080 
            }}
            transition={{ duration: 3.5, ease: "anticipate", delay: index * 0.1 }}
            className="absolute inset-0 z-50 pointer-events-none rounded-xl overflow-hidden shadow-2xl"
          >
             <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
             />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
