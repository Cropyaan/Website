import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  User,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Languages,
} from "lucide-react";
import logo from "../assets/newlogscrops.png";
import { useAuth } from "../context/AuthContext";

const LANGUAGES = {
  en: "English",
  hi: "हिंदी",
  te: "తెలుగు",
  mr: "मराठी",
  kn: "ಕನ್ನಡ",
  ta: "தமிழ்",
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
    { to: "/about", label: t("nav.about") },
    { to: "/services", label: t("nav.services") },
    { to: "/how-it-works", label: t("nav.how") },
    { to: "/weather-advisory", label: t("nav.weather") },
    { to: "/contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY.current = window.scrollY;
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
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .navbar-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          font-family: 'DM Sans', sans-serif;
          transition: transform 0.4s ease, opacity 0.4s ease, background-color 0.4s ease, border-color 0.4s ease;
          /* GLASS EFFECT */
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          background: var(--overlay-80);
          border-bottom: 1px solid var(--overlay-10);
          color: var(--color-text);
        }

        .dark .navbar-container {
          background: rgba(0, 0, 0, 0.4);
          border-bottom: 1px solid var(--overlay-5);
          color: white;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .nav-links-desktop {
          display: none;
        }

        @media (min-width: 768px) {
          .nav-links-desktop {
            display: flex;
            gap: 32px;
          }
        }

        .nav-link {
          color: inherit;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-link:hover, .nav-link.active {
          color: #22c55e;
        }

        .nav-link.active {
          border-bottom: 2px solid #22c55e;
          padding-bottom: 4px;
        }

        .nav-hidden { transform: translateY(-100%); opacity: 0; }
        .nav-visible { transform: translateY(0); opacity: 1; }

        .glass-card {
          background: var(--bg-main) !important;
          backdrop-filter: blur(20px);
          border: 1px solid var(--overlay-10);
          border-radius: 12px;
          padding: 8px;
          box-shadow: 0 10px 30px var(--overlay-15);
        }
      `}
      </style>

      <nav className={`navbar-container ${showNav ? "nav-visible" : "nav-hidden"}`}>
        <div className="nav-content">
          
          {/* Logo */}
          <Link to="/">
            <img 
              src={logo} 
              alt="Cropyaan" 
              style={{ 
                height: 55,
                filter: theme === "dark" ? "brightness(0) invert(1)" : "none",
                transition: "filter 0.3s ease"
              }} 
            />
          </Link>

          {/* Center Links - Desktop */}
          <div className="nav-links-desktop">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link ${location.pathname === to ? "active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              style={{ background: "var(--overlay-10)", border: "none", borderRadius: "50%", width: "35px", height: "35px", cursor: "pointer", color: "inherit" }}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {/* Language */}
            <div ref={langRef} style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{ background: "none", border: "none", color: "inherit", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}
              >
                <Languages size={16} />
                <span style={{ fontSize: "14px" }}>{LANGUAGES[i18n.language] || "En"}</span>
                <ChevronDown size={12} />
              </button>

              {langOpen && (
                <div className="glass-card" style={{ position: "absolute", top: "150%", right: 0, minWidth: "120px" }}>
                  {Object.entries(LANGUAGES).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => handleLangSwitch(code)}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "8px 12px",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        color: i18n.language === code ? "#22c55e" : "var(--color-text)",
                        cursor: "pointer",
                        fontSize: "13px"
                      }}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Link */}
            {user ? (
               <div ref={dropdownRef} style={{ position: "relative" }}>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                    {firstName} <ChevronDown size={12} />
                  </button>
                  {dropdownOpen && (
                    <div className="glass-card" style={{ position: "absolute", top: "150%", right: 0, minWidth: "120px" }}>
                      <button onClick={handleLogout} style={{ width: "100%", padding: "8px", background: "none", border: "none", color: "#f87171", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: "8px" }}>
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  )}
               </div>
            ) : (
              <Link to="/login" style={{ color: "#22c55e", textDecoration: "none", fontWeight: "600", fontSize: "14px" }}>
                Sign In
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}
              className="md:hidden"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div style={{ background: "var(--bg-main-cc)", backdropFilter: "blur(10px)", padding: "20px" }}>
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{ display: "block", color: "var(--color-text)", textDecoration: "none", marginBottom: "15px", fontSize: "18px" }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
