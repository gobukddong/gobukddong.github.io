export default function Activity4() {
  return (
    <div className="space-y-12 py-4">
      <p className="text-xl text-neutral-300 leading-relaxed font-light">
        이곳은 <strong>BOJ</strong> 활동의 상세 내용을 기록하는 전용 공간이다. 
        <code>Activity4.tsx</code> 내부에서 자유롭게 내용을 확장할 수 있다.
      </p>
      <hr className="border-neutral-800 my-8" />
      <section>
        <h2 className="text-white text-2xl font-bold mb-4 tracking-tight font-orbitron">활동 내용</h2>
        <p className="text-neutral-400 font-inter">백준 온라인 저지에서 풀이한 문제들과 접근 방식을 기록한다.</p>
      </section>
    </div>
  );
}
