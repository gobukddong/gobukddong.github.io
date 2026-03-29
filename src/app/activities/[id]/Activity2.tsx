export default function Activity2() {
  return (
    <div className="space-y-12 py-4">
      <p className="text-xl text-neutral-300 leading-relaxed font-light">
        외부 문제 풀이 일체를 기록하고 저장하는 공간이다.
      </p>
      <hr className="border-neutral-800 my-8" />
      <div className="space-y-8">
        <section>
          <h2 className="text-white text-2xl font-bold mb-4 tracking-tight">Kakao AI Top 100</h2>
          <p className="text-neutral-400 font-inter">대회가 종료된 후 상세 풀이를 업로드할 예정이다.</p>
        </section>
        
        <section>
          <h2 className="text-white text-2xl font-bold mb-4 tracking-tight">Openzeppelin</h2>
          <p className="text-neutral-400 font-inter">Ethernaut 등 스마트 컨트랙트 보안 문제 풀이를 업로드할 예정이다.</p>
        </section>
      </div>
    </div>
  );
}
