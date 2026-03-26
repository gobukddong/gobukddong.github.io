"use client";

import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import { ActivityProject } from "@/data/activities";
import Link from "next/link";

interface ActivityCardProps {
  activity: ActivityProject;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Link href={`/activities/${activity.id}`} className="block h-full outline-none">
      <motion.div
        className="group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 p-5 flex flex-col h-full min-h-[9.5rem] shadow-lg hover:border-neutral-700 transition-colors"
        whileHover={{ y: -5 }}
      >
        <h3 className="text-white font-bold text-xl mb-2">{activity.title}</h3>
        <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">{activity.category}</span>
        <p className="text-neutral-400 text-sm line-clamp-3 mt-auto">{activity.summary}</p>
      </motion.div>
    </Link>
  );
}
