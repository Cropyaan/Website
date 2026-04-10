// import { useState, useEffect, useRef, useCallback } from "react";
// import { useTranslation } from "react-i18next";
// import {
//   MapPin, Search, Thermometer, Droplets, Wind, CloudRain,
//   Sprout, Leaf, AlertTriangle, ChevronRight, ChevronDown,
//   RotateCcw, Info, TrendingUp, X, Tractor, Users, Beef, Waves
// } from "lucide-react";
// import { useCropAdvisor, ADVISOR_STATUS } from "../hooks/useCropAdvisor.js";
// import { weatherCodeToEmoji, weatherCodeToLabel } from "../services/weatherService.js";

// // ── Step constants ────────────────────────────────────────────────────────────
// const STEP = { SEARCH: "search", MAP: "map", CONDITIONS: "conditions", INPUTS: "inputs", RESULTS: "results" };

// // ── Leaflet lazy loader ───────────────────────────────────────────────────────
// let MC = null;
// async function loadMap() {
//   if (MC) return MC;
//   const { MapContainer, TileLayer, Marker, useMapEvents, useMap } = await import("react-leaflet");
//   MC = { MapContainer, TileLayer, Marker, useMapEvents, useMap };
//   return MC;
// }

// // ── Design tokens (match Cropyaan) ───────────────────────────────────────────
// const GREEN       = "#22c55e";
// const GREEN_DIM   = "rgba(34,197,94,0.10)";
// const GREEN_BORDER= "rgba(34,197,94,0.25)";

// // ── Small reusable components ─────────────────────────────────────────────────

// function SectionTag({ children }) {
//   return (
//     <p className="text-xs uppercase mb-3 font-semibold tracking-widest" style={{ color: GREEN }}>
//       {children}
//     </p>
//   );
// }

// function ConfidenceBadge({ score, label, color }) {
//   return (
//     <span style={{ display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:12,fontSize:11,fontWeight:600,background:`${color}18`,color }}>
//       <span style={{ width:6,height:6,borderRadius:"50%",background:color }} />
//       {label} — {score}%
//     </span>
//   );
// }

// function StatCard({ icon: Icon, label, value, unit, sub, accent }) {
//   return (
//     <div className="card rounded-xl p-4 flex flex-col gap-1 cursor-default">
//       <div className="flex items-center gap-1.5">
//         <Icon size={13} color={accent} />
//         <span className="text-xs font-medium" style={{ color:"var(--color-text-muted)" }}>{label}</span>
//       </div>
//       <div className="flex items-baseline gap-1">
//         <span className="text-xl font-semibold" style={{ color:"var(--color-text)" }}>{value}</span>
//         {unit && <span className="text-xs" style={{ color:"var(--color-text-muted)" }}>{unit}</span>}
//       </div>
//       {sub && <span className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>{sub}</span>}
//     </div>
//   );
// }

// function SeasonBadge({ season }) {
//   if (!season) return null;
//   const colors = {
//     kharif:{ bg:"rgba(34,197,94,0.10)",  text:"#16a34a", border:"rgba(34,197,94,0.30)"  },
//     rabi:  { bg:"rgba(59,130,246,0.10)", text:"#1d4ed8", border:"rgba(59,130,246,0.30)" },
//     zaid:  { bg:"rgba(251,146,60,0.10)", text:"#c2410c", border:"rgba(251,146,60,0.30)" },
//   };
//   const c = colors[season.season.id] || colors.kharif;
//   return (
//     <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:20,background:c.bg,border:`1px solid ${c.border}` }}>
//       <span style={{ fontSize:15 }}>{season.season.emoji}</span>
//       <div>
//         <div className="text-xs font-semibold" style={{ color:c.text }}>{season.season.label}</div>
//         <div className="text-xs" style={{ color:c.text,opacity:0.7 }}>{season.season.months}</div>
//       </div>
//     </div>
//   );
// }

// function SoilBadge({ soil }) {
//   if (!soil?.primary) return null;
//   return (
//     <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:20,background:`${soil.primary.color}15`,border:`1px solid ${soil.primary.color}40` }}>
//       <div style={{ width:10,height:10,borderRadius:"50%",background:soil.primary.color,flexShrink:0 }} />
//       <div>
//         <div className="text-xs font-semibold" style={{ color:"var(--color-text)" }}>{soil.primary.label}</div>
//         <div className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>Primary soil type</div>
//       </div>
//     </div>
//   );
// }

// function StepDots({ current }) {
//   const steps = [STEP.SEARCH, STEP.MAP, STEP.CONDITIONS, STEP.INPUTS, STEP.RESULTS];
//   const idx = steps.indexOf(current);
//   return (
//     <div className="flex items-center justify-center gap-2 mb-8">
//       {steps.map((s, i) => (
//         <div key={s} style={{
//           width: i === idx ? 20 : 6,
//           height: 6,
//           borderRadius: 3,
//           background: i <= idx ? GREEN : "var(--overlay-10)",
//           transition: "all 0.3s ease",
//         }} />
//       ))}
//     </div>
//   );
// }

// // ── Map sub-components ────────────────────────────────────────────────────────

// function MapClickHandler({ onMapClick }) {
//   if (!MC) return null;
//   MC.useMapEvents({ click(e) { onMapClick(e.latlng.lat, e.latlng.lng); } });
//   return null;
// }

// function FlyToLocation({ center }) {
//   if (!MC) return null;
//   const map = MC.useMap();
//   useEffect(() => {
//     if (center && map) map.flyTo(center, 11, { duration: 1.0 });
//   }, [center?.[0], center?.[1]]);
//   return null;
// }

// // ── CropCard ──────────────────────────────────────────────────────────────────

// function CropCard({ result, rank }) {
//   const [expanded, setExpanded] = useState(false);
//   const { crop, score, confidence, reasons, warnings } = result;
//   const rankColors = ["#F59E0B","#94A3B8","#CD7C3A"];
//   const rankLabels = ["1st","2nd","3rd"];

//   return (
//     <div className="card rounded-2xl overflow-hidden" style={{ transition:"border-color 0.15s" }}>
//       <div className="flex items-start gap-3 p-4 cursor-pointer"
//         onClick={() => setExpanded(e => !e)}
//         style={{ borderBottom: expanded ? "1px solid var(--overlay-7)" : "none" }}>
//         <div style={{ minWidth:30,height:30,borderRadius:"50%",background:`${rankColors[rank]}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:rankColors[rank],flexShrink:0 }}>
//           {rankLabels[rank]}
//         </div>
//         <div style={{ flex:1,minWidth:0 }}>
//           <div className="flex items-center gap-2 flex-wrap mb-1">
//             <span style={{ fontSize:18 }}>{crop.emoji}</span>
//             <span className="font-semibold text-sm" style={{ color:"var(--color-text)" }}>{crop.name}</span>
//             <span className="text-xs px-2 py-0.5 rounded-full" style={{ background:"var(--overlay-5)",color:"var(--color-text-muted)" }}>{crop.category}</span>
//           </div>
//           <p className="text-xs mb-2" style={{ color:"var(--color-text-muted)",fontWeight:300,lineHeight:1.5 }}>{crop.description}</p>
//           <ConfidenceBadge {...confidence} score={score} />
//         </div>
//         <ChevronRight size={15} style={{ color:"var(--color-text-muted)",flexShrink:0,marginTop:4,transform:expanded?"rotate(90deg)":"none",transition:"transform 0.2s" }} />
//       </div>

