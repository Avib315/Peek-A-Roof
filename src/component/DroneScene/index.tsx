import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Environment, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import './style.scss';

// ── Propeller ──────────────────────────────────────────────────────────────
interface PropellerProps {
  position: [number, number, number];
  direction?: number;
}

const Propeller: React.FC<PropellerProps> = ({ position, direction = 1 }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.38 * direction;
  });

  return (
    <group position={position} ref={ref}>
      {/* Blade A — tapered for realism */}
      <mesh position={[0.11, 0, 0]}>
        <boxGeometry args={[0.22, 0.006, 0.04]} />
        <meshPhysicalMaterial
          color="#3a3a4a"
          metalness={0.7}
          roughness={0.25}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>
      <mesh position={[-0.11, 0, 0]}>
        <boxGeometry args={[0.22, 0.006, 0.04]} />
        <meshPhysicalMaterial
          color="#3a3a4a"
          metalness={0.7}
          roughness={0.25}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>
      {/* Blade B — cross */}
      <mesh position={[0, 0, 0.11]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.22, 0.006, 0.04]} />
        <meshPhysicalMaterial
          color="#3a3a4a"
          metalness={0.7}
          roughness={0.25}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0, -0.11]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.22, 0.006, 0.04]} />
        <meshPhysicalMaterial
          color="#3a3a4a"
          metalness={0.7}
          roughness={0.25}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>
      {/* Hub */}
      <mesh>
        <cylinderGeometry args={[0.022, 0.022, 0.018, 10]} />
        <meshPhysicalMaterial color="#111122" metalness={1} roughness={0.05} clearcoat={1} />
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
      ledRef.current.intensity = 0.8 + Math.sin(clock.getElapsedTime() * 3) * 0.4;
    }
  });

  return (
    <group rotation={[0, rotationY, 0]}>
      {/* Arm tube — tapered box */}
      <mesh position={[0.28, 0, 0]}>
        <boxGeometry args={[0.44, 0.018, 0.036]} />
        <meshPhysicalMaterial
          color="#1e2035"
          metalness={0.95}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
      {/* Motor housing */}
      <mesh position={[0.52, 0.02, 0]}>
        <cylinderGeometry args={[0.042, 0.036, 0.058, 14]} />
        <meshPhysicalMaterial
          color="#12121f"
          metalness={1}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
      {/* Motor top ring */}
      <mesh position={[0.52, 0.05, 0]}>
        <cylinderGeometry args={[0.044, 0.044, 0.008, 14]} />
        <meshPhysicalMaterial color="#4fc3f7" metalness={0.8} roughness={0.1} emissive="#4fc3f7" emissiveIntensity={0.4} />
      </mesh>
      {/* Propeller */}
      <Propeller position={[0.52, 0.065, 0]} direction={rotationY > 0 ? 1 : -1} />
      {/* LED dot */}
      <pointLight ref={ledRef} position={[0.52, 0.09, 0]} color={ledColor} intensity={0.8} distance={0.9} />
      <mesh position={[0.52, 0.072, 0]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshPhysicalMaterial color={ledColor} emissive={ledColor} emissiveIntensity={3} roughness={0} />
      </mesh>
    </group>
  );
};

// ── Camera Gimbal ───────────────────────────────────────────────────────────
const CameraGimbal: React.FC = () => {
  const gimbalRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (gimbalRef.current) {
      gimbalRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.06;
    }
  });

  return (
    <group position={[0, -0.068, 0.035]} ref={gimbalRef}>
      {/* Mount bracket */}
      <mesh>
        <boxGeometry args={[0.065, 0.025, 0.065]} />
        <meshPhysicalMaterial color="#14141f" metalness={0.95} roughness={0.1} clearcoat={1} />
      </mesh>
      {/* Lens barrel */}
      <mesh position={[0, 0, 0.042]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.026, 0.02, 0.032, 16]} />
        <meshPhysicalMaterial color="#080810" metalness={0.9} roughness={0.15} clearcoat={0.8} />
      </mesh>
      {/* Lens glass */}
      <mesh position={[0, 0, 0.059]}>
        <circleGeometry args={[0.017, 20]} />
        <meshPhysicalMaterial
          color="#1a3366"
          metalness={0.1}
          roughness={0.0}
          transparent
          opacity={0.9}
          clearcoat={1}
          clearcoatRoughness={0}
          transmission={0.3}
        />
      </mesh>
      {/* Lens reflection dot */}
      <mesh position={[0.004, 0.004, 0.0605]}>
        <circleGeometry args={[0.004, 8]} />
        <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} roughness={0} />
      </mesh>
    </group>
  );
};

