"use client";

import { ExternalLink, Calendar, Users, Zap, Layout, MessageSquare, Globe, Sparkles, Database, Bot } from "lucide-react";

export default function Project5() {
  return (
    <div className="space-y-16 py-4">
      {/* Header Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium">
            <Calendar size={14} />
            일정 관리 & 소셜 플랫폼
          </div>
          <h2 className="text-3xl font-bold text-white font-orbitron tracking-tighter">
            meetplz <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-500">Scheduling Hub</span>
          </h2>
          <p className="text-neutral-400 leading-relaxed font-inter">
            동아리 부원들과 일정을 맞추기 위해 제작한 웹 플랫폼이다. 
            상대방의 달력을 확인하고 가능한 시간에 효율적으로 약속을 기록할 수 있다.
          </p>
          <div className="pt-2">
            <a 
              href="https://meetplz.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-800 text-white rounded-xl hover:bg-neutral-800 hover:border-rose-500/50 transition-all duration-300 font-medium group"
            >
              <ExternalLink size={18} className="group-hover:text-rose-400 transition-colors" />
              <span>웹페이지 확인하기</span>
            </a>
          </div>
        </div>
        <div className="bg-neutral-800/30 p-8 rounded-2xl border border-neutral-700/50 space-y-4 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-indigo-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <h3 className="text-white font-bold flex items-center gap-2 tracking-tight relative z-10">
            <Sparkles className="text-rose-400" size={20} />
            프로젝트 개요
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed relative z-10 font-inter">
            기존의 복잡한 일정 조율 과정을 단순화하기 위해 기획했다. 
            개인 일정 관리뿐만 아니라 공개 모임을 통해 누구나 참여할 수 있는 열린 커뮤니티 기능을 제공한다.
          </p>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Layout className="text-emerald-400" size={28} />
          <h2 className="text-2xl font-bold text-white font-orbitron tracking-tight">주요 기능</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 hover:border-emerald-500/30 transition-all space-y-3">
            <div className="text-emerald-400"><Calendar size={24} /></div>
            <h4 className="text-white font-bold tracking-tight">스마트 달력 관리</h4>
            <p className="text-neutral-400 text-sm leading-relaxed font-inter">
              내 일정 추가/삭제/확인부터 일정 공개/비공개 설정까지 직관적으로 제어할 수 있다.
            </p>
          </div>
          <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 hover:border-emerald-500/30 transition-all space-y-3">
            <div className="text-emerald-400"><MessageSquare size={24} /></div>
            <h4 className="text-white font-bold tracking-tight">실시간 소셜 인터랙션</h4>
            <p className="text-neutral-400 text-sm leading-relaxed font-inter">
              친구 추가 기능과 더불어 개인 및 모임별 실시간 채팅을 통해 즉각적인 소통이 가능하다.
            </p>
          </div>
          <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 hover:border-emerald-500/30 transition-all space-y-3">
            <div className="text-emerald-400"><Bot size={24} /></div>
            <h4 className="text-white font-bold tracking-tight">AI 일정 브리핑</h4>
            <p className="text-neutral-400 text-sm leading-relaxed font-inter">
              복잡한 일정을 AI가 분석하여 깔끔하게 정리하고 브리핑해주는 편의 기능을 탑재했다.
            </p>
          </div>
        </div>
      </section>

      {/* Showcase Image */}
      <section className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-rose-500/20 to-indigo-500/20 rounded-[2.5rem] blur-xl opacity-50"></div>
        <div className="relative bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden p-2">
          <img 
            src="/meetplz.png" 
            alt="meetplz 메인 화면" 
            className="w-full h-auto rounded-2xl transform transition duration-700 group-hover:scale-[1.01]"
          />
        </div>
      </section>

      {/* Tech Stack & Closing */}
      <section className="space-y-8 border-t border-neutral-800 pt-12">
        <div className="flex items-center gap-3 justify-center text-center">
          <Database className="text-rose-400" size={28} />
          <h2 className="text-2xl font-bold text-white font-orbitron tracking-tight">기술 기반 솔루션</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-rose-500/5 p-8 rounded-2xl border border-rose-500/10 space-y-4">
            <h3 className="text-rose-400 font-bold text-xl tracking-tight flex items-center gap-2">
              <Zap size={20} />
              심리스한 사용자 경험
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed font-inter">
              mermaid, supabase, antigravity 등의 기술 스택을 활용하여 데이터 무결성과 실시간 성능을 확보했다. 다크모드 지원으로 가독성을 높였다.
            </p>
          </div>
          <div className="bg-indigo-500/5 p-8 rounded-2xl border border-indigo-500/10 space-y-4">
            <h3 className="text-indigo-400 font-bold text-xl tracking-tight flex items-center gap-2">
              <Globe size={20} />
              공개 모집 게시판
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed font-inter">
              폐쇄적인 일정 조율을 넘어, 공개 모집 게시 기능을 통해 누구나 참여할 수 있는 열린 네트워킹 환경을 구축했다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
