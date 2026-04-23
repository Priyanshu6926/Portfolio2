'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'Bluestock Fintech',
    role: 'Web Developer Intern',
    duration: 'Feb 2026 - Present',
    description: 'Contributed to the core trading dashboard. Integrated real-time stock APIs and implemented secure user authentication flows. Enhanced the frontend architecture for high-frequency data updates.',
    icon: '🚀'
  },
  {
    company: '@ In-House AI Project',
    role: 'Computer Vision Engineer',
    duration: 'Jan 2026 - April 2026',
    description: 'Developing an AI-driven Interview Preparation Platform. Using Gemini API and various computer vision models.',
    icon: '🎨'
  },
  {
    company: 'StartUp Inc',
    role: 'Junior Developer',
    duration: '2022 - 2023',
    description: 'Assisted in building REST APIs using Node.js and Express. Maintained and debugged legacy codebase, while improving test coverage to 85%.',
    icon: '💻'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
  }
};

export default function ExperienceSection() {
  return (
    <section id="work" className="w-full py-24 px-6 md:px-12 lg:px-24 bg-black relative border-t border-white/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.03)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Experience</span>
          </h2>
          <p className="text-gray-400">My journey and professional timeline.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Central Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-cyan-500/50 to-transparent md:-translate-x-1/2" />

          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row items-center mb-16 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >

                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-10 h-10 rounded-full bg-black border-2 border-indigo-400 transform -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  <span className="text-sm">{exp.icon}</span>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                    <span className="inline-block px-3 py-1 mb-4 text-sm font-mono text-cyan-400 bg-cyan-400/10 rounded-full">
                      {exp.duration}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                    <h4 className="text-indigo-400 text-lg mb-4">{exp.company}</h4>
                    <p className="text-gray-400 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
