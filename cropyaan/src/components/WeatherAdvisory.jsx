// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";

// // ─── Helpers ────────────────────────────────────────────────────────────────

// const useInView = (threshold = 0.15) => {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) setInView(true); },
//       { threshold }
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
//   return [ref, inView];
// };

// // ─── Shared UI ──────────────────────────────────────────────────────────────

// const GrainOverlay = () => (
//   <div
//     style={{
//       position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.032,
//       backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
//       backgroundSize: "128px 128px",
//     }}
//   />
// );

// const Separator = () => (
//   <div style={{ position: "relative", height: 1, width: "100%", overflow: "hidden" }}>
//     <div style={{ background: "linear-gradient(90deg, transparent 0%, #22c55e44 30%, #22c55e88 50%, #22c55e44 70%, transparent 100%)", height: "1px" }} />
//   </div>
// );

// const FadeIn = ({ children, delay = 0, className = "" }) => {
//   const [ref, inView] = useInView();
//   return (
//     <div
//       ref={ref}
//       className={className}
//       style={{
//         opacity: inView ? 1 : 0,
//         transform: inView ? "translateY(0)" : "translateY(28px)",
//         transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
//       }}
//     >
//       {children}
//     </div>
//   );
// };

// // ─── Weather Icons ───────────────────────────────────────────────────────────

// const IconThermometer = () => (
//   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
//   </svg>
// );

// const IconDroplets = () => (
//   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.09 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
//     <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
//   </svg>
// );

// const IconWind = () => (
//   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
//     <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
//     <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
//   </svg>
// );

// const IconSearch = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="11" cy="11" r="8" />
//     <path d="m21 21-4.35-4.35" />
//   </svg>
// );

// const IconAlert = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
//     <line x1="12" y1="9" x2="12" y2="13" />
//     <line x1="12" y1="17" x2="12.01" y2="17" />
//   </svg>
// );

// const IconLeaf = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
//     <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
//   </svg>
// );

// // ─── Advisory Logic ──────────────────────────────────────────────────────────

// const getAdvisory = ({ temp, rainProb, windSpeed }) => {
//   const advisories = [];
//   if (rainProb > 60) {
//     advisories.push({
//       type: "warning",
//       title: "Rain Expected",
//       text: "Rainfall likely. Consider delaying irrigation and avoid applying fertilizers that may wash away.",
//     });
//   }
//   if (temp > 35) {
//     advisories.push({
//       type: "warning",
//       title: "High Temperature Alert",
//       text: "Extreme heat detected. Ensure crops receive adequate water and consider shade netting for sensitive plants.",
//     });
//   }
//   if (windSpeed > 20) {
//     advisories.push({
//       type: "warning",
//       title: "Strong Winds",
//       text: "High wind speeds expected. Avoid pesticide and herbicide spraying — drift can damage crops and harm soil.",
//     });
//   }
//   if (temp < 10) {
//     advisories.push({
//       type: "warning",
//       title: "Low Temperature",
//       text: "Cold conditions ahead. Protect frost-sensitive crops and consider delaying sowing of warm-season crops.",
//     });
//   }
//   if (advisories.length === 0) {
//     advisories.push({
//       type: "good",
//       title: temp >= 20 && temp <= 30 && rainProb <= 40 && windSpeed <= 15
//         ? "Favourable Conditions"
//         : "Moderate Conditions",
//       text: temp >= 20 && temp <= 30 && rainProb <= 40 && windSpeed <= 15
//         ? "Weather looks good for field activities. Suitable for sowing, spraying, and general crop maintenance."
//         : "Weather conditions are within normal range. Continue regular farming activities and monitor forecasts.",
//     });
//   }
//   return advisories;
// };

// // ─── Sub-components ──────────────────────────────────────────────────────────

