'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'React', level: 90 },
  { name: 'Next.js', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'MongoDB', level: 85 },
  { name: 'HTML/CSS', level: 95 },
  { name: 'Tailwind CSS', level: 90 },
  { name: 'Express', level: 80 },
  { name: 'Gemini API', level: 75 },
];

function SkillBar({ name, level, index }: { name: string, level: number, index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-6 md:mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-gray-200 font-medium tracking-wide">{name}</span>
        <span className="text-gray-400 text-sm font-mono">{level}%</span>
      </div>
      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 relative backdrop-blur-sm">
        <motion.div 
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }} // smooth easeOut
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 shadow-[0_0_20px_rgba(99,102,241,0.6)] rounded-full"
        >
          {/* Subtle animated highlight on the bar itself */}
          <div className="w-full h-full bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-black overflow-hidden border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(99,102,241,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-indigo-600/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="max-w-4xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A comprehensive overview of my technical expertise and proficiency across various modern web technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {skills.map((skill, index) => (
            <SkillBar 
              key={skill.name} 
              name={skill.name} 
              level={skill.level} 
              index={index} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
