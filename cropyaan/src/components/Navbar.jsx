import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .nav-root { font-family: 'DM Sans', sans-serif; }
        .nav-logo { font-family: 'Playfair Display', serif; }
        .nav-link-line::after {
          content: '';
          display: block;
          height: 1px;
          width: 0;
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34,197,94,0.6);
          transition: width 0.3s ease;
          margin-top: 2px;
        }
        .nav-link-line:hover::after,
        .nav-link-line.active::after {
          width: 100%;
        }
        .mobile-drawer {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
      `}</style>

      <nav
        className="nav-root fixed top-0 left-0 w-full z-50"
        style={{
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(34,197,94,0.1)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div className="w-full px-6 lg:px-20">
          <div className="flex justify-between items-center h-18" style={{ height: 68 }}>

            {/* Brand */}
            <Link
              to="/"
              className="nav-logo text-2xl font-bold text-white tracking-wide relative group"
              style={{ letterSpacing: "0.02em" }}
            >
              Crop
              <span style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.5)" }}>yaan</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              {links.map(({ to, label }) => {
                const active = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`nav-link-line text-sm font-medium tracking-wide ${active ? "active" : ""}`}
                    style={{
                      color: active ? "#22c55e" : "rgba(255,255,255,0.8)",
                      textShadow: active ? "0 0 12px rgba(34,197,94,0.4)" : "none",
                      transition: "color 0.3s",
                      letterSpacing: "0.04em",
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  color: "#22c55e",
                  letterSpacing: "0.04em",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(34,197,94,0.15)"; e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(34,197,94,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(34,197,94,0.08)"; e.currentTarget.style.borderColor = "rgba(34,197,94,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <User size={15} />
                Sign In
              </button>

              <button
                className="md:hidden text-white p-1.5 rounded-lg"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.3s" }}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className="md:hidden overflow-hidden"
          style={{
            maxHeight: isOpen ? "400px" : "0px",
            opacity: isOpen ? 1 : 0,
            transition: "max-height 0.4s ease, opacity 0.3s ease",
            background: "rgba(8,8,8,0.97)",
            borderTop: isOpen ? "1px solid rgba(34,197,94,0.1)" : "1px solid transparent",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="px-6 py-6 space-y-1">
            {links.map(({ to, label }, i) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl group"
                  style={{
                    background: active ? "rgba(34,197,94,0.07)" : "transparent",
                    border: active ? "1px solid rgba(34,197,94,0.15)" : "1px solid transparent",
                    color: active ? "#22c55e" : "rgba(255,255,255,0.75)",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    letterSpacing: "0.03em",
                    transition: "all 0.25s",
                    transitionDelay: isOpen ? `${i * 0.04}s` : "0s",
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#fff"; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; } }}
                >
                  {active && (
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.8)" }}
                    />
                  )}
                  {label}
                </Link>
              );
            })}

            <div className="pt-4 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  color: "#22c55e",
                  letterSpacing: "0.05em",
                }}
              >
                <User size={15} />
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}