// const StatCard = ({ icon, label, value, unit, delay }) => {
//   const [ref, inView] = useInView(0.1);
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       ref={ref}
//       style={{
//         opacity: inView ? 1 : 0,
//         transform: inView ? "translateY(0)" : "translateY(24px)",
//         transition: `all 0.75s ease ${delay}s`,
//       }}
//     >
//       <div
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         style={{
//           borderRadius: 16,
//           padding: "28px",
//           display: "flex",
//           flexDirection: "column",
//           gap: 16,
//           cursor: "default",
//           background: hovered ? "rgba(34,197,94,0.04)" : "rgba(255,255,255,0.025)",
//           border: hovered ? "1px solid rgba(34,197,94,0.28)" : "1px solid rgba(255,255,255,0.07)",
//           boxShadow: hovered ? "0 0 40px rgba(34,197,94,0.08)" : "none",
//           transition: "all 0.4s",
//         }}
//       >
//         <div style={{
//           width: 48, height: 48, borderRadius: 12,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)",
//         }}>
//           {icon}
//         </div>
//         <div>
//           <p style={{ color: "rgba(113,113,122,0.9)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 500, marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
//             {label}
//           </p>
//           <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", lineHeight: 1, color: "#22c55e", textShadow: "0 0 24px rgba(34,197,94,0.35)", fontWeight: 700 }}>
//             {value}
//             <span style={{ fontSize: "1rem", color: "rgba(161,161,170,0.8)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, marginLeft: 4 }}>{unit}</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AdvisoryCard = ({ advisory, index }) => {
//   const isWarning = advisory.type === "warning";
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "flex-start",
//         gap: 16,
//         borderRadius: 12,
//         padding: "16px 20px",
//         background: isWarning ? "rgba(251,191,36,0.04)" : "rgba(34,197,94,0.04)",
//         border: isWarning ? "1px solid rgba(251,191,36,0.18)" : "1px solid rgba(34,197,94,0.2)",
//         animation: `fadeUp 0.6s ease ${index * 0.1}s both`,
//       }}
//     >
//       <div style={{
//         marginTop: 2, flexShrink: 0, borderRadius: "50%",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         width: 28, height: 28,
//         background: isWarning ? "rgba(251,191,36,0.1)" : "rgba(34,197,94,0.1)",
//         color: isWarning ? "#fbbf24" : "#22c55e",
//       }}>
//         {isWarning ? <IconAlert /> : <IconLeaf />}
//       </div>
//       <div>
//         <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: isWarning ? "#fbbf24" : "#22c55e", fontFamily: "'DM Sans', sans-serif" }}>
//           {advisory.title}
//         </p>
//         <p style={{ color: "rgba(161,161,170,0.9)", fontSize: 14, lineHeight: 1.7, fontWeight: 300, fontFamily: "'DM Sans', sans-serif" }}>
//           {advisory.text}
//         </p>
//       </div>
//     </div>
//   );
// };

// // ─── Page ─────────────────────────────────────────────────────────────────────

// export default function WeatherAdvisory() {
//   const [inputVal, setInputVal] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchWeather = async (e) => {
//     e.preventDefault();
//     const query = inputVal.trim();
//     if (!query) return;
//     setLoading(true);
//     setError("");
//     setWeather(null);
//     try {
//       const geoRes = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
//         params: { name: query, count: 1, language: "en", format: "json" },
//       });
//       const results = geoRes.data.results;
//       if (!results || results.length === 0) {
//         setError("Location not found. Please try a different city name.");
//         setLoading(false);
//         return;
//       }
//       const { latitude, longitude, name, country } = results[0];
//       const weatherRes = await axios.get("https://api.open-meteo.com/v1/forecast", {
//         params: {
//           latitude, longitude,
//           current: "temperature_2m,precipitation_probability,wind_speed_10m",
//           wind_speed_unit: "kmh",
//           timezone: "auto",
//         },
//       });
//       const c = weatherRes.data.current;
//       setWeather({
//         city: `${name}, ${country}`,
//         temp: Math.round(c.temperature_2m),
//         rainProb: c.precipitation_probability ?? 0,
//         windSpeed: Math.round(c.wind_speed_10m),
//       });
//     } catch {
//       setError("Unable to fetch weather data. Please check your connection and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const advisories = weather ? getAdvisory(weather) : [];
//   const BG = "#0a0a0a";

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
//         @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes spin   { to { transform: rotate(360deg); } }
//         .wa-input { background: rgba(255,255,255,0.04) !important; border: 1px solid rgba(255,255,255,0.1) !important; color: #fff !important; font-family: 'DM Sans', sans-serif; font-weight: 300; border-radius: 12px; padding: 16px 20px; width: 100%; transition: border-color 0.3s, box-shadow 0.3s; font-size: 14px; }
//         .wa-input:focus   { outline: none; border-color: rgba(34,197,94,0.5) !important; box-shadow: 0 0 0 3px rgba(34,197,94,0.08) !important; }
//         .wa-input::placeholder { color: rgba(113,113,122,0.7); }
//         .wa-btn            { background: #22c55e; color: #000; border: none; border-radius: 12px; padding: 16px 24px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 8px; white-space: nowrap; box-shadow: 0 0 24px rgba(34,197,94,0.35); transition: all 0.3s; letter-spacing: 0.04em; }
//         .wa-btn:hover      { background: #16a34a !important; box-shadow: 0 0 36px rgba(34,197,94,0.55) !important; }
//         .wa-btn:disabled   { opacity: 0.6; cursor: not-allowed; }
//       `}</style>

//       <GrainOverlay />

//       {/* Full-page dark wrapper using inline style — not Tailwind */}
//       <div style={{ backgroundColor: BG, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      

//         {/* ── HERO ── */}
//         <section style={{ position: "relative", backgroundColor: BG, padding: "112px 24px", textAlign: "center", overflow: "hidden" }}>
//           <div style={{
//             position: "absolute", inset: 0, pointerEvents: "none",
//             backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=60')`,
//             backgroundSize: "cover", backgroundPosition: "center", opacity: 0.05,
//           }} />
//           <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 40%, transparent 60%, #0a0a0a 100%)" }} />
//           <div style={{
//             position: "absolute", pointerEvents: "none",
//             width: 700, height: 300, borderRadius: "50%",
//             background: "radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)",
//             top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(40px)",
//           }} />
//           <div style={{ position: "relative", zIndex: 10, maxWidth: 720, margin: "0 auto" }}>
//             <FadeIn>
//               <p style={{ color: "#22c55e", letterSpacing: "0.22em", fontSize: 11, textTransform: "uppercase", fontWeight: 500, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
//                 Weather Advisory
//               </p>
//             </FadeIn>
//             <FadeIn delay={0.1}>
//               <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.6rem, 6vw, 4.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 24 }}>
//                 Plan Your Farm with{" "}
//                 <span style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.35)" }}>Today's Weather</span>
//               </h1>
//             </FadeIn>
//             <FadeIn delay={0.2}>
//               <p style={{ color: "rgba(161,161,170,0.9)", fontSize: 18, fontWeight: 300, lineHeight: 1.7 }}>
//                 Enter your location to get current weather conditions and tailored farming advice for your fields.
//               </p>
//             </FadeIn>
//           </div>
//         </section>

//         <Separator />

//         {/* ── SEARCH ── */}
//         <section style={{ backgroundColor: BG, padding: "64px 24px", position: "relative" }}>
//           <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.03) 0%, transparent 70%)" }} />
//           <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 10 }}>
//             <FadeIn delay={0.1}>
//               <form onSubmit={fetchWeather} style={{ display: "flex", gap: 12 }}>
//                 <input
//                   type="text"
//                   className="wa-input"
//                   placeholder="Enter city or district (e.g. Pune, Warangal, Ludhiana)"
//                   value={inputVal}
//                   onChange={e => setInputVal(e.target.value)}
//                 />
//                 <button type="submit" className="wa-btn" disabled={loading}>
//                   <IconSearch />
//                   {loading ? "Searching…" : "Get Forecast"}
//                 </button>
//               </form>

//               {error && (
//                 <div style={{
//                   marginTop: 16, display: "flex", alignItems: "flex-start", gap: 12,
//                   borderRadius: 12, padding: "14px 18px",
//                   background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)",
//                 }}>
//                   <span style={{ color: "#ef4444", marginTop: 2, flexShrink: 0 }}><IconAlert /></span>
//                   <p style={{ color: "#fca5a5", fontSize: 14, fontWeight: 300, margin: 0 }}>{error}</p>
//                 </div>
//               )}

//               {loading && (
//                 <div style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
//                   <div style={{
//                     width: 36, height: 36, borderRadius: "50%",
//                     border: "2px solid rgba(34,197,94,0.15)",
//                     borderTopColor: "#22c55e",
//                     animation: "spin 0.8s linear infinite",
//                   }} />
//                   <p style={{ color: "rgba(113,113,122,0.8)", fontSize: 14, fontWeight: 300 }}>Fetching weather data…</p>
//                 </div>
//               )}
//             </FadeIn>
//           </div>
//         </section>

//         {/* ── RESULTS ── */}
//         {weather && (
//           <>
//             <Separator />

//             {/* Stat cards */}
//             <section style={{ backgroundColor: BG, padding: "56px 24px 24px" }}>
//               <div style={{ maxWidth: 1000, margin: "0 auto" }}>
//                 <FadeIn>
//                   <p style={{ color: "#22c55e", letterSpacing: "0.22em", fontSize: 11, textTransform: "uppercase", fontWeight: 500, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
//                     Current Conditions
//                   </p>
//                   <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 700, color: "#fff", marginBottom: 40 }}>
//                     {weather.city}
//                   </h2>
//                 </FadeIn>
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 56 }}>
//                   <StatCard icon={<IconThermometer />} label="Temperature"    value={weather.temp}      unit="°C"   delay={0}   />
//                   <StatCard icon={<IconDroplets />}    label="Rain Probability" value={weather.rainProb} unit="%"    delay={0.1} />
//                   <StatCard icon={<IconWind />}        label="Wind Speed"      value={weather.windSpeed} unit="km/h" delay={0.2} />
//                 </div>
//               </div>
//             </section>

