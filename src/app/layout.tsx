import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Priyanshu Shingole | Full Stack Developer & Engineer",
  description: "Explore the portfolio of Priyanshu Shingole, a Full Stack Developer specializing in building high-performance web applications with React, Next.js, and AI integration.",
  keywords: ["Priyanshu Shingole", "Full Stack Developer", "Software Engineer", "React Developer", "Next.js Portfolio", "AI Integration"],
  authors: [{ name: "Priyanshu Shingole" }],
  openGraph: {
    title: "Priyanshu Shingole | Full Stack Developer",
    description: "Building responsive web apps and bridging design with AI.",
    url: "https://priyanshu-shingole.vercel.app/",
    siteName: "Priyanshu Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Priyanshu Shingole | Full Stack Developer",
    description: "Building responsive web apps and bridging design with AI.",
  },
};
import SmoothScrolling from "@/components/SmoothScrolling";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
