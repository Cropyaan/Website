import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, Menu, X, LogOut, ChevronDown, Languages } from "lucide-react";
import logo from "../assets/newlogscrops.png";
import { useAuth } from "../context/AuthContext";
import "../cssPages/Navbar.css"; 

const LANGUAGES = {
  en: "English", hi: "हिंदी", te: "తెలుగు", mr: "मराठी", kn: "ಕನ್ನಡ", ta: "தமிழ்",
};

export default function Navbar({ theme, setTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const lastScrollY = useRef(0);
  const dropdownRef = useRef(null);
  const langRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const firstName = user?.name?.split(" ")[0] ?? "";

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/services", label: t("nav.services") },
    { to: "/how-it-works", label: t("nav.how") },
    { to: "/weather-advisory", label: t("nav.weather") },
    { to: "/crop-recommendation", label: t("nav.crop") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Show ONLY when near top
    if (currentScrollY < 20) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLangSwitch = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("cropyaan_lang", code);
    setLangOpen(false);
  };

  return (
    <nav className={`navbar-container ${showNav ? "nav-visible" : "nav-hidden"} ${isOpen ? "mobile-open" : ""}`}>
      <div className="nav-content">
        
        {/* Logo */}
        <Link to="/" className="nav-logo-link">
          <img src={logo} alt="Cropyaan" className={`nav-logo ${theme === "dark" ? "logo-invert" : ""}`} />
        </Link>

        {/* Desktop Links */}
        <div className="nav-links-desktop">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={`nav-link ${location.pathname === to ? "active" : ""}`}>
              {label}
            </Link>
          ))}
        </div>

        {/* Actions Section */}
        <div className="nav-actions">
          
          {/* Theme Toggle */}
          <button className="theme-toggle-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Language Selector */}
          <div ref={langRef} className="nav-dropdown-wrapper">
            <button className="nav-dropdown-trigger" onClick={() => setLangOpen(!langOpen)}>
              <Languages size={16} />
              <span className="lang-code-text">{LANGUAGES[i18n.language] || "En"}</span>
              <ChevronDown size={12} />
            </button>

            {langOpen && (
              <div className="glass-card lang-dropdown">
                {Object.entries(LANGUAGES).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => handleLangSwitch(code)}
                    className={`lang-option ${i18n.language === code ? "active" : ""}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Section */}
          {user ? (
            <div ref={dropdownRef} className="nav-dropdown-wrapper">
              <button className="nav-dropdown-trigger user-name-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {firstName} <ChevronDown size={12} />
              </button>
              {dropdownOpen && (
                <div className="glass-card user-dropdown">
                  <button onClick={handleLogout} className="logout-btn">
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="signin-link">Sign In</Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="mobile-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="mobile-menu">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={`mobile-nav-link ${location.pathname === to ? "active" : ""}`}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}