import type { Metadata } from "next";
import { Orbitron, Outfit } from "next/font/google";
import "./globals.css";
import StickyNav from "@/components/StickyNav";
import ScrollProgressButton from "@/components/ScrollProgressButton";
import SpaceEffect from "@/components/SpaceEffect";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Yang's Space",
  description: "hello world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" as="style" crossOrigin="" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css" />
      </head>
      <body className={`${orbitron.variable} ${outfit.variable} font-sans antialiased bg-black text-white relative min-h-screen`}>
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