//       {expanded && (
//         <div className="p-4 flex flex-col gap-3">
//           <div>
//             <div className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color:"var(--color-text-muted)" }}>Why it fits</div>
//             {reasons.map((r,i) => (
//               <div key={i} className="flex gap-2 text-xs mb-1" style={{ color:"var(--color-text)" }}>
//                 <span style={{ color:GREEN,flexShrink:0 }}>✓</span>
//                 <span>{r.replace(/^✓\s*/,"")}</span>
//               </div>
//             ))}
//           </div>
//           {warnings.length > 0 && (
//             <div className="rounded-xl p-2.5" style={{ background:"rgba(251,146,60,0.08)",border:"1px solid rgba(251,146,60,0.25)" }}>
//               {warnings.map((w,i) => (
//                 <div key={i} className="flex gap-2 text-xs" style={{ color:"#c2410c" }}>
//                   <AlertTriangle size={11} style={{ flexShrink:0,marginTop:1 }} />{w}
//                 </div>
//               ))}
//             </div>
//           )}
//           <div className="grid grid-cols-3 gap-2">
//             {[{label:"Water need",value:crop.waterRequirement},{label:"Duration",value:crop.growthDuration},{label:"Yield",value:crop.yieldPotential}].map(({label,value}) => (
//               <div key={label} className="rounded-xl p-2.5" style={{ background:"var(--overlay-5)" }}>
//                 <div className="text-xs mb-0.5" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>{label}</div>
//                 <div className="text-xs font-semibold" style={{ color:"var(--color-text)" }}>{value}</div>
//               </div>
//             ))}
//           </div>
//           <div className="rounded-xl p-3" style={{ background:GREEN_DIM,border:`1px solid ${GREEN_BORDER}` }}>
//             <div className="text-xs font-semibold mb-1" style={{ color:"#16a34a" }}>💡 Farmer tip</div>
//             <div className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300,lineHeight:1.5 }}>{crop.tips}</div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ── FarmInputs form ───────────────────────────────────────────────────────────

// const WATER_OPTIONS   = ["Rainfed only","Borewell/Well","Canal/River","Drip irrigation"];
// const LABOUR_OPTIONS  = ["Only family","1–3 hired workers","4–10 workers","Large workforce"];
// const CATTLE_OPTIONS  = ["None","1–2 animals","3–5 animals","6+ animals"];
// const LAND_OPTIONS    = ["< 1 acre","1–3 acres","3–10 acres","10+ acres"];

// function OptionPill({ label, selected, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="text-xs px-3 py-2 rounded-xl cursor-pointer text-left"
//       style={{
//         border: `1px solid ${selected ? GREEN : "var(--overlay-10)"}`,
//         background: selected ? GREEN_DIM : "var(--overlay-5)",
//         color: selected ? "#16a34a" : "var(--color-text-muted)",
//         fontFamily: "'DM Sans', sans-serif",
//         fontWeight: selected ? 600 : 300,
//         transition: "all 0.15s",
//       }}
//     >{label}</button>
//   );
// }

// function FarmInputs({ onSubmit }) {
//   const [water,   setWater]   = useState("");
//   const [land,    setLand]    = useState("");
//   const [labour,  setLabour]  = useState("");
//   const [cattle,  setCattle]  = useState("");

//   const ready = water && land && labour && cattle;

//   const fields = [
//     { icon: Waves,   label: "Water Availability", opts: WATER_OPTIONS,  val: water,  set: setWater  },
//     { icon: Leaf,    label: "Land Size",           opts: LAND_OPTIONS,   val: land,   set: setLand   },
//     { icon: Users,   label: "Labour Available",    opts: LABOUR_OPTIONS, val: labour, set: setLabour },
//     { icon: Beef,    label: "Cattle / Animals",    opts: CATTLE_OPTIONS, val: cattle, set: setCattle },
//   ];

//   return (
//     <div className="card rounded-2xl p-5 flex flex-col gap-5">
//       <div>
//         <SectionTag>Farm Profile</SectionTag>
//         <h3 className="display-font text-xl font-bold mb-1" style={{ color:"var(--color-text)" }}>
//           Tell us about your farm
//         </h3>
//         <p className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300,lineHeight:1.6 }}>
//           This helps us refine crop recommendations to match your actual resources.
//         </p>
//       </div>

//       {fields.map(({ icon: Icon, label, opts, val, set }) => (
//         <div key={label}>
//           <div className="flex items-center gap-2 mb-2">
//             <Icon size={13} color={GREEN} />
//             <span className="text-xs font-semibold" style={{ color:"var(--color-text)" }}>{label}</span>
//           </div>
//           <div className="grid grid-cols-2 gap-2">
//             {opts.map(o => (
//               <OptionPill key={o} label={o} selected={val === o} onClick={() => set(o)} />
//             ))}
//           </div>
//         </div>
//       ))}

//       <button
//         disabled={!ready}
//         onClick={() => onSubmit({ water, land, labour, cattle })}
//         className="w-full py-3 rounded-xl font-semibold text-sm cursor-pointer"
//         style={{
//           background: ready ? GREEN : "var(--overlay-10)",
//           color: ready ? "#fff" : "var(--color-text-muted)",
//           border: "none",
//           fontFamily: "'DM Sans', sans-serif",
//           transition: "all 0.2s",
//           opacity: ready ? 1 : 0.6,
//         }}
//       >
//         {ready ? "Get Crop Recommendations →" : "Select all options above"}
//       </button>
//     </div>
//   );
// }

// // ── Main Component ────────────────────────────────────────────────────────────

// export default function CropAdvisor() {
//   const { t } = useTranslation();
//   const advisor = useCropAdvisor();
//   const searchRef = useRef(null);

//   const [step, setStep]         = useState(STEP.SEARCH);
//   const [MapComps, setMapComps] = useState(null);
//   const [mapCenter, setMapCenter] = useState(null);
//   const [mapMarker, setMapMarker] = useState(null);
//   const [farmInputs, setFarmInputs] = useState(null);

//   // Load Leaflet eagerly so map is ready when needed
//   useEffect(() => {
//     loadMap().then(comps => { MC = comps; setMapComps(comps); });
//   }, []);

//   // When advisor finishes loading, move to conditions step
//   useEffect(() => {
//     if (advisor.status === ADVISOR_STATUS.SUCCESS && step === STEP.MAP) {
//       setStep(STEP.CONDITIONS);
//     }
//   }, [advisor.status]);

//   function handleSelectLocation(loc) {
//     setMapCenter([loc.lat, loc.lng]);
//     setMapMarker([loc.lat, loc.lng]);
//     setStep(STEP.MAP);
//     advisor.selectLocation(loc);
//   }

