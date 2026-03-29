import { Shield, Search, Zap, Trash2, Cpu, Lock, Terminal, Activity, Monitor } from "lucide-react";

export default function Project2() {
  return (
    <div className="space-y-16 py-4">
      {/* Header Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <Shield size={14} />
            시스템 취약점 진단 도구
          </div>
          <h2 className="text-3xl font-bold text-white font-orbitron tracking-tighter">
            Linux <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">vulnerability scanner</span>
          </h2>
          <p className="text-neutral-400 leading-relaxed font-inter">
            Linux 서버 내의 설정 오류, 권한 관리 결함, 알려진 CVE 취약점을 점검하는 <span className="text-emerald-400 font-semibold">'로컬 시스템 보안 스캐너'</span> 개발 프로젝트다.
            정리하는 대로 상세 내용을 업데이트할 예정이다.
          </p>
        </div>
        <div className="bg-neutral-800/30 p-8 rounded-2xl border border-neutral-700/50 space-y-4">
          <h3 className="text-white font-bold flex items-center gap-2 tracking-tight">
            <Terminal className="text-emerald-400" size={20} />
            핵심 개요
          </h3>
          <ul className="space-y-3 text-sm text-neutral-300">
            <li className="flex gap-2 font-inter">
              <span className="text-emerald-400">•</span>
              리눅스 시스템 구성 파일 및 커널 버전 자동 분석
            </li>
            <li className="flex gap-2 font-inter">
              <span className="text-emerald-400">•</span>
              권한 상승(Privilege Escalation) 가능성 점검 로직 구축
            </li>
          </ul>
        </div>
      </section>

      {/* Draft Content Card */}
      <section className="bg-neutral-900 border border-neutral-800 p-10 rounded-3xl flex flex-col items-center text-center space-y-6">
        <div className="p-4 bg-neutral-800 rounded-full text-emerald-400">
          <Monitor size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white font-orbitron tracking-tight">상세 내용 업데이트 대기 중</h3>
          <p className="text-neutral-400 max-w-lg mx-auto font-inter">
            취약점 데이터베이스 연동 및 쉘 스크립트 최적화를 진행 중이다. 
            정리가 완료되는 대로 실제 스캔 시나리오와 로직을 공개할 계획이다.
          </p>
        </div>
      </section>
    </div>
  );
}
