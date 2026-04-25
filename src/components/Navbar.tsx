'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease',
        background: scrolled
          ? 'rgba(8, 8, 12, 0.72)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'blur(0px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.35)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {/* Logo / Name */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #ffffff 30%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            PS
          </motion.a>

          {/* Left-aligned Resume Link */}
          <div className="nav-resume-desktop">
            <NavLink href="https://drive.google.com/file/d/1iKHkdtJtBBlmJIuwQlSfZkx1dDDhQv3z/view?usp=share_link" label="Resume" external />
          </div>
        </div>

        {/* Desktop Links */}
        <ul
          style={{
            display: 'flex',
            gap: '2.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="nav-links-desktop"
        >
          {navLinks.map((link, i) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
            >
              <NavLink href={link.href} label={link.label} />
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.a
          href="mailto:priyanshushingole@gmail.com"
          whileHover={{ scale: 1.06, boxShadow: '0 0 28px rgba(167,139,250,0.45)' }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding: '0.5rem 1.4rem',
            borderRadius: '100px',
            border: '1.5px solid rgba(167,139,250,0.5)',
            background: 'rgba(167,139,250,0.1)',
            color: '#c4b5fd',
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.01em',
            textDecoration: 'none',
            transition: 'all 0.25s ease',
            cursor: 'pointer',
          }}
          className="nav-cta"
        >
          Hire Me
        </motion.a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
          className="nav-hamburger"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={
                menuOpen
                  ? i === 0
                    ? { rotate: 45, y: 7 }
                    : i === 1
                      ? { opacity: 0 }
                      : { rotate: -45, y: -7 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                borderRadius: '2px',
                background: '#ffffff',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          overflow: 'hidden',
          background: 'rgba(8, 8, 12, 0.92)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
        className="nav-mobile-menu"
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: '1rem 2rem 1.5rem' }}>
          {navLinks.map((link) => (
            <li key={link.label} style={{ padding: '0.65rem 0' }}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ padding: '0.65rem 0' }}>
            <a
              href="https://drive.google.com/file/d/1Qnf4ddBk_zCsfKEmu8M9Pk_NyAgP2rx3/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: 500,
                letterSpacing: '-0.01em',
              }}
            >
              Resume
            </a>
          </li>
          <li style={{ paddingTop: '1rem' }}>
            <a
              href="mailto:priyanshushingole@gmail.com"
              style={{
                display: 'inline-block',
                padding: '0.55rem 1.4rem',
                borderRadius: '100px',
                border: '1.5px solid rgba(167,139,250,0.5)',
                background: 'rgba(167,139,250,0.12)',
                color: '#c4b5fd',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Hire Me
            </a>
          </li>
        </ul>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-resume-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}

function NavLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        position: 'relative',
        color: 'rgba(255,255,255,0.75)',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: 500,
        letterSpacing: '0.01em',
        transition: 'color 0.2s ease',
        paddingBottom: '3px',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
        const line = e.currentTarget.querySelector('.nav-underline') as HTMLSpanElement;
        if (line) line.style.width = '100%';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)';
        const line = e.currentTarget.querySelector('.nav-underline') as HTMLSpanElement;
        if (line) line.style.width = '0%';
      }}
    >
      {label}
      <span
        className="nav-underline"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '0%',
          height: '1.5px',
          borderRadius: '1px',
          background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
          transition: 'width 0.25s ease',
          display: 'block',
        }}
      />
    </a>
  );
}