//   function handleMapClick(lat, lng) {
//     setMapCenter([lat, lng]);
//     setMapMarker([lat, lng]);
//     advisor.handleMapClick(lat, lng);
//   }

//   function handleFarmSubmit(inputs) {
//     setFarmInputs(inputs);
//     setStep(STEP.RESULTS);
//   }

//   function handleReset() {
//     advisor.reset();
//     setStep(STEP.SEARCH);
//     setMapCenter(null);
//     setMapMarker(null);
//     setFarmInputs(null);
//   }

//   const btnStyle = {
//     fontFamily: "'DM Sans', sans-serif",
//     border: "1px solid var(--overlay-10)",
//     background: "var(--overlay-5)",
//     color: "var(--color-text-muted)",
//     cursor: "pointer",
//   };

//   return (
//     <div className="page-root overflow-x-hidden" style={{ background:"var(--bg-main)",color:"var(--color-text)",minHeight:"100vh" }}>

//       {/* ── Hero ─────────────────────────────────────────────────────── */}
//       <section className="relative py-14 px-6 lg:px-20 overflow-hidden">
//         <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse at 50% 0%, var(--green-8) 0%, transparent 65%)" }} />
//         <div className="max-w-3xl mx-auto text-center relative z-10">
//           <p className="text-xs uppercase mb-3 font-semibold tracking-widest" style={{ color:GREEN }}>Smart Crop Planning</p>
//           <h1 className="display-font text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color:"var(--color-text)" }}>
//             Location-Based{" "}
//             <span style={{ color:GREEN,textShadow:"0 0 40px rgba(34,197,94,0.35)" }}>Crop Advisory</span>
//           </h1>
//           <p className="text-sm max-w-lg mx-auto" style={{ color:"var(--color-text-muted)",fontWeight:300,lineHeight:1.8 }}>
//             Search your location → confirm on map → see conditions → describe your farm → get your top crop recommendations.
//           </p>
//         </div>
//       </section>

//       {/* ── Main content ─────────────────────────────────────────────── */}
//       <section className="px-6 lg:px-20 pb-24">
//         <div className="max-w-3xl mx-auto">

//           <StepDots current={step} />

//           {/* ── STEP 1: Search ──────────────────────────────────────── */}
//           <div className="relative mb-4">
//             <div className="card flex items-center gap-3 rounded-2xl px-4 py-3">
//               <Search size={15} color={GREEN} />
//               <input
//                 ref={searchRef}
//                 type="text"
//                 placeholder="Search your location (e.g. Warangal, Telangana)…"
//                 value={advisor.searchQuery}
//                 onChange={e => advisor.handleSearchInput(e.target.value)}
//                 style={{ flex:1,border:"none",outline:"none",background:"none",fontSize:14,color:"var(--color-text)",fontFamily:"'DM Sans', sans-serif" }}
//               />
//               {advisor.searchQuery && (
//                 <button onClick={handleReset} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",padding:2 }}>
//                   <X size={13} color="var(--color-text-muted)" />
//                 </button>
//               )}
//             </div>

//             {/* Suggestions dropdown */}
//             {advisor.searchResults.length > 0 && (
//               <div style={{ position:"absolute",top:"100%",left:0,right:0,zIndex:9999,background:"var(--navbar-dropdown-bg)",border:"1px solid var(--overlay-10)",borderRadius:16,marginTop:6,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.12)" }}>
//                 {advisor.searchResults.map(loc => (
//                   <button key={loc.id} onClick={() => handleSelectLocation(loc)}
//                     className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer"
//                     style={{ background:"none",border:"none",borderBottom:"1px solid var(--overlay-5)",fontFamily:"'DM Sans', sans-serif" }}
//                     onMouseEnter={e => e.currentTarget.style.background="var(--overlay-5)"}
//                     onMouseLeave={e => e.currentTarget.style.background="none"}
//                   >
//                     <MapPin size={13} color={GREEN} />
//                     <div>
//                       <div className="text-sm font-medium" style={{ color:"var(--color-text)" }}>{loc.shortName}</div>
//                       <div className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>{loc.displayName?.slice(0,65)}…</div>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* ── STEP 2: Map ─────────────────────────────────────────── */}
//           {(step === STEP.MAP || step === STEP.CONDITIONS || step === STEP.INPUTS || step === STEP.RESULTS) && (
//             <div className="card rounded-2xl overflow-hidden mb-4" style={{ height:340,position:"relative" }}>
//               {MapComps ? (
//                 <MapComps.MapContainer
//                   center={mapCenter || [20.5937, 78.9629]}
//                   zoom={mapCenter ? 10 : 5}
//                   style={{ height:"100%",width:"100%" }}
//                 >
//                   <MapComps.TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution="© OpenStreetMap contributors"
//                   />
//                   <MapClickHandler onMapClick={handleMapClick} />
//                   <FlyToLocation center={mapCenter} />
//                   {mapMarker && <MapComps.Marker position={mapMarker} />}
//                 </MapComps.MapContainer>
//               ) : (
//                 <div className="h-full flex items-center justify-center text-sm" style={{ color:"var(--color-text-muted)" }}>Loading map…</div>
//               )}

//               {/* Map overlay hint */}
//               {step === STEP.MAP && advisor.status === ADVISOR_STATUS.LOADING && (
//                 <div style={{ position:"absolute",bottom:12,left:"50%",transform:"translateX(-50%)",background:"rgba(0,0,0,0.7)",color:"#fff",padding:"6px 16px",borderRadius:20,fontSize:12,zIndex:999,whiteSpace:"nowrap" }}>
//                   ⏳ Fetching conditions…
//                 </div>
//               )}
//               {step === STEP.MAP && advisor.status === ADVISOR_STATUS.IDLE && (
//                 <div style={{ position:"absolute",bottom:12,left:"50%",transform:"translateX(-50%)",background:"rgba(0,0,0,0.65)",color:"#fff",padding:"6px 16px",borderRadius:20,fontSize:12,zIndex:999,whiteSpace:"nowrap" }}>
//                   📍 Click anywhere to pick a different location
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Error */}
//           {advisor.status === ADVISOR_STATUS.ERROR && (
//             <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4 text-sm" style={{ background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.25)",color:"#dc2626" }}>
//               <AlertTriangle size={15} style={{ flexShrink:0 }} />{advisor.error}
//             </div>
//           )}