//             <Separator />

//             {/* Advisory cards */}
//             <section style={{ backgroundColor: BG, padding: "56px 24px 80px", position: "relative", overflow: "hidden" }}>
//               <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 30% 60%, rgba(34,197,94,0.03) 0%, transparent 60%)" }} />
//               <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 10 }}>
//                 <FadeIn>
//                   <p style={{ color: "#22c55e", letterSpacing: "0.22em", fontSize: 11, textTransform: "uppercase", fontWeight: 500, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
//                     Farming Advisory
//                   </p>
//                   <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 700, color: "#fff", marginBottom: 8 }}>
//                     Recommendations for <span style={{ color: "#22c55e" }}>Your Fields</span>
//                   </h2>
//                   <p style={{ color: "rgba(113,113,122,0.8)", fontSize: 14, fontWeight: 300, marginBottom: 36, fontFamily: "'DM Sans', sans-serif" }}>
//                     Based on current weather conditions in {weather.city}.
//                   </p>
//                 </FadeIn>

//                 <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//                   {advisories.map((adv, i) => (
//                     <AdvisoryCard key={i} advisory={adv} index={i} />
//                   ))}
//                 </div>

//                 <FadeIn delay={0.4}>
//                   <p style={{ marginTop: 40, fontSize: 12, textAlign: "center", color: "rgba(113,113,122,0.55)", fontWeight: 300, lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif" }}>
//                     Weather data sourced from{" "}
//                     <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(34,197,94,0.6)" }}>
//                       Open-Meteo
//                     </a>
//                     . Advisories are general guidance — consult your local KVK or agricultural officer for crop-specific recommendations.
//                   </p>
//                 </FadeIn>
//               </div>
//             </section>
//           </>
//         )}

