'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Globe } from 'lucide-react';
import Image from 'next/image';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'AI Interview Prep',
      category: 'MERN Stack / Gemini API',
      image: '/projects/ai_interview.png',
      liveLink: '#'
    },
    {
      id: 2,
      title: 'Travel and Tourism',
      category: 'MongoDB / HTML CSS',
      image: '/projects/travel_tourism.png',
      liveLink: '#'
    },
    {
      id: 3,
      title: 'Smart-Attendance System',
      category: 'Firebase / HTML CSS JS',
      image: '/projects/smart_attendance.png',
      liveLink: 'https://student-attendance001.netlify.app/'
    },
    {
      id: 4,
      title: 'Creative Portfolio',
      category: 'Frontend / Next.js / Framer Motion',
      image: '/projects/creative_portfolio.png',
      liveLink: '#'
    },
  ];

  return (
    <section id="projects" className="relative min-h-screen bg-black text-white py-32 px-6 md:px-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1)_0%,rgba(0,0,0,1)_100%)]" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            Selected Projects
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="group relative block aspect-[16/10] rounded-3xl overflow-hidden bg-white/5 border border-white/10"
            >
              {/* Project Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Live Badge */}
              <div className="absolute top-6 right-6 z-20">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase text-white group-hover:bg-purple-500/20 group-hover:border-purple-400/50 transition-all">
                  <Globe className="w-3 h-3" />
                  <span>Live Project</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </div>
              </div>

              {/* Project Info */}
              <div className="absolute inset-x-0 bottom-0 p-8 z-20">
                <p className="text-purple-400 mb-2 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                  {project.category}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-400 transition-all duration-300">
                  {project.title}
                </h3>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
