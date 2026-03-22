import { useEffect, useState, useRef } from 'react';
import DroneScene from '../DroneScene';
import './style.scss';

const DRONE_SIZE = 100; // px – rendered canvas size
const TOP_START  = 90;  // px from top  (just below header)
const SIDE_PAD   = 16;  // px from right edge

const FloatingDrone: React.FC = () => {
  const [left, setLeft]       = useState(0);
  const [top,  setTop]        = useState(TOP_START);
  const [bank, setBank]       = useState(0);
  const [pitch, setPitch]     = useState(0);
  const [visible, setVisible] = useState(false);

  const rafRef        = useRef<number>(0);
  const targetSY      = useRef(0);
  const smoothSY      = useRef(0);
  const yawRef        = useRef(0);

  useEffect(() => {
    // Fixed horizontal position on the right edge
    const fixedLeft = window.innerWidth - DRONE_SIZE - SIDE_PAD;
    setLeft(fixedLeft);
    setTop(TOP_START);
    setVisible(true);

    const onScroll = () => { targetSY.current = window.scrollY; };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      smoothSY.current = lerp(smoothSY.current, targetSY.current, 0.055);
      const sy = smoothSY.current;

      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const progress  = Math.min(1, Math.max(0, sy / maxScroll));

      // Straight vertical: top → bottom, fixed on right side
      const topEnd = window.innerHeight - DRONE_SIZE - SIDE_PAD;
      setLeft(window.innerWidth - DRONE_SIZE - SIDE_PAD);
      setTop( lerp(TOP_START, topEnd, progress));

      // Gentle hover tilt; yaw drives the 3D scene via ref
      setBank(  Math.sin(sy * 0.003) * 4);
      setPitch( Math.cos(sy * 0.002) * 3);
      yawRef.current = sy * 0.04;

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={`floating-drone ${visible ? 'floating-drone--visible' : ''}`}
      style={{
        left: `${left}px`,
        top:  `${top}px`,
        transform: `perspective(500px) rotateZ(${bank}deg) rotateX(${pitch}deg)`,
      }}
    >
      <DroneScene variant="mini" autoRotate={false} yawRef={yawRef} />
    </div>
  );
};

export default FloatingDrone;
