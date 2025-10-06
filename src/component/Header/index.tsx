import React, { useState, useEffect } from "react";
import "./style.scss";
import Logo from "../Logo";

interface Props {
  isEnglish?: boolean;
}

const Header: React.FC<Props> = ({ isEnglish = true }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      
      <div className="logo"> <Logo width="50" height="50"/> Peek A Roof</div>

      <nav>
        <a href="#home">{isEnglish ? "Home" : "בית"}</a>
        <a href="#gallery">{isEnglish ? "Gallery" : "גלריה"}</a>
        <a href="#contact">{isEnglish ? "Contact" : "צור קשר"}</a>
      </nav>

 
    </header>
  );
};

export default Header;