'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Github, Linkedin, Mail, Send, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');
  
  // Basic validation state
  const [errors, setErrors] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  const validateForm = () => {
    if (!formRef.current) return false;
    const formData = new FormData(formRef.current);
    const name = formData.get('user_name') as string;
    const email = formData.get('user_email') as string;
    const message = formData.get('message') as string;
    
    let isValid = true;
    const newErrors = { user_name: '', user_email: '', message: '' };

    if (!name.trim()) {
      newErrors.user_name = 'Name is required';
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.user_email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.user_email = 'Invalid email format';
      isValid = false;
    }
    if (!message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!formRef.current) return;

    setIsSending(true);
    setStatusMessage('');
    setStatusType('');

    emailjs.sendForm('service_081iz1c', 'template_cxomd3r', formRef.current, 'H1PCakZ2KrkjZx87G')
      .then(() => {
        setStatusMessage('Message sent successfully! I will get back to you soon.');
        setStatusType('success');
        formRef.current?.reset();
        setErrors({ user_name: '', user_email: '', message: '' });
      })
      .catch((error) => {
        setStatusMessage('Failed to send the message. Please try again or email me.');
        setStatusType('error');
        console.error('EmailJS error:', error);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section id="contact" className="w-full py-24 px-6 md:px-12 lg:px-24 bg-black relative border-t border-white/5 overflow-hidden pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.06)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2" />
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Connect</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start max-w-5xl mx-auto">

          {/* Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group/card">
              {/* Internal decorative glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-[60px] rounded-full group-hover/card:bg-indigo-500/20 transition-colors duration-500" />
              
              <h3 className="text-2xl font-bold text-white mb-8 relative z-10">Contact Information</h3>
              
              <div className="space-y-4 relative z-10">
                <a href="mailto:priyanshushingole@gmail.com" className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1 font-bold">Email</p>
                    <span className="text-lg font-medium text-white group-hover/item:text-indigo-400 transition-colors">Gmail</span>
                  </div>
                </a>

                <a href="tel:+917767818182" className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1 font-bold">Phone</p>
                    <span className="text-lg font-medium text-white group-hover/item:text-green-400 transition-colors">+91 7767818182</span>
                  </div>
                </a>

                <a href="https://github.com/Priyanshu6926" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1 font-bold">GitHub</p>
                    <span className="text-lg font-medium text-white group-hover/item:text-indigo-400 transition-colors">Priyanshu6926</span>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/priyanshu-shingole-32a82a296" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                    <Linkedin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1 font-bold">LinkedIn</p>
                    <span className="text-lg font-medium text-white group-hover/item:text-blue-400 transition-colors">Priyanshu Shingole</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6" noValidate>
              <div>
                <label htmlFor="user_name" className="block text-sm font-medium text-gray-400 mb-2">Build Together</label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  placeholder="Your Name"
                  className={`w-full bg-white/5 border ${errors.user_name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                />
                {errors.user_name && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.user_name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email Address"
                  className={`w-full bg-white/5 border ${errors.user_email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                />
                {errors.user_email && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.user_email}</p>}
              </div>

              <div>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your Message"
                  className={`w-full bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none`}
                />
                {errors.message && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
              </div>

              {statusMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-sm flex items-center gap-3 ${statusType === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                >
                  {statusType === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  {statusMessage}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 px-8 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-[0_0_20px_rgba(99,102,241,0.3)]"
              >
                {isSending ? 'Sending...' : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
