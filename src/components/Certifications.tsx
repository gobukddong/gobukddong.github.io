"use client";

import { Award } from "lucide-react";
import { motion } from "framer-motion";

const certs = [
  {
    id: 1,
    name: "정보처리기능사",
    issuer: "한국산업인력공단"
  },
  {
    id: 2,
    name: "SQLD",
    issuer: "한국데이터산업진흥원"
  },
  {
    id: 3,
    name: "컴퓨터활용능력1급",
    issuer: "대한상공회의소"
  },
  {
    id: 4,
    name: "MOS Excel 2016 Expert",
    issuer: "Microsoft"
  },
  {
    id: 5,
    name: "TOEIC 720",
    issuer: "ETS"
  }
];

export default function Certifications() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {certs.map((cert, index) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-4 p-5 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-neutral-700 hover:-translate-y-1 transition-all duration-300 shadow-sm"
        >
          <div className="p-3 bg-neutral-800/80 rounded-lg text-yellow-500">
            <Award size={24} />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-1">{cert.name}</h3>
            <p className="text-neutral-400 text-sm">{cert.issuer}</p>
            {cert.date && (
              <p className="text-neutral-500 text-sm mt-1">
                {cert.date}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