//           {/* ── Empty state ──────────────────────────────────────────── */}
//           {step === STEP.SEARCH && !advisor.searchQuery && (
//             <div className="py-14 px-6 text-center">
//               <div style={{ fontSize:44,marginBottom:16 }}>🌱</div>
//               <h3 className="display-font text-2xl font-bold mb-3" style={{ color:"var(--color-text)" }}>Find the best crops for your land</h3>
//               <p className="text-sm mb-8 max-w-md mx-auto" style={{ color:"var(--color-text-muted)",fontWeight:300,lineHeight:1.7 }}>
//                 Start by searching your village, town, or district above.
//               </p>
//               <div className="flex gap-2 flex-wrap justify-center">
//                 {["Warangal, Telangana","Ludhiana, Punjab","Nashik, Maharashtra","Coimbatore, Tamil Nadu"].map(loc => (
//                   <button key={loc} onClick={() => { advisor.handleSearchInput(loc); searchRef.current?.focus(); }}
//                     className="text-xs px-4 py-2 rounded-full cursor-pointer"
//                     style={{ border:"1px solid var(--overlay-10)",background:"var(--overlay-5)",color:"var(--color-text-muted)",fontFamily:"'DM Sans', sans-serif" }}
//                     onMouseEnter={e => e.currentTarget.style.borderColor="rgba(34,197,94,0.4)"}
//                     onMouseLeave={e => e.currentTarget.style.borderColor="var(--overlay-10)"}
//                   >{loc}</button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ── STEP 3: Conditions ───────────────────────────────────── */}
//           {(step === STEP.CONDITIONS || step === STEP.INPUTS || step === STEP.RESULTS) && advisor.status === ADVISOR_STATUS.SUCCESS && (
//             <div className="flex flex-col gap-4 mb-4">

//               {/* Location bar */}
//               <div className="card rounded-2xl px-5 py-4">
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <MapPin size={14} color={GREEN} />
//                       <span className="font-semibold text-sm" style={{ color:"var(--color-text)" }}>{advisor.location?.shortName}</span>
//                     </div>
//                     <div className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>
//                       {advisor.location?.lat?.toFixed(4)}°N, {advisor.location?.lng?.toFixed(4)}°E
//                       {advisor.location?.state ? ` · ${advisor.location.state}` : ""}
//                     </div>
//                   </div>
//                   <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs cursor-pointer" style={btnStyle}>
//                     <RotateCcw size={11} /> New search
//                   </button>
//                 </div>
//               </div>

//               {/* Conditions card */}
//               <div className="card rounded-2xl p-5">
//                 <SectionTag>Conditions Snapshot</SectionTag>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
//                   <StatCard icon={Thermometer} label="Temperature" value={advisor.weather.current.temperature} unit="°C" sub={`Avg: ${advisor.weather.weekly.avgTemp}°C`} accent="#ef4444" />
//                   <StatCard icon={CloudRain}   label="Rainfall"    value={advisor.weather.forEngine.rainfall.toFixed(0)} unit="mm/mo" sub={`Today: ${advisor.weather.current.precipitation} mm`} accent="#3b82f6" />
//                   <StatCard icon={Droplets}    label="Humidity"    value={advisor.weather.current.humidity} unit="%" sub={weatherCodeToLabel(advisor.weather.current.weatherCode)} accent="#06b6d4" />
//                   <StatCard icon={Wind}        label="Wind"        value={advisor.weather.current.windSpeed} unit="km/h" sub={`${weatherCodeToEmoji(advisor.weather.current.weatherCode)} ${weatherCodeToLabel(advisor.weather.current.weatherCode)}`} accent="#64748b" />
//                 </div>
//                 <div className="flex flex-wrap gap-3 mb-3">
//                   <SoilBadge soil={advisor.soil} />
//                   <SeasonBadge season={advisor.season} />
//                 </div>
//                 {advisor.season?.note && (
//                   <div className="flex gap-2 items-start rounded-xl px-3 py-2.5 text-xs" style={{ background:"var(--overlay-5)",color:"var(--color-text-muted)",lineHeight:1.6,fontWeight:300 }}>
//                     <Info size={12} style={{ flexShrink:0,marginTop:1 }} />{advisor.season.note}
//                   </div>
//                 )}
//               </div>

//               {/* Advisory warning */}
//               {advisor.advisory && (
//                 <div className="flex gap-3 items-start px-4 py-3 rounded-xl text-xs" style={{ background:"rgba(251,146,60,0.08)",border:"1px solid rgba(251,146,60,0.25)",color:"#c2410c" }}>
//                   <AlertTriangle size={14} style={{ flexShrink:0,marginTop:1 }} />
//                   <span style={{ lineHeight:1.6 }}>{advisor.advisory.join(" ")}</span>
//                 </div>
//               )}

//               {/* CTA to next step */}
//               {step === STEP.CONDITIONS && (
//                 <button
//                   onClick={() => setStep(STEP.INPUTS)}
//                   className="w-full py-3.5 rounded-xl font-semibold text-sm cursor-pointer"
//                   style={{ background:GREEN,color:"#fff",border:"none",fontFamily:"'DM Sans', sans-serif" }}
//                 >
//                   Describe Your Farm to Get Recommendations →
//                 </button>
//               )}
//             </div>
//           )}

//           {/* ── STEP 4: Farm inputs ──────────────────────────────────── */}
//           {(step === STEP.INPUTS || step === STEP.RESULTS) && (
//             <div className="mb-4">
//               {step === STEP.INPUTS ? (
//                 <FarmInputs onSubmit={handleFarmSubmit} />
//               ) : (
//                 /* Collapsed summary of farm inputs */
//                 <div className="card rounded-2xl px-5 py-3 flex items-center justify-between gap-3 cursor-pointer"
//                   onClick={() => setStep(STEP.INPUTS)}>
//                   <div className="flex items-center gap-2">
//                     <Tractor size={14} color={GREEN} />
//                     <span className="text-xs font-semibold" style={{ color:"var(--color-text)" }}>Farm profile set</span>
//                     <span className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>
//                       {farmInputs?.water} · {farmInputs?.land} · {farmInputs?.labour}
//                     </span>
//                   </div>
//                   <ChevronDown size={13} color="var(--color-text-muted)" />
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ── STEP 5: Results ──────────────────────────────────────── */}
//           {step === STEP.RESULTS && advisor.recommendations.length > 0 && (
//             <div className="flex flex-col gap-4">
//               <div className="card rounded-2xl p-5">
//                 <SectionTag>Crop Recommendations</SectionTag>
//                 <div className="flex items-center gap-2 mb-1">
//                   <Sprout size={15} color={GREEN} />
//                   <span className="font-semibold text-sm" style={{ color:"var(--color-text)" }}>
//                     Top crops for your farm
//                   </span>
//                   <span className="text-xs px-2 py-0.5 rounded-full" style={{ background:GREEN_DIM,color:"#16a34a" }}>
//                     Top {advisor.recommendations.length}
//                   </span>
//                 </div>
//                 <p className="text-xs mb-4" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>
//                   Based on {advisor.season?.season?.label} season · {advisor.soil?.primary?.label} · {farmInputs?.water} · {farmInputs?.land}
//                 </p>
//                 <div className="flex flex-col gap-3">
//                   {advisor.recommendations.map((result,i) => (
//                     <CropCard key={result.crop.id} result={result} rank={i} />
//                   ))}
//                 </div>
//               </div>

//               {/* Alt soils */}
//               {advisor.soil?.all?.length > 1 && (
//                 <div className="flex items-start gap-2 px-4 py-3 rounded-xl text-xs" style={{ border:"1px solid var(--overlay-7)",color:"var(--color-text-muted)",fontWeight:300 }}>
//                   <Leaf size={13} style={{ flexShrink:0,marginTop:1 }} color="var(--color-text-muted)" />
//                   <span><strong style={{ fontWeight:500,color:"var(--color-text)" }}>Other soils in this region: </strong>{advisor.soil.all.slice(1).map(s=>s.label).join(", ")}</span>
//                 </div>
//               )}

