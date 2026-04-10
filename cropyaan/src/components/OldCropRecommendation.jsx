// // src/components/CropRecommendation.jsx
// import { useState } from "react";
// import cropData from "../data/cropData";
// import { getTopCrops } from "../utils/cropRecommendation";
 
// // ─── inline styles (no external UI lib) ──────────────────────────────────────
// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 50%, #e0f2f1 100%)",
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "center",
//     padding: "40px 16px",
//     fontFamily: "'Segoe UI', system-ui, sans-serif",
//   },
//   card: {
//     background: "#ffffff",
//     borderRadius: "16px",
//     boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
//     padding: "36px 32px",
//     width: "100%",
//     maxWidth: "520px",
//   },
//   header: {
//     textAlign: "center",
//     marginBottom: "28px",
//   },
//   title: {
//     fontSize: "26px",
//     fontWeight: "700",
//     color: "#1b5e20",
//     margin: "0 0 6px 0",
//   },
//   subtitle: {
//     fontSize: "14px",
//     color: "#555",
//     margin: 0,
//   },
//   formGroup: {
//     marginBottom: "18px",
//   },
//   label: {
//     display: "block",
//     fontSize: "13px",
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: "6px",
//     textTransform: "uppercase",
//     letterSpacing: "0.04em",
//   },
//   select: {
//     width: "100%",
//     padding: "10px 12px",
//     borderRadius: "8px",
//     border: "1.5px solid #c8e6c9",
//     fontSize: "15px",
//     color: "#222",
//     background: "#f9fbe7",
//     appearance: "auto",
//     cursor: "pointer",
//     outline: "none",
//     boxSizing: "border-box",
//     transition: "border-color 0.2s",
//   },
//   input: {
//     width: "100%",
//     padding: "10px 12px",
//     borderRadius: "8px",
//     border: "1.5px solid #c8e6c9",
//     fontSize: "15px",
//     color: "#222",
//     background: "#f9fbe7",
//     outline: "none",
//     boxSizing: "border-box",
//   },
//   row: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "14px",
//   },
//   button: {
//     width: "100%",
//     padding: "13px",
//     borderRadius: "10px",
//     border: "none",
//     fontSize: "15px",
//     fontWeight: "700",
//     cursor: "pointer",
//     marginTop: "8px",
//     transition: "background 0.2s, transform 0.1s",
//   },
//   buttonActive: {
//     background: "linear-gradient(90deg, #388e3c, #66bb6a)",
//     color: "#fff",
//   },
//   buttonDisabled: {
//     background: "#c8e6c9",
//     color: "#888",
//     cursor: "not-allowed",
//   },
//   error: {
//     fontSize: "12px",
//     color: "#c62828",
//     marginTop: "10px",
//     textAlign: "center",
//   },
//   resultsSection: {
//     marginTop: "32px",
//     borderTop: "2px solid #e8f5e9",
//     paddingTop: "24px",
//   },
//   resultsTitle: {
//     fontSize: "16px",
//     fontWeight: "700",
//     color: "#1b5e20",
//     marginBottom: "16px",
//   },
//   cropCard: {
//     background: "#f9fbe7",
//     border: "1.5px solid #c8e6c9",
//     borderRadius: "12px",
//     padding: "16px",
//     marginBottom: "14px",
//   },
//   cropCardTop: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: "10px",
//   },
//   cropName: {
//     fontSize: "17px",
//     fontWeight: "700",
//     color: "#2e7d32",
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//   },
//   badge: {
//     fontSize: "13px",
//     fontWeight: "700",
//     padding: "3px 10px",
//     borderRadius: "20px",
//     background: "#388e3c",
//     color: "#fff",
//   },
//   cropDesc: {
//     fontSize: "13px",
//     color: "#555",
//     marginBottom: "12px",
//     lineHeight: "1.5",
//   },
//   scoreBar: {
//     height: "6px",
//     borderRadius: "3px",
//     background: "#c8e6c9",
//     marginBottom: "10px",
//     overflow: "hidden",
//   },
//   scoreBarFill: (pct, color) => ({
//     height: "100%",
//     width: `${pct}%`,
//     background: color,
//     borderRadius: "3px",
//     transition: "width 0.4s ease",
//   }),
//   breakdownGrid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "6px 12px",
//   },
//   breakdownItem: {
//     fontSize: "12px",
//     color: "#444",
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   breakdownLabel: {
//     color: "#888",
//   },
//   breakdownScore: (score) => ({
//     fontWeight: "700",
//     color: score >= 80 ? "#2e7d32" : score >= 50 ? "#f57f17" : "#c62828",
//   }),
//   toggleBtn: {
//     background: "none",
//     border: "none",
//     fontSize: "12px",
//     color: "#388e3c",
//     cursor: "pointer",
//     padding: "0",
//     textDecoration: "underline",
//     marginTop: "8px",
//   },
// };
 
// // ─── Helper ───────────────────────────────────────────────────────────────────
// function getScoreColor(score) {
//   if (score >= 75) return "#43a047";
//   if (score >= 50) return "#fb8c00";
//   return "#e53935";
// }
 
// // ─── Sub-component: single crop result ───────────────────────────────────────
// function CropResult({ crop, rank }) {
//   const [showBreakdown, setShowBreakdown] = useState(false);
//   const { name, emoji, description, totalScore, breakdown } = crop;
//   const color = getScoreColor(totalScore);
 
//   return (
//     <div style={styles.cropCard}>
//       <div style={styles.cropCardTop}>
//         <span style={styles.cropName}>
//           <span style={{ fontSize: "22px" }}>{emoji}</span>
//           #{rank} {name}
//         </span>
//         <span style={{ ...styles.badge, background: color }}>
//           {totalScore}%
//         </span>
//       </div>
 
//       {/* overall score bar */}
//       <div style={styles.scoreBar}>
//         <div style={styles.scoreBarFill(totalScore, color)} />
//       </div>
 
//       <p style={styles.cropDesc}>{description}</p>
 
//       <button
//         style={styles.toggleBtn}
//         onClick={() => setShowBreakdown((v) => !v)}
//       >
//         {showBreakdown ? "▲ Hide breakdown" : "▼ Why this crop?"}
//       </button>
 
//       {showBreakdown && (
//         <div style={{ marginTop: "10px", ...styles.breakdownGrid }}>
//           {Object.entries(breakdown).map(([key, val]) => (
//             <div key={key} style={styles.breakdownItem}>
//               <span style={styles.breakdownLabel}>
//                 {key.charAt(0).toUpperCase() + key.slice(1)}
//               </span>
//               <span style={styles.breakdownScore(val.score)}>
//                 {val.score}% &nbsp;
//                 <span style={{ fontWeight: 400, color: "#aaa" }}>
//                   (ideal: {val.ideal})
//                 </span>
//               </span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
 
// // ─── Main component ───────────────────────────────────────────────────────────
// export default function CropRecommendation() {
//   const [soilType, setSoilType] = useState("");
//   const [season, setSeason] = useState("");
//   const [pH, setPH] = useState("6.5");
//   const [temperature, setTemperature] = useState("28");
//   const [rainfall, setRainfall] = useState("80");
//   const [results, setResults] = useState(null);
//   const [validationMsg, setValidationMsg] = useState("");
 
//   const isReady = soilType !== "" && season !== "";
 
//   function handleRecommend() {
//     console.log("[CropRecommendation] handleRecommend called", {
//       soilType,
//       season,
//       pH,
//       temperature,
//       rainfall,
//     });
 
//     if (!soilType || !season) {
//       setValidationMsg("Please select both Soil Type and Season.");
//       return;
//     }
 
//     const pHNum = parseFloat(pH);
//     const tempNum = parseFloat(temperature);
//     const rainNum = parseFloat(rainfall);
 
//     if (isNaN(pHNum) || isNaN(tempNum) || isNaN(rainNum)) {
//       setValidationMsg("Please enter valid numeric values for pH, temperature, and rainfall.");
//       return;
//     }
 
//     setValidationMsg("");
 
//     const inputs = {
//       soilType,
//       season,
//       pH: pHNum,
//       temperature: tempNum,
//       rainfall: rainNum,
//     };
 
//     const top3 = getTopCrops(cropData, inputs, 3);
//     console.log("[CropRecommendation] Top 3:", top3.map((c) => c.name));
//     setResults(top3);
//   }
 
//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         {/* Header */}
//         <div style={styles.header}>
//           <h1 style={styles.title}>🌾 Crop Recommender</h1>
//           <p style={styles.subtitle}>
//             Enter your field conditions to get smart crop suggestions
//           </p>
//         </div>
 
//         {/* ── Dropdowns row ── */}
//         <div style={styles.row}>
//           {/* Soil Type */}
//           <div style={styles.formGroup}>
//             <label style={styles.label} htmlFor="soilType">
//               Soil Type
//             </label>
//             <select
//               id="soilType"
//               style={styles.select}
//               value={soilType}
//               onChange={(e) => {
//                 console.log("[CropRecommendation] soilType changed:", e.target.value);
//                 setSoilType(e.target.value);
//                 setResults(null);
//               }}
//             >
//               <option value="">-- Select --</option>
//               <option value="black">Black</option>
//               <option value="red">Red</option>
//               <option value="sandy">Sandy</option>
//             </select>
//           </div>
 
//           {/* Season */}
//           <div style={styles.formGroup}>
//             <label style={styles.label} htmlFor="season">
//               Season
//             </label>
//             <select
//               id="season"
//               style={styles.select}
//               value={season}
//               onChange={(e) => {
//                 console.log("[CropRecommendation] season changed:", e.target.value);
//                 setSeason(e.target.value);
//                 setResults(null);
//               }}
//             >
//               <option value="">-- Select --</option>
//               <option value="kharif">Kharif (Jun–Oct)</option>
//               <option value="rabi">Rabi (Nov–Apr)</option>
//             </select>
//           </div>
//         </div>
 
//         {/* ── Numeric inputs row ── */}
//         <div style={styles.row}>
//           <div style={styles.formGroup}>
//             <label style={styles.label} htmlFor="pH">
//               Soil pH
//             </label>
//             <input
//               id="pH"
//               type="number"
//               style={styles.input}
//               value={pH}
//               min="0"
//               max="14"
//               step="0.1"
//               onChange={(e) => setPH(e.target.value)}
//             />
//           </div>
 
//           <div style={styles.formGroup}>
//             <label style={styles.label} htmlFor="temperature">
//               Temp (°C)
//             </label>
//             <input
//               id="temperature"
//               type="number"
//               style={styles.input}
//               value={temperature}
//               min="0"
//               max="60"
//               onChange={(e) => setTemperature(e.target.value)}
//             />
//           </div>
//         </div>
 
//         <div style={styles.formGroup}>
//           <label style={styles.label} htmlFor="rainfall">
//             Monthly Rainfall (mm)
//           </label>
//           <input
//             id="rainfall"
//             type="number"
//             style={styles.input}
//             value={rainfall}
//             min="0"
//             max="500"
//             onChange={(e) => setRainfall(e.target.value)}
//           />
//         </div>
 
//         {/* Button */}
//         <button
//           style={{
//             ...styles.button,
//             ...(isReady ? styles.buttonActive : styles.buttonDisabled),
//           }}
//           onClick={handleRecommend}
//           disabled={!isReady}
//         >
//           {isReady ? "🌱 Get Recommendations" : "Select Soil Type & Season first"}
//         </button>
 
//         {validationMsg && (
//           <p style={styles.error}>{validationMsg}</p>
//         )}
 
//         {/* Results */}
//         {results && results.length > 0 && (
//           <div style={styles.resultsSection}>
//             <p style={styles.resultsTitle}>
//               ✅ Top 3 recommended crops for your conditions:
//             </p>
//             {results.map((crop, i) => (
//               <CropResult key={crop.name} crop={crop} rank={i + 1} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

























// src/components/CropRecommendation.jsx
import { useState } from "react";
import cropData from "../data/cropData";
import { getTopCrops, validateInputs, INPUT_LIMITS, SCORE_THRESHOLD } from "../utils/cropRecommendation";

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 50%, #e0f2f1 100%)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "40px 16px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    padding: "36px 32px",
    width: "100%",
    maxWidth: "520px",
  },
  header: { textAlign: "center", marginBottom: "28px" },
  title: { fontSize: "26px", fontWeight: "700", color: "#1b5e20", margin: "0 0 6px 0" },
  subtitle: { fontSize: "14px", color: "#555", margin: 0 },

  formGroup: { marginBottom: "16px" },
  labelRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" },
  label: { fontSize: "13px", fontWeight: "600", color: "#333", textTransform: "uppercase", letterSpacing: "0.04em" },
  hint: { fontSize: "11px", color: "#888" },

  select: {
    width: "100%", padding: "10px 12px", borderRadius: "8px",
    border: "1.5px solid #c8e6c9", fontSize: "15px", color: "#222",
    background: "#f9fbe7", cursor: "pointer", outline: "none",
    boxSizing: "border-box",
  },
  input: (hasError) => ({
    width: "100%", padding: "10px 12px", borderRadius: "8px",
    border: `1.5px solid ${hasError ? "#e53935" : "#c8e6c9"}`,
    fontSize: "15px", color: "#222", background: hasError ? "#fff8f8" : "#f9fbe7",
    outline: "none", boxSizing: "border-box",
  }),
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },

  fieldError: { fontSize: "11px", color: "#c62828", marginTop: "4px" },

  errorBox: {
    background: "#fff3e0", border: "1.5px solid #ffb74d",
    borderRadius: "8px", padding: "10px 14px", marginTop: "12px",
  },
  errorList: { margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#e65100" },

  button: {
    width: "100%", padding: "13px", borderRadius: "10px",
    border: "none", fontSize: "15px", fontWeight: "700",
    cursor: "pointer", marginTop: "10px", transition: "opacity 0.2s",
  },
  btnActive: { background: "linear-gradient(90deg, #388e3c, #66bb6a)", color: "#fff" },
  btnDisabled: { background: "#c8e6c9", color: "#888", cursor: "not-allowed" },

  divider: { borderTop: "2px solid #e8f5e9", marginTop: "28px", paddingTop: "24px" },
  resultsTitle: { fontSize: "16px", fontWeight: "700", color: "#1b5e20", marginBottom: "16px" },

  noResults: {
    textAlign: "center", padding: "24px 16px",
    background: "#fff8e1", borderRadius: "12px",
    border: "1.5px solid #ffe082",
  },
  noResultsIcon: { fontSize: "36px", marginBottom: "8px" },
  noResultsTitle: { fontWeight: "700", color: "#e65100", marginBottom: "6px", fontSize: "15px" },
  noResultsText: { fontSize: "13px", color: "#555", lineHeight: "1.6" },

  cropCard: {
    background: "#f9fbe7", border: "1.5px solid #c8e6c9",
    borderRadius: "12px", padding: "16px", marginBottom: "14px",
  },
  cropTop: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" },
  cropName: { fontSize: "17px", fontWeight: "700", color: "#2e7d32", display: "flex", alignItems: "center", gap: "8px" },
  badge: (color) => ({
    fontSize: "13px", fontWeight: "700", padding: "3px 10px",
    borderRadius: "20px", background: color, color: "#fff",
  }),
  scoreBarWrap: { height: "6px", borderRadius: "3px", background: "#c8e6c9", marginBottom: "10px", overflow: "hidden" },
  scoreBarFill: (pct, color) => ({ height: "100%", width: `${pct}%`, background: color, borderRadius: "3px" }),
  cropDesc: { fontSize: "13px", color: "#555", marginBottom: "10px", lineHeight: "1.5" },
  toggleBtn: {
    background: "none", border: "none", fontSize: "12px",
    color: "#388e3c", cursor: "pointer", padding: "0", textDecoration: "underline",
  },
  breakdownGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", marginTop: "10px" },
  breakdownItem: { fontSize: "12px", color: "#444", display: "flex", justifyContent: "space-between" },
  breakdownLabel: { color: "#888" },
  breakdownScore: (score) => ({
    fontWeight: "700",
    color: score >= 80 ? "#2e7d32" : score >= 50 ? "#f57f17" : "#c62828",
  }),
};

