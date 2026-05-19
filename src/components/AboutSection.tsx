'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

function Counter({ from, to, text, suffix = "", decimals = 0 }: { from: number, to: number, text: string, suffix?: string, decimals?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = value.toFixed(decimals) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, inView, suffix, decimals]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl"
    >
      <span ref={nodeRef} className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
        {from.toFixed(decimals)}{suffix}
      </span>
      <span className="mt-2 text-sm text-gray-400 uppercase tracking-widest font-medium text-center">{text}</span>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-[#02050b] overflow-hidden border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(167,139,250,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:100%_72px] opacity-70 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Me</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
              <p>
                Hello! I am a third-year B.Tech Information Technology student building practical full-stack projects with React,
                Next.js, Node.js, MongoDB, Firebase, and AI API integrations.
              </p>
              <p>
                I am currently looking for software development internship opportunities where I can contribute to real products,
                improve my engineering fundamentals, and keep learning from experienced teams.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Stats */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <Counter from={0} to={5} text="Completed Projects" suffix="+" />
            <Counter from={0} to={8.8} text="Current CGPA" suffix="/10" decimals={1} />
            <Counter from={0} to={1} text="Internship Experience" suffix="+" />
            <Counter from={0} to={10} text="Technologies Used" suffix="+" />
          </div>

        </div>
      </div>
    </section>
  );
}
