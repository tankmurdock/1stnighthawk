import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const count = 3000;

  const [positions, basePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2 + Math.random() * 3;

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i3 + 2] = radius * Math.cos(phi) * 0.5;

      base[i3] = pos[i3];
      base[i3 + 1] = pos[i3 + 1];
      base[i3 + 2] = pos[i3 + 2];
    }

    return [pos, base];
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 0.5 + 0.1;
    }
    return s;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;

    const mx = (mousePosition.x / window.innerWidth - 0.5) * 2;
    const my = -(mousePosition.y / window.innerHeight - 0.5) * 2;

    const posArray = ref.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const speed = sizes[i] * 0.3;

      posArray[i3] = basePositions[i3] + Math.sin(time * speed + i) * 0.1 + mx * 0.3;
      posArray[i3 + 1] = basePositions[i3 + 1] + Math.cos(time * speed + i * 0.5) * 0.1 + my * 0.3;
      posArray[i3 + 2] = basePositions[i3 + 2] + Math.sin(time * speed * 0.5 + i * 0.3) * 0.05;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </points>
  );
}

function AccentParticles({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const ref = useRef<THREE.Points>(null);
  const count = 500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 10;
      pos[i3 + 1] = (Math.random() - 0.5) * 6;
      pos[i3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    const mx = (mousePosition.x / window.innerWidth - 0.5) * 0.5;
    const my = -(mousePosition.y / window.innerHeight - 0.5) * 0.5;

    ref.current.rotation.y = time * 0.01 + mx;
    ref.current.rotation.x = my * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#126b9f"
        size={0.008}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </points>
  );
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <fog attach="fog" args={["#070a20", 3, 12]} />
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#126b9f" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#38bdf8" />
      <ParticleField mousePosition={mousePosition} />
      <AccentParticles mousePosition={mousePosition} />
    </>
  );
}

interface Hero3DProps {
  mousePosition: { x: number; y: number };
}

export default function Hero3D({ mousePosition }: Hero3DProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
