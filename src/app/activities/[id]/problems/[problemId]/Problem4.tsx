export default function Problem4() {

  return (
    <div className="space-y-10">

      {/* 1. 문제 개요 */}
      <div className="space-y-4">
        <h2 className="text-xl font-orbitron text-white border-b border-neutral-800 pb-3">
          1. Problem Overview
        </h2>
        <p className="text-neutral-300 font-sans leading-relaxed text-sm">
          본 과제의 목표는 자체적인 <span className="text-emerald-400 font-semibold">웹 애플리케이션 방화벽(WAF)</span>이 적용된 환경에서 
          SQL Injection 취약점을 찾아내고, <span className="text-emerald-400 font-semibold">admin</span> 계정의 
          패스워드(<span className="text-emerald-400 font-semibold">upw</span>)에 담긴 플래그를 탈취하는 것이다. 
          개발자는 WAF를 통해 공격을 막으려 했으나, 필터링 로직의 허점을 뚫고 <span className="text-emerald-400 font-semibold">UNION SELECT</span> 구문을 삽입하여 
          화면에 플래그를 직접 출력하는 방식으로 공격을 수행하였다.
        </p>
      </div>

      {/* 2. 취약점 분석 */}
      <div className="space-y-4">
        <h2 className="text-xl font-orbitron text-white border-b border-neutral-800 pb-3">
          2. Vulnerability Analysis
        </h2>
        <div className="space-y-3">
          <div className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-red-900/40">
            <code className="text-red-400 font-mono text-sm shrink-0 mt-0.5">SQL Injection</code>
            <p className="text-neutral-300 font-sans text-sm leading-relaxed">
              파이썬의 f-string을 사용하여 데이터베이스 쿼리를 동적으로 생성한다 
              (<span className="text-emerald-400 font-semibold">SELECT * FROM user WHERE uid=&#39;&#123;uid&#125;&#39;;</span>). 
              사용자 입력값인 <span className="text-emerald-400 font-semibold">uid</span>에 대한 안전한 바인딩 처리가 누락되어 취약점이 발생한다.
            </p>
          </div>
          <div className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-neutral-800">
            <code className="text-emerald-400 font-mono text-sm shrink-0 mt-0.5">check_WAF</code>
            <p className="text-neutral-300 font-sans text-sm leading-relaxed">
              특정 키워드(<span className="text-emerald-400 font-semibold">union, select, from, and, or, admin, 공백, *, /</span>)를 차단하여 
              공격 쿼리 삽입을 방어한다.
            </p>
          </div>
          <div className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-neutral-800">
            <code className="text-red-400 font-mono text-sm shrink-0 mt-0.5">출력 제한</code>
            <p className="text-neutral-300 font-sans text-sm leading-relaxed">
              쿼리 성공 시 템플릿 화면에 두 번째 컬럼인 <span className="text-emerald-400 font-semibold">uid 값(result[1])</span>만 출력된다. 
              따라서 정상적인 방법으로는 세 번째 컬럼에 있는 <span className="text-emerald-400 font-semibold">upw(비밀번호)</span>를 화면에 띄울 수 없다.
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
              title: "공백 및 예약어 필터링 우회",
              desc: (
                <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                  스페이스바(공백) 대신 <span className="text-emerald-400 font-semibold">탭(Tab)</span> 문자를 구분자로 삽입하였다. 
                  또한 MySQL이 대소문자를 구분하지 않는다는 점을 활용하여 <span className="text-emerald-400 font-semibold">UnIoN, SeLeCt, FrOm</span> 처럼 
                  대소문자를 혼합하여 WAF의 검사를 회피하였다.
                </p>
              )
            },
            {
              step: "02",
              title: "특정 문자열 우회",
              desc: (
                <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                  타겟 계정인 <span className="text-emerald-400 font-semibold">admin</span> 문자열 자체도 필터링 대상이므로, 
                  이를 16진수(Hex)인 <span className="text-emerald-400 font-semibold">0x61646d696e</span>로 변환하여 주입하였다.
                </p>
              )
            },
            {
              step: "03",
              title: "UNION 구조 조작 및 구문 오류 방지",
              desc: (
                <p className="text-neutral-400 font-sans text-sm leading-relaxed">
                  기존 쿼리와 컬럼 수를 맞추고 화면 출력 위치에 데이터가 오도록 <span className="text-emerald-400 font-semibold">UnIoN SeLeCt 1,upw</span> 구문을 삽입하였다. 
                  마찬가지로 페이로드 끝에 주석 기호(<span className="text-emerald-400 font-semibold">#</span>)를 붙여 잔여 쿼리(<span className="text-emerald-400 font-semibold">&#39;;</span>) 오류를 제거하였다.
                </p>
              )
            }
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
            &#39;&emsp;UnIoN&emsp;SeLeCt&emsp;1,upw&emsp;FrOm&emsp;user&emsp;wHeRe&emsp;uid=0x61646d696e&emsp;#
          </code>
        </div>
      </div>

    </div>
  );
}
