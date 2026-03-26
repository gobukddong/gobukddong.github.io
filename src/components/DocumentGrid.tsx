"use client";

import { documents } from "@/data/documents";
import DocumentCard from "./DocumentCard";

export default function DocumentGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <DocumentCard 
          key={doc.id} 
          document={doc} 
        />
      ))}
    </div>
  );
}
