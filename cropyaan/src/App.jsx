import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import WeatherAdvisory from "./components/WeatherAdvisory";
import Contact from "./components/Contact";
import Login from "./components/Login";
import CropAdvisor from "./components/CropAdvisor";
import ScrollToTop from "./components/ScrollToTop"; // ✅ ADDED
import "./cssPages/Variable.css";

function App() {
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <ScrollToTop /> {/* ✅ ADDED HERE */}

      {location.pathname !== "/login" && (
        <Navbar theme={theme} setTheme={setTheme} />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/weather-advisory" element={<WeatherAdvisory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crop-recommendation" element={<CropAdvisor />} />
      </Routes>
    </>
  );
}

export default App;