//               {/* Footer note */}
//               <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs" style={{ border:"1px dashed var(--overlay-10)",color:"var(--color-text-muted)",fontWeight:300 }}>
//                 <TrendingUp size={12} color="var(--color-text-muted)" />
//                 Rule-based recommendations. ML model upgrade ready via <code style={{ fontSize:11,fontFamily:"monospace" }}>recommendationEngine.js</code>
//               </div>

//               {/* Start over */}
//               <button onClick={handleReset}
//                 className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm cursor-pointer"
//                 style={btnStyle}>
//                 <RotateCcw size={13} /> Start a new search
//               </button>
//             </div>
//           )}

//           {/* No results */}
//           {step === STEP.RESULTS && advisor.recommendations.length === 0 && (
//             <div className="card rounded-2xl p-8 text-center">
//               <div style={{ fontSize:36,marginBottom:12 }}>🌾</div>
//               <p className="font-semibold text-sm mb-2" style={{ color:"var(--color-text)" }}>No crops matched</p>
//               <p className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>Try a different location or season.</p>
//               <button onClick={handleReset} className="mt-4 px-4 py-2 rounded-xl text-xs cursor-pointer" style={btnStyle}>
//                 Try again
//               </button>
//             </div>
//           )}

//         </div>
//       </section>
//     </div>
//   );
// }
























import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  MapPin, Search, Thermometer, Droplets, Wind, CloudRain,
  Sprout, Leaf, AlertTriangle, ChevronRight, ChevronDown,
  RotateCcw, Info, TrendingUp, X, Tractor, Users, Beef, Waves
} from "lucide-react";
import { useCropAdvisor, ADVISOR_STATUS } from "../hooks/useCropAdvisor.js";
import { weatherCodeToEmoji, weatherCodeToLabel } from "../services/weatherService.js";

const STEP = { SEARCH:"search", MAP:"map", CONDITIONS:"conditions", INPUTS:"inputs", RESULTS:"results" };
const GREEN = "#22c55e";
const GREEN_DIM = "rgba(34,197,94,0.10)";
const GREEN_BORDER = "rgba(34,197,94,0.25)";

let MC = null;
async function loadMap() {
  if (MC) return MC;
  const { MapContainer, TileLayer, Marker, useMapEvents, useMap } = await import("react-leaflet");
  MC = { MapContainer, TileLayer, Marker, useMapEvents, useMap };
  return MC;
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

function SectionTag({ children }) {
  return <p className="text-xs uppercase mb-3 font-semibold tracking-widest" style={{ color:GREEN }}>{children}</p>;
}

function ConfidenceBadge({ score, label, color }) {
  return (
    <span style={{ display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:12,fontSize:11,fontWeight:600,background:`${color}18`,color }}>
      <span style={{ width:6,height:6,borderRadius:"50%",background:color }} />
      {label} — {score}%
    </span>
  );
}

function StatCard({ icon: Icon, label, value, unit, sub, accent }) {
  return (
    <div className="card rounded-xl p-4 flex flex-col gap-1 cursor-default">
      <div className="flex items-center gap-1.5">
        <Icon size={13} color={accent} />
        <span className="text-xs font-medium" style={{ color:"var(--color-text-muted)" }}>{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-semibold" style={{ color:"var(--color-text)" }}>{value}</span>
        {unit && <span className="text-xs" style={{ color:"var(--color-text-muted)" }}>{unit}</span>}
      </div>
      {sub && <span className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>{sub}</span>}
    </div>
  );
}

function SeasonBadge({ season }) {
  if (!season) return null;
  const colors = {
    kharif:{ bg:"rgba(34,197,94,0.10)",  text:"#16a34a", border:"rgba(34,197,94,0.30)"  },
    rabi:  { bg:"rgba(59,130,246,0.10)", text:"#1d4ed8", border:"rgba(59,130,246,0.30)" },
    zaid:  { bg:"rgba(251,146,60,0.10)", text:"#c2410c", border:"rgba(251,146,60,0.30)" },
  };
  const c = colors[season.season.id] || colors.kharif;
  return (
    <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:20,background:c.bg,border:`1px solid ${c.border}` }}>
      <span style={{ fontSize:15 }}>{season.season.emoji}</span>
      <div>
        <div className="text-xs font-semibold" style={{ color:c.text }}>{season.season.label}</div>
        <div className="text-xs" style={{ color:c.text,opacity:0.7 }}>{season.season.months}</div>
      </div>
    </div>
  );
}

function SoilBadge({ soil, t }) {
  if (!soil?.primary) return null;
  return (
    <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:20,background:`${soil.primary.color}15`,border:`1px solid ${soil.primary.color}40` }}>
      <div style={{ width:10,height:10,borderRadius:"50%",background:soil.primary.color,flexShrink:0 }} />
      <div>
        <div className="text-xs font-semibold" style={{ color:"var(--color-text)" }}>{soil.primary.label}</div>
        <div className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>{t("crop_advisor.soil_type")}</div>
      </div>
    </div>
  );
}

function StepDots({ current }) {
  const steps = [STEP.SEARCH, STEP.MAP, STEP.CONDITIONS, STEP.INPUTS, STEP.RESULTS];
  const idx = steps.indexOf(current);
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((s,i) => (
        <div key={s} style={{ width:i===idx?20:6,height:6,borderRadius:3,background:i<=idx?GREEN:"var(--overlay-10)",transition:"all 0.3s ease" }} />
      ))}
    </div>
  );
}

// ── Map helpers ───────────────────────────────────────────────────────────────

function MapClickHandler({ onMapClick }) {
  if (!MC) return null;
  MC.useMapEvents({ click(e) { onMapClick(e.latlng.lat, e.latlng.lng); } });
  return null;
}

function FlyToLocation({ center }) {
  if (!MC) return null;
  const map = MC.useMap();
  useEffect(() => {
    if (center && map) map.flyTo(center, 11, { duration:1.0 });
  }, [center?.[0], center?.[1]]);
  return null;
}

// ── CropCard ──────────────────────────────────────────────────────────────────

