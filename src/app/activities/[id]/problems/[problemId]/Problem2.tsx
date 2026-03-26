export default function Problem2() {
  return (
    <div className="space-y-10">

      {/* 1. 문제 개요 */}
      <div className="space-y-4">
        <h2 className="text-xl font-orbitron text-white border-b border-neutral-800 pb-3">
          1. Problem Overview
        </h2>
        <p className="text-neutral-300 font-sans leading-relaxed text-sm">
          본 과제의 목표는 강력한 <span className="text-emerald-400 font-semibold">Content Security Policy(CSP)</span>가 적용된 환경에서
          {" "}<span className="text-emerald-400 font-semibold">DOM-based XSS</span> 취약점을 분석하고 플래그를 탈취하는 것이다.
          CSP 우회를 위해 서버 측의 설정과 클라이언트 측의 DOM 처리 로직에 존재하는 논리적 허점을 연계하여 공격을 수행한다.
        </p>
      </div>

      {/* 2. 취약점 분석 */}
      <div className="space-y-4">
        <h2 className="text-xl font-orbitron text-white border-b border-neutral-800 pb-3">
          2. Vulnerability Analysis
        </h2>
        <p className="text-neutral-400 font-sans text-sm leading-relaxed">
          해당 애플리케이션의 <span className="text-emerald-400 font-semibold">app.py</span>에 설정된 CSP를 살펴보면,{" "}
          <span className="text-emerald-400 font-semibold">script-src</span> 지시자에{" "}
          <span className="text-emerald-400 font-semibold">nonce</span>와{" "}
          <span className="text-emerald-400 font-semibold">strict-dynamic</span>이 함께 적용되어 있다.
        </p>
        <div className="space-y-3">
          <div className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-neutral-800">
            <code className="text-emerald-400 font-mono text-sm shrink-0 mt-0.5">nonce</code>
            <p className="text-neutral-300 font-sans text-sm leading-relaxed">
              nonce 값이 일치하지 않는 외부 입력 스크립트는 실행이 차단된다.
            </p>
          </div>
          <div className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-neutral-800">
            <code className="text-emerald-400 font-mono text-sm shrink-0 mt-0.5">strict-dynamic</code>
            <p className="text-neutral-300 font-sans text-sm leading-relaxed">
              nonce를 통해 이미 신뢰를 받은 정상 스크립트 내부에서 동적으로 생성하는 스크립트
              (예: <span className="text-emerald-400 font-semibold">innerHTML</span>을 통한 삽입)는 추가적인 nonce 없이도 실행이 허용된다.
            </p>
          </div>
        </div>
        <p className="text-neutral-400 font-sans text-sm leading-relaxed pt-2">
          또한 클라이언트 단인 <span className="text-emerald-400 font-semibold">vuln.html</span> 템플릿에는 두 가지 주요 취약 포인트가 존재한다.
        </p>
        <div className="space-y-3">
          <div className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-red-900/40">
            <code className="text-red-400 font-mono text-sm shrink-0 mt-0.5">HTML Injection</code>
            <p className="text-neutral-300 font-sans text-sm leading-relaxed">
              <span className="text-emerald-400 font-semibold">{"{{ param | safe }}"}</span> 코드를 통해{" "}
              <span className="text-emerald-400 font-semibold">param</span> 파라미터로 전달된 값이 이스케이프 처리 없이 HTML로 렌더링되므로,
              공격자가 이 위치에 임의의 HTML 태그를 마음대로 삽입할 수 있다.
            </p>
          </div>
          <div className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-red-900/40">
            <code className="text-red-400 font-mono text-sm shrink-0 mt-0.5">DOM 처리 로직</code>
            <p className="text-neutral-300 font-sans text-sm leading-relaxed">
              nonce가 정상적으로 적용된 기존 스크립트에서 URL의{" "}
              <span className="text-emerald-400 font-semibold">해시(#)</span> 뒷부분 값을 가져온 뒤,{" "}
              <span className="text-emerald-400 font-semibold">[data-handle]</span> 속성을 가진 요소의 innerHTML에{" "}
              <span className="text-emerald-400 font-semibold">badge.innerHTML = tag + ...</span> 형태로 삽입하는 취약한 로직이 존재한다.
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
              title: "DOM 요소 조작 (param)",
              desc: (
                <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                  <span className="text-emerald-400 font-semibold">param</span> 파라미터에{" "}
                  <span className="text-emerald-400 font-semibold">{"<script data-handle></script>"}</span> 태그를 삽입한다.
                  이를 통해 DOM 내부에 <span className="text-emerald-400 font-semibold">[data-handle]</span> 속성을 가진 타겟 요소가
                  스크립트 태그로 준비된다.
                </p>
              ),
            },
            {
              step: "02",
              title: "페이로드 주입 (URL Hash)",
              desc: (
                <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                  URL의 해시(<span className="text-emerald-400 font-semibold">#</span>) 부분에 악성 자바스크립트 코드인{" "}
                  <span className="text-emerald-400 font-semibold">fetch('/memo?memo='+btoa(document.cookie))//</span>를 삽입한다.
                  코드 맨 뒤의 <span className="text-emerald-400 font-semibold">//</span>를 추가함으로써, innerHTML 삽입 시
                  뒤따라오는 나머지 문자열들이 주석 처리되도록 유도한다.
                </p>
              ),
            },
            {
              step: "03",
              title: "XSS 트리거 및 CSP 우회",
              desc: (
                <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                  관리자 봇이 조작된 URL에 접속하면, 신뢰받는 정상 스크립트가 해시값을 읽어 들여 앞서 주입해 둔{" "}
                  <span className="text-emerald-400 font-semibold">{"<script data-handle>"}</span> 요소의 innerHTML에 악성 코드를 삽입한다.{" "}
                  <span className="text-emerald-400 font-semibold">strict-dynamic</span> 정책에 의해 이 동적 삽입 과정은 차단되지 않고 그대로 실행된다.
                </p>
              ),
            },
            {
              step: "04",
              title: "데이터 반출 및 확인",
              desc: (
                <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                  실행된 스크립트는 관리자의 쿠키를 <span className="text-emerald-400 font-semibold">Base64</span>로 인코딩한 뒤{" "}
                  <span className="text-emerald-400 font-semibold">/memo</span> 엔드포인트로 전송한다.
                  이후 memo wall에 기록된 로그에서 Base64 문자열을 찾아 디코딩하여 최종적으로 플래그를 획득한다.
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
            http://127.0.0.1:8000/vuln?param=&lt;div data-handle&gt;&lt;/div&gt;#fetch(&#39;/memo?memo=&#39;+btoa(document.cookie))//
          </code>
        </div>
      </div>

    </div>
  );
}
