"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface VideoCardProps {
  project: Project;
  onClick: (project: Project) => void;
  priority?: boolean;
}

export default function VideoCard({ project, onClick, priority = false }: VideoCardProps) {
  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-900 aspect-video shadow-lg"
      whileHover="hover"
      onClick={() => onClick(project)}
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
      <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end">
        <h3 className="text-white font-bold text-lg leading-tight mb-1">{project.title}</h3>
        <span className="text-red-400 text-xs font-bold uppercase tracking-wider mb-2">{project.category}</span>
        <p className="text-neutral-300 text-sm line-clamp-2">{project.description}</p>
      </div>
    </motion.div>
  );
}
