import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import logo from "../assets/newlogscrops.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/how-it-works", label: "How It Works" },
  { to:"/weather-advisory", label: "Weather Advisory"},
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .nav-root { font-family: 'DM Sans', sans-serif; }

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
      `}</style>

      <nav
        className="nav-root fixed top-0 left-0 w-full z-50"
        style={{
          background: "transparent",
          boxShadow: "none",
          borderBottom: "none",
        }}
      >
        <div className="w-full px-6 lg:px-20">
          <div className="flex justify-between items-center" style={{ height: 68 }}>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Cropyaan"
                style={{
                  height: 44,
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              {links.map(({ to, label }) => {
                const active = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`nav-link-line text-sm font-medium tracking-wide ${
                      active ? "active" : ""
                    }`}
                    style={{
                      color: active ? "#22c55e" : "#ffffff",
                      textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                      letterSpacing: "0.04em",
                      transition: "color 0.3s",
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: "rgba(34,197,94,0.15)",
                  border: "1px solid rgba(34,197,94,0.4)",
                  color: "#ffffff",
                  letterSpacing: "0.04em",
                }}
              >
                <User size={15} />
                Sign In
              </button>

              <button
                className="md:hidden text-white p-1.5 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
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
            transition: "max-height 0.4s ease",
            background: "rgba(0,0,0,0.95)",
          }}
        >
          <div className="px-6 py-6 space-y-2">
            {links.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className="block py-3"
                  style={{
                    color: active ? "#22c55e" : "#ffffff",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}