'use client';

import { motion } from 'framer-motion';
import { Code2, Database, Server, Wrench } from 'lucide-react';

const skillGroups = [
  {
    title: 'Frontend',
    icon: Code2,
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: Server,
    items: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'API Integration'],
  },
  {
    title: 'Data & Cloud',
    icon: Database,
    items: ['MongoDB', 'Firebase', 'Netlify', 'Vercel', 'Deployment'],
  },
  {
    title: 'Tools & AI',
    icon: Wrench,
    items: ['Git', 'GitHub', 'Gemini API', 'EmailJS', 'Responsive Design'],
  },
];

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
            Tools I have used across projects, internships, and self-learning. I keep this section practical instead of rating myself with arbitrary percentages.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:border-cyan-400/30 transition-colors"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <group.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-white">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-gray-300">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
