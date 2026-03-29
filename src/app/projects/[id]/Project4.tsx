import { Music, Cpu, Bug, Lightbulb, Users, Target, Zap, Share2, Layers, FileText, ExternalLink, Download, Layout } from "lucide-react";

export default function Project4() {
  return (
    <div className="space-y-16 py-4">
      {/* Header Info */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center border-b border-neutral-800 pb-12">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium">
              <Users size={14} />
              팀명: 해결했SSU (4인)
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <Target size={14} />
              상용 대비 75% 비용 절감
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight font-orbitron tracking-tighter">
            통합 에어 악기 시스템 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">'비트 킬러(Beat Killer)'</span>
          </h2>
          <p className="text-neutral-300 leading-relaxed font-inter">
             공간 제약 없이 연주할 수 있는 가상 에어 악기 시스템이다. 
            고가의 VR 장비 없이 두 개의 스틱형 컨트롤러와 자체 개발 알고리즘만으로 실질적인 <span className="text-orange-400 font-semibold">'저비용 고효율'</span> 연주 환경을 구현했다.
          </p>
        </div>
        <div className="lg:col-span-2 relative group mt-4 lg:mt-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <img 
            src="/창의적공학설계_해결했SSU.png" 
            alt="비트 킬러 시스템 이미지" 
            className="relative rounded-xl border border-neutral-700 shadow-2xl transition hover:scale-[1.02] duration-500 w-full object-cover"
          />
        </div>
      </section>

      {/* Planning Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Target className="text-orange-400" size={28} />
          <h2 className="text-2xl font-bold text-white font-orbitron tracking-tight">프로젝트 기획 배경</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-900/50 p-7 rounded-xl border border-neutral-800 hover:border-orange-500/30 transition-all space-y-3">
            <h4 className="text-white font-bold tracking-tight">문제 인식 & 한계 분석</h4>
            <p className="text-neutral-400 text-sm leading-relaxed font-inter">
              기존 에어 드럼 솔루션의 고가 장비 의존성(VR/카메라)과 실제 악기의 높은 가격 및 소음 제약을 핵심 페인 포인트로 정의했다.
            </p>
          </div>
          <div className="bg-neutral-900/50 p-7 rounded-xl border border-neutral-800 hover:border-orange-500/30 transition-all space-y-3">
            <h4 className="text-white font-bold tracking-tight">솔루션 도출</h4>
            <p className="text-neutral-400 text-sm leading-relaxed font-inter">
              저비용 하드웨어와 자체 모션 인식 알고리즘을 결합하여 드럼 외 다양한 악기를 지원하는 실용적인 통합 시스템을 기지했다.
            </p>
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="space-y-8 bg-neutral-900/5 border border-neutral-800 p-8 rounded-2xl">
        <div className="flex items-center gap-3">
          <Layers className="text-blue-400" size={28} />
          <h2 className="text-2xl font-bold text-white font-orbitron tracking-tight">시스템 아키텍처 설계</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h4 className="text-blue-400 font-bold flex items-center gap-2 tracking-tight">
              <Cpu size={20} />
              Dual-MCU 분산 처리
            </h4>
            <p className="text-neutral-400 text-sm leading-relaxed font-inter">
              MIDI 쉴드의 핀 독점 문제를 해결하기 위해 시스템을 메인 연산부와 사운드 출력부로 물리적으로 분할하여 안정적인 리소스를 확보했다.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-blue-400 font-bold flex items-center gap-2 tracking-tight">
              <Zap size={20} />
              비동기 직렬 통신
            </h4>
            <p className="text-neutral-400 text-sm leading-relaxed font-inter">
              두 보드 간 UART 통신 및 공통 GND 구축을 통해 실시간성 데이터 전송 파이프라인을 구축하고 지연 시간을 최소화했다.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Troubleshooting */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Bug className="text-emerald-400" size={28} />
          <h2 className="text-2xl font-bold text-white font-orbitron tracking-tight">기술적 문제 해결</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 hover:border-emerald-500/30 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-emerald-400 group-hover:animate-pulse" size={20} />
              <h4 className="text-white font-bold tracking-tight">자이로 델타 필터링 (모션 인식 고도화)</h4>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed font-inter">
              자이로스코프 각속도 변화량을 분석하여 예비 동작과 실제 타격 시점을 정밀하게 구분하는 알고리즘을 설계했다. 디바운싱 로직으로 오디오 글리치를 차단했다.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 hover:border-emerald-500/30 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-emerald-400 group-hover:animate-pulse" size={20} />
              <h4 className="text-white font-bold tracking-tight">N:1 무선 통신 최적화</h4>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed font-inter">
              두 스틱 간 패킷 충돌을 방지하기 위해 백오프(Backoff) 기법과 무작위 지연을 도입했다. 메인 보드 대역폭 최적화로 전체 통신 밸런스를 확보했다.
            </p>
          </div>
        </div>
      </section>

      {/* Business Impact/Conclusion */}
      <section className="space-y-8 border-t border-neutral-800 pt-12">
        <div className="flex items-center gap-3 justify-center text-center">
          <Lightbulb className="text-orange-400" size={28} />
          <h2 className="text-2xl font-bold text-white font-orbitron tracking-tight">결론 및 소셜 가치</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-orange-500/5 p-8 rounded-2xl border border-orange-500/10 space-y-4">
            <div className="flex items-center gap-2 text-orange-400">
              <Share2 size={24} />
              <h3 className="font-bold text-xl tracking-tight">오픈소스 생태계 기여</h3>
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed font-inter">
              회로도와 소스 코드를 전면 공개하여 누구나 저비용으로 DIY 에어 악기를 기획하고 제작할 수 있는 기술적 마중물을 제공했다.
            </p>
          </div>
          <div className="bg-emerald-500/5 p-8 rounded-2xl border border-emerald-500/10 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Music size={24} />
              <h3 className="font-bold text-xl tracking-tight">취미 생활의 진입 장벽 완화</h3>
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed font-inter">
              공간과 비용 문제로 음악을 포기했던 이들에게 실질적인 예술 체험 기회를 제공함으로써 엔지니어링의 사회적 책임을 실천했다.
            </p>
          </div>
        </div>
      </section>

      {/* PDF Action Section */}
      <section className="relative group overflow-hidden bg-neutral-900 border border-neutral-800 p-10 rounded-3xl flex flex-col items-center text-center space-y-6">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10 space-y-2">
          <h3 className="text-2xl font-bold text-white font-orbitron tracking-tight">설계 및 개발 보고서</h3>
          <p className="text-neutral-400 max-w-lg mx-auto font-inter">
            요구사항 분석 설계서
          </p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <a 
            href="/documents/해결했SSU_SRS-요구사항분석설계서.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/20"
          >
            <ExternalLink size={20} />
            PDF 문서 열기
          </a>
          <a 
            href="/documents/해결했SSU_SRS-요구사항분석설계서.pdf" 
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
