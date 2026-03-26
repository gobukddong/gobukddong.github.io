"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText } from "lucide-react";
import { DocumentProject } from "@/data/documents";

interface DocumentModalProps {
  document: DocumentProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentModal({ document, isOpen, onClose }: DocumentModalProps) {
  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "unset";
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && document && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden"
        >
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[85vh] flex flex-col bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-neutral-800/80 hover:bg-neutral-700 text-white p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="p-8 pb-6 border-b border-neutral-800 bg-neutral-900">
              <div className="flex items-center gap-3 mb-4 text-blue-400">
                <FileText size={24} />
                <span className="text-sm font-bold uppercase tracking-widest">{document.category}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{document.title}</h2>
              <p className="text-neutral-400 text-lg">{document.summary}</p>
            </div>
            
            <div className="p-8 overflow-y-auto whitespace-pre-wrap text-neutral-300 leading-relaxed font-inter">
              {document.content}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
