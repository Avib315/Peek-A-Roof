import { useEffect, useState, useRef } from 'react';
import DroneScene from '../DroneScene';
import './style.scss';

const DRONE_SIZE = 100; // px – rendered canvas size
const TOP_START  = 90;  // px from top  (just below header)
const SIDE_PAD   = 16;  // px from edges

const FloatingDrone: React.FC = () => {
  const [left, setLeft]       = useState(0);
  const [top,  setTop]        = useState(TOP_START);
  const [bank, setBank]       = useState(0);
  const [pitch, setPitch]     = useState(0);
  const [visible, setVisible] = useState(false);

  const rafRef        = useRef<number>(0);
  const targetSY      = useRef(0);
  const smoothSY      = useRef(0);

  useEffect(() => {
    // Initialise position immediately so there's no jump on first render
    setLeft(window.innerWidth - DRONE_SIZE - SIDE_PAD);
    setTop(TOP_START);
    setVisible(true); // visible from page load

    const onScroll = () => { targetSY.current = window.scrollY; };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      smoothSY.current = lerp(smoothSY.current, targetSY.current, 0.055);
      const sy = smoothSY.current;

      const maxScroll  = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const progress   = Math.min(1, Math.max(0, sy / maxScroll));

      // Diagonal: top-right → bottom-left
      const leftStart  = window.innerWidth - DRONE_SIZE - SIDE_PAD;
      const leftEnd    = SIDE_PAD;
      const topEnd     = window.innerHeight - DRONE_SIZE - SIDE_PAD;

      setLeft(lerp(leftStart,  leftEnd,  progress));
      setTop( lerp(TOP_START,  topEnd,   progress));

      // Tilt the drone as it "flies" — bank in direction of travel
      setBank(  Math.sin(sy * 0.004) * 12 - progress * 8); // slight persistent left-bank
      setPitch( Math.cos(sy * 0.003) * 6);

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
      <DroneScene variant="mini" autoRotate={false} />
      <div className="floating-drone__shadow" />
    </div>
  );
};

export default FloatingDrone;
