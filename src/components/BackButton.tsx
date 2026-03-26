"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="inline-flex items-center text-neutral-400 hover:text-white transition-colors group cursor-pointer"
    >
      <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
      돌아가기
    </button>
  );
}
