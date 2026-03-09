// import Navbar from "./Navbar";
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const useInView = (threshold = 0.12) => {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
//   return [ref, inView];
// };

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
//   <div className="relative h-px w-full overflow-hidden">
//     <div style={{ background: "linear-gradient(90deg, transparent 0%, #22c55e44 30%, #22c55e88 50%, #22c55e44 70%, transparent 100%)", height: "1px" }} />
//   </div>
// );

// const FadeIn = ({ children, delay = 0, className = "" }) => {
//   const [ref, inView] = useInView();
//   return (
//     <div ref={ref} className={className} style={{
//       opacity: inView ? 1 : 0,
//       transform: inView ? "translateY(0)" : "translateY(28px)",
//       transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
//     }}>
//       {children}
//     </div>
//   );
// };

// const StatCard = ({ number, label, delay }) => {
//   const [ref, inView] = useInView();
//   return (
//     <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `all 0.8s ease ${delay}s` }}>
//       <div
//         className="text-center px-8 py-10 rounded-2xl group cursor-default"
//         style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.4s" }}
//         onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.25)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(34,197,94,0.07)"; }}
//         onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
//       >
//         <div className="display-font text-5xl font-bold mb-2" style={{ color: "#22c55e", textShadow: "0 0 30px rgba(34,197,94,0.4)", fontFamily: "'Playfair Display', serif" }}>{number}</div>
//         <div className="text-zinc-400 text-sm tracking-widest uppercase" style={{ letterSpacing: "0.15em", fontWeight: 400 }}>{label}</div>
//       </div>
//     </div>
//   );
// };

// const FeatureCard = ({ title, desc, index }) => {
//   const [ref, inView] = useInView();
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       ref={ref}
//       style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `all 0.8s ease ${index * 0.1}s` }}
//     >
//       <div
//         className="h-full rounded-2xl p-8 cursor-default"
//         style={{
//           background: hovered ? "rgba(34,197,94,0.04)" : "rgba(255,255,255,0.025)",
//           border: hovered ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.07)",
//           boxShadow: hovered ? "0 0 40px rgba(34,197,94,0.07)" : "none",
//           transition: "all 0.4s",
//         }}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         <div className="w-10 h-0.5 rounded-full mb-6" style={{ background: "#22c55e", boxShadow: "0 0 10px rgba(34,197,94,0.5)", width: hovered ? 56 : 40, transition: "width 0.4s" }} />
//         <h3
//           className="display-font text-xl font-bold mb-3"
//           style={{ color: hovered ? "#22c55e" : "#fff", fontFamily: "'Playfair Display', serif", transition: "color 0.3s" }}
//         >
//           {title}
//         </h3>
//         <p className="text-base leading-relaxed" style={{ color: hovered ? "rgba(255,255,255,0.8)" : "rgba(161,161,170,1)", fontWeight: 300, transition: "color 0.3s" }}>
//           {desc}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default function Home() {
//   const navigate = useNavigate();
//   const heroRef = useRef(null);
//   useEffect(() => {
//     const onScroll = () => {
//       if (heroRef.current) {
//         const bg = heroRef.current.querySelector(".hero-bg");
//         if (bg) bg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
//       }
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
//         .home-root { font-family: 'DM Sans', sans-serif; }
//         .display-font { font-family: 'Playfair Display', serif; }
//       `}</style>
//       <GrainOverlay />
//       <div className="home-root bg-[#0a0a0a] overflow-x-hidden">
//         <Navbar />

//         {/* ===== HERO ===== */}
//         <section ref={heroRef} className="relative h-screen w-full flex flex-col overflow-hidden">
//           <div
//             className="hero-bg absolute inset-0 scale-110"
//             style={{
//               backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1974&auto=format&fit=crop')",
//               backgroundSize: "cover", backgroundPosition: "center",
//             }}
//           />
//           <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 50%, #0a0a0a 100%)" }} />
//           <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(34,197,94,0.06) 0%, transparent 65%)" }} />

//           <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
//             <div
//               style={{ opacity: 1, animation: "fadeUp 1s ease 0.2s both" }}
//             >

//             </div>
//             <div style={{ animation: "fadeUp 1s ease 0.45s both" }}>
//               <h1
//                 className="display-font text-white leading-tight mb-8"
//                 style={{
//                   fontFamily: "'Playfair Display', serif",
//                   fontSize: "clamp(2.8rem, 7vw, 6rem)",
//                   textShadow: "0 2px 40px rgba(0,0,0,0.5)",
//                 }}
//               >
//                 Empowering Farmers with <br />
//                 <span style={{ color: "#22c55e", textShadow: "0 0 60px rgba(34,197,94,0.4)", fontStyle: "italic" }}>
//                   Knowledge
//                 </span>
//               </h1>
//             </div>
//             <div style={{ animation: "fadeUp 1s ease 0.65s both" }}>
//               <p className="text-zinc-300 text-lg max-w-xl mb-12" style={{ fontWeight: 300, lineHeight: 1.8 }}>
//                 Reliable agricultural knowledge and insights — from government schemes and weather forecasts to crop guidance and market prices.
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4 items-center" style={{ animation: "fadeUp 1s ease 0.85s both" }}>
//               <button
//                 className="px-8 py-4 rounded-xl font-semibold text-sm tracking-wide"
//                 style={{
//                   background: "#22c55e", color: "#000",
//                   boxShadow: "0 0 32px rgba(34,197,94,0.4)",
//                   letterSpacing: "0.05em", transition: "all 0.3s",
//                 }}
//                 onMouseEnter={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.boxShadow = "0 0 48px rgba(34,197,94,0.6)"; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.boxShadow = "0 0 32px rgba(34,197,94,0.4)"; }}
//                 onClick={() => navigate("/services")}
//               >
//                 Explore Resources
//               </button>
//               <button
//                 className="px-8 py-4 rounded-xl font-semibold text-sm tracking-wide text-white"
//                 style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", letterSpacing: "0.05em", transition: "all 0.3s" }}
//                 onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)"; e.currentTarget.style.background = "rgba(34,197,94,0.08)"; }}
//                 onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
//                 onClick={() => navigate("/how-it-works")}
//               >
//                 Learn More
//               </button>
//             </div>
//           </div>

//           {/* Scroll indicator */}
//           <div className="relative z-10 flex justify-center pb-10" style={{ animation: "fadeUp 1s ease 1.1s both" }}>
//             <div className="flex flex-col items-center gap-2 opacity-40">
//               <div className="w-px h-12 bg-white" style={{ animation: "pulse 2s infinite" }} />
//             </div>
//           </div>
//         </section>

//         <style>{`
//           @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
//         `}</style>

//         <Separator />

//         {/* ===== STATS STRIP ===== */}
//         <section className="bg-[#0a0a0a] py-16 px-6 lg:px-20 relative overflow-hidden">
//           <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.04) 0%, transparent 70%)" }} />
//           <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
//             <StatCard number="20k+" label="Farmers Reached" delay={0} />
//             <StatCard number="15+" label="Government Schemes" delay={0.1} />
//             <StatCard number="200+" label="Farming Guides" delay={0.2} />
//             <StatCard number="10+" label="Knowledge Sources" delay={0.3} />
//           </div>
//         </section>

//         <Separator />

//         {/* ===== FARMING STATISTICS ===== */}
//         <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
//           <div
//             className="absolute inset-0 pointer-events-none"
//             style={{
//               backgroundImage: `url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1800&q=50')`,
//               backgroundSize: "cover", backgroundPosition: "center", opacity: 0.04,
//             }}
//           />
//           <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0a, transparent 30%, transparent 70%, #0a0a0a)" }} />
//           <div className="max-w-6xl mx-auto relative z-10">
//             <FadeIn>
//             </FadeIn>
//             <FadeIn delay={0.1}>
//               <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
//                 Farming <span style={{ color: "#22c55e" }}>Statistics</span> & Insights
//               </h2>
//             </FadeIn>
//             <FadeIn delay={0.2}>
//               <p className="text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
//                 Accurate agricultural data to help farmers make well-informed decisions every season.
//               </p>
//             </FadeIn>
//             <div className="grid md:grid-cols-2 gap-5">
//               {[
//                 { title: "Crop-wise Production Data", desc: "Explore production volumes across crops and regions with clear, accessible breakdowns for every farmer." },
//                 { title: "Soil Health Information", desc: "Understand nutrient levels and soil conditions with practical guidance for healthier, more productive fields." },
//                 { title: "Yield Trends & Regional Patterns", desc: "Learn from seasonal yield patterns across regions to better plan your next crop cycle." },
//                 { title: "Market Price Insights", desc: "Stay informed on historical and current crop prices so you can choose the best time to sell." },
//               ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
//             </div>
//           </div>
//         </section>

//         <Separator />

//         {/* ===== CHALLENGES ===== */}
//         <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
//           <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(34,197,94,0.04) 0%, transparent 60%)" }} />
//           <div className="max-w-6xl mx-auto relative z-10">
//             <FadeIn>
//             </FadeIn>
//             <FadeIn delay={0.1}>
//               <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
//                 Challenges Modern <span style={{ color: "#22c55e" }}>Farmers</span> Face
//               </h2>
//             </FadeIn>
//             <FadeIn delay={0.2}>
//               <p className="text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
//                 Agriculture today is more complex than ever. Farmers deserve access to the right knowledge at the right time.
//               </p>
//             </FadeIn>
//             <div className="grid md:grid-cols-2 gap-5">
//               {[
//                 { title: "Unpredictable Weather", desc: "Shifting climate patterns demand timely weather forecasts and adaptive crop planning to protect livelihoods." },
//                 { title: "Declining Yields", desc: "Soil degradation and pest resistance call for updated farming techniques and research-backed crop guidance." },
//                 { title: "Market Volatility", desc: "Unpredictable price swings make access to current market information essential for confident selling decisions." },
//                 { title: "Awareness of Support Schemes", desc: "Many farmers miss out on government subsidies and welfare programs simply due to lack of accessible information." },
//               ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
//             </div>
//           </div>
//         </section>

//         <Separator />

//         {/* ===== MODERN FARMING INSIGHTS — SPLIT LAYOUT ===== */}
// <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
//   <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">

//     {/* LEFT — Resource List */}
//     <div>
//       <FadeIn></FadeIn>

//       <FadeIn delay={0.1}>
//         <h2
//           className="display-font text-4xl md:text-5xl font-bold mb-6 leading-tight"
//           style={{ fontFamily: "'Playfair Display', serif" }}
//         >
//           Modern Farming <span style={{ color: "#22c55e" }}>Knowledge</span>
//         </h2>
//       </FadeIn>

//       <FadeIn delay={0.2}>
//         <p
//           className="text-zinc-400 text-base leading-relaxed mb-10"
//           style={{ fontWeight: 300 }}
//         >
//           Bringing farmers closer to trusted knowledge — from university research and
//           KVK advisories to weather data and sustainable farming practices.
//         </p>
//       </FadeIn>

//       <FadeIn delay={0.3}>
//         <div className="space-y-4">
//           {[
//             {
//               label: "Farmer Advisory Services",
//               desc: "Government advisory alerts and farming guidance delivered to farmers on crops, weather, and best practices.",
//               href: "https://mkisan.gov.in"
//             },
//             {
//               label: "Weather Forecasts",
//               desc: "Localised forecasts from the India Meteorological Department.",
//               href: "https://mausam.imd.gov.in",
//             },
//             {
//               label: "Government Schemes",
//               desc: "Explore PM-Kisan and other central farmer welfare programs.",
//               href: "https://pmkisan.gov.in",
//             },
//             {
//               label: "Market Price Insights",
//               desc: "Live and historical mandi prices via Agmarknet.",
//               href: "https://agmarknet.gov.in",
//             },
//             {
//               label: "Research & Best Practices",
//               desc: "Scientific farming innovations and field research from ICAR.",
//               href: "https://icar.org.in",
//             },
//           ].map((item, i) => (
//             <FadeIn key={i} delay={0.35 + i * 0.08}>
//               <a
//                 href={item.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-start gap-4 rounded-xl px-5 py-4"
//                 style={{
//                   background: "rgba(255,255,255,0.025)",
//                   border: "1px solid rgba(255,255,255,0.07)",
//                   textDecoration: "none",
//                   transition: "all 0.35s",
//                   display: "flex",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)";
//                   e.currentTarget.style.background = "rgba(34,197,94,0.05)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
//                   e.currentTarget.style.background = "rgba(255,255,255,0.025)";
//                 }}
//               >
//                 <div
//                   style={{
//                     marginTop: 6,
//                     flexShrink: 0,
//                     width: 8,
//                     height: 8,
//                     borderRadius: "50%",
//                     background: "#22c55e",
//                     boxShadow: "0 0 8px rgba(34,197,94,0.6)",
//                   }}
//                 />

//                 <div>
//                   <div className="text-sm font-semibold mb-0.5" style={{ color: "#fff" }}>
//                     {item.label}
//                     <span
//                       className="ml-2 text-xs"
//                       style={{ color: "#22c55e", opacity: 0.7 }}
//                     >
//                       ↗
//                     </span>
//                   </div>

//                   <div
//                     className="text-xs"
//                     style={{
//                       color: "rgba(161,161,170,0.85)",
//                       fontWeight: 300,
//                     }}
//                   >
//                     {item.desc}
//                   </div>
//                 </div>
//               </a>
//             </FadeIn>
//           ))}
//         </div>
//       </FadeIn>
//     </div>

//     {/* RIGHT — Info Cards */}
//     <div className="relative">
//       <div
//         className="absolute inset-0 rounded-2xl"
//         style={{
//           background:
//             "radial-gradient(circle at 60% 40%, rgba(34,197,94,0.08) 0%, transparent 70%)",
//         }}
//       />

//       <div className="grid grid-cols-2 gap-4">
//         {[
//           {
//             title: "Farmer Advisory Services",
//             desc: "Government advisory alerts and farming guidance delivered to farmers on crops, weather, and best practices.",  
//             href: "https://mkisan.gov.in"
//           },
//           {
//             title: "Weather Forecasts",
//             desc: "Localised weather updates to help plan sowing, irrigation, and harvesting effectively.",
//             href: "https://mausam.imd.gov.in",
//           },
//           {
//             title: "Market Price Tracking",
//             desc: "Up-to-date mandi prices and market trends to maximise returns at the right time.",
//             href: "https://agmarknet.gov.in",
//           },
//           {
//             title: "Sustainable Practices",
//             desc: "Eco-friendly farming methods that improve long-term soil health and crop productivity.",
//             href: "https://icar.org.in",
//           },
//         ].map((item, i) => (
//           <FadeIn key={i} delay={i * 0.1}>
//             <a
//               href={item.href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block rounded-xl p-6"
//               style={{
//                 background: "rgba(255,255,255,0.025)",
//                 border: "1px solid rgba(255,255,255,0.07)",
//                 textDecoration: "none",
//                 transition: "all 0.4s",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.borderColor = "rgba(34,197,94,0.25)";
//                 e.currentTarget.style.background = "rgba(34,197,94,0.04)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
//                 e.currentTarget.style.background = "rgba(255,255,255,0.025)";
//               }}
//             >
//               <h4 className="text-sm font-semibold mb-2" style={{ color: "#fff" }}>
//                 {item.title}
//                 <span
//                   className="ml-1 text-xs"
//                   style={{ color: "#22c55e", opacity: 0.7 }}
//                 >
//                   ↗
//                 </span>
//               </h4>

//               <p
//                 className="text-zinc-500 text-xs leading-relaxed"
//                 style={{ fontWeight: 300 }}
//               >
//                 {item.desc}
//               </p>
//             </a>
//           </FadeIn>
//         ))}
//       </div>
//     </div>
//   </div>
// </section>

//         {/* ===== GUIDES & TUTORIALS ===== */}
//         <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
//           <div
//             className="absolute inset-0 pointer-events-none"
//             style={{
//               backgroundImage: `url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1800&q=50')`,
//               backgroundSize: "cover", backgroundPosition: "center", opacity: 0.04,
//             }}
//           />
//           <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0a, transparent 25%, transparent 75%, #0a0a0a)" }} />
//           <div className="max-w-6xl mx-auto relative z-10">
//             <FadeIn>
//             </FadeIn>
//             <FadeIn delay={0.1}>
//               <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
//                 Guides & <span style={{ color: "#22c55e" }}>Farming Resources</span>
//               </h2>
//             </FadeIn>
//             <FadeIn delay={0.2}>
//               <p className="text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
//                 Curated agricultural knowledge from trusted institutions, universities, and research bodies across India.
//               </p>
//             </FadeIn>
//             <div className="grid md:grid-cols-2 gap-5">
//               {[
//                 { title: "Agricultural Universities", desc: "Research-backed crop practices and seasonal farming guides from India's leading agricultural institutions." },
//                 { title: "Government Departments", desc: "Official advisories, scheme announcements, and policy updates directly from central and state authorities." },
//                 { title: "Research Institutions", desc: "Scientific studies, field trials, and innovations driving the future of sustainable agriculture in India." },
//                 { title: "Krishi Vigyan Kendras (KVKs)", desc: "Regional farming guidance and practical field-level knowledge tailored to local crops and conditions." },
//               ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
//             </div>
//           </div>
//         </section>

//         <Separator />

//         {/* ===== GOVERNMENT SCHEMES ===== */}
//         <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
//           <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(34,197,94,0.04) 0%, transparent 60%)" }} />
//           <div className="max-w-6xl mx-auto relative z-10">
//             <FadeIn>
//             </FadeIn>
//             <FadeIn delay={0.1}>
//               <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
//                 Government <span style={{ color: "#22c55e" }}>Schemes</span> & Support
//               </h2>
//             </FadeIn>
//             <FadeIn delay={0.2}>
//               <p className="text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
//                 Stay informed about central and state agricultural initiatives, subsidies, and farmer welfare programs designed to support you.
//               </p>
//             </FadeIn>
//             <div className="grid md:grid-cols-2 gap-5">
//               {[
//                 { title: "Central & State Schemes", desc: "Explore ongoing agriculture development programs and farmer welfare initiatives from across India." },
//                 { title: "Subsidies & Financial Aid", desc: "Discover financial assistance available for seeds, equipment, fertilizers, and modern farming tools." },
//                 { title: "Crop Insurance Programs", desc: "Understand protection schemes designed to safeguard farmers against crop failure, drought, and losses." },
//                 { title: "Application Guidance", desc: "Step-by-step information on eligibility checks, required documents, and how to apply for schemes." },
//               ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
//             </div>
//           </div>
//         </section>

//         <Separator />

//         {/* ===== CTA ===== */}
//         <section className="relative bg-[#0a0a0a] py-32 px-6 text-white text-center overflow-hidden">
//           <div
//             className="absolute inset-0 pointer-events-none"
//             style={{
//               backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=60')`,
//               backgroundSize: "cover", backgroundPosition: "center", opacity: 0.06,
//             }}
//           />
//           <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 30%, transparent 70%, #0a0a0a 100%)" }} />
//           <div
//             className="absolute pointer-events-none"
//             style={{
//               width: 800, height: 400, borderRadius: "50%",
//               background: "radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)",
//               top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(60px)",
//             }}
//           />
//           <div className="relative z-10 max-w-3xl mx-auto">
//             <FadeIn>
//               <p className="text-green-400 tracking-widest text-xs uppercase mb-6" style={{ letterSpacing: "0.25em" }}>
//                 Join CropYaan
//               </p>
//             </FadeIn>
//             <FadeIn delay={0.1}>
//               <h2
//                 className="display-font font-bold mb-6 leading-tight"
//                 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#fff" }}
//               >
//                 Your Farming Journey <br />
//                 <span style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.35)", fontStyle: "italic" }}>
//                   Starts with Knowledge
//                 </span>
//               </h2>
//             </FadeIn>
//             <FadeIn delay={0.2}>
//               <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto" style={{ fontWeight: 300, lineHeight: 1.8 }}>
//                 Explore CropYaan's free knowledge hub — from government schemes and crop advisories to market prices and weather insights, all in one place.
//               </p>
//             </FadeIn>
//             <FadeIn delay={0.3}>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button
//                   className="px-10 py-4 rounded-xl font-semibold text-sm"
//                   style={{
//                     background: "#22c55e", color: "#000",
//                     boxShadow: "0 0 40px rgba(34,197,94,0.4)",
//                     letterSpacing: "0.06em", transition: "all 0.3s",
//                   }}
//                   onMouseEnter={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.boxShadow = "0 0 60px rgba(34,197,94,0.6)"; }}
//                   onMouseLeave={e => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.boxShadow = "0 0 40px rgba(34,197,94,0.4)"; }}
//                 >
//                   Explore Resources
//                 </button>
//                 <button
//                   className="px-10 py-4 rounded-xl font-semibold text-sm text-white"
//                   style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", letterSpacing: "0.06em", transition: "all 0.3s" }}
//                   onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)"; e.currentTarget.style.background = "rgba(34,197,94,0.08)"; }}
//                   onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
//                 >
//                   Browse Guides
//                 </button>
//               </div>
//             </FadeIn>
//           </div>
//         </section>

//         <Separator />
//       </div>
//     </>
//   );
// }





import Navbar from "./Navbar";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const GrainOverlay = () => (
  <div
    style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.032,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundSize: "128px 128px",
    }}
  />
);

