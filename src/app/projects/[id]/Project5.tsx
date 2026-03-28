"use client";

import { ExternalLink } from "lucide-react";

export default function Project5() {
  return (
    <>
      <div className="mb-8">
        <a 
          href="https://meetplz.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-600/20 hover:border-blue-500/30 transition-all duration-300 font-medium"
        >
          <ExternalLink size={18} />
          <span>https://meetplz.vercel.app/</span>
        </a>
      </div>
      
      <hr className="border-neutral-800 my-8" />
      
      <div className="space-y-12">
        <section>
          <h2 className="text-white text-2xl font-bold mb-4">프로젝트 개요</h2>
          <p className="text-neutral-400 leading-relaxed">
            meetplz는 간단한 일정관리 웹입니다. <br></br>
            모임을 정할때 상대방의 달력을 확인하고 가능한 시간에 약속을 잡을 수 있습니다.<br></br>
            또한, 공개 모임을 올려 아무나 참여할 수 있도록 할 수 있습니다.<br></br>
          </p>
        </section>

        <section>
          <h2 className="text-white text-2xl font-bold mb-4">주요 기능</h2>
          <ul className="list-disc list-inside text-neutral-400 space-y-2">
            <li>내 일정 추가/삭제/확인, 내 일정 공개/비공개 기능</li>
            <li>친구 추가, 개인/모임 실시간 채팅 기능</li>
            <li>공개모집 게시 기능</li>
            <li>상대방의 달력 확인 가능</li>
            <li>AI브리핑을 통한 내 일정 정리 기능</li>
            <li>다크모드 기능</li>
            
            <li className="list-none mt-4">
              <img src="/meetplz.png" alt="meetplz 메인 화면" className="rounded-lg max-w-full h-auto"/>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
