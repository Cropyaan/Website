import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass =
    "text-white/90 hover:text-white transition font-medium";

  return (
    <nav className="absolute top-0 left-0 w-full z-20 backdrop-blur-sm">
      <div className="w-full px-6 lg:px-20">
        <div className="flex justify-between items-center h-16">

          {/* Brand */}
          <Link
            to="/"
            className="text-2xl font-bold text-white tracking-wide"
          >
            Cropyaan
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={linkClass}>Home</Link>
            <Link to="/about" className={linkClass}>About</Link>
            <Link to="/services" className={linkClass}>Services</Link>
            <Link to="/how-it-works" className={linkClass}>How It Works</Link>
            <Link to="/contact" className={linkClass}>Contact</Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <User className="w-6 h-6 text-white cursor-pointer hover:text-gray-200 transition" />

            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 bg-black/80 backdrop-blur-md space-y-2">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-white/90 hover:text-white font-medium"
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-white/90 hover:text-white font-medium"
          >
            About
          </Link>

          <Link
            to="/services"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-white/90 hover:text-white font-medium"
          >
            Services
          </Link>

          <Link
            to="/how-it-works"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-white/90 hover:text-white font-medium"
          >
            How It Works
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-white/90 hover:text-white font-medium"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
