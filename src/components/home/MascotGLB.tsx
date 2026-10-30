"use client";
// Optional: real 3D model. Put your exported file at public/models/mascot.glb,
// then in Hero.tsx swap <MascotImage /> for <MascotGLB />.
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

type P = React.RefObject<{ x: number; y: number }>;

function Model({ pointer }: { pointer: P }) {
  const { scene } = useGLTF("/models/mascot.glb");
  const g = useRef<THREE.Group>(null!);
  useFrame((s, dt) => {
    const { x, y } = pointer.current;
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, x * 0.6, 5, dt);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, -y * 0.25, 5, dt);
    g.current.position.y = Math.sin(s.clock.elapsedTime * 1.6) * 0.05;
  });
  return <group ref={g}><primitive object={scene} /></group>;
}

export default function MascotGLB() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const on = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / innerHeight) * 2 - 1);
    };
    addEventListener("pointermove", on);
    return () => removeEventListener("pointermove", on);
  }, []);
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.6, 4.5], fov: 35 }} gl={{ alpha: true }}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <directionalLight position={[-4, 2, -3]} intensity={1.2} color="#5ee0ff" />
      <Suspense fallback={null}><Model pointer={pointer} /></Suspense>
    </Canvas>
  );
}