const Separator = () => (
  <div className="relative h-px w-full overflow-hidden">
    <div style={{ background: "linear-gradient(90deg, transparent 0%, #22c55e44 30%, #22c55e88 50%, #22c55e44 70%, transparent 100%)", height: "1px" }} />
  </div>
);

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
};

const PillarCard = ({ icon, label, desc, delay }) => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `all 0.8s ease ${delay}s` }}>
      <div
        className="text-center px-6 py-8 rounded-2xl cursor-default"
        style={{
          background: hovered ? "rgba(34,197,94,0.04)" : "rgba(255,255,255,0.025)",
          border: hovered ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.07)",
          boxShadow: hovered ? "0 0 40px rgba(34,197,94,0.07)" : "none",
          transition: "all 0.4s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="text-3xl mb-4">{icon}</div>
        <div className="font-semibold text-white text-sm mb-2" style={{ letterSpacing: "0.02em" }}>{label}</div>
        <div className="text-zinc-500 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{desc}</div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc, index }) => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `all 0.8s ease ${index * 0.1}s` }}
    >
      <div
        className="h-full rounded-2xl p-8 cursor-default"
        style={{
          background: hovered ? "rgba(34,197,94,0.04)" : "rgba(255,255,255,0.025)",
          border: hovered ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(255,255,255,0.07)",
          boxShadow: hovered ? "0 0 40px rgba(34,197,94,0.07)" : "none",
          transition: "all 0.4s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-10 h-0.5 rounded-full mb-6" style={{ background: "#22c55e", boxShadow: "0 0 10px rgba(34,197,94,0.5)", width: hovered ? 56 : 40, transition: "width 0.4s" }} />
        <h3
          className="display-font text-xl font-bold mb-3"
          style={{ color: hovered ? "#22c55e" : "#fff", fontFamily: "'Playfair Display', serif", transition: "color 0.3s" }}
        >
          {title}
        </h3>
        <p className="text-base leading-relaxed" style={{ color: hovered ? "rgba(255,255,255,0.8)" : "rgba(161,161,170,1)", fontWeight: 300, transition: "color 0.3s" }}>
          {desc}
        </p>
      </div>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const bg = heroRef.current.querySelector(".hero-bg");
        if (bg) bg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .home-root { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes weatherPulse { 0%, 100% { box-shadow: 0 0 32px rgba(34,197,94,0.35); } 50% { box-shadow: 0 0 56px rgba(34,197,94,0.6); } }
      `}</style>
      <GrainOverlay />
      <div className="home-root bg-[#0a0a0a] overflow-x-hidden">
        <Navbar />

        {/* ===== HERO ===== */}
        <section ref={heroRef} className="relative h-screen w-full flex flex-col overflow-hidden">
          <div
            className="hero-bg absolute inset-0 scale-110"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1974&auto=format&fit=crop')",
              backgroundSize: "cover", backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 50%, #0a0a0a 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(34,197,94,0.06) 0%, transparent 65%)" }} />

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div style={{ animation: "fadeUp 1s ease 0.45s both" }}>
              <h1
                className="display-font text-white leading-tight mb-8"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.8rem, 7vw, 6rem)",
                  textShadow: "0 2px 40px rgba(0,0,0,0.5)",
                }}
              >
                Empowering Farmers with <br />
                <span style={{ color: "#22c55e", textShadow: "0 0 60px rgba(34,197,94,0.4)", fontStyle: "italic" }}>
                  Knowledge
                </span>
              </h1>
            </div>
            <div style={{ animation: "fadeUp 1s ease 0.65s both" }}>
              <p className="text-zinc-300 text-lg max-w-xl mb-12" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                Reliable agricultural knowledge and insights — from government schemes and weather forecasts to crop guidance and market prices.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center" style={{ animation: "fadeUp 1s ease 0.85s both" }}>
              <button
                className="px-8 py-4 rounded-xl font-semibold text-sm tracking-wide"
                style={{
                  background: "#22c55e", color: "#000",
                  boxShadow: "0 0 32px rgba(34,197,94,0.4)",
                  letterSpacing: "0.05em", transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.boxShadow = "0 0 48px rgba(34,197,94,0.6)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.boxShadow = "0 0 32px rgba(34,197,94,0.4)"; }}
                onClick={() => navigate("/services")}
              >
                Explore Resources
              </button>
              <button
                className="px-8 py-4 rounded-xl font-semibold text-sm tracking-wide text-white"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", letterSpacing: "0.05em", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)"; e.currentTarget.style.background = "rgba(34,197,94,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                onClick={() => navigate("/how-it-works")}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="relative z-10 flex justify-center pb-10" style={{ animation: "fadeUp 1s ease 1.1s both" }}>
            <div className="flex flex-col items-center gap-2 opacity-40">
              <div className="w-px h-12 bg-white" style={{ animation: "pulse 2s infinite" }} />
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== KNOWLEDGE PILLARS (replaces fake stats) ===== */}
        <section className="bg-[#0a0a0a] py-16 px-6 lg:px-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.04) 0%, transparent 70%)" }} />
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            <PillarCard icon="🌾" label="Crop Advisory"       desc="Season-wise guidance from KVKs & ICAR"            delay={0}   />
            <PillarCard icon="🌦️" label="Weather Forecasts"   desc="Localised updates from IMD"                       delay={0.1} />
            <PillarCard icon="📋" label="Govt Schemes"        desc="Subsidies, insurance & welfare programs"          delay={0.2} />
            <PillarCard icon="📈" label="Market Prices"       desc="Live mandi rates via Agmarknet"                   delay={0.3} />
          </div>
        </section>

        <Separator />

        {/* ===== WEATHER ADVISORY BANNER ===== */}
        <section className="bg-[#0a0a0a] py-16 px-6 lg:px-20">
          <FadeIn>
            <div
              className="max-w-5xl mx-auto rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.03) 100%)",
                border: "1px solid rgba(34,197,94,0.2)",
              }}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left text */}
                <div className="px-10 py-12">
                  <p className="text-green-400 text-xs uppercase tracking-widest mb-4" style={{ letterSpacing: "0.2em" }}>
                    Smart Crop Planning
                  </p>
                  <h2
                    className="display-font text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Plan your crops around <br />
                    <span style={{ color: "#22c55e", textShadow: "0 0 30px rgba(34,197,94,0.35)" }}>
                      today's weather
                    </span>
                  </h2>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8" style={{ fontWeight: 300, maxWidth: 380 }}>
                    Weather is the single biggest factor affecting crop success. Our Weather Advisory tool
                    gives you real-time conditions — temperature, rainfall probability, and wind speed —
                    so you can decide the right day to sow, spray, or irrigate.
                  </p>
                  <button
                    className="flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm"
                    style={{
                      background: "#22c55e",
                      color: "#000",
                      letterSpacing: "0.05em",
                      animation: "weatherPulse 3s ease-in-out infinite",
                      transition: "background 0.3s",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.animation = "none"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.animation = "weatherPulse 3s ease-in-out infinite"; }}
                    onClick={() => navigate("/weather-advisory")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                    </svg>
                    Check Weather Advisory
                  </button>
                </div>

                {/* Right — why it matters */}
                <div
                  className="px-10 py-12 flex flex-col justify-center gap-5"
                  style={{ borderLeft: "1px solid rgba(34,197,94,0.12)" }}
                >
                  {[
                    { icon: "🌧️", title: "Avoid crop losses from rain", desc: "Know before rain hits — delay fertilizer application on high-rainfall days." },
                    { icon: "🌡️", title: "Beat extreme heat & cold", desc: "Get alerts when temperatures threaten sensitive crops so you can act early." },
                    { icon: "💨", title: "Skip spraying on windy days", desc: "Wind drift wastes pesticides and damages nearby crops. Check first." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                      <div>
                        <p className="text-white text-sm font-semibold mb-0.5">{item.title}</p>
                        <p className="text-zinc-500 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        <Separator />

        {/* ===== FARMING STATISTICS ===== */}
        <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1800&q=50')`,
              backgroundSize: "cover", backgroundPosition: "center", opacity: 0.04,
            }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0a, transparent 30%, transparent 70%, #0a0a0a)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                Farming <span style={{ color: "#22c55e" }}>Statistics</span> & Insights
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
                Accurate agricultural data to help farmers make well-informed decisions every season.
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: "Crop-wise Production Data", desc: "Explore production volumes across crops and regions with clear, accessible breakdowns for every farmer." },
                { title: "Soil Health Information", desc: "Understand nutrient levels and soil conditions with practical guidance for healthier, more productive fields." },
                { title: "Yield Trends & Regional Patterns", desc: "Learn from seasonal yield patterns across regions to better plan your next crop cycle." },
                { title: "Market Price Insights", desc: "Stay informed on historical and current crop prices so you can choose the best time to sell." },
              ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== CHALLENGES ===== */}
        <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(34,197,94,0.04) 0%, transparent 60%)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                Challenges Modern <span style={{ color: "#22c55e" }}>Farmers</span> Face
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
                Agriculture today is more complex than ever. Farmers deserve access to the right knowledge at the right time.
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: "Unpredictable Weather", desc: "Shifting climate patterns demand timely weather forecasts and adaptive crop planning to protect livelihoods." },
                { title: "Declining Yields", desc: "Soil degradation and pest resistance call for updated farming techniques and research-backed crop guidance." },
                { title: "Market Volatility", desc: "Unpredictable price swings make access to current market information essential for confident selling decisions." },
                { title: "Awareness of Support Schemes", desc: "Many farmers miss out on government subsidies and welfare programs simply due to lack of accessible information." },
              ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== MODERN FARMING KNOWLEDGE — SPLIT LAYOUT ===== */}
        <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT — Resource List */}
            <div>
              <FadeIn delay={0.1}>
                <h2
                  className="display-font text-4xl md:text-5xl font-bold mb-6 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Modern Farming <span style={{ color: "#22c55e" }}>Knowledge</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-zinc-400 text-base leading-relaxed mb-10" style={{ fontWeight: 300 }}>
                  Bringing farmers closer to trusted knowledge — from university research and KVK advisories to weather data and sustainable farming practices.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="space-y-4">
                  {[
                    { label: "Farmer Advisory Services", desc: "Government advisory alerts and farming guidance on crops, weather, and best practices.", href: "https://mkisan.gov.in" },
                    { label: "Weather Forecasts", desc: "Localised forecasts from the India Meteorological Department.", href: "https://mausam.imd.gov.in" },
                    { label: "Government Schemes", desc: "Explore PM-Kisan and other central farmer welfare programs.", href: "https://pmkisan.gov.in" },
                    { label: "Market Price Insights", desc: "Live and historical mandi prices via Agmarknet.", href: "https://agmarknet.gov.in" },
                    { label: "Research & Best Practices", desc: "Scientific farming innovations and field research from ICAR.", href: "https://icar.org.in" },
                  ].map((item, i) => (
                    <FadeIn key={i} delay={0.35 + i * 0.08}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 rounded-xl px-5 py-4"
                        style={{
                          background: "rgba(255,255,255,0.025)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          textDecoration: "none",
                          transition: "all 0.35s",
                          display: "flex",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"; e.currentTarget.style.background = "rgba(34,197,94,0.05)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.025)"; }}
                      >
                        <div style={{ marginTop: 6, flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }} />
                        <div>
                          <div className="text-sm font-semibold mb-0.5" style={{ color: "#fff" }}>
                            {item.label}
                            <span className="ml-2 text-xs" style={{ color: "#22c55e", opacity: 0.7 }}>↗</span>
                          </div>
                          <div className="text-xs" style={{ color: "rgba(161,161,170,0.85)", fontWeight: 300 }}>{item.desc}</div>
                        </div>
                      </a>
                    </FadeIn>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* RIGHT — Info Cards */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl" style={{ background: "radial-gradient(circle at 60% 40%, rgba(34,197,94,0.08) 0%, transparent 70%)" }} />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Farmer Advisory Services", desc: "Government advisory alerts and farming guidance on crops, weather, and best practices.", href: "https://mkisan.gov.in" },
                  { title: "Weather Forecasts", desc: "Localised weather updates to help plan sowing, irrigation, and harvesting effectively.", href: "https://mausam.imd.gov.in" },
                  { title: "Market Price Tracking", desc: "Up-to-date mandi prices and market trends to maximise returns at the right time.", href: "https://agmarknet.gov.in" },
                  { title: "Sustainable Practices", desc: "Eco-friendly farming methods that improve long-term soil health and crop productivity.", href: "https://icar.org.in" },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl p-6"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        textDecoration: "none",
                        transition: "all 0.4s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.25)"; e.currentTarget.style.background = "rgba(34,197,94,0.04)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.025)"; }}
                    >
                      <h4 className="text-sm font-semibold mb-2" style={{ color: "#fff" }}>
                        {item.title}
                        <span className="ml-1 text-xs" style={{ color: "#22c55e", opacity: 0.7 }}>↗</span>
                      </h4>
                      <p className="text-zinc-500 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{item.desc}</p>
                    </a>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== GUIDES & TUTORIALS ===== */}
        <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1800&q=50')`,
              backgroundSize: "cover", backgroundPosition: "center", opacity: 0.04,
            }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0a, transparent 25%, transparent 75%, #0a0a0a)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                Guides & <span style={{ color: "#22c55e" }}>Farming Resources</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
                Curated agricultural knowledge from trusted institutions, universities, and research bodies across India.
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: "Agricultural Universities", desc: "Research-backed crop practices and seasonal farming guides from India's leading agricultural institutions." },
                { title: "Government Departments", desc: "Official advisories, scheme announcements, and policy updates directly from central and state authorities." },
                { title: "Research Institutions", desc: "Scientific studies, field trials, and innovations driving the future of sustainable agriculture in India." },
                { title: "Krishi Vigyan Kendras (KVKs)", desc: "Regional farming guidance and practical field-level knowledge tailored to local crops and conditions." },
              ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== GOVERNMENT SCHEMES ===== */}
        <section className="relative bg-[#0a0a0a] py-24 px-6 lg:px-20 text-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(34,197,94,0.04) 0%, transparent 60%)" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn delay={0.1}>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                Government <span style={{ color: "#22c55e" }}>Schemes</span> & Support
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 mb-16 text-center max-w-xl mx-auto" style={{ fontWeight: 300 }}>
                Stay informed about central and state agricultural initiatives, subsidies, and farmer welfare programs designed to support you.
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: "Central & State Schemes", desc: "Explore ongoing agriculture development programs and farmer welfare initiatives from across India." },
                { title: "Subsidies & Financial Aid", desc: "Discover financial assistance available for seeds, equipment, fertilizers, and modern farming tools." },
                { title: "Crop Insurance Programs", desc: "Understand protection schemes designed to safeguard farmers against crop failure, drought, and losses." },
                { title: "Application Guidance", desc: "Step-by-step information on eligibility checks, required documents, and how to apply for schemes." },
              ].map((item, i) => <FeatureCard key={i} title={item.title} desc={item.desc} index={i} />)}
            </div>
          </div>
        </section>

        <Separator />

        {/* ===== CTA ===== */}
        <section className="relative bg-[#0a0a0a] py-32 px-6 text-white text-center overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=60')`,
              backgroundSize: "cover", backgroundPosition: "center", opacity: 0.06,
            }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 30%, transparent 70%, #0a0a0a 100%)" }} />
          <div
            className="absolute pointer-events-none"
            style={{
              width: 800, height: 400, borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)",
              top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(60px)",
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <FadeIn delay={0.1}>
              <h2
                className="display-font font-bold mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#fff" }}
              >
                Your Farming Journey <br />
                <span style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.35)", fontStyle: "italic" }}>
                  Starts with Knowledge
                </span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                Explore CropYaan's free knowledge hub — from government schemes and crop advisories to market prices and weather insights, all in one place.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="px-10 py-4 rounded-xl font-semibold text-sm"
                  style={{
                    background: "#22c55e", color: "#000",
                    boxShadow: "0 0 40px rgba(34,197,94,0.4)",
                    letterSpacing: "0.06em", transition: "all 0.3s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.boxShadow = "0 0 60px rgba(34,197,94,0.6)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.boxShadow = "0 0 40px rgba(34,197,94,0.4)"; }}
                  onClick={() => navigate("/services")}
                >
                  Explore Resources
                </button>
                <button
                  className="px-10 py-4 rounded-xl font-semibold text-sm text-white"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", letterSpacing: "0.06em", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)"; e.currentTarget.style.background = "rgba(34,197,94,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                  onClick={() => navigate("/about")}
                >
                  Browse Guides
                </button>
              </div>
            </FadeIn>
          </div>
        </section>

        <Separator />
      </div>
    </>
  );
}