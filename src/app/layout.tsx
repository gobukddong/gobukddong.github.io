import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import StickyNav from "@/components/StickyNav";
import ScrollProgressButton from "@/components/ScrollProgressButton";
import SpaceEffect from "@/components/SpaceEffect";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "Director's Video Folio",
  description: "A showcase of cinematic video projects using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" as="style" crossOrigin="" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css" />
      </head>
      <body className={`${orbitron.variable} font-sans antialiased bg-black text-white relative min-h-screen`}>
        <SpaceEffect />
        <div className="relative z-10">
          <StickyNav />
          {children}
          <ScrollProgressButton />
        </div>
      </body>
    </html>
  );
}