//         <Separator />
//       </div>
//     </>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

/* ─── Helpers ───────────────────────────────────────────────────────────── */

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, inView];
};

/* ─── Shared UI ─────────────────────────────────────────────────────────── */

const GrainOverlay = () => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 9999,
      opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundSize: "128px 128px",
    }}
  />
);

const Separator = () => (
  <div style={{ height: 1, width: "100%", overflow: "hidden" }}>
    <div
      style={{
        background: "linear-gradient(90deg, transparent 0%, #22c55e44 30%, #22c55e88 50%, #22c55e44 70%, transparent 100%)",
        height: "1px",
      }}
    />
  </div>
);

const FadeIn = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

/* ─── Icons ─────────────────────────────────────────────────────────────── */

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const IconThermometer = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
  </svg>
);

const IconDroplets = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.09 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
  </svg>
);

const IconWind = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
    <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
    <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
  </svg>
);

const IconAlert = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconLeaf = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

/* ─── Advisory Logic ────────────────────────────────────────────────────── */

const getAdvisory = ({ temp, rainProb, windSpeed }) => {
  const advisories = [];

  if (rainProb > 60) {
    advisories.push({
      type: "warning",
      title: "Rain Expected",
      text: "Rainfall likely. Consider delaying irrigation and avoid applying fertilizers that may wash away.",
    });
  }

  if (temp > 35) {
    advisories.push({
      type: "warning",
      title: "High Temperature Alert",
      text: "Extreme heat detected. Ensure crops receive adequate water and consider shade netting for sensitive plants.",
    });
  }

  if (windSpeed > 20) {
    advisories.push({
      type: "warning",
      title: "Strong Winds",
      text: "High wind speeds expected. Avoid pesticide and herbicide spraying — drift can damage crops.",
    });
  }

  if (temp < 10) {
    advisories.push({
      type: "warning",
      title: "Low Temperature",
      text: "Cold conditions ahead. Protect frost-sensitive crops and delay sowing of warm-season varieties.",
    });
  }

  if (advisories.length === 0) {
    advisories.push({
      type: "good",
      title: "Favourable Conditions",
      text: "Weather looks good for farming activities today. Suitable for sowing, spraying, and field maintenance.",
    });
  }

  return advisories;
};