function getScoreColor(score) {
  if (score >= 75) return "#43a047";
  if (score >= 55) return "#fb8c00";
  return "#e53935";
}

// ─── CropResult sub-component ─────────────────────────────────────────────────
function CropResult({ crop, rank }) {
  const [open, setOpen] = useState(false);
  const { name, emoji, description, totalScore, breakdown } = crop;
  const color = getScoreColor(totalScore);

  return (
    <div style={s.cropCard}>
      <div style={s.cropTop}>
        <span style={s.cropName}>
          <span style={{ fontSize: "22px" }}>{emoji}</span>
          #{rank} {name}
        </span>
        <span style={s.badge(color)}>{totalScore}%</span>
      </div>

      <div style={s.scoreBarWrap}>
        <div style={s.scoreBarFill(totalScore, color)} />
      </div>

      <p style={s.cropDesc}>{description}</p>

      <button style={s.toggleBtn} onClick={() => setOpen((v) => !v)}>
        {open ? "▲ Hide breakdown" : "▼ Why this crop?"}
      </button>

      {open && (
        <div style={s.breakdownGrid}>
          {Object.entries(breakdown).map(([key, val]) => (
            <div key={key} style={s.breakdownItem}>
              <span style={s.breakdownLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <span style={s.breakdownScore(val.score)}>
                {val.score}%{" "}
                <span style={{ fontWeight: 400, color: "#bbb" }}>({val.ideal})</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CropRecommendation() {
  const [soilType, setSoilType]       = useState("");
  const [season, setSeason]           = useState("");
  const [pH, setPH]                   = useState("6.5");
  const [temperature, setTemperature] = useState("28");
  const [rainfall, setRainfall]       = useState("80");

  const [results, setResults]         = useState(null);  // null = not yet run
  const [fieldErrors, setFieldErrors] = useState([]);
  const [noResults, setNoResults]     = useState(false);

  const dropdownsReady = soilType !== "" && season !== "";

  function handleRecommend() {
    console.log("[CropRecommendation] handleRecommend →", { soilType, season, pH, temperature, rainfall });

    const errors = validateInputs({ pH, temperature, rainfall });
    if (errors.length > 0) {
      setFieldErrors(errors);
      setResults(null);
      setNoResults(false);
      return;
    }

    setFieldErrors([]);
    const inputs = {
      soilType, season,
      pH:          parseFloat(pH),
      temperature: parseFloat(temperature),
      rainfall:    parseFloat(rainfall),
    };

    const top3 = getTopCrops(cropData, inputs, 3);

    if (top3.length === 0) {
      setNoResults(true);
      setResults(null);
    } else {
      setNoResults(false);
      setResults(top3);
    }
  }

  function handleReset() {
    setSoilType(""); setSeason("");
    setPH("6.5"); setTemperature("28"); setRainfall("80");
    setResults(null); setFieldErrors([]); setNoResults(false);
  }

  return (
    <div style={s.page}>
      <div style={s.card}>

        {/* Header */}
        <div style={s.header}>
          <h1 style={s.title}>🌾 Crop Recommender</h1>
          <p style={s.subtitle}>Enter your field conditions to get smart crop suggestions</p>
        </div>

        {/* ── Dropdowns ── */}
        <div style={s.row}>
          <div style={s.formGroup}>
            <div style={s.labelRow}>
              <label style={s.label} htmlFor="soilType">Soil Type</label>
            </div>
            <select
              id="soilType"
              style={s.select}
              value={soilType}
              onChange={(e) => { setSoilType(e.target.value); setResults(null); setNoResults(false); }}
            >
              <option value="">-- Select --</option>
              <option value="black">Black</option>
              <option value="red">Red</option>
              <option value="sandy">Sandy</option>
            </select>
          </div>

          <div style={s.formGroup}>
            <div style={s.labelRow}>
              <label style={s.label} htmlFor="season">Season</label>
            </div>
            <select
              id="season"
              style={s.select}
              value={season}
              onChange={(e) => { setSeason(e.target.value); setResults(null); setNoResults(false); }}
            >
              <option value="">-- Select --</option>
              <option value="kharif">Kharif (Jun–Oct)</option>
              <option value="rabi">Rabi (Nov–Apr)</option>
            </select>
          </div>
        </div>

        {/* ── Numeric inputs ── */}
        <div style={s.row}>
          <div style={s.formGroup}>
            <div style={s.labelRow}>
              <label style={s.label} htmlFor="pH">Soil pH</label>
              <span style={s.hint}>0 – 14</span>
            </div>
            <input
              id="pH" type="number" step="0.1"
              style={s.input(false)}
              value={pH}
              min={INPUT_LIMITS.pH.min} max={INPUT_LIMITS.pH.max}
              onChange={(e) => setPH(e.target.value)}
            />
          </div>

          <div style={s.formGroup}>
            <div style={s.labelRow}>
              <label style={s.label} htmlFor="temperature">Temp (°C)</label>
              <span style={s.hint}>−10 – 55</span>
            </div>
            <input
              id="temperature" type="number"
              style={s.input(false)}
              value={temperature}
              min={INPUT_LIMITS.temperature.min} max={INPUT_LIMITS.temperature.max}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>
        </div>

        <div style={s.formGroup}>
          <div style={s.labelRow}>
            <label style={s.label} htmlFor="rainfall">Monthly Rainfall (mm)</label>
            <span style={s.hint}>0 – 500 mm</span>
          </div>
          <input
            id="rainfall" type="number"
            style={s.input(false)}
            value={rainfall}
            min={INPUT_LIMITS.rainfall.min} max={INPUT_LIMITS.rainfall.max}
            onChange={(e) => setRainfall(e.target.value)}
          />
        </div>

        {/* Validation errors */}
        {fieldErrors.length > 0 && (
          <div style={s.errorBox}>
            <ul style={s.errorList}>
              {fieldErrors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        )}

        {/* Button */}
        <button
          style={{ ...s.button, ...(dropdownsReady ? s.btnActive : s.btnDisabled) }}
          onClick={handleRecommend}
          disabled={!dropdownsReady}
        >
          {dropdownsReady ? "🌱 Get Recommendations" : "Select Soil Type & Season first"}
        </button>

        {/* ── Results ── */}
        {(results || noResults) && (
          <div style={s.divider}>

            {noResults && (
              <div style={s.noResults}>
                <div style={s.noResultsIcon}>🚫</div>
                <div style={s.noResultsTitle}>No suitable crops found</div>
                <p style={s.noResultsText}>
                  None of our crops scored above {SCORE_THRESHOLD}% for your conditions.<br />
                  Try adjusting pH, temperature, or rainfall to more realistic values.<br />
                  <strong>Tip:</strong> Rabi crops prefer 10–25°C; Kharif crops prefer 25–40°C.
                </p>
              </div>
            )}

            {results && results.length > 0 && (
              <>
                <p style={s.resultsTitle}>✅ Top {results.length} recommended crop{results.length > 1 ? "s" : ""} for your conditions:</p>
                {results.map((crop, i) => (
                  <CropResult key={crop.name} crop={crop} rank={i + 1} />
                ))}
              </>
            )}

            <button
              onClick={handleReset}
              style={{
                ...s.button, marginTop: "8px",
                background: "none", border: "1.5px solid #c8e6c9",
                color: "#388e3c", fontSize: "13px", padding: "9px",
              }}
            >
              ↺ Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}