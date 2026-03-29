export default function Activity3() {
  return (
    <div className="space-y-12 py-4">
      <p className="text-xl text-neutral-300 leading-relaxed font-light">
        이곳은 <strong>Blog</strong> 활동의 상세 내용을 기록하는 전용 공간이다. 
        <code>Activity3.tsx</code> 내부에서 자유롭게 내용을 확장할 수 있다.
      </p>
      <hr className="border-neutral-800 my-8" />
      <section>
        <h2 className="text-white text-2xl font-bold mb-4 tracking-tight font-orbitron">블로그 포스팅</h2>
        <p className="text-neutral-400 font-inter">작성했던 아티클이나 대외 기술 포스팅 경험을 기록한다.</p>
      </section>
    </div>
  );
}
