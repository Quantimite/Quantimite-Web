"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const damp = THREE.MathUtils.damp;
const lerp = THREE.MathUtils.lerp;

// Brand colors
const VIOLET = "#a818f5";
const AZURE = "#2f8bfa";
const PLUM = "#2a1340";
const CYAN = "#5ee0ff";

interface SceneProps {
  scrollRef: React.RefObject<number>;
  pointerRef: React.RefObject<{ x: number; y: number }>;
}

function FloatingFragments({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const count = 36;
  const meshRefs = useRef<THREE.Mesh[]>([]);

  // Seeded positions
  const fragments = useRef(
    Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.4 + (i % 5) * 0.6;
      return {
        x: Math.cos(angle) * radius + ((i % 3) - 1) * 0.4,
        y: ((i % 7) - 3) * 0.9,
        z: Math.sin(angle) * radius * 0.5 - 1.0,
        rotSpeed: 0.2 + (i % 4) * 0.15,
        scale: 0.08 + (i % 3) * 0.06,
        color: i % 2 === 0 ? VIOLET : AZURE,
      };
    })
  ).current;

  useFrame((state, delta) => {
    const scroll = scrollRef.current || 0;
    const time = state.clock.elapsedTime;

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const f = fragments[i];

      // Scroll-driven dispersal: fragments expand outward as scroll increases
      const expand = 1 + scroll * 1.5;
      mesh.position.x = f.x * expand + Math.sin(time * 0.5 + i) * 0.15;
      mesh.position.y = f.y - scroll * 4.0 + Math.cos(time * 0.6 + i) * 0.15;
      mesh.position.z = f.z * expand + Math.sin(time * 0.4 + i) * 0.2;

      mesh.rotation.x += delta * f.rotSpeed;
      mesh.rotation.y += delta * f.rotSpeed * 1.2;
    });
  });

  return (
    <group>
      {fragments.map((f, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshRefs.current[i] = el;
          }}
          scale={f.scale}
          position={[f.x, f.y, f.z]}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={f.color}
            emissive={f.color}
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrbitalRings({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const scroll = scrollRef.current || 0;
    const time = state.clock.elapsedTime;

    // Rings rotate on varying axes and tilt with scroll
    ring1.current.rotation.x = time * 0.4 + scroll * Math.PI;
    ring1.current.rotation.y = time * 0.25;

    ring2.current.rotation.y = time * 0.35 + scroll * Math.PI * 1.5;
    ring2.current.rotation.z = time * 0.2;

    ring3.current.rotation.z = time * 0.3 - scroll * Math.PI * 0.8;
    ring3.current.rotation.x = time * 0.15;

    // Expansion effect on scroll
    const scaleFactor = 1 + Math.sin(scroll * Math.PI) * 0.4;
    ring1.current.scale.setScalar(scaleFactor);
    ring2.current.scale.setScalar(scaleFactor * 1.15);
    ring3.current.scale.setScalar(scaleFactor * 1.3);
  });

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[2.0, 0.02, 16, 90]} />
        <meshStandardMaterial
          color={VIOLET}
          emissive={VIOLET}
          emissiveIntensity={0.8}
          roughness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh ref={ring2}>
        <torusGeometry args={[2.4, 0.015, 16, 90]} />
        <meshStandardMaterial
          color={AZURE}
          emissive={AZURE}
          emissiveIntensity={0.7}
          roughness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh ref={ring3}>
        <torusGeometry args={[2.8, 0.012, 16, 90]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.9}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

function QuantumMonolithCore({ scrollRef, pointerRef }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const outerIcosa = useRef<THREE.Mesh>(null!);
  const innerCore = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);

  const smoothScroll = useRef(0);

  useFrame((state, delta) => {
    const rawScroll = scrollRef.current || 0;
    const time = state.clock.elapsedTime;
    const { x, y } = pointerRef.current || { x: 0, y: 0 };

    // Butter smooth dampening for scroll
    smoothScroll.current = damp(smoothScroll.current, rawScroll, 5, delta);
    const s = smoothScroll.current;

    // Scroll-driven position path:
    // Hero (s=0): right side of screen
    // Mid-scroll (s=0.5): glides towards left/center backdrop
    // End (s=1): centers and sinks slightly
    const targetX = lerp(1.8, -1.5, s) + x * 0.4;
    const targetY = lerp(0.3, -0.6, s) + y * 0.3 + Math.sin(time * 1.2) * 0.1;
    const targetZ = lerp(0.0, -1.8, s);

    groupRef.current.position.x = damp(groupRef.current.position.x, targetX, 4, delta);
    groupRef.current.position.y = damp(groupRef.current.position.y, targetY, 4, delta);
    groupRef.current.position.z = damp(groupRef.current.position.z, targetZ, 4, delta);

    // Scroll-driven rotation: spins progressively faster on scroll down
    outerIcosa.current.rotation.x = time * 0.3 + s * Math.PI * 3.5;
    outerIcosa.current.rotation.y = time * 0.45 + s * Math.PI * 4.0;
    outerIcosa.current.rotation.z = Math.sin(s * Math.PI * 2) * 0.5;

    // Inner core pulses
    const pulse = 1 + Math.sin(time * 3.0) * 0.08 + s * 0.2;
    innerCore.current.scale.setScalar(pulse);

    // Dynamic light color transition: Violet at top -> Azure/Cyan at bottom
    if (lightRef.current) {
      const colorViolet = new THREE.Color(VIOLET);
      const colorAzure = new THREE.Color(AZURE);
      lightRef.current.color.lerpColors(colorViolet, colorAzure, s);
      lightRef.current.intensity = 15 + Math.sin(time * 4) * 4 + s * 10;
    }
  });

  return (
    <group ref={groupRef} position={[1.8, 0.3, 0]}>
      {/* Outer Crystalline Monolith */}
      <mesh ref={outerIcosa}>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshPhysicalMaterial
          color="#f6f4ff"
          emissive={VIOLET}
          emissiveIntensity={0.25}
          roughness={0.15}
          metalness={0.1}
          transmission={0.65}
          thickness={1.2}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Wireframe Facet Overlay */}
      <mesh scale={1.305} rotation={[0.2, 0.4, 0]}>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.35} />
      </mesh>

      {/* Inner Glowing Quantum Core */}
      <mesh ref={innerCore} scale={0.55}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#fff"
          emissive={VIOLET}
          emissiveIntensity={1.8}
          roughness={0.1}
        />
      </mesh>

      {/* Center Quantum Glow Light */}
      <pointLight ref={lightRef} intensity={18} distance={7} color={VIOLET} />

      {/* Concentric Gyroscope Rings */}
      <OrbitalRings scrollRef={scrollRef} />

      {/* Constellation of Floating Architectural Fragments */}
      <FloatingFragments scrollRef={scrollRef} />
    </group>
  );
}

export default function InsightsScrollCanvas() {
  const scrollRef = useRef<number>(0);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const onScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollRef.current = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 5, 5]} intensity={1.5} color="#fff" />
        <directionalLight position={[-4, -3, -2]} intensity={1.2} color={AZURE} />
        <QuantumMonolithCore scrollRef={scrollRef} pointerRef={pointerRef} />
      </Canvas>
    </div>
  );
}
