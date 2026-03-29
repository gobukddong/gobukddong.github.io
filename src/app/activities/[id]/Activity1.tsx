"use client";

import Link from "next/link";
import { problems } from "@/data/problems";
import { ExternalLink, ChevronRight, Shield, FolderGit2 } from "lucide-react";
import { motion } from "framer-motion";

const projectLinks = [
  {
    id: "1",
    title: "react2shell vulnerability scanner",
    summary: "Security",
    href: "/projects/1",
  },
  {
    id: "2",
    title: "Linux vulnerability scanner",
    summary: "Security",
    href: "/projects/2",
  },
];

const asc_problems = problems;

export default function Activity1() {
  return (
    <div className="space-y-12">
      {/* PROBLEM SOLVING */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
          <Shield size={20} className="text-emerald-400 shrink-0" />
          <h2 className="text-2xl font-orbitron text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#e8e8e8_0%,#ffffff_20%,#888888_40%,#cccccc_55%,#aaaaaa_70%,#ffffff_85%,#999999_100%)]">
            PROBLEM SOLVING
          </h2>
        </div>
        <p className="text-base text-neutral-400 font-sans leading-relaxed">
          ASC 활동 중 해결한 웹 해킹 및 보안 문제 풀이다. 제목을 클릭하면 상세 풀이 페이지로 이동할 수 있다.
        </p>
        <div className="grid gap-3">
          {asc_problems.map((problem, i) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/activities/1/problems/${problem.id}`}
                className="group flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-emerald-500/40 hover:bg-neutral-900/80 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <span className="font-orbitron text-emerald-400 text-xs tracking-widest shrink-0">
                    [{problem.keyword}]
                  </span>
                  <span className="text-neutral-200 font-sans text-sm group-hover:text-white transition-colors">
                    {problem.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <ChevronRight
                    size={16}
                    className="text-neutral-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
          {asc_problems.length === 0 && (
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl text-center text-neutral-500 font-sans italic">
              아직 등록된 문제풀이가 없다.
            </div>
          )}
        </div>
      </section>

      {/* PROJECT */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
          <FolderGit2 size={20} className="text-blue-400 shrink-0" />
          <h2 className="text-2xl font-orbitron text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#e8e8e8_0%,#ffffff_20%,#888888_40%,#cccccc_55%,#aaaaaa_70%,#ffffff_85%,#999999_100%)]">
            PROJECT
          </h2>
        </div>
        <p className="text-base text-neutral-400 font-sans leading-relaxed">
          ASC 활동과 연계된 보안 프로젝트다. 카드를 클릭하면 프로젝트 상세 페이지로 이동할 수 있다.
        </p>
        <div className="grid gap-3">
          {projectLinks.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 + 0.2 }}
            >
              <Link
                href={project.href}
                className="group flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-blue-500/40 hover:bg-neutral-900/80 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <span className="font-orbitron text-blue-400 text-xs tracking-widest shrink-0">
                    [{project.summary}]
                  </span>
                  <span className="text-neutral-200 font-sans text-sm group-hover:text-white transition-colors">
                    {project.title}
                  </span>
                </div>
                <ExternalLink
                  size={15}
                  className="text-neutral-600 group-hover:text-blue-400 transition-colors shrink-0"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
