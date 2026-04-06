'use client';

import { motion } from 'framer-motion';

const education = [
    { 
    degree: 'Secondry School (SSC)', 
    institution: 'New Ideal School,Vasind', 
    year: '2021', 
    grade: 'A',
    icon: '🎓'
  },
  { 
    degree: 'Higher Secondry Board (HSC)', 
    institution: 'Royal Junior College,Dombivli', 
    year: '2021 - 2023', 
    grade: 'B+',
    icon: '🎓'
  },
  { 
    degree: 'Bachelor of Technology in Information Technology', 
    institution: 'KJ Somaiya School of Engineering, Vidyavihar', 
    year: '2023 - 2027',  
    cgpa: '8.8/10',
    icon: '📚'
  }
];

const certifications = [
  'Gemini API by Google',
  'AWS Certified Solutions Architect',
  'Meta Front-End Developer',
  'MongoDB Data Modeling Professional'
];

export default function EducationSection() {
  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-black border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Certifications</span>
          </h2>
          <p className="text-gray-400">My academic background and professional credentials.</p>
        </motion.div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="p-8 bg-gradient-to-br from-white/5 to-transparent rounded-3xl border border-white/10 backdrop-blur-sm relative overflow-hidden group hover:border-indigo-500/50 transition-colors duration-500"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-2 bg-indigo-500/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4">{edu.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                <h4 className="text-indigo-400 text-lg mb-6">{edu.institution}</h4>
                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                  <span className="text-gray-400 font-mono text-sm bg-white/5 px-3 py-1 rounded-full">{edu.year}</span>
                  <span className="text-cyan-400 font-bold">{edu.cgpa ? `CGPA: ${edu.cgpa}` : `Grade: ${edu.grade}`}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:border-indigo-400/50 cursor-pointer transition-all duration-300 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              <span className="text-gray-200 font-medium">{cert}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
