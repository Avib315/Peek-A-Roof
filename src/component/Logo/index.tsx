import React from 'react';
import logo from "../../assets/images/PeekARoofLogo.png";
import './style.scss';

interface Props {
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<Props> = ({ width = "auto", height = "40px", className = "", onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`logo-container ${className}`} onClick={handleClick}>
      <img 
        width={width} 
        height={height} 
        src={logo} 
        alt="Peek A Roof Logo" 
        className="logo-image"
      />
    </div>
  );
};

export default Logo;