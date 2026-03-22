import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./style.scss";
import Logo from "../Logo";
import { useTranslationStore } from "../../stores/useTranslationStore";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { translations, toggleLanguage, isEnglish } = useTranslationStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === "/";

  return (
    <header className={`header ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>

      {/* Logo */}
      <Link to="/" className="logo">
        <Logo width="44" height="44" />
        <span>{translations.titleLogo}</span>
      </Link>

      {/* Desktop nav */}
      <nav className="header__nav">
        <NavLink to="/"                className={({ isActive }) => isActive ? "active" : ""}>
          {translations.home}
        </NavLink>
        <NavLink to="/real-estate"     className={({ isActive }) => isActive ? "active" : ""}>
          {translations.realEstateNav}
        </NavLink>
        <NavLink to="/roof-inspection" className={({ isActive }) => isActive ? "active" : ""}>
          {translations.roofInspectionNav}
        </NavLink>
        <NavLink to="/media-content"   className={({ isActive }) => isActive ? "active" : ""}>
          {translations.mediaContentNav}
        </NavLink>
        {isHome && (
          <a href="#contact">{translations.contact}</a>
        )}
      </nav>

      {/* Right side actions */}
      <div className="header__actions">
        <button className="lang-btn" onClick={toggleLanguage} title="Switch language">
          {isEnglish ? "עב" : "EN"}
        </button>
        {isHome && (
          <a href="#contact" className="contact-btn">{translations.getQuote}</a>
        )}
        {/* Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <NavLink to="/"                end onClick={() => setMenuOpen(false)}>{translations.home}</NavLink>
        <NavLink to="/real-estate"         onClick={() => setMenuOpen(false)}>{translations.realEstateNav}</NavLink>
        <NavLink to="/roof-inspection"     onClick={() => setMenuOpen(false)}>{translations.roofInspectionNav}</NavLink>
        <NavLink to="/media-content"       onClick={() => setMenuOpen(false)}>{translations.mediaContentNav}</NavLink>
        {isHome && (
          <a href="#contact" onClick={() => setMenuOpen(false)}>{translations.contact}</a>
        )}
      </div>

    </header>
  );
};

export default Header;
