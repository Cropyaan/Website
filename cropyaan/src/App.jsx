import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import WeatherAdvisory from "./components/WeatherAdvisory";
import Contact from "./components/Contact";

function App() {
return (
<> <Navbar /> <Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/services" element={<Services />} />
<Route path="/how-it-works" element={<HowItWorks />} />
<Route path="/weather-advisory" element={<WeatherAdvisory />} />
<Route path="/contact" element={<Contact />} /> </Routes>
</>
);
}

export default App;
