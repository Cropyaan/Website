// ─────────────────────────────────────────────────────────────────────────────
// utils/weatherEngine.js
// ─────────────────────────────────────────────────────────────────────────────

// ── Scoring helpers ───────────────────────────────────────────────────────────
function linearScale(value, inMin, inMax, outMin = 0, outMax = 100) {
  const ratio = (value - inMin) / (inMax - inMin);
  return Math.min(outMax, Math.max(outMin, outMin + ratio * (outMax - outMin)));
}
function smoothStep(value, edge0, edge1) {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
function severityLevel(score) {
  if (score >= 80) return "critical";
  if (score >= 55) return "high";
  if (score >= 30) return "medium";
  return "low";
}

// ── Risk scorers ──────────────────────────────────────────────────────────────
function scoreHeatStress({ temp }) {
  if (temp < 32) return null;
  const severity = Math.round(smoothStep(temp, 32, 44) * 100);
  return { type: "heat_stress",      icon: "🌡️", severity, level: severityLevel(severity) };
}
function scoreColdStress({ temp }) {
  if (temp > 12) return null;
  const severity = Math.round(smoothStep(12 - temp, 0, 12) * 100);
  return { type: "cold_stress",      icon: "❄️", severity, level: severityLevel(severity) };
}
function scoreExcessRain({ rainProb }) {
  if (rainProb < 55) return null;
  const severity = Math.round(smoothStep(rainProb, 55, 90) * 100);
  return { type: "excess_rain",      icon: "🌧️", severity, level: severityLevel(severity) };
}
function scoreDroughtRisk({ rainProb, temp }) {
  if (rainProb > 15 || temp < 22) return null;
  const rainScore = smoothStep(15 - rainProb, 0, 15);
  const heatBoost = linearScale(temp, 22, 40, 0, 30);
  const severity  = Math.round(Math.min(100, rainScore * 70 + heatBoost));
  return { type: "drought_risk",     icon: "🏜️", severity, level: severityLevel(severity) };
}
function scoreWindRisk({ windSpeed }) {
  if (windSpeed < 25) return null;
  const severity = Math.round(smoothStep(windSpeed, 25, 60) * 100);
  return { type: "wind_damage",      icon: "💨", severity, level: severityLevel(severity) };
}
function scoreFungalRisk({ rainProb, temp }) {
  if (rainProb < 60 || temp < 18 || temp > 36) return null;
  const tempFactor = 1 - Math.abs(temp - 26) / 14;
  const rainFactor = smoothStep(rainProb, 60, 90);
  const severity   = Math.round(tempFactor * rainFactor * 100);
  if (severity < 20) return null;
  return { type: "fungal_pressure",  icon: "🍄", severity, level: severityLevel(severity) };
}
function scoreSprayRisk({ windSpeed, rainProb }) {
  const windBad = windSpeed > 20;
  const rainBad = rainProb > 45;
  if (!windBad && !rainBad) return null;
  const windScore = windBad ? linearScale(windSpeed, 20, 50, 20, 60) : 0;
  const rainScore = rainBad ? linearScale(rainProb,  45, 85, 20, 60) : 0;
  const severity  = Math.round(Math.min(100, windScore + rainScore));
  return { type: "spray_risk",       icon: "🚫", severity, level: severityLevel(severity) };
}

// ── Public API ────────────────────────────────────────────────────────────────
// Labels, reasons, actions and summary are now i18n keys — resolved in the UI.
// The engine only produces type / icon / severity / level.

export function analyzeWeather({ temp, rainProb, windSpeed, humidity = null }) {
  const context = { temp, rainProb, windSpeed, humidity };

  const risks = [
    scoreHeatStress(context),
    scoreColdStress(context),
    scoreExcessRain(context),
    scoreDroughtRisk(context),
    scoreWindRisk(context),
    scoreFungalRisk(context),
    scoreSprayRisk(context),
  ]
    .filter(Boolean)
    .sort((a, b) => b.severity - a.severity);

  return { risks };
}