"use client";

import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import { DocumentProject } from "@/data/documents";
import Link from "next/link";

interface DocumentCardProps {
  document: DocumentProject;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  return (
    <Link href={`/projects/${document.id}`} className="block h-full outline-none">
      <motion.div
        className="group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 p-5 flex flex-col h-full min-h-[9.5rem] shadow-lg hover:border-neutral-700 transition-colors"
        whileHover={{ y: -5 }}
      >
        <h3 className="text-white font-bold text-xl mb-2">{document.title}</h3>
        <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">{document.category}</span>
        <p className="text-neutral-400 text-sm line-clamp-3 mt-auto">{document.summary}</p>
      </motion.div>
    </Link>
  );
}
