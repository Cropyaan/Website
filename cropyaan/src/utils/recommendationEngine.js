/**
 * recommendationEngine.js
 * Rule-based crop recommendation engine.
 *
 * Architecture designed for future ML upgrade:
 *  - Score function is pluggable (swap rule-based for ML model output)
 *  - All input/output shapes are stable contracts
 *  - Confidence scores mirror ML probability outputs
 */

import { CROPS } from "../data/cropDatabase.js";

/**
 * Score a single crop against the given agronomic context.
 * Returns a 0–100 confidence score and an array of match reasons.
 *
 * Scoring breakdown:
 *   Season match     → 0 or 35 pts (hard filter if 0)
 *   Soil match       → 0 or 25 pts
 *   Temperature fit  → 0–20 pts (continuous)
 *   Rainfall fit     → 0–20 pts (continuous)
 *
 * @param {object} crop        - Crop object from cropDatabase
 * @param {object} context     - { season, soilId, temperature, rainfall }
 * @returns {{ score: number, reasons: string[], warnings: string[] }}
 */
function scoreCrop(crop, context) {
  const { season, soilId, temperature, rainfall } = context;
  let score = 0;
  const reasons = [];
  const warnings = [];

  // ── 1. Season match (HARD requirement — 35 pts) ──────────────────────
  const seasonMatch = crop.conditions.seasons.includes(season);
  if (!seasonMatch) {
    return { score: 0, reasons, warnings: [`Not a ${season} crop`] };
  }
  score += 35;
  reasons.push(`✓ Suited for ${season.charAt(0).toUpperCase() + season.slice(1)} season`);

  // ── 2. Soil match (25 pts) ────────────────────────────────────────────
  const soilMatch = crop.conditions.soilTypes.includes(soilId);
  if (soilMatch) {
    score += 25;
    reasons.push(`✓ Grows well in ${soilId} soil`);
  } else {
    warnings.push(`Soil type may not be ideal`);
  }

  // ── 3. Temperature fit (0–20 pts, continuous) ─────────────────────────
  const [tMin, tMax] = crop.conditions.tempRange;
  if (temperature >= tMin && temperature <= tMax) {
    score += 20;
    reasons.push(`✓ Current temperature (${temperature}°C) is optimal`);
  } else if (temperature < tMin) {
    const deficit = tMin - temperature;
    const partial = Math.max(0, 20 - deficit * 2);
    score += partial;
    if (partial > 0) reasons.push(`~ Temperature slightly below optimum`);
    warnings.push(`Temp too low (needs ≥${tMin}°C)`);
  } else {
    const excess = temperature - tMax;
    const partial = Math.max(0, 20 - excess * 2);
    score += partial;
    if (partial > 0) reasons.push(`~ Temperature slightly above optimum`);
    warnings.push(`Temp too high (needs ≤${tMax}°C)`);
  }

  // ── 4. Rainfall fit (0–20 pts, continuous) ───────────────────────────
  const [rMin, rMax] = crop.conditions.rainfallRange;
  if (rainfall >= rMin && rainfall <= rMax) {
    score += 20;
    reasons.push(`✓ Rainfall (${rainfall.toFixed(1)} mm) within optimal range`);
  } else if (rainfall < rMin) {
    const deficit = rMin - rainfall;
    const partial = Math.max(0, 20 - deficit * 0.5);
    score += partial;
    if (partial > 0) reasons.push(`~ Rainfall slightly below optimum`);
    warnings.push(`Low rainfall — irrigation recommended`);
  } else {
    const excess = rainfall - rMax;
    const partial = Math.max(0, 20 - excess * 0.3);
    score += partial;
    if (partial > 0) reasons.push(`~ Rainfall above optimum`);
    warnings.push(`Excess rainfall — drainage management needed`);
  }

  return { score: Math.round(score), reasons, warnings };
}

/**
 * Confidence label from numeric score.
 */
function confidenceLabel(score) {
  if (score >= 85) return { label: "Excellent Match", color: "#2E7D32" };
  if (score >= 70) return { label: "Good Match", color: "#558B2F" };
  if (score >= 55) return { label: "Fair Match", color: "#F57F17" };
  return { label: "Marginal", color: "#BF360C" };
}

/**
 * Main recommendation function.
 *
 * @param {object} params
 * @param {string} params.season      - "kharif" | "rabi" | "zaid"
 * @param {string} params.soilId      - Soil type ID from soilData
 * @param {number} params.temperature - Current temperature in °C
 * @param {number} params.rainfall    - Monthly rainfall in mm
 * @param {number} params.topN        - Number of recommendations (default 3)
 *
 * @returns {Array<{ crop, score, confidence, reasons, warnings }>}
 */
export function getTopCropRecommendations({ season, soilId, temperature, rainfall, topN = 3 }) {
  const context = { season, soilId, temperature, rainfall };

  const scored = CROPS
    .map((crop) => {
      const { score, reasons, warnings } = scoreCrop(crop, context);
      return {
        crop: {
          ...crop,
          whySuitable: reasons,
        },
        score,
        confidence: confidenceLabel(score),
        reasons,
        warnings,
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return scored;
}

/**
 * Utility: explain why a location might be challenging for farming.
 * Returns advisory string or null.
 */
export function getLocationAdvisory({ temperature, rainfall, season }) {
  const advisories = [];
  if (temperature > 40) advisories.push("Extreme heat — use heat-tolerant varieties and ensure irrigation.");
  if (temperature < 5) advisories.push("Very cold temperatures — protect crops from frost damage.");
  if (rainfall < 20 && season === "kharif") advisories.push("Very low monsoon rainfall — heavy irrigation dependency.");
  if (rainfall > 300) advisories.push("Excess rainfall detected — prioritize drainage and flood-tolerant crops.");
  return advisories.length ? advisories : null;
}