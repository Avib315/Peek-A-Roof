import React, { useState, useEffect } from "react";
import "./style.scss";
import Logo from "../Logo";
import { useTranslationStore } from "../../stores/useTranslationStore";

interface Props {
 
}

const Header: React.FC<Props> = ({  }) => {
  const [scrolled, setScrolled] = useState(false);
  const { translations, isEnglish } = useTranslationStore();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      
      <div className="logo"> <Logo width="50" height="50"/> {translations.titleLogo}</div>

      <nav>
        <a href="#home">{translations.home}</a>
        <a href="#gallery">{translations.gallery}</a>
        <a href="#contact">{translations.contact}</a>
      </nav>

 
    </header>
  );
};

export default Header;