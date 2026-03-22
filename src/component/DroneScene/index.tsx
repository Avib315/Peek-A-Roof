import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import './style.scss';

// ── Propeller ──────────────────────────────────────────────────────────────
interface PropellerProps {
  position: [number, number, number];
  direction?: number; // 1 or -1 for spin direction
}

const Propeller: React.FC<PropellerProps> = ({ position, direction = 1 }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.35 * direction;
  });

  return (
    <group position={position} ref={ref}>
      {/* Blade A */}
      <mesh>
        <boxGeometry args={[0.42, 0.008, 0.07]} />
        <meshStandardMaterial color="#4a4a5a" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Blade B */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.42, 0.008, 0.07]} />
        <meshStandardMaterial color="#4a4a5a" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Hub */}
      <mesh>
        <cylinderGeometry args={[0.025, 0.025, 0.02, 8]} />
        <meshStandardMaterial color="#222233" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

// ── Arm ─────────────────────────────────────────────────────────────────────
interface ArmProps {
  rotationY: number;
  ledColor: string;
}

const Arm: React.FC<ArmProps> = ({ rotationY, ledColor }) => {
  const ledRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (ledRef.current) {
      ledRef.current.intensity = 0.6 + Math.sin(clock.getElapsedTime() * 3) * 0.3;
    }
  });

  return (
    <group rotation={[0, rotationY, 0]}>
      {/* Arm tube */}
      <mesh position={[0.32, 0, 0]}>
        <boxGeometry args={[0.52, 0.022, 0.045]} />
        <meshStandardMaterial color="#2a2a3a" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Motor housing */}
      <mesh position={[0.6, 0.025, 0]}>
        <cylinderGeometry args={[0.045, 0.04, 0.065, 12]} />
        <meshStandardMaterial color="#1a1a2a" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* Propeller */}
      <Propeller position={[0.6, 0.065, 0]} direction={rotationY > 0 ? 1 : -1} />
      {/* LED */}
      <pointLight ref={ledRef} position={[0.6, 0.08, 0]} color={ledColor} intensity={0.6} distance={0.8} />
      <mesh position={[0.6, 0.075, 0]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial color={ledColor} emissive={ledColor} emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

// ── Camera Gimbal ───────────────────────────────────────────────────────────
const CameraGimbal: React.FC = () => {
  const gimbalRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (gimbalRef.current) {
      gimbalRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.08;
    }
  });

  return (
    <group position={[0, -0.07, 0.04]} ref={gimbalRef}>
      {/* Gimbal mount */}
      <mesh>
        <boxGeometry args={[0.07, 0.03, 0.07]} />
        <meshStandardMaterial color="#1a1a2a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Camera lens */}
      <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.028, 0.022, 0.035, 16]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Lens glass */}
      <mesh position={[0, 0, 0.058]}>
        <circleGeometry args={[0.018, 16]} />
        <meshStandardMaterial color="#223366" metalness={0.2} roughness={0.05} transparent opacity={0.85} />
      </mesh>
    </group>
  );
};

// ── Main Drone Model ────────────────────────────────────────────────────────
const DroneModel: React.FC = () => {
  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
      <group>
        {/* Central body - top plate */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.28, 0.04, 0.28]} />
          <meshStandardMaterial color="#16213e" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Central body - bottom plate */}
        <mesh position={[0, -0.03, 0]}>
          <boxGeometry args={[0.22, 0.03, 0.22]} />
          <meshStandardMaterial color="#0f3460" metalness={0.85} roughness={0.15} />
        </mesh>
        {/* Body detail strip */}
        <mesh position={[0, 0.025, 0]}>
          <boxGeometry args={[0.3, 0.008, 0.06]} />
          <meshStandardMaterial color="#0077cc" metalness={0.7} roughness={0.2} emissive="#0033aa" emissiveIntensity={0.3} />
        </mesh>

        {/* 4 Arms at 45° */}
        <Arm rotationY={Math.PI / 4}    ledColor="#ff3333" />
        <Arm rotationY={-Math.PI / 4}   ledColor="#33ff33" />
        <Arm rotationY={3 * Math.PI / 4} ledColor="#ff3333" />
        <Arm rotationY={-3 * Math.PI / 4} ledColor="#33ff33" />

        {/* Landing legs */}
        {[[-0.09, 0, -0.09], [0.09, 0, -0.09], [-0.09, 0, 0.09], [0.09, 0, 0.09]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.007, 0.007, 0.1, 6]} />
            <meshStandardMaterial color="#2a2a3a" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}

        {/* Camera gimbal */}
        <CameraGimbal />

        {/* Body ambient glow */}
        <pointLight position={[0, 0, 0]} color="#0055ff" intensity={0.4} distance={1.2} />
      </group>
    </Float>
  );
};

// ── Scene ───────────────────────────────────────────────────────────────────
interface DroneSceneProps {
  variant?: 'hero' | 'page' | 'mini';
  autoRotate?: boolean;
}

const DroneScene: React.FC<DroneSceneProps> = ({ variant = 'hero', autoRotate = false }) => {
  return (
    <div className={`drone-canvas drone-canvas--${variant}`}>
      <Canvas
        camera={{ position: [0, 0.8, 2.4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" castShadow />
          <directionalLight position={[-5, 3, -3]} intensity={0.4} color="#4488ff" />
          <pointLight position={[0, 4, 0]} intensity={0.6} color="#ffffff" />

          {/* Stars background */}
          {variant !== 'mini' && (
            <Stars radius={60} depth={40} count={1200} factor={3} saturation={0.3} fade speed={0.5} />
          )}

          {/* Drone */}
          <DroneModel />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={1.2}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default DroneScene;
