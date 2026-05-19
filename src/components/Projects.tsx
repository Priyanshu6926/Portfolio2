'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Globe } from 'lucide-react';
import Image from 'next/image';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'AI Interview Prep',
      category: 'MERN Stack / Gemini API',
      image: '/projects/ai_interview.png',
      summary: 'AI-powered interview preparation platform with mock sessions, practice modules, and progress tracking.',
      highlights: ['Built dashboard-focused user flows', 'Integrated Gemini API for AI feedback', 'Deployed frontend for public access'],
      liveLink: 'https://ai-neural-systems-client.vercel.app',
      repoLink: '',
      status: 'Live Project'
    },
    {
      id: 2,
      title: 'Travel and Tourism',
      category: 'MongoDB / HTML CSS',
      image: '/projects/travel_tourism.png',
      summary: 'Travel discovery website focused on destination browsing, package presentation, and inquiry-oriented UI.',
      highlights: ['Designed responsive landing pages', 'Structured destination and package content', 'Practiced MongoDB-backed data modeling'],
      liveLink: '',
      repoLink: '',
      status: 'Case Study'
    },
    {
      id: 3,
      title: 'Smart-Attendance System',
      category: 'Firebase / HTML CSS JS',
      image: '/projects/smart_attendance.png',
      summary: 'Attendance management app for tracking student presence with Firebase-backed storage.',
      highlights: ['Implemented attendance records UI', 'Connected Firebase data layer', 'Hosted the app on Netlify'],
      liveLink: 'https://student-attendance001.netlify.app/',
      repoLink: '',
      status: 'Live Project'
    },
    {
      id: 4,
      title: 'Creative Portfolio',
      category: 'Frontend / Next.js / Framer Motion',
      image: '/projects/creative_portfolio.png',
      summary: 'Personal portfolio built with Next.js, scroll-based animation, responsive sections, and contact workflow.',
      highlights: ['Built animated hero sequence', 'Created reusable portfolio sections', 'Added EmailJS contact form validation'],
      liveLink: '',
      repoLink: 'https://github.com/Priyanshu6926/Portfolio2',
      status: 'Current Site'
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
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="group relative min-h-[420px] rounded-2xl overflow-hidden bg-white/5 border border-white/10"
            >
              {/* Project Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-55 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/20" />
              </div>

              <div className="absolute top-6 right-6 z-20">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase text-white group-hover:bg-purple-500/20 group-hover:border-purple-400/50 transition-all">
                  <Globe className="w-3 h-3" />
                  <span>{project.status}</span>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-8 z-20">
                <p className="text-purple-400 mb-2 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                  {project.category}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4 max-w-xl">{project.summary}</p>
                <ul className="space-y-1.5 mb-6">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="text-sm text-gray-400 flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  {project.liveLink ? (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-sm font-bold hover:bg-cyan-200 transition-colors">
                      Live
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : null}
                  {project.repoLink ? (
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20 transition-colors">
                      Code
                      <Github className="w-4 h-4" />
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
