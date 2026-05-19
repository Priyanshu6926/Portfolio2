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
  metadataBase: new URL("https://priyanshu-shingole.vercel.app"),
  title: "Priyanshu Shingole | Full-Stack Developer Portfolio",
  description: "Portfolio of Priyanshu Shingole, a third-year B.Tech IT student building full-stack web projects with React, Next.js, Node.js, MongoDB, Firebase, and AI APIs.",
  keywords: ["Priyanshu Shingole", "Full Stack Developer", "Software Development Intern", "React Developer", "Next.js Portfolio", "MERN Stack"],
  authors: [{ name: "Priyanshu Shingole" }],
  openGraph: {
    title: "Priyanshu Shingole | Full-Stack Developer Portfolio",
    description: "Third-year B.Tech IT student building full-stack web projects and seeking software development internships.",
    url: "https://priyanshu-shingole.vercel.app/",
    siteName: "Priyanshu Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Priyanshu Shingole | Full-Stack Developer Portfolio",
    description: "Third-year B.Tech IT student building full-stack web projects and seeking software development internships.",
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
