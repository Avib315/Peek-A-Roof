import { useEffect, useState, useRef } from 'react';
import DroneScene from '../DroneScene';
import './style.scss';

const FloatingDrone: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const targetScrollY = useRef(0);
  const smoothScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      targetScrollY.current = window.scrollY;
      setVisible(window.scrollY > window.innerHeight * 0.35);
    };

    // Smooth lerp loop for the transform
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      smoothScrollY.current = lerp(smoothScrollY.current, targetScrollY.current, 0.06);
      setScrollY(smoothScrollY.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Banking / pitch from smoothed scroll
  const bank  = Math.sin(scrollY * 0.005) * 14;
  const pitch = Math.cos(scrollY * 0.004) * 7;
  const lift  = Math.sin(scrollY * 0.006) * 8;

  return (
    <div
      className={`floating-drone ${visible ? 'floating-drone--visible' : ''}`}
      style={{
        transform: `perspective(500px) rotateZ(${bank}deg) rotateX(${pitch}deg) translateY(${lift}px)`,
      }}
    >
      <DroneScene variant="mini" autoRotate={false} />
      <div className="floating-drone__shadow" />
    </div>
  );
};

export default FloatingDrone;
