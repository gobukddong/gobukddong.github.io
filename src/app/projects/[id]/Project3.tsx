import { FileText, Download, ExternalLink, Waves, ShieldAlert, Cpu, Recycle, BarChart3, Users, Lightbulb, AlertTriangle } from "lucide-react";

export default function Project3() {
  return (
    <div className="space-y-16 py-4">
      {/* Header Info */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start border-b border-neutral-800 pb-12">
        <div className="lg:col-span-3 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            <Users size={14} />
            팀명: 위잉위잉어푸어푸 (2인)
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-orbitron tracking-tighter leading-tight">
            무인 자율 시스템과 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-500">킬레이트 코팅 자성유체 융합</span>
          </h2>
          <p className="text-neutral-400 leading-relaxed font-inter">
            문제 정의부터 솔루션 아이디에이션, 시스템 요구사항 도출, 경제성 분석까지 기획 전 과정을 공동 수행했다. 
            단순 아이디어를 넘어선 논리적인 <span className="text-blue-400 font-semibold">'순환형 정화 비즈니스 모델'</span> 구축으로 서류 심사 합격이라는 결실을 맺었다.
          </p>
        </div>
        <div className="lg:col-span-2 bg-neutral-800/30 p-8 rounded-2xl border border-neutral-700/50 space-y-4 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <h3 className="text-white font-bold flex items-center gap-2 tracking-tight relative z-10">
            <AlertTriangle className="text-red-400" size={20} />
            핵심 문제 정의
          </h3>
          <ul className="space-y-3 text-sm text-neutral-300 relative z-10 font-inter">
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              중금속은 분해되지 않고 해양 생태계에 축적되어 치명적인 피해를 유발한다.
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">•</span>
              기존 정화 기술은 광범위 전산 적용이 어렵고 비용 대비 효율이 저조하다.
            </li>
          </ul>
        </div>
      </section>

      {/* System Concept */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Cpu className="text-emerald-400" size={28} />
          <h2 className="text-2xl font-bold text-white font-orbitron tracking-tight">핵심 시스템 컨셉</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 hover:border-emerald-500/30 transition-all space-y-3">
            <h4 className="text-emerald-400 font-bold tracking-tight">① 친환경 화학 소재</h4>
            <p className="text-neutral-400 text-sm leading-relaxed font-inter">
              나노입자 표면을 실리카(SiO2)로 코팅하여 분산 안정성을 확보하고, 생분해성 천연 물질을 활용해 2차 오염을 방지했다.
            </p>
          </div>
          <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 hover:border-emerald-500/30 transition-all space-y-3">
            <h4 className="text-emerald-400 font-bold tracking-tight">② 무인 모니터링</h4>
            <p className="text-neutral-400 text-sm leading-relaxed font-inter">
              초분광 센서 탑재 드론을 통해 오염 지역을 분석하고, 다면적 환경 데이터(pH, 염분도 등) 수집 체계를 설계했다.
            </p>
          </div>
          <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 hover:border-emerald-500/30 transition-all space-y-3">
            <h4 className="text-emerald-400 font-bold tracking-tight">③ 리스크 관리</h4>
            <p className="text-neutral-400 text-sm leading-relaxed font-inter">
              데이터 지연 리스크를 극복하기 위해 AI 기반 오염원 예측 알고리즘과 다중 주파수 트랜시버 도입을 기획했다.
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability & Business (Conclusion) */}
      <section className="space-y-8 border-t border-neutral-800 pt-12">
        <div className="flex items-center gap-3 justify-center text-center">
          <Lightbulb className="text-blue-400" size={28} />
          <h2 className="text-2xl font-bold text-white font-orbitron tracking-tight">결론 및 비즈니스 임팩트</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-500/5 p-8 rounded-2xl border border-blue-500/10 space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Recycle size={24} />
              <h3 className="font-bold text-xl tracking-tight">순환 공정 (Circular Process)</h3>
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed font-inter">
              자율운항 선박의 자기 분리 기술을 통해 중금속 결합 물질을 수거하고, 화학 처리를 거쳐 정화 물질을 재사용하는 경제적 선순환 모델을 도출했다.
            </p>
          </div>
          <div className="bg-sky-500/5 p-8 rounded-2xl border border-sky-500/10 space-y-4">
            <div className="flex items-center gap-2 text-sky-400">
              <BarChart3 size={24} />
              <h3 className="font-bold text-xl tracking-tight">경제적 가치 창출</h3>
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed font-inter">
              정밀 타격과 물질 재순환을 통해 장기 운영비를 절감하고, 어업/관광 산업 피해 예방을 통한 사회적 편익을 증명하여 사업 타당성을 입증했다.
            </p>
          </div>
        </div>
      </section>

      {/* PDF Action Section */}
      <section className="relative group overflow-hidden bg-neutral-900 border border-neutral-800 p-10 rounded-3xl flex flex-col items-center text-center space-y-6">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10 space-y-2">
          <h3 className="text-2xl font-bold text-white font-orbitron tracking-tight">상세 보고서</h3>
          <p className="text-neutral-400 max-w-lg mx-auto font-inter">
            설계 도면 및 상세 경제성 분석 데이터 포함
          </p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <a 
            href="/documents/위잉위잉어푸어푸.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
          >
            <ExternalLink size={20} />
            PDF 문서 열기
          </a>
          <a 
            href="/documents/위잉위잉어푸어푸.pdf" 
            download
            className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full font-bold flex items-center gap-2 border border-neutral-700 transition-all transform hover:scale-105 active:scale-95"
          >
            <Download size={20} />
            다운로드
          </a>
        </div>
      </section>
    </div>
  );
}
