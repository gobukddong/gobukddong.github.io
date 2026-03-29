import { Shield, Search, Zap, Trash2, Cpu, Lock, Terminal, Activity, FileSearch } from "lucide-react";

export default function Project1() {
  return (
    <div className="space-y-16 py-4">
      {/* Header Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
            <Shield size={14} />
            보안 취약점 진단 도구
          </div>
          <h2 className="text-3xl font-bold text-white font-orbitron tracking-tighter">
            react2shell <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">vulnerability scanner</span>
          </h2>
          <p className="text-neutral-400 leading-relaxed font-inter">
            React 애플리케이션의 엔드포인트 및 입력 폼을 자동으로 분석하여 <span className="text-indigo-400 font-semibold">'인젝션 및 로직 취약점'</span>을 탐지하는 자동화 진단 프로젝트다.
            정리하는 대로 상세 내용을 업데이트할 예정이다.
          </p>
        </div>
        <div className="bg-neutral-800/30 p-8 rounded-2xl border border-neutral-700/50 space-y-4">
          <h3 className="text-white font-bold flex items-center gap-2 tracking-tight">
            <Lock className="text-indigo-400" size={20} />
            핵심 개요
          </h3>
          <ul className="space-y-3 text-sm text-neutral-300">
            <li className="flex gap-2 font-inter">
              <span className="text-indigo-400">•</span>
              React 기반 웹 애플리케이션의 동적 분석 자동화
            </li>
            <li className="flex gap-2 font-inter">
              <span className="text-indigo-400">•</span>
              브라우저 단에서의 비정상 요청 및 응답 탐지
            </li>
          </ul>
        </div>
      </section>

      {/* Draft Content Card */}
      <section className="bg-neutral-900 border border-neutral-800 p-10 rounded-3xl flex flex-col items-center text-center space-y-6">
        <div className="p-4 bg-neutral-800 rounded-full text-indigo-400">
          <FileSearch size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white font-orbitron tracking-tight">상세 내용 업데이트 대기 중</h3>
          <p className="text-neutral-400 max-w-lg mx-auto font-inter">
            현재 기술 스택 정리 및 취약점 탐지 로직을 기록 중이다. 
            완료되는 대로 시스템 아키텍처와 상세 결과를 공개할 계획이다.
          </p>
        </div>
      </section>
    </div>
  );
}