/* ─── Sub-components ────────────────────────────────────────────────────── */

const StatCard = ({ icon, label, value, unit }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: "24px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      transition: "border-color 0.3s",
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
  >
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: "rgba(34,197,94,0.08)",
        border: "1px solid rgba(34,197,94,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
    <div>
      <p style={{ color: "rgba(113,113,122,0.9)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6, fontWeight: 500 }}>
        {label}
      </p>
      <p style={{ color: "#22c55e", fontSize: "2rem", fontFamily: "'Playfair Display', serif", fontWeight: 700, lineHeight: 1, textShadow: "0 0 20px rgba(34,197,94,0.3)" }}>
        {value}
        <span style={{ fontSize: "1rem", color: "rgba(161,161,170,0.8)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, marginLeft: 4 }}>
          {unit}
        </span>
      </p>
    </div>
  </div>
);

const AdvisoryCard = ({ advisory, index }) => {
  const isWarning = advisory.type === "warning";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        background: isWarning ? "rgba(251,191,36,0.04)" : "rgba(34,197,94,0.04)",
        border: isWarning ? "1px solid rgba(251,191,36,0.18)" : "1px solid rgba(34,197,94,0.2)",
        borderRadius: 12,
        padding: "16px 20px",
        animation: `fadeUp 0.6s ease ${index * 0.1}s both`,
      }}
    >
      <div
        style={{
          marginTop: 2,
          flexShrink: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: isWarning ? "rgba(251,191,36,0.1)" : "rgba(34,197,94,0.1)",
          color: isWarning ? "#fbbf24" : "#22c55e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isWarning ? <IconAlert /> : <IconLeaf />}
      </div>
      <div>
        <p style={{ color: isWarning ? "#fbbf24" : "#22c55e", fontWeight: 600, fontSize: "0.9rem", marginBottom: 4 }}>
          {advisory.title}
        </p>
        <p style={{ color: "rgba(161,161,170,0.9)", fontSize: "0.875rem", lineHeight: 1.7, fontWeight: 300 }}>
          {advisory.text}
        </p>
      </div>
    </div>
  );
};

/* ─── Main Component ────────────────────────────────────────────────────── */

export default function WeatherAdvisory() {
  const [inputVal, setInputVal] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();
    const query = inputVal.trim();
    if (!query) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const geoRes = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
        params: { name: query, count: 1 },
      });

      const result = geoRes.data.results?.[0];
      if (!result) {
        setError("Location not found. Please try a different city name.");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = result;

      const weatherRes = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude,
          longitude,
          current: "temperature_2m,precipitation_probability,wind_speed_10m",
          wind_speed_unit: "kmh",
          timezone: "auto",
        },
      });

      const c = weatherRes.data.current;
      setWeather({
        city: `${name}, ${country}`,
        temp: Math.round(c.temperature_2m),
        rainProb: c.precipitation_probability ?? 0,
        windSpeed: Math.round(c.wind_speed_10m),
      });
    } catch {
      setError("Unable to fetch weather data. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const advisories = weather ? getAdvisory(weather) : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .wa-input:focus { outline: none; border-color: rgba(34,197,94,0.5) !important; box-shadow: 0 0 0 3px rgba(34,197,94,0.08); }
        .wa-input::placeholder { color: rgba(113,113,122,0.6); }
        .wa-btn:hover { background: #16a34a !important; box-shadow: 0 0 32px rgba(34,197,94,0.5) !important; }
      `}</style>

      <GrainOverlay />

      <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#fff", paddingTop: 100 }}>

        {/* ── HERO ── */}
        <section style={{ padding: "60px 24px 50px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse at 50% 60%, rgba(34,197,94,0.06) 0%, transparent 65%)",
            }}
          />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
            <FadeIn>
              <p style={{ color: "#22c55e", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500, marginBottom: 16 }}>
                Weather Advisory
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: 20, color: "#fff" }}>
                Plan Your Farm with{" "}
                <span style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.35)" }}>
                  Today's Weather
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ color: "rgba(161,161,170,0.9)", fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8 }}>
                Enter your location to get current weather conditions and tailored farming advice for your fields.
              </p>
            </FadeIn>
          </div>
        </section>

        <Separator />

        {/* ── SEARCH ── */}
        <section style={{ padding: "48px 24px", maxWidth: 760, margin: "0 auto" }}>
          <FadeIn delay={0.1}>
            <form onSubmit={fetchWeather} style={{ display: "flex", gap: 12 }}>
              <input
                type="text"
                className="wa-input"
                placeholder="Enter city or district name (e.g. Pune, Warangal, Nashik)"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                style={{
                  flex: 1,
                  padding: "14px 18px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
              />
              <button
                type="submit"
                className="wa-btn"
                disabled={loading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 22px",
                  borderRadius: 12,
                  background: "#22c55e",
                  border: "none",
                  color: "#000",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 0 24px rgba(34,197,94,0.35)",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.04em",
                  transition: "all 0.3s",
                  whiteSpace: "nowrap",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                <IconSearch />
                {loading ? "Searching…" : "Get Forecast"}
              </button>
            </form>

            {/* Error */}
            {error && (
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 18px",
                  borderRadius: 10,
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}
              >
                <span style={{ color: "#ef4444" }}><IconAlert /></span>
                <p style={{ color: "#fca5a5", fontSize: "0.875rem", fontWeight: 300 }}>{error}</p>
              </div>
            )}

            {/* Spinner */}
            {loading && (
              <div style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    border: "2px solid rgba(34,197,94,0.15)",
                    borderTopColor: "#22c55e",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <p style={{ color: "rgba(113,113,122,0.8)", fontSize: "0.85rem", fontWeight: 300 }}>Fetching weather data…</p>
              </div>
            )}
          </FadeIn>
        </section>

        {/* ── RESULTS ── */}
        {weather && (
          <>
            <Separator />

            {/* Stat Cards */}
            <section style={{ padding: "52px 24px", maxWidth: 900, margin: "0 auto" }}>
              <FadeIn>
                <p style={{ color: "#22c55e", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500, marginBottom: 8 }}>
                  Current Conditions
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "#fff", marginBottom: 36 }}>
                  {weather.city}
                </h2>
              </FadeIn>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                <FadeIn delay={0}>
                  <StatCard icon={<IconThermometer />} label="Temperature" value={weather.temp} unit="°C" />
                </FadeIn>
                <FadeIn delay={0.1}>
                  <StatCard icon={<IconDroplets />} label="Rain Probability" value={weather.rainProb} unit="%" />
                </FadeIn>
                <FadeIn delay={0.2}>
                  <StatCard icon={<IconWind />} label="Wind Speed" value={weather.windSpeed} unit="km/h" />
                </FadeIn>
              </div>
            </section>

            <Separator />

            {/* Advisory */}
            <section style={{ padding: "52px 24px 80px", maxWidth: 900, margin: "0 auto" }}>
              <FadeIn>
                <p style={{ color: "#22c55e", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500, marginBottom: 8 }}>
                  Farming Advisory
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                  Recommendations for Your Fields
                </h2>
                <p style={{ color: "rgba(113,113,122,0.8)", fontSize: "0.85rem", fontWeight: 300, marginBottom: 28 }}>
                  Based on current weather in {weather.city}.
                </p>
              </FadeIn>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {advisories.map((adv, i) => (
                  <AdvisoryCard key={i} advisory={adv} index={i} />
                ))}
              </div>

              <FadeIn delay={0.4}>
                <p style={{ marginTop: 36, fontSize: "0.75rem", color: "rgba(113,113,122,0.55)", textAlign: "center", lineHeight: 1.8, fontWeight: 300 }}>
                  Weather data sourced from{" "}
                  <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(34,197,94,0.6)" }}>
                    Open-Meteo
                  </a>
                  . Advisories are general guidance — consult your local KVK or agricultural officer for crop-specific recommendations.
                </p>
              </FadeIn>
            </section>
          </>
        )}

      </div>
    </>
  );
}
