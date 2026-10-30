"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type P = React.RefObject<{ x: number; y: number }>;
const FUR = "#9185f2", DARK = "#6a5cd6", LIGHT = "#ddd8ff", CYAN = "#5ee0ff", VIOLET = "#c04bff";
const damp = THREE.MathUtils.damp;

function Eye({ x, pointer }: { x: number; pointer: P }) {
  const g = useRef<THREE.Group>(null!);
  useFrame(() => g.current.position.set(pointer.current.x * 0.05, pointer.current.y * 0.045, 0.12));
  return (
    <group position={[x, 0.1, 0.8]}>
      <mesh scale={[1, 1.15, 0.8]}><sphereGeometry args={[0.2, 32, 32]} /><meshStandardMaterial color="#fff" roughness={0.3} /></mesh>
      <group ref={g}>
        <mesh scale={[1, 1, 0.4]}><sphereGeometry args={[0.13, 24, 24]} /><meshStandardMaterial color="#5b3fd1" /></mesh>
        <mesh position={[0, 0, 0.04]}><sphereGeometry args={[0.07, 16, 16]} /><meshStandardMaterial color="#10061f" /></mesh>
        <mesh position={[0.04, 0.05, 0.1]}><sphereGeometry args={[0.03, 12, 12]} /><meshBasicMaterial color="#fff" /></mesh>
      </group>
    </group>
  );
}

function Ear({ s }: { s: 1 | -1 }) {
  return (
    <group position={[0.62 * s, 0.82, 0]} rotation={[0, 0, -0.28 * s]}>
      <mesh><coneGeometry args={[0.4, 0.85, 24]} /><meshStandardMaterial color={DARK} roughness={1} /></mesh>
      <mesh position={[0, -0.05, 0.1]} scale={0.7}><coneGeometry args={[0.4, 0.85, 24]} /><meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={0.9} /></mesh>
    </group>
  );
}

function Fox({ pointer }: { pointer: P }) {
  const root = useRef<THREE.Group>(null!), head = useRef<THREE.Group>(null!), tail = useRef<THREE.Group>(null!);
  useFrame((s, dt) => {
    const t = s.clock.elapsedTime, { x, y } = pointer.current;
    head.current.rotation.y = damp(head.current.rotation.y, x * 0.75, 6, dt);
    head.current.rotation.x = damp(head.current.rotation.x, -y * 0.45, 6, dt);
    root.current.rotation.y = damp(root.current.rotation.y, x * 0.3, 4, dt);
    root.current.position.y = Math.sin(t * 1.6) * 0.07;
    tail.current.rotation.z = -0.35 + Math.sin(t * 2.2) * 0.14 + x * 0.15;
  });
  const fur = <meshStandardMaterial color={FUR} roughness={1} />;
  return (
    <group ref={root} position={[0, -0.2, 0]}>
      <mesh position={[0, -0.95, 0]} scale={[1, 1.15, 0.9]}><sphereGeometry args={[0.9, 40, 40]} />{fur}</mesh>
      <mesh position={[0, -0.95, 0.5]} scale={[0.65, 0.85, 0.4]}><sphereGeometry args={[0.9, 32, 32]} /><meshStandardMaterial color={LIGHT} roughness={1} /></mesh>
      {[-0.42, 0.42].map((x) => (
        <mesh key={x} position={[x, -1.85, 0.45]} scale={[1, 0.6, 1.3]}><sphereGeometry args={[0.28, 24, 24]} /><meshStandardMaterial color={DARK} roughness={1} /></mesh>
      ))}
      {/* holographic map */}
      <mesh position={[0, -0.8, 0.98]} rotation={[-0.2, 0, 0]}><boxGeometry args={[1.15, 0.8, 0.03]} /><meshStandardMaterial color="#bfe3ff" emissive="#4f9dff" emissiveIntensity={0.6} transparent opacity={0.92} /></mesh>
      {[-0.62, 0.62].map((x) => (
        <mesh key={x} position={[x, -0.8, 0.95]}><sphereGeometry args={[0.17, 20, 20]} /><meshStandardMaterial color={DARK} roughness={1} /></mesh>
      ))}
      <group ref={head} position={[0, 0.55, 0]}>
        <mesh scale={[1.1, 0.95, 1]}><sphereGeometry args={[0.95, 48, 48]} />{fur}</mesh>
        <mesh position={[0, -0.28, 0.78]} scale={[1, 0.75, 0.8]}><sphereGeometry args={[0.4, 32, 32]} /><meshStandardMaterial color={LIGHT} roughness={1} /></mesh>
        <mesh position={[0, -0.14, 1.12]}><sphereGeometry args={[0.08, 16, 16]} /><meshStandardMaterial color="#1a0d2e" roughness={0.4} /></mesh>
        <Ear s={1} /><Ear s={-1} />
        <Eye x={-0.34} pointer={pointer} /><Eye x={0.34} pointer={pointer} />
      </group>
      <group ref={tail} position={[0.7, -1.4, -0.5]}>
        <mesh position={[0.55, 0.75, 0]} scale={[0.55, 1.25, 0.55]}><sphereGeometry args={[0.8, 32, 32]} />{fur}</mesh>
        <mesh position={[0.95, 0.55, 0.1]} rotation={[0, 0, -0.35]}><capsuleGeometry args={[0.07, 0.7, 8, 16]} /><meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.2} /></mesh>
      </group>
    </group>
  );
}

export default function Mascot3D() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const on = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / innerHeight) * 2 - 1);
    };
    addEventListener("pointermove", on);
    return () => removeEventListener("pointermove", on);
  }, []);
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6.2], fov: 34 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} />
      <directionalLight position={[-4, 2, -3]} intensity={1.6} color={CYAN} />
      <pointLight position={[-3, 1, 3]} intensity={25} color={VIOLET} />
      <Fox pointer={pointer} />
    </Canvas>
  );
}
