'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTexture, Float, ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function CardMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Load textures
  const [frontTexture, backTexture] = useTexture([
    '/id-front.png',
    '/id-back.png'
  ]);
  
  // To ensure the back texture isn't flipped horizontally
  backTexture.center.set(0.5, 0.5);
  backTexture.rotation = Math.PI;

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3.2, 4.8, 0.05]} />
        {/* Array of materials for each face of the box [right, left, top, bottom, front, back] */}
        <meshStandardMaterial attach="material-0" color="#222" roughness={0.4} metalness={0.5} />
        <meshStandardMaterial attach="material-1" color="#222" roughness={0.4} metalness={0.5} />
        <meshStandardMaterial attach="material-2" color="#222" roughness={0.4} metalness={0.5} />
        <meshStandardMaterial attach="material-3" color="#222" roughness={0.4} metalness={0.5} />
        <meshStandardMaterial attach="material-4" map={frontTexture} roughness={0.2} metalness={0.3} />
        <meshStandardMaterial attach="material-5" map={backTexture} roughness={0.2} metalness={0.3} />
      </mesh>
    </Float>
  );
}

export default function IDCard3D() {
  return (
    <div className="relative h-[500px] w-full lg:h-[600px] interactive">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <CardMesh />
          
          <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={2.5} 
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>
      
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[100px]" />
    </div>
  );
}
