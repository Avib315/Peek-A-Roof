import React from 'react';
import './style.scss';

interface Props {
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
}

// Aaron Aerial — top-down drone SVG mark
const AaronAerialLogo: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Aaron Aerial"
  >
    {/* ── Arms (4 diagonal) ─────────────────────────── */}
    <line x1="32" y1="32" x2="13" y2="13" stroke="#4fc3f7" strokeWidth="3" strokeLinecap="round" />
    <line x1="32" y1="32" x2="51" y2="13" stroke="#4fc3f7" strokeWidth="3" strokeLinecap="round" />
    <line x1="32" y1="32" x2="13" y2="51" stroke="#4fc3f7" strokeWidth="3" strokeLinecap="round" />
    <line x1="32" y1="32" x2="51" y2="51" stroke="#4fc3f7" strokeWidth="3" strokeLinecap="round" />

    {/* ── Propeller rings (4 corners) ───────────────── */}
    <circle cx="10" cy="10" r="7"  stroke="#4fc3f7" strokeWidth="2" fill="rgba(79,195,247,0.08)" />
    <circle cx="54" cy="10" r="7"  stroke="#4fc3f7" strokeWidth="2" fill="rgba(79,195,247,0.08)" />
    <circle cx="10" cy="54" r="7"  stroke="#4fc3f7" strokeWidth="2" fill="rgba(79,195,247,0.08)" />
    <circle cx="54" cy="54" r="7"  stroke="#4fc3f7" strokeWidth="2" fill="rgba(79,195,247,0.08)" />

    {/* ── Propeller blades (crosses inside each ring) ─ */}
    <line x1="7"  y1="10" x2="13" y2="10" stroke="#4fc3f7" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="7"  x2="10" y2="13" stroke="#4fc3f7" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="51" y1="10" x2="57" y2="10" stroke="#4fc3f7" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="54" y1="7"  x2="54" y2="13" stroke="#4fc3f7" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="7"  y1="54" x2="13" y2="54" stroke="#4fc3f7" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="51" x2="10" y2="57" stroke="#4fc3f7" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="51" y1="54" x2="57" y2="54" stroke="#4fc3f7" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="54" y1="51" x2="54" y2="57" stroke="#4fc3f7" strokeWidth="1.5" strokeLinecap="round" />

    {/* ── Central body ──────────────────────────────── */}
    <rect x="24" y="24" width="16" height="16" rx="3" fill="#0d1630" stroke="#4fc3f7" strokeWidth="1.5" />

    {/* ── Camera lens dot ───────────────────────────── */}
    <circle cx="32" cy="32" r="3.5" fill="#4fc3f7" opacity="0.9" />
    <circle cx="32" cy="32" r="1.5" fill="#0d1630" />

    {/* ── Glow dot centre ───────────────────────────── */}
    <circle cx="32" cy="32" r="0.8" fill="#4fc3f7" />
  </svg>
);

const Logo: React.FC<Props> = ({ width = "40", height = "40", className = "", onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const size = parseInt(width || height || "40", 10);

  return (
    <div className={`logo-container ${className}`} onClick={handleClick}>
      <AaronAerialLogo size={size} />
    </div>
  );
};

export default Logo;
