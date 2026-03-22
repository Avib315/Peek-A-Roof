import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./style.scss";
import Logo from "../Logo";
import { useTranslationStore } from "../../stores/useTranslationStore";
import { useThemeStore } from "../../stores/useThemeStore";
import { Menu, X, Sun, Moon } from "lucide-react";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { translations } = useTranslationStore();
  const { isDark, toggleTheme } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === "/";

  const navLinks = [
    ...(isHome
      ? [
          { label: translations.servicesNav, href: "#services" },
          { label: translations.gallery,     href: "#gallery" },
          { label: translations.aboutNav,    href: "#about" },
          { label: translations.reviewsNav,  href: "#reviews" },
          { label: translations.contact,     href: "#contact" },
        ]
      : [{ label: translations.home, href: "/" }]
    ),
    { label: translations.roofInspectionNav, href: "/roof-inspection" },
    { label: translations.realEstateNav,     href: "/real-estate" },
    { label: translations.mediaContentNav,   href: "/media-content" },
  ];

  return (
    <header className={`header ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>

      {/* Logo */}
      <Link to="/" className="logo">
        <Logo width="28" height="28" />
        <span>{translations.titleLogo}</span>
      </Link>

      {/* Desktop nav */}
      <nav className="header__nav">
        {navLinks.map((link) =>
          link.href.startsWith("#") ? (
            <a key={link.href} href={link.href}>{link.label}</a>
          ) : (
            <NavLink key={link.href} to={link.href} className={({ isActive }) => isActive ? "active" : ""}>{link.label}</NavLink>
          )
        )}
      </nav>

      {/* Right side actions */}
      <div className="header__actions">
        <button className="theme-btn" onClick={toggleTheme} title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {isHome && (
          <a href="#contact" className="contact-btn">{translations.getQuote}</a>
        )}
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
        {navLinks.map((link) =>
          link.href.startsWith("#") ? (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ) : (
            <NavLink key={link.href} to={link.href} onClick={() => setMenuOpen(false)}>{link.label}</NavLink>
          )
        )}
        {isHome && (
          <a href="#contact" className="mobile-menu__cta" onClick={() => setMenuOpen(false)}>
            {translations.getQuote}
          </a>
        )}
      </div>

    </header>
  );
};

export default Header;