function CropCard({ result, rank, t }) {
  const [expanded, setExpanded] = useState(false);
  const { crop, score, confidence, reasons, warnings } = result;
  const rankColors = ["#F59E0B","#94A3B8","#CD7C3A"];
  const rankLabels = ["1st","2nd","3rd"];

  return (
    <div className="card rounded-2xl overflow-hidden">
      <div className="flex items-start gap-3 p-4 cursor-pointer"
        onClick={() => setExpanded(e => !e)}
        style={{ borderBottom:expanded?"1px solid var(--overlay-7)":"none" }}>
        <div style={{ minWidth:30,height:30,borderRadius:"50%",background:`${rankColors[rank]}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:rankColors[rank],flexShrink:0 }}>
          {rankLabels[rank]}
        </div>
        <div style={{ flex:1,minWidth:0 }}>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span style={{ fontSize:18 }}>{crop.emoji}</span>
            <span className="font-semibold text-sm" style={{ color:"var(--color-text)" }}>{crop.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background:"var(--overlay-5)",color:"var(--color-text-muted)" }}>{crop.category}</span>
          </div>
          <p className="text-xs mb-2" style={{ color:"var(--color-text-muted)",fontWeight:300,lineHeight:1.5 }}>{crop.description}</p>
          <ConfidenceBadge {...confidence} score={score} />
        </div>
        <ChevronRight size={15} style={{ color:"var(--color-text-muted)",flexShrink:0,marginTop:4,transform:expanded?"rotate(90deg)":"none",transition:"transform 0.2s" }} />
      </div>

      {expanded && (
        <div className="p-4 flex flex-col gap-3">
          <div>
            <div className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color:"var(--color-text-muted)" }}>
              {t("crop_advisor.why_fits")}
            </div>
            {reasons.map((r,i) => (
              <div key={i} className="flex gap-2 text-xs mb-1" style={{ color:"var(--color-text)" }}>
                <span style={{ color:GREEN,flexShrink:0 }}>✓</span>
                <span>{r.replace(/^✓\s*/,"")}</span>
              </div>
            ))}
          </div>
          {warnings.length > 0 && (
            <div className="rounded-xl p-2.5" style={{ background:"rgba(251,146,60,0.08)",border:"1px solid rgba(251,146,60,0.25)" }}>
              {warnings.map((w,i) => (
                <div key={i} className="flex gap-2 text-xs" style={{ color:"#c2410c" }}>
                  <AlertTriangle size={11} style={{ flexShrink:0,marginTop:1 }} />{w}
                </div>
              ))}
            </div>
          )}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label:t("crop_advisor.water_need"), value:crop.waterRequirement },
              { label:t("crop_advisor.duration"),   value:crop.growthDuration   },
              { label:t("crop_advisor.yield"),       value:crop.yieldPotential   },
            ].map(({ label,value }) => (
              <div key={label} className="rounded-xl p-2.5" style={{ background:"var(--overlay-5)" }}>
                <div className="text-xs mb-0.5" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>{label}</div>
                <div className="text-xs font-semibold" style={{ color:"var(--color-text)" }}>{value}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-3" style={{ background:GREEN_DIM,border:`1px solid ${GREEN_BORDER}` }}>
            <div className="text-xs font-semibold mb-1" style={{ color:"#16a34a" }}>{t("crop_advisor.farmer_tip")}</div>
            <div className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300,lineHeight:1.5 }}>{crop.tips}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── FarmInputs ────────────────────────────────────────────────────────────────

function OptionPill({ label, selected, onClick }) {
  return (
    <button onClick={onClick} className="text-xs px-3 py-2 rounded-xl cursor-pointer text-left"
      style={{ border:`1px solid ${selected?GREEN:"var(--overlay-10)"}`,background:selected?GREEN_DIM:"var(--overlay-5)",color:selected?"#16a34a":"var(--color-text-muted)",fontFamily:"'DM Sans', sans-serif",fontWeight:selected?600:300,transition:"all 0.15s" }}>
      {label}
    </button>
  );
}

function FarmInputs({ onSubmit, t }) {
  const [water,  setWater]  = useState("");
  const [land,   setLand]   = useState("");
  const [labour, setLabour] = useState("");
  const [cattle, setCattle] = useState("");
  const ready = water && land && labour && cattle;

  const fields = [
    { icon:Waves, label:t("crop_advisor.water_label"),  opts:[t("crop_advisor.water_opt1"),t("crop_advisor.water_opt2"),t("crop_advisor.water_opt3"),t("crop_advisor.water_opt4")],  val:water,  set:setWater  },
    { icon:Leaf,  label:t("crop_advisor.land_label"),   opts:[t("crop_advisor.land_opt1"), t("crop_advisor.land_opt2"), t("crop_advisor.land_opt3"), t("crop_advisor.land_opt4")],   val:land,   set:setLand   },
    { icon:Users, label:t("crop_advisor.labour_label"), opts:[t("crop_advisor.labour_opt1"),t("crop_advisor.labour_opt2"),t("crop_advisor.labour_opt3"),t("crop_advisor.labour_opt4")], val:labour, set:setLabour },
    { icon:Beef,  label:t("crop_advisor.cattle_label"), opts:[t("crop_advisor.cattle_opt1"),t("crop_advisor.cattle_opt2"),t("crop_advisor.cattle_opt3"),t("crop_advisor.cattle_opt4")], val:cattle, set:setCattle },
  ];

  return (
    <div className="card rounded-2xl p-5 flex flex-col gap-5">
      <div>
        <SectionTag>{t("crop_advisor.farm_tag")}</SectionTag>
        <h3 className="display-font text-xl font-bold mb-1" style={{ color:"var(--color-text)" }}>
          {t("crop_advisor.farm_title")}
        </h3>
        <p className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300,lineHeight:1.6 }}>
          {t("crop_advisor.farm_subtitle")}
        </p>
      </div>
      {fields.map(({ icon:Icon, label, opts, val, set }) => (
        <div key={label}>
          <div className="flex items-center gap-2 mb-2">
            <Icon size={13} color={GREEN} />
            <span className="text-xs font-semibold" style={{ color:"var(--color-text)" }}>{label}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {opts.map(o => <OptionPill key={o} label={o} selected={val===o} onClick={() => set(o)} />)}
          </div>
        </div>
      ))}
      <button disabled={!ready} onClick={() => onSubmit({ water, land, labour, cattle })}
        className="w-full py-3 rounded-xl font-semibold text-sm cursor-pointer"
        style={{ background:ready?GREEN:"var(--overlay-10)",color:ready?"#fff":"var(--color-text-muted)",border:"none",fontFamily:"'DM Sans', sans-serif",transition:"all 0.2s",opacity:ready?1:0.6 }}>
        {ready ? t("crop_advisor.submit_ready") : t("crop_advisor.submit_pending")}
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function CropAdvisor() {
  const { t } = useTranslation();
  const advisor = useCropAdvisor();
  const searchRef = useRef(null);

  const [step,       setStep]       = useState(STEP.SEARCH);
  const [MapComps,   setMapComps]   = useState(null);
  const [mapCenter,  setMapCenter]  = useState(null);
  const [mapMarker,  setMapMarker]  = useState(null);
  const [farmInputs, setFarmInputs] = useState(null);

  useEffect(() => {
    loadMap().then(comps => { MC = comps; setMapComps(comps); });
  }, []);

  useEffect(() => {
    if (advisor.status === ADVISOR_STATUS.SUCCESS && step === STEP.MAP) setStep(STEP.CONDITIONS);
  }, [advisor.status]);

  function handleSelectLocation(loc) {
    setMapCenter([loc.lat, loc.lng]);
    setMapMarker([loc.lat, loc.lng]);
    setStep(STEP.MAP);
    advisor.selectLocation(loc);
  }

  function handleMapClick(lat, lng) {
    setMapCenter([lat, lng]);
    setMapMarker([lat, lng]);
    advisor.handleMapClick(lat, lng);
  }

  function handleFarmSubmit(inputs) { setFarmInputs(inputs); setStep(STEP.RESULTS); }

  function handleReset() {
    advisor.reset(); setStep(STEP.SEARCH);
    setMapCenter(null); setMapMarker(null); setFarmInputs(null);
  }

  const btnStyle = { fontFamily:"'DM Sans', sans-serif",border:"1px solid var(--overlay-10)",background:"var(--overlay-5)",color:"var(--color-text-muted)",cursor:"pointer" };

  // Season note
  const seasonNote = advisor.season?.season?.id ? t(`crop_advisor.season_note_${advisor.season.season.id}`) : "";

  return (
    <div className="page-root overflow-x-hidden" style={{ background:"var(--bg-main)",color:"var(--color-text)",minHeight:"100vh" }}>

      {/* Hero */}
      <section className="relative py-14 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse at 50% 0%, var(--green-8) 0%, transparent 65%)" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-xs uppercase mb-3 font-semibold tracking-widest" style={{ color:GREEN }}>
            {t("crop_advisor.tag")}
          </p>
          <h1 className="display-font text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color:"var(--color-text)" }}>
            {t("crop_advisor.hero_title1")}{" "}
            <span style={{ color:GREEN,textShadow:"0 0 40px rgba(34,197,94,0.35)" }}>
              {t("crop_advisor.hero_title2")}
            </span>
          </h1>
          <p className="text-sm max-w-lg mx-auto" style={{ color:"var(--color-text-muted)",fontWeight:300,lineHeight:1.8 }}>
            {t("crop_advisor.hero_subtitle")}
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="px-6 lg:px-20 pb-24">
        <div className="max-w-3xl mx-auto">
          <StepDots current={step} />

          {/* Search bar */}
          <div className="relative mb-4">
            <div className="card flex items-center gap-3 rounded-2xl px-4 py-3">
              <Search size={15} color={GREEN} />
              <input ref={searchRef} type="text"
                placeholder={t("crop_advisor.search_placeholder")}
                value={advisor.searchQuery}
                onChange={e => advisor.handleSearchInput(e.target.value)}
                style={{ flex:1,border:"none",outline:"none",background:"none",fontSize:14,color:"var(--color-text)",fontFamily:"'DM Sans', sans-serif" }}
              />
              {advisor.searchQuery && (
                <button onClick={handleReset} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",padding:2 }}>
                  <X size={13} color="var(--color-text-muted)" />
                </button>
              )}
            </div>

            {/* Suggestions */}
            {advisor.searchResults.length > 0 && (
              <div style={{ position:"absolute",top:"100%",left:0,right:0,zIndex:9999,background:"var(--navbar-dropdown-bg)",border:"1px solid var(--overlay-10)",borderRadius:16,marginTop:6,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.12)" }}>
                {advisor.searchResults.map(loc => (
                  <button key={loc.id} onClick={() => handleSelectLocation(loc)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer"
                    style={{ background:"none",border:"none",borderBottom:"1px solid var(--overlay-5)",fontFamily:"'DM Sans', sans-serif" }}
                    onMouseEnter={e => e.currentTarget.style.background="var(--overlay-5)"}
                    onMouseLeave={e => e.currentTarget.style.background="none"}
                  >
                    <MapPin size={13} color={GREEN} />
                    <div>
                      <div className="text-sm font-medium" style={{ color:"var(--color-text)" }}>{loc.shortName}</div>
                      <div className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>{loc.displayName?.slice(0,65)}…</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Map */}
          {(step===STEP.MAP||step===STEP.CONDITIONS||step===STEP.INPUTS||step===STEP.RESULTS) && (
            <div className="card rounded-2xl overflow-hidden mb-4" style={{ height:340,position:"relative" }}>
              {MapComps ? (
                <MapComps.MapContainer center={mapCenter||[20.5937,78.9629]} zoom={mapCenter?10:5} style={{ height:"100%",width:"100%" }}>
                  <MapComps.TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
                  <MapClickHandler onMapClick={handleMapClick} />
                  <FlyToLocation center={mapCenter} />
                  {mapMarker && <MapComps.Marker position={mapMarker} />}
                </MapComps.MapContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm" style={{ color:"var(--color-text-muted)" }}>{t("crop_advisor.map_loading")}</div>
              )}
              {step===STEP.MAP && advisor.status===ADVISOR_STATUS.LOADING && (
                <div style={{ position:"absolute",bottom:12,left:"50%",transform:"translateX(-50%)",background:"rgba(0,0,0,0.7)",color:"#fff",padding:"6px 16px",borderRadius:20,fontSize:12,zIndex:999,whiteSpace:"nowrap" }}>
                  {t("crop_advisor.fetching")}
                </div>
              )}
              {step===STEP.MAP && advisor.status===ADVISOR_STATUS.IDLE && (
                <div style={{ position:"absolute",bottom:12,left:"50%",transform:"translateX(-50%)",background:"rgba(0,0,0,0.65)",color:"#fff",padding:"6px 16px",borderRadius:20,fontSize:12,zIndex:999,whiteSpace:"nowrap" }}>
                  {t("crop_advisor.map_hint")}
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {advisor.status===ADVISOR_STATUS.ERROR && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4 text-sm" style={{ background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.25)",color:"#dc2626" }}>
              <AlertTriangle size={15} style={{ flexShrink:0 }} />{advisor.error}
            </div>
          )}

          {/* Empty state */}
          {step===STEP.SEARCH && !advisor.searchQuery && (
            <div className="py-14 px-6 text-center">
              <div style={{ fontSize:44,marginBottom:16 }}>🌱</div>
              <h3 className="display-font text-2xl font-bold mb-3" style={{ color:"var(--color-text)" }}>
                {t("crop_advisor.empty_title")}
              </h3>
              <p className="text-sm mb-8 max-w-md mx-auto" style={{ color:"var(--color-text-muted)",fontWeight:300,lineHeight:1.7 }}>
                {t("crop_advisor.empty_subtitle")}
              </p>
              <div className="flex gap-2 flex-wrap justify-center">
                {["Warangal, Telangana","Ludhiana, Punjab","Nashik, Maharashtra","Coimbatore, Tamil Nadu"].map(loc => (
                  <button key={loc} onClick={() => { advisor.handleSearchInput(loc); searchRef.current?.focus(); }}
                    className="text-xs px-4 py-2 rounded-full cursor-pointer"
                    style={{ border:"1px solid var(--overlay-10)",background:"var(--overlay-5)",color:"var(--color-text-muted)",fontFamily:"'DM Sans', sans-serif" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor="rgba(34,197,94,0.4)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor="var(--overlay-10)"}
                  >{loc}</button>
                ))}
              </div>
            </div>
          )}

          {/* Conditions */}
          {(step===STEP.CONDITIONS||step===STEP.INPUTS||step===STEP.RESULTS) && advisor.status===ADVISOR_STATUS.SUCCESS && (
            <div className="flex flex-col gap-4 mb-4">

              {/* Location bar */}
              <div className="card rounded-2xl px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={14} color={GREEN} />
                      <span className="font-semibold text-sm" style={{ color:"var(--color-text)" }}>{advisor.location?.shortName}</span>
                    </div>
                    <div className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>
                      {advisor.location?.lat?.toFixed(4)}°N, {advisor.location?.lng?.toFixed(4)}°E
                      {advisor.location?.state ? ` · ${advisor.location.state}` : ""}
                    </div>
                  </div>
                  <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs cursor-pointer" style={btnStyle}>
                    <RotateCcw size={11} /> {t("crop_advisor.new_search")}
                  </button>
                </div>
              </div>

              {/* Weather + soil + season */}
              <div className="card rounded-2xl p-5">
                <SectionTag>{t("crop_advisor.conditions_tag")}</SectionTag>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <StatCard icon={Thermometer} label={t("crop_advisor.temp_label")}
                    value={advisor.weather.current.temperature} unit="°C"
                    sub={`${t("crop_advisor.temp_avg")}: ${advisor.weather.weekly.avgTemp}°C`} accent="#ef4444" />
                  <StatCard icon={CloudRain} label={t("crop_advisor.rain_label")}
                    value={advisor.weather.forEngine.rainfall.toFixed(0)} unit="mm/mo"
                    sub={`${t("crop_advisor.rain_today")}: ${advisor.weather.current.precipitation} mm`} accent="#3b82f6" />
                  <StatCard icon={Droplets} label={t("crop_advisor.humidity_label")}
                    value={advisor.weather.current.humidity} unit="%"
                    sub={weatherCodeToLabel(advisor.weather.current.weatherCode)} accent="#06b6d4" />
                  <StatCard icon={Wind} label={t("crop_advisor.wind_label")}
                    value={advisor.weather.current.windSpeed} unit="km/h"
                    sub={`${weatherCodeToEmoji(advisor.weather.current.weatherCode)} ${weatherCodeToLabel(advisor.weather.current.weatherCode)}`} accent="#64748b" />
                </div>
                <div className="flex flex-wrap gap-3 mb-3">
                  <SoilBadge soil={advisor.soil} t={t} />
                  <SeasonBadge season={advisor.season} />
                </div>
                {seasonNote && (
                  <div className="flex gap-2 items-start rounded-xl px-3 py-2.5 text-xs" style={{ background:"var(--overlay-5)",color:"var(--color-text-muted)",lineHeight:1.6,fontWeight:300 }}>
                    <Info size={12} style={{ flexShrink:0,marginTop:1 }} />{seasonNote}
                  </div>
                )}
              </div>

              {/* Advisory warning */}
              {advisor.advisory && (
                <div className="flex gap-3 items-start px-4 py-3 rounded-xl text-xs" style={{ background:"rgba(251,146,60,0.08)",border:"1px solid rgba(251,146,60,0.25)",color:"#c2410c" }}>
                  <AlertTriangle size={14} style={{ flexShrink:0,marginTop:1 }} />
                  <span style={{ lineHeight:1.6 }}>{advisor.advisory.join(" ")}</span>
                </div>
              )}

              {/* CTA */}
              {step===STEP.CONDITIONS && (
                <button onClick={() => setStep(STEP.INPUTS)}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm cursor-pointer"
                  style={{ background:GREEN,color:"#fff",border:"none",fontFamily:"'DM Sans', sans-serif" }}>
                  {t("crop_advisor.describe_farm_btn")}
                </button>
              )}
            </div>
          )}

          {/* Farm inputs */}
          {(step===STEP.INPUTS||step===STEP.RESULTS) && (
            <div className="mb-4">
              {step===STEP.INPUTS ? (
                <FarmInputs onSubmit={handleFarmSubmit} t={t} />
              ) : (
                <div className="card rounded-2xl px-5 py-3 flex items-center justify-between gap-3 cursor-pointer"
                  onClick={() => setStep(STEP.INPUTS)}>
                  <div className="flex items-center gap-2">
                    <Tractor size={14} color={GREEN} />
                    <span className="text-xs font-semibold" style={{ color:"var(--color-text)" }}>{t("crop_advisor.farm_set")}</span>
                    <span className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>
                      {farmInputs?.water} · {farmInputs?.land} · {farmInputs?.labour}
                    </span>
                  </div>
                  <ChevronDown size={13} color="var(--color-text-muted)" />
                </div>
              )}
            </div>
          )}

          {/* Results */}
          {step===STEP.RESULTS && advisor.recommendations.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="card rounded-2xl p-5">
                <SectionTag>{t("crop_advisor.results_tag")}</SectionTag>
                <div className="flex items-center gap-2 mb-1">
                  <Sprout size={15} color={GREEN} />
                  <span className="font-semibold text-sm" style={{ color:"var(--color-text)" }}>
                    {t("crop_advisor.results_title")}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background:GREEN_DIM,color:"#16a34a" }}>
                    {t("crop_advisor.results_top")} {advisor.recommendations.length}
                  </span>
                </div>
                <p className="text-xs mb-4" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>
                  {t("crop_advisor.results_based")} {advisor.season?.season?.label} {t("crop_advisor.results_season")} · {advisor.soil?.primary?.label} · {farmInputs?.water} · {farmInputs?.land}
                </p>
                <div className="flex flex-col gap-3">
                  {advisor.recommendations.map((result,i) => (
                    <CropCard key={result.crop.id} result={result} rank={i} t={t} />
                  ))}
                </div>
              </div>

              {advisor.soil?.all?.length > 1 && (
                <div className="flex items-start gap-2 px-4 py-3 rounded-xl text-xs" style={{ border:"1px solid var(--overlay-7)",color:"var(--color-text-muted)",fontWeight:300 }}>
                  <Leaf size={13} style={{ flexShrink:0,marginTop:1 }} color="var(--color-text-muted)" />
                  <span>
                    <strong style={{ fontWeight:500,color:"var(--color-text)" }}>{t("crop_advisor.other_soils")}: </strong>
                    {advisor.soil.all.slice(1).map(s=>s.label).join(", ")}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs" style={{ border:"1px dashed var(--overlay-10)",color:"var(--color-text-muted)",fontWeight:300 }}>
                <TrendingUp size={12} color="var(--color-text-muted)" />
                {t("crop_advisor.ml_note")} <code style={{ fontSize:11,fontFamily:"monospace" }}>recommendationEngine.js</code>
              </div>

              <button onClick={handleReset}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm cursor-pointer"
                style={btnStyle}>
                <RotateCcw size={13} /> {t("crop_advisor.start_over")}
              </button>
            </div>
          )}

          {/* No results */}
          {step===STEP.RESULTS && advisor.recommendations.length===0 && (
            <div className="card rounded-2xl p-8 text-center">
              <div style={{ fontSize:36,marginBottom:12 }}>🌾</div>
              <p className="font-semibold text-sm mb-2" style={{ color:"var(--color-text)" }}>{t("crop_advisor.no_results_title")}</p>
              <p className="text-xs" style={{ color:"var(--color-text-muted)",fontWeight:300 }}>{t("crop_advisor.no_results_sub")}</p>
              <button onClick={handleReset} className="mt-4 px-4 py-2 rounded-xl text-xs cursor-pointer" style={btnStyle}>
                {t("crop_advisor.try_again")}
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}