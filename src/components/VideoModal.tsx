"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Project } from "@/data/projects";

interface VideoModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ project, isOpen, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[rgba(0,0,0,0.8)] backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[rgba(255,255,255,0.1)] flex items-center justify-center"
            style={{ 
                width: "min(1200px, 90vw, 75vh * 16 / 9)", 
                aspectRatio: "16 / 9",
                height: "auto",
                maxHeight: "75vh"
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-[rgba(0,0,0,0.5)] hover:bg-black text-white p-2 rounded-full transition-colors backdrop-blur-sm"
              aria-label="Close video"
            >
              <X size={24} />
            </button>
            
            {/* YouTube Embed */}
            {/* modestbranding=1, rel=0, autoplay=1 */}
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
              title={project.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