// ── Body Glow Strip ─────────────────────────────────────────────────────────
const BodyGlowStrip: React.FC = () => {
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.4 + Math.sin(clock.getElapsedTime() * 1.5) * 0.2;
    }
  });

  return (
    <mesh position={[0, 0.028, 0]}>
      <boxGeometry args={[0.28, 0.006, 0.05]} />
      <meshPhysicalMaterial
        ref={matRef}
        color="#0077cc"
        emissive="#0055ff"
        emissiveIntensity={0.5}
        metalness={0.6}
        roughness={0.2}
        clearcoat={1}
      />
    </mesh>
  );
};

// ── Main Drone Model ────────────────────────────────────────────────────────
const DroneModel: React.FC = () => {
  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.45}>
      <group>
        {/* Top plate — RoundedBox for premium feel */}
        <RoundedBox args={[0.26, 0.038, 0.26]} radius={0.018} smoothness={4} position={[0, 0.022, 0]}>
          <meshPhysicalMaterial
            color="#0d1630"
            metalness={0.95}
            roughness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </RoundedBox>

        {/* Bottom plate */}
        <RoundedBox args={[0.2, 0.026, 0.2]} radius={0.012} smoothness={4} position={[0, -0.028, 0]}>
          <meshPhysicalMaterial
            color="#0a1a3e"
            metalness={0.9}
            roughness={0.1}
            clearcoat={0.8}
          />
        </RoundedBox>

        {/* Centre accent plate */}
        <RoundedBox args={[0.14, 0.01, 0.14]} radius={0.008} smoothness={4} position={[0, 0.044, 0]}>
          <meshPhysicalMaterial
            color="#1a2a50"
            metalness={0.85}
            roughness={0.12}
            clearcoat={1}
          />
        </RoundedBox>

        {/* Blue glowing strip */}
        <BodyGlowStrip />

        {/* 4 Arms at 45° */}
        <Arm rotationY={Math.PI / 4}      ledColor="#ff4444" />
        <Arm rotationY={-Math.PI / 4}     ledColor="#44ff44" />
        <Arm rotationY={3 * Math.PI / 4}  ledColor="#ff4444" />
        <Arm rotationY={-3 * Math.PI / 4} ledColor="#44ff44" />

        {/* Landing legs */}
        {([ [-0.08, 0, -0.08], [0.08, 0, -0.08], [-0.08, 0, 0.08], [0.08, 0, 0.08] ] as [number,number,number][]).map((pos, i) => (
          <mesh key={i} position={pos}>
            <cylinderGeometry args={[0.006, 0.006, 0.09, 6]} />
            <meshPhysicalMaterial color="#1e2035" metalness={0.9} roughness={0.15} clearcoat={0.6} />
          </mesh>
        ))}

        {/* Camera gimbal */}
        <CameraGimbal />

        {/* Ambient body glow */}
        <pointLight position={[0, 0.02, 0]} color="#0055ff" intensity={0.5} distance={1.4} />
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
  const isMini = variant === 'mini';

  return (
    <div className={`drone-canvas drone-canvas--${variant}`}>
      <Canvas
        camera={{ position: [0.6, 0.9, 2.0], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        shadows
      >
        <Suspense fallback={null}>
          {/* IBL — city environment for metallic reflections */}
          <Environment preset="city" />

          {/* Key light — warm from top-right */}
          <directionalLight position={[4, 7, 4]} intensity={1.4} color="#fff8f0" castShadow />
          {/* Fill light — cool blue from left */}
          <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#4488ff" />
          {/* Rim light — cyan from behind */}
          <directionalLight position={[0, 1, -5]} intensity={0.7} color="#4fc3f7" />
          {/* Soft ambient */}
          <ambientLight intensity={0.25} />

          {/* Stars — only hero/page */}
          {!isMini && (
            <Stars radius={60} depth={40} count={1400} factor={3} saturation={0.2} fade speed={0.4} />
          )}

          {/* Ground shadow — skip on mini for perf */}
          {!isMini && (
            <ContactShadows
              position={[0, -0.62, 0]}
              opacity={0.4}
              scale={3}
              blur={2.5}
              far={1.5}
              color="#0055ff"
            />
          )}

          {/* Drone */}
          <DroneModel />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={1.0}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default DroneScene;
