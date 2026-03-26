import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import StickyNav from "@/components/StickyNav";
import ScrollProgressButton from "@/components/ScrollProgressButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

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
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-black text-white`}>
        <StickyNav />
        {children}
        <ScrollProgressButton />
      </body>
    </html>
  );
}
