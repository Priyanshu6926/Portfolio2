'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Layers, Sparkles } from 'lucide-react';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const orbitItems = [
  { label: 'Frontend', value: 'React / Next.js', icon: Layers },
  { label: 'Backend', value: 'Node / APIs', icon: Cpu },
  { label: 'AI Assist', value: 'Gemini API', icon: Sparkles },
];

function seededValue(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function OrbitingSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const particles = useMemo(() => {
    const positions = new Float32Array(140 * 3);

    for (let i = 0; i < 140; i++) {
      const radius = 2.1 + seededValue(i + 1) * 1.1;
      const theta = seededValue(i + 101) * Math.PI * 2;
      const phi = Math.acos(2 * seededValue(i + 201) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.2;
      groupRef.current.rotation.x = Math.sin(elapsed * 0.28) * 0.12;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = elapsed * 0.45;
      innerRef.current.rotation.z = elapsed * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.45}>
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.15, 2]} />
          <meshStandardMaterial color="#67e8f9" metalness={0.6} roughness={0.22} transparent opacity={0.22} wireframe />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial color="#f8fafc" emissive="#0891b2" emissiveIntensity={0.55} metalness={0.45} roughness={0.18} />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.75, 0.012, 16, 160]} />
        <meshStandardMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0.45, 0.2]}>
        <torusGeometry args={[2.35, 0.01, 16, 180]} />
        <meshStandardMaterial color="#818cf8" emissive="#4338ca" emissiveIntensity={0.45} />
      </mesh>
      <mesh rotation={[Math.PI / 3, -0.35, 0.65]}>
        <torusGeometry args={[2.85, 0.008, 16, 180]} />
        <meshStandardMaterial color="#34d399" emissive="#047857" emissiveIntensity={0.35} />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#a5f3fc" size={0.025} sizeAttenuation transparent opacity={0.65} />
      </points>

      {[0, 1, 2].map((index) => {
        const angle = (Math.PI * 2 * index) / 3;
        return (
          <mesh key={index} position={[Math.cos(angle) * 1.75, Math.sin(angle) * 0.32, Math.sin(angle) * 1.75]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color={index === 0 ? '#22d3ee' : index === 1 ? '#818cf8' : '#34d399'} emissive="#0f172a" emissiveIntensity={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function PortfolioLab3D() {
  return (
    <section id="lab" className="relative overflow-hidden bg-[#02050b] px-6 py-24 text-white md:px-12 lg:px-24">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_50%_45%,black,transparent_72%)]" />
      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
        >
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.28em] text-cyan-300">Interactive Stack</p>
          <h2 className="mb-6 text-4xl font-black tracking-tight md:text-6xl">
            A practical build system, not just a visual portfolio.
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-400">
            This section shows the way I want recruiters to read the site: frontend craft, backend fundamentals,
            API integrations, and a clear habit of shipping working projects.
          </p>

          <div className="mt-8 grid gap-3">
            {orbitItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-gray-500">{item.label}</p>
                    <p className="font-semibold text-gray-100">{item.value}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-500" />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[380px] min-h-[380px] overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-2xl md:h-[520px]"
        >
          <Canvas camera={{ position: [0, 0.25, 6.2], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 4, 5]} intensity={1.25} />
            <pointLight position={[-3, -2, 3]} color="#22d3ee" intensity={18} />
            <OrbitingSystem />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.65} />
          </Canvas>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#02050b] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
